import { CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import { fmtRange, upcomingSeasonal } from "@/lib/hours";
import { useSettings } from "@/lib/settings";

export default function TopBar() {
  // Show a notice for seasonal hours in the next 14 days
  const { settings } = useSettings();
  const notice = upcomingSeasonal(settings.seasonalHours).find(
    (s) => s.isToday || (s.start.getTime() - Date.now()) / 86400000 <= 14,
  );

  return (
    <>
      {notice && (
        <Link to="/#about" className="block bg-sun text-center text-xs font-semibold text-ink hover:brightness-95">
          <span className="container flex items-center justify-center gap-2 py-2">
            <CalendarDays className="h-3.5 w-3.5" />
            {notice.isToday ? "Today" : notice.name} ({notice.label}):{" "}
            {fmtRange(notice.open, notice.close, notice.closed)}
            <span className="underline">See seasonal hours</span>
          </span>
        </Link>
      )}
    </>
  );
}
