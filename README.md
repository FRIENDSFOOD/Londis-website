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

## Make the forms send emails

The Contact and Careers forms validate and show a success message, but don't send anywhere until you
connect them. The easiest free option:

1. Sign up at https://formspree.io and create a form.
2. Copy its endpoint URL (looks like `https://formspree.io/f/abcd1234`).
3. Paste it into `formEndpoint` in `src/config/site.ts`.

## Project structure

```
src/
  config/site.ts        ← all business details
  components/           ← header, footer, top bar, shared bits
  components/home/      ← home page sections (hero, products, services…)
  pages/                ← Home, Careers, Contact, Privacy, 404
public/images/          ← pictures
```

## Publish online

```bash
npm run build      # creates the dist/ folder
```

- **Netlify / Vercel:** connect the GitHub repo (or drag-and-drop `dist/`). Build command `npm run build`,
  output folder `dist`. Redirect files for page refreshes are already included.
- **Lovable:** push this folder to a GitHub repo, then connect it in Lovable's GitHub settings.
