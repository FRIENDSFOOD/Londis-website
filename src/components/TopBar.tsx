import { CalendarDays, Clock, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { site } from "@/config/site";
import { fmtRange, upcomingSeasonal } from "@/lib/hours";

export default function TopBar() {
  // Show a notice for seasonal hours in the next 14 days
  const notice = upcomingSeasonal().find((s) => {
    const days = (new Date((s.date ?? s.from)!).getTime() - Date.now()) / 86400000;
    return s.isToday || days <= 14;
  });

  return (
    <>
      {notice && (
        <Link to="/#about" className="block bg-sun text-center text-xs font-semibold text-ink hover:brightness-95">
          <span className="container flex items-center justify-center gap-2 py-2">
            <CalendarDays className="h-3.5 w-3.5" />
            {notice.isToday ? "Today" : notice.name} ({notice.label}): {fmtRange(notice.open, notice.close, notice.closed)}
            <span className="underline">See seasonal hours</span>
          </span>
        </Link>
      )}
      <div className="bg-ink text-xs text-white/90">
        <div className="container flex flex-wrap items-center justify-center gap-x-6 gap-y-1 py-2 sm:justify-between">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-brand-bright" />
            {site.address.line1}, {site.address.city} {site.address.postcode}
          </span>
          <div className="flex items-center gap-6">
            <a href={site.phoneHref} className="flex items-center gap-1.5 hover:text-brand-bright">
              <Phone className="h-3.5 w-3.5 text-brand-bright" />
              {site.phone}
            </a>
            <span className="flex items-center gap-1.5 font-semibold">
              <Clock className="h-3.5 w-3.5 text-brand-bright" />
              Open 7 Days
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
