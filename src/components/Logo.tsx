import { Link } from "react-router-dom";

/**
 * Londis wordmark in brand colours: white lettering on fascia green.
 * To use an official logo file instead, put it in /public and swap the <span> for an <img>.
 */
export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-3" aria-label="Londis Supermarket home">
      <span className="rounded-lg bg-brand-bright px-3.5 py-1.5 font-display text-2xl font-extrabold leading-none tracking-tight text-white shadow-sm ring-1 ring-black/5">
        Londis
      </span>
      <span
        className={`hidden text-[11px] font-semibold uppercase leading-tight tracking-[0.16em] sm:block ${
          light ? "text-white/70" : "text-ink/60"
        }`}
      >
        Bath Lane
        <br />
        Leicester
      </span>
    </Link>
  );
}
