import { Facebook, Instagram, Music2 } from "lucide-react";
import { site } from "@/config/site";

export default function SocialIcons({ className = "" }: { className?: string }) {
  const items = [
    { href: site.social.facebook, label: "Facebook", Icon: Facebook },
    { href: site.social.instagram, label: "Instagram", Icon: Instagram },
    { href: site.social.tiktok, label: "TikTok", Icon: Music2 },
  ].filter((i) => i.href);

  return (
    <div className={`flex gap-3 ${className}`}>
      {items.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-ink"
        >
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}
