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

## Clean demo links (websitedemos.space)

- Dashboard: `websitedemos.space/?dashboard` (password-protected).
- Save a clinic there and it opens at `websitedemos.space/<clinic-name-city>`, for example `websitedemos.space/laser-eye-centre-multan`.
- Clinic details are stored as `c/<slug>.json` on the `clients` branch. The site reads them from raw.githubusercontent.com, so a new link works within seconds, with no redeploy.
- The same name used again gets `-2`, `-3`, … so old links never change. An identical clinic gets its existing link back.
- Old long links (`?n=…&b=…`) still work, and the dashboard turns them into short ones.
