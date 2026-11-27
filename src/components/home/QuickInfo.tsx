import { Bike, Clock, Package, Receipt } from "lucide-react";
import { Link } from "react-router-dom";
import { openStatus } from "@/lib/hours";
import { useSettings } from "@/lib/settings";

/** Four highlights right under the banner: live hours, delivery, payments, parcels. */
export default function QuickInfo() {
  const { settings } = useSettings();
  const status = openStatus(settings.hours, settings.seasonalHours);

  const tiles = [
    {
      Icon: Clock,
      title: status.open ? "Open now" : "Closed now",
      sub: status.text,
      to: "/#about",
      dot: status.open ? "bg-londis" : "bg-gray-400",
    },
    { Icon: Bike, title: "Home delivery", sub: "Deliveroo, Just Eat, Uber Eats & TheShopz", to: "/#delivery" },
    { Icon: Receipt, title: "Bills & top-ups", sub: "PayPoint · Payzone · Lottery", to: "/#services" },
    { Icon: Package, title: "Parcels & cashback", sub: "Drop off, collect & get cash back", to: "/#services" },
  ];

  return (
    <div className="relative z-10 -mt-12 md:-mt-14">
      <div className="container">
        <ul className="grid grid-cols-2 overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-black/5 lg:grid-cols-4">
          {tiles.map(({ Icon, title, sub, to, dot }, i) => (
            <li
              key={title}
              className={`border-gray-100 ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
            >
              <Link to={to} className="group flex h-full items-start gap-3 p-4 transition hover:bg-brand-light sm:p-5">
                <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand text-white sm:h-11 sm:w-11">
                  <Icon className="h-5 w-5" />
                  {dot && (
                    <span className={`absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full ring-2 ring-white ${dot}`} />
                  )}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-ink sm:text-base">{title}</span>
                  <span className="mt-0.5 block text-xs leading-snug text-ink/70 sm:text-sm">{sub}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
