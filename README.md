# Heisenberg Research — Design V2

A standalone, responsive React implementation of the Heisenberg Research landing page. It uses the supplied Claude Design structure, the approved website copy, the complete brand-mark pack, both investor logos, and all eight team-affiliation logos.

## Technology

- React 19
- Vite 8
- Plain CSS with responsive breakpoints
- Space Grotesk and Space Mono from Google Fonts

No database or environment variables are required for this version.

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
5. Deploy. No environment variables are needed.

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

The website uses the compact cream, espresso, and orange versions. The remaining versions are included for future brand and social use.

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

- Desktop: full navigation, three-column research/work grids, and four-column logo grid.
- Tablet: collapsible navigation, stacked thesis content, and two-column logo grid.
- Mobile: single-column cards and logos, stacked calls to action, and compact application rows.
- The page supports screens down to `320px` without horizontal overflow.
