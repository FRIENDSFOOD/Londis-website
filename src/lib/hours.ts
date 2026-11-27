import type { DayHours, SeasonalHours } from "@/config/site";

export const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Shows 24h times as written, e.g. "07:00 – 23:00". */
export const fmtRange = (open?: string, close?: string, closed?: boolean) =>
  closed || !open || !close ? "Closed" : `${open} – ${close}`;

const toDate = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

export type UpcomingSeasonal = SeasonalHours & { label: string; isToday: boolean; start: Date };

/** Seasonal entries that are active today or coming up soon, soonest first. */
export function upcomingSeasonal(list: SeasonalHours[], now = new Date()): UpcomingSeasonal[] {
  const today = startOfDay(now);
  return list
    .filter((s) => s.name && (s.date || s.from))
    .map((s) => {
      const from = toDate((s.date || s.from)!);
      const to = toDate((s.date || s.to || s.from)!);
      const showFrom = new Date(from);
      showFrom.setDate(showFrom.getDate() - (s.showFromDaysBefore ?? 30));
      return { s, from, to, showFrom };
    })
    .filter(({ from, to, showFrom }) => !isNaN(+from) && !isNaN(+to) && today <= to && today >= showFrom)
    .sort((a, b) => +a.from - +b.from)
    .map(({ s, from, to }) => {
      const opts: Intl.DateTimeFormatOptions = { weekday: "short", day: "numeric", month: "short" };
      const label =
        +from === +to
          ? from.toLocaleDateString("en-GB", opts)
          : `${from.toLocaleDateString("en-GB", opts)} – ${to.toLocaleDateString("en-GB", opts)}`;
      return { ...s, label, start: from, isToday: today >= from && today <= to };
    });
}

/** Today's hours, taking seasonal overrides into account. */
export function todaysHours(hours: DayHours[], seasonal: SeasonalHours[], now = new Date()) {
  const s = upcomingSeasonal(seasonal, now).find((x) => x.isToday);
  if (s) return { open: s.open, close: s.close, closed: !!s.closed, seasonal: s.name };
  const reg = hours.find((h) => h.day === DAYS[now.getDay()]);
  if (!reg || reg.closed) return { closed: true as const };
  return { open: reg.open, close: reg.close, closed: false };
}

/** Is the shop open right now? */
export function isOpenNow(hours: DayHours[], seasonal: SeasonalHours[], now = new Date()) {
  const t = todaysHours(hours, seasonal, now);
  if (t.closed || !t.open || !t.close) return false;
  const mins = now.getHours() * 60 + now.getMinutes();
  const [oh, om] = t.open.split(":").map(Number);
  const [ch, cm] = t.close.split(":").map(Number);
  return mins >= oh * 60 + om && mins < ch * 60 + cm;
}

export const todayName = (now = new Date()) => DAYS[now.getDay()];
