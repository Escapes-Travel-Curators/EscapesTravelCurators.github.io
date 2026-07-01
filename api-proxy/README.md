# Vercel Edge Function — AI Curator Proxy

This folder is deployed independently to Vercel (free tier).
It acts as a secure proxy between the GitHub Pages React app and the Gemini API.

## Deploy Steps

1. Install Vercel CLI (if not already):
   ```
   npm install -g vercel
   ```

2. Deploy from this folder:
   ```
   cd api-proxy
   vercel --prod
   ```

3. In the Vercel Dashboard → Project → Settings → Environment Variables, add:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** your Google AI Studio API key
   - **Environment:** Production (and Preview if you want)

4. Copy your Vercel deployment URL (e.g. `https://etc-curator.vercel.app`)

5. In `app/.env.local` (for local dev):
   ```
   VITE_CURATOR_API_URL=https://etc-curator.vercel.app/api/curate
   ```

6. In `app/.env.production` (committed, safe — it's just a URL):
   ```
   VITE_CURATOR_API_URL=https://etc-curator.vercel.app/api/curate
   ```

## Security Notes
- The `GEMINI_API_KEY` env var is set in Vercel's dashboard only — never in code or committed files.
- The edge function validates the `Origin` header and rejects requests from unknown origins.
- Input is length-limited to 1200 characters to prevent abuse.
