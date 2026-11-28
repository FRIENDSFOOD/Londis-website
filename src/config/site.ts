/**
 * ============================================================
 *  SITE SETTINGS — edit this one file to update the website.
 *  Phone, email, hours, seasonal hours, social links and review
 *  link all live here. Anything marked TODO is a placeholder.
 * ============================================================
 */

export type DayHours = { day: string; open: string; close: string; closed?: boolean };

/** An in-store service. `logo` is a file in /public/logos (optional). */
export type Service = {
  id: string;
  name: string;
  description: string;
  logo?: string;
  /** Icon shown when there is no logo (see src/components/ServiceLogo.tsx). */
  icon?: string;
  enabled: boolean;
};

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
  slogan: "Big on choice. Close to home.",
  /** Year the shop opened — the footer shows © 2018–<current year>. */
  established: 2018,

  address: {
    line1: "105 Bath Lane",
    city: "Leicester",
    postcode: "LE3 5AU",
    full: "Londis Supermarket, 105 Bath Lane, Leicester, LE3 5AU",
  },

  companyNumber: "11076994",

  phone: "0116 319 4464",
  phoneHref: "tel:+441163194464",
  whatsapp: "07399 799977",
  whatsappHref: "https://wa.me/447399799977",
  // TODO: add the shop email (leave "" to hide it everywhere)
  email: "",

  /**
   * DEFAULT hours & services. Once the site is on Cloudflare, the live values are
   * edited at /admin and these are only used as a fallback.
   */
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

  /** In-store services (default list — edit live at /admin). */
  services: [
    {
      id: "paypoint",
      name: "PayPoint",
      description: "Pay household bills, top up gas & electric keys and cards, and mobile top-ups.",
      logo: "paypoint.png",
      enabled: true,
    },
    {
      id: "payzone",
      name: "Payzone",
      description: "Bill payments, energy top-ups, mobile top-ups and more.",
      logo: "payzone.png",
      enabled: true,
    },
    {
      id: "lottery",
      name: "The National Lottery",
      description: "Lotto, EuroMillions, Set For Life, Thunderball and scratchcards.",
      logo: "national-lottery.png",
      enabled: true,
    },
    {
      id: "parcels",
      name: "Parcel Services",
      description: "Drop off and collect your parcels while you shop.",
      logo: "parcels.png",
      icon: "package",
      enabled: true,
    },
    {
      id: "cashback",
      name: "Cashback",
      description: "Get cash back when you pay by debit card — just ask at the till.",
      logo: "cashback.png",
      icon: "banknote",
      enabled: true,
    },
  ] as Service[],

  // TODO: paste your real links (icons are hidden while empty)
  social: {
    facebook: "",
    instagram: "",
    tiktok: "",
  },
  // Google Business listing (place ID from Google Maps)
  googlePlaceId: "ChIJCxuyLGxhd0gRttke8x1PvNk",
  googleMapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJCxuyLGxhd0gRttke8x1PvNk",
  googleReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJCxuyLGxhd0gRttke8x1PvNk",
  /** Set e.g. { value: 4.6, count: 45 } to show a star-rating badge; null hides it. */
  googleRating: null as null | { value: number; count: number },

  /**
   * Delivery partners. TODO: paste the link to YOUR store page on each app
   * (open your shop in the app/website and copy the address).
   * While `url` is empty, the button goes to `fallback` (the app's homepage),
   * or, if there is no fallback, shows "Search Londis Bath Lane in the app".
   */
  delivery: [
    { name: "Deliveroo", url: "", fallback: "https://deliveroo.co.uk/", color: "#00CCBC" },
    { name: "Just Eat", url: "", fallback: "https://www.just-eat.co.uk/", color: "#FF8000" },
    { name: "Uber Eats", url: "", fallback: "https://www.ubereats.com/gb", color: "#06C167" },
    { name: "TheShopz", url: "", fallback: "", color: "#6B4EFF" },
  ],

  /**
   * Forms: paste a Formspree (https://formspree.io) or similar endpoint URL
   * here to receive contact & job applications by email. While empty, the
   * forms validate and show a success message but do not send anywhere.
   */
  formEndpoint: "",
};

const q = encodeURIComponent("105 Bath Lane, Leicester LE3 5AU");
export const mapEmbedUrl = `https://maps.google.com/maps?q=${q}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${q}&destination_place_id=${site.googlePlaceId}`;
