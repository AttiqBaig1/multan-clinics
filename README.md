<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/e72c8582-a8e6-4767-88fd-e38844258eba

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Five designs per clinic

Every saved clinic opens in five designs, all filled from the same saved details (name, doctor, qualification, phone, address, timings, fee). Change the details in the dashboard and all five update.

- `websitedemos.space/<clinic>`: Design 1, Classic Pro (original page, unchanged)
- `websitedemos.space/<clinic>?v=2`: Design 2, Terra
- `?v=3`: Design 3, Ink
- `?v=4`: Design 4, Bloom
- `?v=5`: Design 5, Grid
- `?v=options`: page that shows all five side by side. Send this link to the clinic so they can choose.

Designs 2 to 5 live in `src/components/designs/`. Each gets its accent colour from the clinic's speciality.

## Clean demo links (websitedemos.space)

- Dashboard: `websitedemos.space/?dashboard` (password-protected).
- Save a clinic there and it opens at `websitedemos.space/<clinic-name-city>`, for example `websitedemos.space/laser-eye-centre-multan`.
- Each clinic is saved in three free services that need no account: textdb.online (`wds_<slug>`), v.gd (`w_<slug>`) and is.gd (`w_<slug>`). The site asks all three at once and uses the first one that answers, so one service being blocked or down does not break a link.
- The same name used again gets `-2`, `-3`, … so old links never change. An identical clinic gets its existing link back.
- Old long links (`?n=…&b=…`) still work, and the dashboard turns them into short ones.
