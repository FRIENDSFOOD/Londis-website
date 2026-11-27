import { useState } from "react";
import { Banknote, Coffee, Gift, Package, Receipt, Smartphone, Store, Ticket, type LucideIcon } from "lucide-react";
import type { Service } from "@/config/site";

/** Icons available for services without a logo (choose in /admin). */
export const SERVICE_ICONS: Record<string, LucideIcon> = {
  package: Package,
  banknote: Banknote,
  receipt: Receipt,
  smartphone: Smartphone,
  ticket: Ticket,
  coffee: Coffee,
  gift: Gift,
  store: Store,
};

/**
 * Shows the service's logo from /public/logos if the file exists,
 * otherwise its icon in a dark rounded tile.
 */
export default function ServiceLogo({ service, className = "" }: { service: Service; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (service.logo && !failed) {
    return (
      <img
        src={`${import.meta.env.BASE_URL}logos/${service.logo}`}
        alt={`${service.name} logo`}
        className={`h-full w-full object-contain ${className}`}
        onError={() => setFailed(true)}
        loading="lazy"
      />
    );
  }
  const Icon = SERVICE_ICONS[service.icon ?? ""] ?? Store;
  return (
    <span className="grid h-16 w-16 place-items-center rounded-2xl bg-ink text-white" aria-hidden>
      <Icon className="h-8 w-8" />
    </span>
  );
}
