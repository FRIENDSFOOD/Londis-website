/**
 * Strict validation for settings saved from /admin.
 * Used by the Cloudflare function (server side, the real security check) and by the admin page.
 * Anything unexpected is rejected, so bad or malicious data can never reach the public site.
 */
import type { DayHours, SeasonalHours, Service } from "@/config/site";

export type SettingsPayload = {
  hours: DayHours[];
  seasonalHours: SeasonalHours[];
  services: Service[];
};

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;
const DATE = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
const LOGO = /^[a-z0-9][a-z0-9-]{0,60}\.(png|svg|webp|jpg)$/;
const ID = /^[a-z0-9][a-z0-9-]{0,39}$/;
export const ALLOWED_ICONS = ["package", "banknote", "receipt", "smartphone", "ticket", "coffee", "gift", "store"];

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const str = (v: unknown, max: number) =>
  typeof v === "string" && v.trim().length > 0 && v.length <= max ? v.trim() : null;

export type ValidationResult = { ok: true; value: SettingsPayload } | { ok: false; error: string };

export function validateSettings(input: unknown): ValidationResult {
  if (!isObj(input)) return { ok: false, error: "Settings must be an object" };

  // Weekly hours: exactly 7 days, Monday→Sunday
  const h = input.hours;
  if (!Array.isArray(h) || h.length !== 7) return { ok: false, error: "Weekly hours must list 7 days" };
  const hours: DayHours[] = [];
  for (let i = 0; i < 7; i++) {
    const d = h[i];
    if (!isObj(d) || d.day !== DAYS[i]) return { ok: false, error: `Day ${i + 1} must be ${DAYS[i]}` };
    if (d.closed === true) {
      hours.push({ day: DAYS[i], open: "", close: "", closed: true });
      continue;
    }
    if (typeof d.open !== "string" || typeof d.close !== "string" || !TIME.test(d.open) || !TIME.test(d.close))
      return { ok: false, error: `${DAYS[i]}: times must look like 07:00` };
    if (d.open >= d.close) return { ok: false, error: `${DAYS[i]}: closing time must be after opening time` };
    hours.push({ day: DAYS[i], open: d.open, close: d.close });
  }

  // Seasonal hours
  const s = input.seasonalHours;
  if (!Array.isArray(s) || s.length > 60) return { ok: false, error: "Too many seasonal entries (max 60)" };
  const seasonalHours: SeasonalHours[] = [];
  for (const x of s) {
    if (!isObj(x)) return { ok: false, error: "Invalid seasonal entry" };
    const name = str(x.name, 60);
    if (!name) return { ok: false, error: "Every seasonal entry needs a name (max 60 characters)" };
    const entry: SeasonalHours = { name };
    if (typeof x.date === "string") {
      if (!DATE.test(x.date)) return { ok: false, error: `${name}: invalid date` };
      entry.date = x.date;
    } else {
      if (typeof x.from !== "string" || typeof x.to !== "string" || !DATE.test(x.from) || !DATE.test(x.to))
        return { ok: false, error: `${name}: choose a start and end date` };
      if (x.from > x.to) return { ok: false, error: `${name}: end date is before start date` };
      entry.from = x.from;
      entry.to = x.to;
    }
    if (x.closed === true) entry.closed = true;
    else {
      if (typeof x.open !== "string" || typeof x.close !== "string" || !TIME.test(x.open) || !TIME.test(x.close))
        return { ok: false, error: `${name}: enter times or tick Closed` };
      if (x.open >= x.close) return { ok: false, error: `${name}: closing time must be after opening time` };
      entry.open = x.open;
      entry.close = x.close;
    }
    if (x.showFromDaysBefore !== undefined) {
      const n = Number(x.showFromDaysBefore);
      if (!Number.isInteger(n) || n < 0 || n > 120) return { ok: false, error: `${name}: invalid notice period` };
      entry.showFromDaysBefore = n;
    }
    seasonalHours.push(entry);
  }

  // Services
  const v = input.services;
  if (!Array.isArray(v) || v.length > 20) return { ok: false, error: "Too many services (max 20)" };
  const services: Service[] = [];
  const ids = new Set<string>();
  for (const x of v) {
    if (!isObj(x)) return { ok: false, error: "Invalid service" };
    const name = str(x.name, 60);
    if (!name) return { ok: false, error: "Every service needs a name (max 60 characters)" };
    const id = typeof x.id === "string" && ID.test(x.id) ? x.id : null;
    if (!id || ids.has(id)) return { ok: false, error: `${name}: invalid or duplicate id` };
    ids.add(id);
    const description = typeof x.description === "string" && x.description.length <= 200 ? x.description.trim() : null;
    if (description === null) return { ok: false, error: `${name}: description too long (max 200)` };
    const svc: Service = { id, name, description, enabled: x.enabled !== false };
    if (x.logo !== undefined && x.logo !== null && x.logo !== "") {
      if (typeof x.logo !== "string" || !LOGO.test(x.logo))
        return { ok: false, error: `${name}: logo must be a file name like paypoint.png` };
      svc.logo = x.logo;
    }
    if (x.icon !== undefined && x.icon !== null && x.icon !== "") {
      if (typeof x.icon !== "string" || !ALLOWED_ICONS.includes(x.icon))
        return { ok: false, error: `${name}: unknown icon` };
      svc.icon = x.icon;
    }
    services.push(svc);
  }

  return { ok: true, value: { hours, seasonalHours, services } };
}
