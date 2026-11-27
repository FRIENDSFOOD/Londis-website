import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { directionsUrl, site } from "@/config/site";
import { openStatus } from "@/lib/hours";
import { useSettings } from "@/lib/settings";

/** The four things visitors want most, right under the banner. */
export default function QuickInfo() {
  const { settings } = useSettings();
  const status = openStatus(settings.hours, settings.seasonalHours);

  const tiles = [
    {
      Icon: Clock,
      label: status.open ? "Open now" : "Closed now",
      value: status.text,
      href: "/#about",
      dot: status.open ? "bg-emerald-500" : "bg-gray-400",
    },
    {
      Icon: MapPin,
      label: "Find us",
      value: `${site.address.line1}, ${site.address.postcode}`,
      href: directionsUrl,
      external: true,
    },
    { Icon: Phone, label: "Call", value: site.phone, href: site.phoneHref, desktopOnly: true },
    {
      Icon: MessageCircle,
      label: "WhatsApp",
      value: site.whatsapp,
      href: site.whatsappHref,
      external: true,
      desktopOnly: true,
    },
  ];

  return (
    <div className="relative z-10 -mt-12 md:-mt-14">
      <div className="container">
        <ul className="grid grid-cols-2 overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-black/5 lg:grid-cols-4">
          {tiles.map(({ Icon, label, value, href, external, dot, desktopOnly }, i) => (
            <li
              key={label}
              className={`${desktopOnly ? "hidden lg:block" : ""} ${i > 0 ? "border-l" : ""} border-gray-100`}
            >
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex h-full items-center gap-3 p-3.5 transition hover:bg-brand-light sm:p-5"
              >
                <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink text-white sm:h-11 sm:w-11">
                  <Icon className="h-5 w-5" />
                  {dot && (
                    <span className={`absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full ring-2 ring-white ${dot}`} />
                  )}
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-wide text-ink/70">{label}</span>
                  <span className="block text-sm font-semibold leading-snug text-ink sm:text-base lg:truncate">
                    {value}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
