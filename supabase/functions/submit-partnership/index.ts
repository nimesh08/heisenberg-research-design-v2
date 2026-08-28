import { createClient } from "npm:@supabase/supabase-js@2.112.3";

const defaultAllowedOrigins = [
  "https://heisenberg-research-design-v2.vercel.app",
  "http://localhost:5173",
  "http://localhost:4177",
  "http://127.0.0.1:4177"
];

const allowedOrigins = new Set(
  (Deno.env.get("PARTNERSHIP_ALLOWED_ORIGINS") || defaultAllowedOrigins.join(","))
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
);

const fieldLimits = {
  full_name: [2, 120],
  role_title: [2, 120],
  company_name: [2, 160],
  company_website: [8, 2048],
  company_building: [20, 3000],
  future_need: [20, 3000],
  work_email: [5, 254]
} as const;

function corsHeaders(origin: string) {
  return {
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Origin": origin,
    "Content-Type": "application/json",
    Vary: "Origin"
  };
}

function json(origin: string, status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: corsHeaders(origin)
  });
}

function normalizedText(value: unknown) {
  return typeof value === "string" ? value.trim().replace(/\r\n/g, "\n") : "";
}

function isValidUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value
  );
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidWebsite(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:";
  } catch {
    return false;
  }
}

async function readBodyWithLimit(request: Request, byteLimit = 64_000) {
  if (!request.body) return "";

  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let bytesRead = 0;
  let body = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    bytesRead += value.byteLength;
    if (bytesRead > byteLimit) {
      await reader.cancel();
      return null;
    }

    body += decoder.decode(value, { stream: true });
  }

  return body + decoder.decode();
}

function getSupabaseSecretKey() {
  const hostedKeys = Deno.env.get("SUPABASE_SECRET_KEYS");

  if (hostedKeys) {
    try {
      const keys = JSON.parse(hostedKeys) as Record<string, string>;
      if (keys.default) return keys.default;
    } catch {
      console.error("Supabase secret-key configuration is invalid.");
    }
  }

  return (
    Deno.env.get("SUPABASE_SECRET_KEY") ||
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ||
    ""
  );
}

Deno.serve(async (request) => {
  const origin = request.headers.get("Origin") || "";

  if (!origin || !allowedOrigins.has(origin)) {
    return new Response(JSON.stringify({ ok: false }), {
      status: 403,
      headers: { "Content-Type": "application/json" }
    });
  }

  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders(origin) });
  }

  if (request.method !== "POST") {
    return json(origin, 405, { ok: false });
  }

  let body: Record<string, unknown>;
  try {
    if (!request.headers.get("Content-Type")?.toLowerCase().includes("application/json")) {
      return json(origin, 415, { ok: false });
    }

    const rawBody = await readBodyWithLimit(request);
    if (rawBody === null) {
      return json(origin, 413, { ok: false });
    }

    const parsedBody = JSON.parse(rawBody);
    if (!parsedBody || typeof parsedBody !== "object" || Array.isArray(parsedBody)) {
      return json(origin, 400, { ok: false });
    }
    body = parsedBody;
  } catch {
    return json(origin, 400, { ok: false });
  }

  if (normalizedText(body.website_confirm)) {
    return json(origin, 200, { ok: true });
  }

  const formStartedAt = Date.parse(normalizedText(body.form_started_at));
  if (!Number.isFinite(formStartedAt) || Date.now() - formStartedAt < 500) {
    return json(origin, 400, { ok: false });
  }

  const requestId = normalizedText(body.request_id);
  const inquiry = {
    request_id: requestId,
    full_name: normalizedText(body.full_name),
    role_title: normalizedText(body.role_title),
    company_name: normalizedText(body.company_name),
    company_website: normalizedText(body.company_website),
    company_building: normalizedText(body.company_building),
    future_need: normalizedText(body.future_need),
    work_email: normalizedText(body.work_email).toLowerCase(),
    source: "website"
  };

  const invalidLength = Object.entries(fieldLimits).some(([field, [minimum, maximum]]) => {
    const value = inquiry[field as keyof typeof inquiry];
    return value.length < minimum || value.length > maximum;
  });

  if (
    !isValidUuid(requestId) ||
    invalidLength ||
    !isValidEmail(inquiry.work_email) ||
    !isValidWebsite(inquiry.company_website)
  ) {
    return json(origin, 400, { ok: false });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseSecretKey = getSupabaseSecretKey();

  if (!supabaseUrl || !supabaseSecretKey) {
    console.error("Supabase function secrets are not configured.");
    return json(origin, 503, { ok: false });
  }

  const admin = createClient(supabaseUrl, supabaseSecretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  const { data: submissionResult, error: submissionError } = await admin.rpc(
    "submit_partnership_inquiry",
    {
      p_request_id: inquiry.request_id,
      p_full_name: inquiry.full_name,
      p_role_title: inquiry.role_title,
      p_company_name: inquiry.company_name,
      p_company_website: inquiry.company_website,
      p_company_building: inquiry.company_building,
      p_future_need: inquiry.future_need,
      p_work_email: inquiry.work_email
    }
  );

  if (submissionError) {
    console.error("Partnership submission failed:", submissionError.message);
    return json(origin, 503, { ok: false });
  }

  if (submissionResult === "rate_limited") {
    return json(origin, 429, { ok: false });
  }

  if (submissionResult === "conflict") {
    return json(origin, 409, { ok: false });
  }

  if (submissionResult !== "inserted" && submissionResult !== "duplicate") {
    console.error("Unexpected partnership submission result.");
    return json(origin, 503, { ok: false });
  }

  return json(origin, 200, { ok: true });
});
