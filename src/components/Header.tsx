import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import Logo from "./Logo";
import { site } from "@/config/site";
import { mainNav } from "@/content/navigation";
import { useActiveSection } from "@/lib/useActiveSection";
import { openStatus } from "@/lib/hours";
import { useSettings } from "@/lib/settings";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname, hash } = useLocation();
  const { settings } = useSettings();
  const status = openStatus(settings.hours, settings.seasonalHours);
  const sectionIds = mainNav.filter((n) => n.section).map((n) => n.section!);
  const activeSection = useActiveSection(sectionIds, pathname === "/");

  useEffect(() => setOpen(false), [pathname, hash]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  // lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (n: (typeof mainNav)[number]) =>
    n.section ? pathname === "/" && activeSection === n.section : pathname === n.to;

  return (
    <header className={`sticky top-0 z-40 bg-white/95 backdrop-blur transition-shadow ${scrolled ? "shadow-md" : ""}`}>
      <div className="container flex h-[72px] items-center justify-between gap-4 lg:h-20">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {mainNav.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              aria-current={isActive(n) ? "true" : undefined}
              className={`relative rounded-full px-3 py-2 text-sm font-medium transition hover:bg-brand-light ${
                isActive(n) ? "bg-brand-light text-ink" : "text-ink/80"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <span className="flex items-center gap-2 text-sm font-medium text-ink/80" title={status.text}>
            <span className={`h-2.5 w-2.5 rounded-full ${status.open ? "bg-emerald-500" : "bg-gray-400"}`} />
            {status.open ? "Open now" : "Closed"}
          </span>
          <a href={site.phoneHref} className="btn-primary">
            <Phone className="h-4 w-4" /> {site.phone}
          </a>
        </div>

        <button
          className="grid h-11 w-11 place-items-center rounded-full text-ink hover:bg-gray-100 lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t bg-white lg:hidden"
          aria-label="Mobile"
        >
          <div className="container py-3">
            <p className="flex items-center gap-2 px-3 pb-2 text-sm text-ink/80">
              <span className={`h-2.5 w-2.5 rounded-full ${status.open ? "bg-emerald-500" : "bg-gray-400"}`} />
              {status.text}
            </p>
            {mainNav.map((n) => (
              <Link
                key={n.label}
                to={n.to}
                className={`block rounded-lg px-3 py-3 text-lg font-medium hover:bg-brand-light ${isActive(n) ? "bg-brand-light" : ""}`}
              >
                {n.label}
              </Link>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-3 pb-2">
              <a href={site.phoneHref} className="btn-primary">
                <Phone className="h-4 w-4" /> Call
              </a>
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn border-2 border-ink text-ink hover:bg-ink hover:text-white"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
