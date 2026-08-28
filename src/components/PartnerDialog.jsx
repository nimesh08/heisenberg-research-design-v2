import { useEffect, useRef, useState } from "react";
import {
  isSupabaseConfigured,
  supabase
} from "../lib/supabaseClient.js";

function fieldValue(formData, name) {
  return String(formData.get(name) || "").trim();
}

function getFieldError(field, value) {
  const normalizedValue = value.trim();

  if (!normalizedValue) return field.error;
  if (field.minLength && normalizedValue.length < field.minLength) {
    return field.error;
  }

  if (field.type === "email") {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedValue)
      ? ""
      : field.error;
  }

  if (field.type === "url") {
    try {
      const url = new URL(normalizedValue);
      return url.protocol === "https:" ? "" : field.error;
    } catch {
      return field.error;
    }
  }

  return "";
}

export function PartnerDialog({ brand, content, open, onClose }) {
  const dialogRef = useRef(null);
  const headingRef = useRef(null);
  const firstInputRef = useRef(null);
  const errorSummaryRef = useRef(null);
  const previousFocusRef = useRef(null);
  const formStartedAtRef = useRef(Date.now());
  const requestIdRef = useRef(null);
  const lastFingerprintRef = useRef("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submissionState, setSubmissionState] = useState("idle");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      previousFocusRef.current = document.activeElement;
      formStartedAtRef.current = Date.now();
      setFieldErrors({});
      setHasSubmitted(false);
      setSubmissionState("idle");
      dialog.showModal();
      document.body.classList.add("partner-dialog-open");

      window.requestAnimationFrame(() => firstInputRef.current?.focus());
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(
    () => () => {
      document.body.classList.remove("partner-dialog-open");
    },
    []
  );

  const closeDialog = () => dialogRef.current?.close();

  const handleClose = () => {
    document.body.classList.remove("partner-dialog-open");
    onClose?.();
    previousFocusRef.current?.focus?.();
  };

  const handleCancel = (event) => {
    event.preventDefault();
    closeDialog();
  };

  const handleBackdropClick = (event) => {
    if (event.target === dialogRef.current) closeDialog();
  };

  const validateField = (field, value) => {
    const error = getFieldError(field, value);
    setFieldErrors((current) => ({ ...current, [field.name]: error }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submissionState === "submitting") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const nextErrors = Object.fromEntries(
      content.fields.map((field) => [
        field.name,
        getFieldError(field, fieldValue(formData, field.name))
      ])
    );

    setHasSubmitted(true);
    setFieldErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      setSubmissionState("idle");
      window.requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }

    if (!isSupabaseConfigured || !supabase) {
      setSubmissionState("configuration-error");
      window.requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }

    const submissionData = {
      full_name: fieldValue(formData, "full_name"),
      role_title: fieldValue(formData, "role_title"),
      company_name: fieldValue(formData, "company_name"),
      company_website: fieldValue(formData, "company_website"),
      company_building: fieldValue(formData, "company_building"),
      future_need: fieldValue(formData, "future_need"),
      work_email: fieldValue(formData, "work_email")
    };
    const fingerprint = JSON.stringify(submissionData);

    if (lastFingerprintRef.current !== fingerprint) {
      requestIdRef.current = crypto.randomUUID();
      lastFingerprintRef.current = fingerprint;
    }

    setSubmissionState("submitting");

    try {
      const { error } = await supabase.functions.invoke("submit-partnership", {
        body: {
          request_id: requestIdRef.current,
          ...submissionData,
          website_confirm: fieldValue(formData, "website_confirm"),
          form_started_at: new Date(formStartedAtRef.current).toISOString()
        },
        timeout: 20_000
      });

      if (error) throw error;

      form.reset();
      setFieldErrors({});
      setSubmissionState("success");
      requestIdRef.current = null;
      lastFingerprintRef.current = "";
      window.requestAnimationFrame(() => headingRef.current?.focus());
    } catch {
      setSubmissionState("error");
      window.requestAnimationFrame(() => errorSummaryRef.current?.focus());
    }
  };

  const errorFields = Object.entries(fieldErrors).filter(([, error]) => error);
  const submissionMessage =
    submissionState === "configuration-error"
      ? content.configurationError
      : submissionState === "error"
        ? content.errorMessage
        : "";

  return (
    <dialog
      className="partner-dialog"
      id="partnership-form"
      ref={dialogRef}
      aria-labelledby="partner-dialog-title"
      aria-describedby="partner-dialog-intro"
      onCancel={handleCancel}
      onClose={handleClose}
      onClick={handleBackdropClick}
    >
      <div className="partner-dialog__surface">
        <div className="partner-dialog__topbar">
          <span className="partner-dialog__brand">
            <img src={brand.marks.header || brand.marks.espresso} alt="" />
            <span>{brand.name}</span>
          </span>
          <button
            className="partner-dialog__close"
            type="button"
            aria-label="Close partnership form"
            onClick={closeDialog}
          >
            <span className="partner-dialog__close-icon" aria-hidden="true">
              ×
            </span>
          </button>
        </div>

        <div className="partner-dialog__shell">
          <header className="partner-dialog__header">
            {content.eyebrow ? <p className="eyebrow">{content.eyebrow}</p> : null}
            <h1 id="partner-dialog-title" ref={headingRef} tabIndex="-1">
              {content.title}
            </h1>
            <p id="partner-dialog-intro">{content.intro}</p>
          </header>

          {submissionState === "success" ? (
            <div className="partner-form__success" role="status" aria-live="polite">
              <h2>{content.successTitle}</h2>
              <p>{content.successBody}</p>
              <button className="button button--primary" type="button" onClick={closeDialog}>
                Close
              </button>
            </div>
          ) : (
            <form
              className="partner-form"
              noValidate
              aria-busy={submissionState === "submitting"}
              onSubmit={handleSubmit}
            >
              {(hasSubmitted && errorFields.length > 0) || submissionMessage ? (
                <div
                  className="partner-form__error-summary"
                  ref={errorSummaryRef}
                  role="alert"
                  tabIndex="-1"
                >
                  <strong>
                    {submissionMessage || "Please check the highlighted fields."}
                  </strong>
                  {errorFields.length > 0 ? (
                    <ul>
                      {errorFields.map(([name, error]) => (
                        <li key={name}>
                          <a
                            href={`#partner-${name}`}
                            onClick={(clickEvent) => {
                              clickEvent.preventDefault();
                              document.getElementById(`partner-${name}`)?.focus();
                            }}
                          >
                            {error}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ) : null}

              <div className="partner-form__fields">
                {content.fields.map((field, index) => {
                  const id = `partner-${field.name}`;
                  const error = fieldErrors[field.name];
                  const sharedProps = {
                    id,
                    name: field.name,
                    placeholder: field.placeholder,
                    required: true,
                    minLength: field.minLength,
                    maxLength: field.maxLength,
                    autoComplete: field.autoComplete,
                    "aria-invalid": Boolean(error),
                    "aria-describedby": error ? `${id}-error` : undefined,
                    onBlur: (blurEvent) => validateField(field, blurEvent.target.value)
                  };

                  return (
                    <div
                      className={`partner-form__field${
                        field.type === "textarea" ? " partner-form__field--wide" : ""
                      }`}
                      key={field.name}
                    >
                      <label htmlFor={id}>
                        {field.label}
                        <span className="partner-form__required" aria-hidden="true">
                          *
                        </span>
                        <span className="sr-only"> (required)</span>
                      </label>
                      {field.type === "textarea" ? (
                        <textarea {...sharedProps} rows="4" />
                      ) : (
                        <input
                          {...sharedProps}
                          ref={index === 0 ? firstInputRef : undefined}
                          type={field.type}
                          inputMode={
                            field.type === "url"
                              ? "url"
                              : field.type === "email"
                                ? "email"
                                : undefined
                          }
                        />
                      )}
                      {error ? (
                        <span className="partner-form__field-error" id={`${id}-error`}>
                          {error}
                        </span>
                      ) : null}
                    </div>
                  );
                })}
              </div>

              <div className="partner-form__honeypot" aria-hidden="true">
                <label htmlFor="partner-website-confirm">Leave this field empty</label>
                <input
                  id="partner-website-confirm"
                  name="website_confirm"
                  type="text"
                  tabIndex="-1"
                  autoComplete="off"
                />
              </div>

              <p className="partner-form__disclosure">{content.disclosure}</p>
              <button
                className="button button--primary partner-form__submit"
                type="submit"
                disabled={submissionState === "submitting"}
              >
                {submissionState === "submitting"
                  ? content.submittingLabel
                  : content.submitLabel}
                <span aria-hidden="true">→</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </dialog>
  );
}
