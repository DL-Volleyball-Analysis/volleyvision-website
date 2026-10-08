# VolleyVision website

The public page of the volleyball analysis project:
https://dl-volleyball-analysis.github.io/volleyvision-website/

Next.js static export, deployed to GitHub Pages from `main` by `.github/workflows/deploy.yml`.

## Rules
- **Every number has a source.** Claims live in `lib/site/content.ts` with their source link and kind
  (measured on labels, proxy, or published benchmark); a claim without a source does not type-check.
- **Features say what exists.** Pipeline stages are marked works today / in progress / planned.
- **The hero is a drawing.** `components/site/MatchIllustration.tsx` draws the review app with synthetic
  data, and its caption says so.
- Tokens live in `app/site.css` only; system fonts; mono only for machine-origin strings
  (file names, timecodes, paths).

## Layout
```
app/            layout (theme script, metadata), page, site.css (all tokens and styles)
components/site Header, sections, the interactive illustration and its synthetic data
lib/site        content.ts: all copy (English + Traditional Chinese) and claims
```

## Run
```
npm install
npm run dev        # http://localhost:3000
npm run build      # static export into out/
```
