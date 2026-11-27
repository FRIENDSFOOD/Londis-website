import { site, type SeasonalHours } from "@/config/site";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** "07:00" -> "7:00am" style is avoided on purpose: we show the 24h times as written. */
export const fmtRange = (open?: string, close?: string, closed?: boolean) =>
  closed || !open || !close ? "Closed" : `${open} – ${close}`;

const toDate = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

function range(s: SeasonalHours) {
  const from = toDate((s.date ?? s.from)!);
  const to = toDate((s.date ?? s.to ?? s.from)!);
  return { from, to };
}

/** Seasonal entries that are active today or coming up soon, soonest first. */
export function upcomingSeasonal(now = new Date()): (SeasonalHours & { label: string; isToday: boolean })[] {
  const today = startOfDay(now);
  return site.seasonalHours
    .filter((s) => s.date || s.from)
    .map((s) => {
      const { from, to } = range(s);
      const lead = s.showFromDaysBefore ?? 30;
      const showFrom = new Date(from);
      showFrom.setDate(showFrom.getDate() - lead);
      return { s, from, to, showFrom };
    })
    .filter(({ to, showFrom }) => today <= to && today >= showFrom)
    .sort((a, b) => +a.from - +b.from)
    .map(({ s, from, to }) => {
      const opts: Intl.DateTimeFormatOptions = { weekday: "short", day: "numeric", month: "short" };
      const label =
        +from === +to
          ? from.toLocaleDateString("en-GB", opts)
          : `${from.toLocaleDateString("en-GB", opts)} – ${to.toLocaleDateString("en-GB", opts)}`;
      return { ...s, label, isToday: today >= from && today <= to };
    });
}

/** Today's hours, taking seasonal overrides into account. */
export function todaysHours(now = new Date()) {
  const seasonal = upcomingSeasonal(now).find((s) => s.isToday);
  if (seasonal) return { open: seasonal.open, close: seasonal.close, closed: !!seasonal.closed, seasonal: seasonal.name };
  const reg = site.hours.find((h) => h.day === DAYS[now.getDay()]);
  if (!reg || "closed" in reg) return { closed: true as const };
  return { open: reg.open, close: reg.close, closed: false };
}

/** Is the shop open right now? */
export function isOpenNow(now = new Date()) {
  const t = todaysHours(now);
  if (t.closed || !t.open || !t.close) return false;
  const mins = now.getHours() * 60 + now.getMinutes();
  const [oh, om] = t.open.split(":").map(Number);
  const [ch, cm] = t.close.split(":").map(Number);
  return mins >= oh * 60 + om && mins < ch * 60 + cm;
}

export const todayName = (now = new Date()) => DAYS[now.getDay()];
