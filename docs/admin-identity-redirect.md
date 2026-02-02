# Netlify Identity → Admin Redirect

## What it does

When Netlify Identity sends users to the **site root** with a token in the URL hash (e.g. from password reset, invite, or confirmation emails), they are automatically sent to `/admin/` with the same hash so Decap CMS can handle the flow. Hash fragments cannot be redirected by Netlify, so this is done in the app.

## Where it’s implemented

- **Redirect handler:** `public/identity-redirect.js`  
  - Loaded from the **root** `index.html` in `<head>` (before the main app script).  
  - Runs only when the path is `/` and the hash contains an Identity token.  
  - Uses `window.location.replace("/admin/" + window.location.hash)` so the token is preserved and no extra history entry is added.

- **Netlify config:** `netlify.toml`  
  - `/admin` → `/admin/` (301).  
  - `/admin/*` → `/admin/index.html` (200).  
  - These redirects are defined **above** the SPA catch-all `/*` → `/index.html`.

## Token parameters handled

- `recovery_token` – password reset  
- `invite_token` – invite acceptance  
- `confirmation_token` – signup/email confirmation  
- `email_change_token` – email change confirmation  
- `token`, `access_token` – OAuth-style flows  

## How to test

Use your real site URL (e.g. `https://litchfieldperk.com`) or a deploy preview.

1. **Recovery (password reset)**  
   - Open: `https://domain.com/#recovery_token=test123`  
   - Expected: Redirects to `https://domain.com/admin/#recovery_token=test123`.

2. **Invite**  
   - Open: `https://domain.com/#invite_token=test123`  
   - Expected: Redirects to `https://domain.com/admin/#invite_token=test123`.

3. **Confirmation**  
   - Open: `https://domain.com/#confirmation_token=test123`  
   - Expected: Redirects to `https://domain.com/admin/#confirmation_token=test123`.

4. **Email change**  
   - Open: `https://domain.com/#email_change_token=test123`  
   - Expected: Redirects to `https://domain.com/admin/#email_change_token=test123`.

5. **No redirect for normal visits**  
   - Open: `https://domain.com/` or `https://domain.com/#some-other-hash`  
   - Expected: No redirect; site loads as usual.

6. **No redirect when already on admin**  
   - Open: `https://domain.com/admin/#recovery_token=test123`  
   - Expected: No redirect; handler only runs when pathname is `/`.

## CSP

The redirect runs from an external script (`/identity-redirect.js`) served from the same origin. Current CSP `script-src 'self' ...` allows it; no change required. No inline script is used for this redirect.
