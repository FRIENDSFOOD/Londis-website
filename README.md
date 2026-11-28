# Londis Supermarket – Bath Lane, Leicester

Website for **FRIENDS FOOD RETAIL LIMITED** trading as **Londis**, 105 Bath Lane, Leicester, LE3 5AU.

Built with **Vite + React + TypeScript + Tailwind CSS** (the same stack Lovable uses), so it runs in VS Code
and can be imported into Lovable via GitHub at any time.

## Run it in VS Code

1. Install [Node.js](https://nodejs.org) (version 18 or newer).
2. Open this folder in VS Code, then open the terminal (`Ctrl + '`).
3. Run:

```bash
npm install
npm run dev
```

4. Open http://localhost:8080

## Edit your details (phone, hours, links)

Everything lives in **one file**: `src/config/site.ts`
Look for the `TODO` comments — phone number, email, social links, Google review link.

Opening hours are set to **Mon–Sat 07:00 – 23:00, Sunday 08:00 – 23:00**.

### Seasonal / holiday hours

Add entries to `seasonalHours` in `src/config/site.ts`:

```ts
{ name: "Christmas Day", date: "2026-12-25", closed: true },
{ name: "Boxing Day", date: "2026-12-26", open: "09:00", close: "21:00" },
{ name: "Summer hours", from: "2027-07-20", to: "2027-08-31", open: "07:00", close: "22:00" },
```

- They appear in the Opening Hours box 30 days ahead (change with `showFromDaysBefore`).
- A banner shows at the top of every page 14 days before.
- On the day itself they replace the normal hours and the "Open now" badge uses them.
- Past dates disappear automatically. The Christmas/New Year entries are examples — check them.

## Pictures

Store photos are in `public/images/` (upscaled 4x to 2000px, yellow price labels blurred).
A disclaimer under the gallery says prices/promotions shown may differ from those in store.

- Hero banner: `storefront.jpg` (`src/components/home/Hero.tsx`)
- Featured cards: `chilled.jpg`, `beer.jpg`, `aisle-fresh.jpg` (`Featured.tsx`)
- Gallery: list of photos at the top of `src/components/home/Gallery.tsx` — add or remove lines there.

## Admin area (Cloudflare) — edit hours & services without code

The site is hosted on **Cloudflare Workers** (static assets + a small Worker for the API), Worker name `londis-website`. A private page at **/admin** lets staff change weekly hours,
seasonal/holiday hours and services; changes appear on the site within a minute.

How it works:

- **Login:** Cloudflare Access protects `/admin` and `/api/admin/*` — staff sign in with a one-time code
  sent to their email. No passwords are stored in this project.
- **Saving:** `worker/api/admin/settings.ts` re-checks the Cloudflare Access login and the admin email
  list on every save, validates the data strictly (`src/lib/validateSettings.ts`), and stores it in the
  `londis-settings` KV storage with who saved it and when.
- **Reading:** the public site reads `worker/api/settings.ts`; if that is unavailable it uses the defaults
  in `src/config/site.ts`.

One-time setup:

1. **Cloudflare dashboard → Workers & Pages → Create → Import a repository** → `FRIENDSFOOD/Londis-website`.
   Build command `npm run build`; deploy command `npx wrangler deploy` (the default). `wrangler.toml`
   sets everything else (name `londis-website`, the `dist` assets, the `londis-settings` storage).
2. **Custom domain:** in the Worker → *Settings → Domains & Routes → Add → Custom domain* →
   `friendsfood.co.uk`.
3. **Zero Trust → Access → Applications → Add → Self-hosted**: domain `friendsfood.co.uk`,
   paths `/admin` and `/api/admin`; policy *Allow* → *Emails* → the admin email(s); login method
   *One-time PIN*. Copy the **Application Audience (AUD) Tag**.
4. Put the AUD tag, your team domain (Zero Trust → Settings, e.g. `friendsfood.cloudflareaccess.com`) and the
   admin email(s) into the `[vars]` section of `wrangler.toml`, commit, and Cloudflare redeploys.

Until steps 3–4 are done, saving is blocked (the site still works with the default hours).

Local testing with the Worker: `npm run dev:cf` (http://localhost:8787).

## Service logos

Put the official PayPoint, Payzone and National Lottery logo files in `public/logos/`
as `paypoint.png`, `payzone.png` and `national-lottery.png`. If a file is missing, the service name shows as text instead.

## Make the forms send emails

The Contact and Careers forms validate and show a success message, but don't send anywhere until you
connect them. The easiest free option:

1. Sign up at https://formspree.io and create a form.
2. Copy its endpoint URL (looks like `https://formspree.io/f/abcd1234`).
3. Paste it into `formEndpoint` in `src/config/site.ts`.

## Project structure

```
src/
  config/site.ts        ← business details, hours, services, delivery links (edit this first)
  content/              ← products, gallery photos, menu items
  components/           ← header, footer, quick-info, mobile action bar, shared bits
  components/home/      ← home page sections (order is set in pages/Home.tsx)
  pages/                ← Home, Careers, Contact, Privacy, Admin, 404
  lib/                  ← opening-hours logic (+ tests), live settings, forms
public/images/          ← store photos (2000px JPG + 800/1600px WebP)
public/logos/           ← PayPoint, Payzone, Lottery logos
worker/                 ← Cloudflare Worker: public settings + protected admin save
wrangler.toml           ← Cloudflare config (storage binding, admin login settings)
```

## Useful commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Run the site locally at http://localhost:8080 |
| `npm test` | Run the automatic tests (opening hours, admin login checks, data validation) |
| `npm run dev:cf` | Run the site with the Cloudflare Worker locally |
| `npm run build` | Build the site for publishing (into `dist/`) |
| `npm run format` | Tidy up code formatting |

Every push to GitHub runs the tests and a build automatically (see the **Actions** tab).

## Publish online

```bash
npm run build      # creates the dist/ folder
```

- **Cloudflare Workers** (current host): see "Admin area (Cloudflare)" above. Every push to `main` redeploys.
- Security headers and caching are set in `public/_headers`.
