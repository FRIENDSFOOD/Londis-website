import { useState } from "react";
import { MapPin, Navigation } from "lucide-react";
import { directionsUrl, mapEmbedUrl, site } from "@/config/site";

/**
 * Google Map that only loads when the visitor asks for it.
 * Faster pages, and no Google cookies unless the visitor chooses to see the map.
 */
export default function MapEmbed({ className = "" }: { className?: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gray-100 shadow-card ${className}`}>
      {show ? (
        <iframe
          title="Map showing Londis Supermarket, Bath Lane, Leicester"
          src={mapEmbedUrl}
          className="h-full min-h-[360px] w-full border-0"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="flex h-full min-h-[360px] flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_1px_1px,rgba(31,35,40,0.12)_1px,transparent_0)] [background-size:18px_18px] p-6 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-ink text-white shadow-lg">
            <MapPin className="h-7 w-7" />
          </span>
          <p className="font-display text-lg font-bold">{site.address.line1}, {site.address.city} {site.address.postcode}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button type="button" onClick={() => setShow(true)} className="btn-primary">
              Show map
            </button>
            <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="btn border-2 border-ink text-ink hover:bg-ink hover:text-white">
              <Navigation className="h-4 w-4" /> Directions
            </a>
          </div>
          <p className="max-w-xs text-xs text-ink/70">The map is provided by Google, which may set cookies when it loads.</p>
        </div>
      )}
    </div>
  );
}
