# Chin Hock Renewal Manager — Deploy as an App

Your dashboard is now a **PWA** (installable web app). This folder is the whole
app — deploy the folder, then "install" it on any device.

```
chinhock-renewal-app/
├── index.html            ← the dashboard (with PWA + live-sync added)
├── manifest.json         ← app name / icons / colours
├── service-worker.js     ← offline + installability
└── icons/                ← app icons (navy "CH")
```

---

## Step 1 — Put it online (free, ~3 min)

Easiest, no coding — **Netlify Drop**:

1. Go to **https://app.netlify.com/drop**
2. Sign in (free — Google login works).
3. **Drag the whole `chinhock-renewal-app` folder** onto the page.
4. It gives you a URL like `https://chin-hock-renewals.netlify.app` — that's your app.
   (You can rename it in Site settings → Change site name.)

*Alternatives that also work: Cloudflare Pages, GitHub Pages, tiiny.host — any static
host with HTTPS. HTTPS is required for "install" to appear.*

## Step 2 — Install it on your devices

- **Windows PC (Chrome/Edge):** open the URL → click the **⬇ install icon** in the
  address bar (or the **"⬇ Install App"** button bottom-left) → it opens in its own
  window like a program, with a Start-menu shortcut.
- **Android phone (Chrome):** open the URL → menu **⋮** → **Add to Home screen**.
- **iPhone (Safari):** open the URL → **Share** → **Add to Home Screen**.

Do this once per device. After that it launches from an icon and works offline.

## Step 3 — Turn on shared data (so every device shows the same records)

Until this step, each device keeps its own data. To share one dataset and show the
**auto-updated due dates** from the policy scanner:

1. Deploy the Apps Script from `NonMotor-PolicyScanner.gs` (see
   `NonMotor-Scanner-SETUP.md`) and copy its `/exec` URL.
2. Open the app → **⚙ Sheet Sync** → paste the URL → **Save**.
3. The app will now pull due dates from your Google Sheet on every load.

---

## Updating the app later

Change `index.html` (or icons), then in `service-worker.js` bump `ch-renewals-v1`
to `-v2`, and re-drag the folder to Netlify. Bumping the version forces installed
copies to pick up the new files.

## Notes / current limits

- **Due dates** sync from the Sheet (Step 3). **Workflow state** (status, notes,
  follow-ups) is still stored per-device for now — making that shared across devices
  is the next enhancement (needs a few extra columns in the Sheet). Tell me when you
  want that and I'll wire it.
- Fonts load from Google Fonts online; offline it falls back to system fonts — layout
  is unaffected.
