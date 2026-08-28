# Heisenberg Research — Design V2

A standalone, responsive React implementation of the Heisenberg Research landing page. It uses the supplied Claude Design structure, the approved website copy, the complete brand-mark pack, both investor logos, and all eight team-affiliation logos.

## Technology

- React 19
- Vite 8
- Plain CSS with responsive breakpoints
- Space Grotesk and Space Mono from Google Fonts
- Supabase Edge Functions and Postgres for partnership inquiries

The public website works without Supabase, but the partnership form requires the
Supabase setup below before it can accept submissions.

## Requirements

- Node.js `20.19+` or `22.12+`
- npm

## Clone and run locally

```bash
git clone https://github.com/nimesh08/heisenberg-research-design-v2.git
cd heisenberg-research-design-v2
npm install
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173/`.

To test the partnership form locally, copy `.env.example` to `.env.local` and
replace the placeholders with the project's public browser credentials:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
```

Restart the Vite development server after changing environment variables.

## Production build

```bash
npm run build
npm run preview
```

The deployable output is generated in `dist/`.

## Deploy on Vercel

1. Import `nimesh08/heisenberg-research-design-v2` in Vercel.
2. Leave the framework preset as **Vite**.
3. Use `npm run build` as the build command.
4. Use `dist` as the output directory.
5. Add these Vercel environment variables for every environment that should
   accept form submissions:

   ```text
   VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
   ```

6. Deploy, or redeploy after adding the variables.

Do not add a Supabase secret key or service-role key to Vercel. Variables whose
names start with `VITE_` are included in browser code and must contain only
public values.

## Configure the partnership form in Supabase

Install or invoke the Supabase CLI, sign in, and link this repository to the
intended Supabase project:

```bash
npx supabase login
npx supabase link --project-ref YOUR_PROJECT_REF
```

Apply the database migration and deploy the public form endpoint:

```bash
npx supabase db push
npx supabase functions deploy submit-partnership --no-verify-jwt
```

The function accepts unauthenticated website submissions, then performs its own
origin, field, anti-bot, duplicate, and rate-limit checks before writing through
server-side credentials.

The default allowed origins are:

- `https://heisenberg-research-design-v2.vercel.app`
- `http://localhost:5173`
- `http://localhost:4177`
- `http://127.0.0.1:4177`

To use another production, preview, or custom domain, set the complete
comma-separated allowlist as a Supabase function secret. Setting this value
replaces the default list, so include every origin that should work:

```bash
npx supabase secrets set PARTNERSHIP_ALLOWED_ORIGINS="https://YOUR_DOMAIN,http://localhost:5173,http://localhost:4177,http://127.0.0.1:4177"
```

Use origins only, without paths or trailing slashes.

### Stored data

Successful submissions are stored in
`public.partnership_inquiries`. The table contains the submitted name, role,
company, company website, company description, future need, work email,
creation time, source, and review status. View the records in the Supabase Table
Editor.

Row Level Security is enabled. Browser clients cannot read or write this table
directly; only the deployed Edge Function can insert through its server-side
Supabase credentials.

This implementation stores inquiries only. It does not send an email or notify
the team. Email delivery can be added later as a separate server-side workflow.

Never commit, publish, or expose `SUPABASE_SECRET_KEY` or
`SUPABASE_SERVICE_ROLE_KEY`, and never give either key a `VITE_` prefix. Supabase
provides the hosted function with its server credentials; the browser and
Vercel need only the public URL and publishable key shown above.

## Change text, links, or images

All page copy, navigation, links, and image paths are centralized in:

```text
src/content.js
```

Put new public images inside `public/assets/`, then update the matching path in `src/content.js`. Public paths begin with `/assets/`; for example:

```js
logo: "/assets/team/team-google.png"
```

The page components are in `src/App.jsx`, and all responsive styling is in `src/styles.css`.

## Asset inventory

### Complete Heisenberg brand pack

Located in `public/assets/brand/`:

- `logo-square.png` — square social/favicon artwork
- `mark-cream.png` — compact cream transparent mark
- `mark-dark.png` — padded dark transparent mark
- `mark-espresso.png` — compact espresso transparent mark
- `mark-orange.png` — compact orange transparent mark
- `mark-white.png` — padded white transparent mark
- `mark-illustrated-espresso.png` — illustrated header mark from the V2 handoff
- `mark-illustrated-orange.png` — illustrated hero/footer mark from the V2 handoff
- `work-mark.png` — compact Work with us mark from the V2 handoff

The website uses both the compact core marks and the illustrated V2 marks. The remaining versions are included for future brand and social use.

### Research marks

Located in `public/assets/research/`:

- Architecture
- Interconnect
- Quilt Compiler

### Investors

Located in `public/assets/backers/`:

- Entrepreneur First
- Transpose Platform

### Team affiliations

Located in `public/assets/team/`:

- University of Cambridge
- PsiQuantum
- Indian Institute of Technology Madras
- Max Planck Society
- Lawrence Berkeley National Laboratory
- National Institute of Technology Warangal
- Columbia University
- Google

All listed investor and team logos are rendered by the current page.

## Responsive behavior

- Desktop: full navigation, three-column research/work grids, and a continuously scrolling team-logo strip.
- Tablet: collapsible navigation, stacked thesis content, and responsive research/work grids.
- Mobile: single-column cards, stacked calls to action, compact application rows, and a clipped logo marquee.
- The page supports screens down to `320px` without horizontal overflow.
