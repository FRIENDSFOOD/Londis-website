import { CalendarDays, Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { site } from "@/config/site";
import { fmtRange, upcomingSeasonal } from "@/lib/hours";
import { useSettings } from "@/lib/settings";

export default function TopBar() {
  // Show a notice for seasonal hours in the next 14 days
  const { settings } = useSettings();
  const notice = upcomingSeasonal(settings.seasonalHours).find(
    (s) => s.isToday || (s.start.getTime() - Date.now()) / 86400000 <= 14
  );

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
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            <a href={site.phoneHref} className="flex items-center gap-1.5 hover:text-brand-bright">
              <Phone className="h-3.5 w-3.5 text-brand-bright" />
              {site.phone}
            </a>
            <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-brand-bright">
              <MessageCircle className="h-3.5 w-3.5 text-brand-bright" />
              WhatsApp
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
