import { Bike, MessageCircle, Navigation, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { directionsUrl, site } from "@/config/site";

/** Fixed bottom bar on phones: the main actions always one tap away. */
export default function MobileActionBar() {
  const item =
    "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-semibold text-ink active:bg-gray-100";
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-gray-200 bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] lg:hidden"
    >
      <a href={site.phoneHref} className={item}>
        <Phone className="h-5 w-5 text-brand" /> Call
      </a>
      <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className={item}>
        <MessageCircle className="h-5 w-5 text-brand" /> WhatsApp
      </a>
      <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className={item}>
        <Navigation className="h-5 w-5 text-brand" /> Directions
      </a>
      <Link to="/#delivery" className={item}>
        <Bike className="h-5 w-5 text-brand" /> Delivery
      </Link>
    </nav>
  );
}
