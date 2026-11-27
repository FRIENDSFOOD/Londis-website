import { Link } from "react-router-dom";
import { site } from "@/config/site";

/**
 * Londis wordmark: green "Londis" with "BATH LANE" underneath.
 * `tagline` adds the slogan in handwriting style (used in the desktop header).
 */
export default function Logo({ light = false, tagline = false }: { light?: boolean; tagline?: boolean }) {
  return (
    <Link to="/" className="inline-flex flex-col items-start leading-none">
      <span className="font-display text-[2rem] font-extrabold tracking-tight text-londis">Londis</span>
      <span
        className={`mt-1 pl-0.5 text-[11px] font-bold uppercase tracking-[0.32em] ${light ? "text-white/80" : "text-ink/70"}`}
      >
        Bath Lane
      </span>
      {tagline && (
        <span className={`mt-1.5 font-script text-lg font-semibold ${light ? "text-sun" : "text-[#B45309]"}`}>
          {site.slogan}
        </span>
      )}
    </Link>
  );
}
