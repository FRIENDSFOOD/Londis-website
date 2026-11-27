import { mapEmbedUrl } from "@/config/site";

export default function MapEmbed({ className = "" }: { className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl shadow-card ${className}`}>
      <iframe
        title="Map showing Londis Supermarket, 105 Bath Lane, Leicester"
        src={mapEmbedUrl}
        className="h-full min-h-[360px] w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
