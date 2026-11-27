import { MessageCircle } from "lucide-react";
import { site } from "@/config/site";

/** Floating "Message us" button, bottom-right on every page. */
export default function WhatsAppButton() {
  return (
    <a
      href={site.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Message us on WhatsApp: ${site.whatsapp}`}
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-ink px-4 py-3 text-sm font-semibold text-white shadow-xl ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:bg-black"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">WhatsApp us</span>
    </a>
  );
}
