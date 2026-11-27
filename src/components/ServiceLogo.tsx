import { useState } from "react";
import type { Service } from "@/config/site";

/**
 * Shows the service's logo from /public/logos if the file exists,
 * otherwise a clean text badge with the service name.
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
  return <span className="text-center font-display text-sm font-bold leading-tight text-ink">{service.name}</span>;
}
