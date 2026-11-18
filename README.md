# Yamin Hasan — Premium Website

A multi-page static website for **Yamin Hasan**, positioned as a Google Maps & Business Visibility Specialist for pressure washing / pressure cleaning, gutter cleaning and window cleaning businesses in the United Kingdom and Australia.

Production origin: https://yaminhasan.pages.dev

## Pages and public URLs

| File | Public URL |
|---|---|
| `index.html` | `https://yaminhasan.pages.dev/` |
| `services.html` | `https://yaminhasan.pages.dev/services` |
| `pressure-washing.html` | `https://yaminhasan.pages.dev/pressure-washing` |
| `gutter-cleaning.html` | `https://yaminhasan.pages.dev/gutter-cleaning` |
| `window-cleaning.html` | `https://yaminhasan.pages.dev/window-cleaning` |
| `cv.html` | `https://yaminhasan.pages.dev/cv` |
| `contact.html` | `https://yaminhasan.pages.dev/contact` |
| `privacy.html` | `https://yaminhasan.pages.dev/privacy` |
| `404.html` | Cloudflare Pages not-found page |

All page HTML files are at the project root. Cloudflare Pages serves root-level `.html` files through extensionless URLs; no SPA fallback or custom rewrite is required.

## Deploy to Cloudflare Pages

1. Create or open the Cloudflare Pages project for `yaminhasan.pages.dev`.
2. Upload this project directory (or connect its Git repository).
3. Set the build command to none / leave it blank.
4. Set the build output directory to `/` or the repository root, depending on the deployment method.
5. Deploy. Confirm the custom `404.html` is recognised by Pages.
6. Test every public URL in the table above.

Do not place the HTML files inside nested route directories.

## Contact form configuration

The form posts JSON to `POST /api/contact`, implemented in `functions/api/contact.js`. It uses Resend.

Configure these Cloudflare Pages environment variables (Production, and Preview if desired):
- `RESEND_API_KEY` — secret Resend API key.
- `CONTACT_TO_EMAIL` — verified recipient mailbox.
- `CONTACT_FROM_EMAIL` — sender address verified with Resend.

Then redeploy. Never put the API key in browser code. If these variables are missing, the endpoint returns HTTP 503 and the browser displays a real configuration error; it does not fake a successful send.

The function validates the request method by exporting only `onRequestPost`, validates required fields and allowed options, checks the request origin, uses a honeypot field, and returns controlled errors. For production at scale, add Cloudflare rate limiting / Turnstile and review logging and retention practices.

## Technical notes

- CSS design tokens live in `assets/css/styles.css`.
- Shared JavaScript is in `assets/js/`.
- Original SVG artwork is stored locally in `assets/images/`.
- Homepage JSON-LD uses one unified `@graph` containing WebSite, Person, three Service nodes, WebPage and a visible-content-matched FAQPage.
- Other relevant pages use BreadcrumbList.
- Canonical URLs, sitemap and robots.txt use the confirmed production domain.
- No LocalBusiness address, telephone number, fabricated testimonial, employment history or credential is asserted.
- Customer-facing copy avoids technical marketing jargon.

## Before launch

Complete `CONTENT-REQUIRED.md`, especially the legal/privacy identity and contact details. The privacy page is a review-ready template and needs jurisdiction-specific legal review. Review `ASSET-CREDITS.md` for included artwork and external runtime dependencies.

## Local preview

From this directory, run a static server such as `python -m http.server 8000` and open `http://localhost:8000`. The Cloudflare Pages Function will not run in a plain static server; use `wrangler pages dev` with the required environment variables to test the form end-to-end.
