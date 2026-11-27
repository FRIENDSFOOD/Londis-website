import { Link } from "react-router-dom";

/**
 * Londis wordmark: green "Londis" with "BATH LANE" underneath.
 * To use an official logo file instead, put it in /public and swap the text for an <img>.
 */
export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="inline-flex flex-col items-start leading-none" aria-label="Londis Bath Lane home">
      <span className="font-display text-[2rem] font-extrabold tracking-tight text-londis">Londis</span>
      <span
        className={`mt-1 pl-0.5 text-[11px] font-bold uppercase tracking-[0.32em] ${light ? "text-white/80" : "text-ink/70"}`}
      >
        Bath Lane
      </span>
    </Link>
  );
}
