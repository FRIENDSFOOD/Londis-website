/**
 * ============================================================
 *  SITE SETTINGS — edit this one file to update the website.
 *  Phone, email, hours, seasonal hours, social links and review
 *  link all live here. Anything marked TODO is a placeholder.
 * ============================================================
 */

export type DayHours = { day: string; open: string; close: string } | { day: string; closed: true };

/**
 * Seasonal / holiday hours.
 *  - Use `date` for a single day, or `from` + `to` for a range (YYYY-MM-DD).
 *  - Give `open` + `close` (24h "HH:MM"), or `closed: true`.
 *  - Entries show on the site from `showFromDaysBefore` days before (default 30)
 *    and disappear automatically once the date has passed.
 */
export type SeasonalHours = {
  name: string;
  date?: string;
  from?: string;
  to?: string;
  open?: string;
  close?: string;
  closed?: boolean;
  showFromDaysBefore?: number;
};

export const site = {
  brand: "Londis",
  storeName: "Londis Supermarket",
  companyName: "FRIENDS FOOD RETAIL LIMITED",
  tradingAs: "Londis",

  address: {
    line1: "105 Bath Lane",
    city: "Leicester",
    postcode: "LE3 5AU",
    full: "Londis Supermarket, 105 Bath Lane, Leicester, LE3 5AU",
  },

  // TODO: replace with the real shop phone number and email
  phone: "0116 000 0000",
  phoneHref: "tel:+441160000000",
  email: "info@yourdomain.co.uk",

  /** Regular weekly opening hours (24h clock). */
  hours: [
    { day: "Monday", open: "07:00", close: "23:00" },
    { day: "Tuesday", open: "07:00", close: "23:00" },
    { day: "Wednesday", open: "07:00", close: "23:00" },
    { day: "Thursday", open: "07:00", close: "23:00" },
    { day: "Friday", open: "07:00", close: "23:00" },
    { day: "Saturday", open: "07:00", close: "23:00" },
    { day: "Sunday", open: "08:00", close: "23:00" },
  ] as DayHours[],

  /** TODO: check these examples and edit/add your own seasonal hours. */
  seasonalHours: [
    { name: "Christmas Eve", date: "2026-12-24", open: "07:00", close: "20:00" },
    { name: "Christmas Day", date: "2026-12-25", closed: true },
    { name: "Boxing Day", date: "2026-12-26", open: "09:00", close: "21:00" },
    { name: "New Year's Eve", date: "2026-12-31", open: "07:00", close: "23:00" },
    { name: "New Year's Day", date: "2027-01-01", open: "09:00", close: "21:00" },
  ] as SeasonalHours[],

  // TODO: paste your real links (leave "" to hide an icon)
  social: {
    facebook: "#",
    instagram: "#",
    tiktok: "",
  },
  googleReviewUrl: "#", // TODO: your Google "write a review" link

  /**
   * Forms: paste a Formspree (https://formspree.io) or similar endpoint URL
   * here to receive contact & job applications by email. While empty, the
   * forms validate and show a success message but do not send anywhere.
   */
  formEndpoint: "",
};

const q = encodeURIComponent("105 Bath Lane, Leicester LE3 5AU");
export const mapEmbedUrl = `https://maps.google.com/maps?q=${q}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${q}`;
