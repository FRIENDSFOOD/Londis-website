import { CalendarDays, Clock } from "lucide-react";
import { fmtRange, isOpenNow, todayName, upcomingSeasonal } from "@/lib/hours";
import { useSettings } from "@/lib/settings";

export default function OpeningHours({ className = "" }: { className?: string }) {
  const today = todayName();
  const { settings } = useSettings();
  const open = isOpenNow(settings.hours, settings.seasonalHours);
  const seasonal = upcomingSeasonal(settings.seasonalHours);
  const todaySeasonal = seasonal.find((s) => s.isToday);

  return (
    <div className={`card p-7 ${className}`}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-ink text-white">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl">Opening Hours</h2>
            <p className="text-sm text-ink/70">Open 7 days a week</p>
          </div>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            open ? "bg-brand-light text-brand" : "bg-gray-100 text-ink/70"
          }`}
        >
          {open ? "● Open now" : "Closed now"}
        </span>
      </div>

      <ul className="divide-y divide-gray-100">
        {settings.hours.map((h) => {
          const isToday = h.day === today;
          const time =
            isToday && todaySeasonal
              ? fmtRange(todaySeasonal.open, todaySeasonal.close, todaySeasonal.closed)
              : fmtRange(h.open, h.close, h.closed);
          return (
            <li
              key={h.day}
              className={`flex justify-between py-2.5 text-sm ${isToday ? "font-semibold text-brand" : ""}`}
            >
              <span>
                {h.day}
                {isToday && (
                  <span className="ml-2 rounded-full bg-brand-light px-2 py-0.5 text-[10px] uppercase">Today</span>
                )}
              </span>
              <span>{time}</span>
            </li>
          );
        })}
      </ul>

      {seasonal.length > 0 && (
        <div className="mt-6 rounded-xl bg-sun-light p-4">
          <p className="mb-2 flex items-center gap-2 text-sm font-semibold">
            <CalendarDays className="h-4 w-4 text-sun" /> Seasonal hours
          </p>
          <ul className="space-y-1.5 text-sm">
            {seasonal.map((s) => (
              <li key={s.name + s.label} className={`flex justify-between gap-3 ${s.isToday ? "font-semibold" : ""}`}>
                <span>
                  {s.name} <span className="text-ink/70">· {s.label}</span>
                </span>
                <span className="shrink-0">{fmtRange(s.open, s.close, s.closed)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
