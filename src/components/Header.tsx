import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bike, Clock, MapPin, Menu, MessageCircle, Phone, X } from "lucide-react";
import Logo from "./Logo";
import { directionsUrl, site } from "@/config/site";
import { mainNav } from "@/content/navigation";
import { useActiveSection } from "@/lib/useActiveSection";
import { openStatus } from "@/lib/hours";
import { useSettings } from "@/lib/settings";

/** Contact block in the desktop header: green icon + two lines of text. */
function InfoBlock({
  Icon,
  title,
  sub,
  href,
  external,
}: {
  Icon: typeof MapPin;
  title: string;
  sub: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex items-center gap-3"
    >
      <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-light text-brand transition group-hover:bg-brand group-hover:text-white">
        <Icon className="h-5 w-5" />
      </span>
      <span className="leading-tight">
        <strong className="block text-sm font-semibold text-ink">{title}</strong>
        <span className="text-xs text-ink/70">{sub}</span>
      </span>
    </a>
  );
}

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
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (n: (typeof mainNav)[number]) =>
    n.section ? pathname === "/" && activeSection === n.section : pathname === n.to;

  return (
    <>
      {/* Top header: sticky on phones, scrolls away on desktop (the green menu bar stays) */}
      <header
        className={`sticky top-0 z-40 bg-white transition-shadow lg:static ${scrolled ? "shadow-md lg:shadow-none" : ""}`}
      >
        <div className="container flex h-[72px] items-center justify-between gap-6 lg:h-28">
          <div className="lg:hidden">
            <Logo />
          </div>
          <div className="hidden lg:block">
            <Logo tagline />
          </div>

          <div className="hidden items-center gap-8 lg:flex">
            <InfoBlock
              Icon={MapPin}
              title={site.address.line1}
              sub={`${site.address.city}, ${site.address.postcode}`}
              href={directionsUrl}
              external
            />
            <InfoBlock Icon={Phone} title={site.phone} sub="Call or WhatsApp us" href={site.phoneHref} />
            <InfoBlock Icon={Clock} title={status.open ? "Open now" : "Closed now"} sub={status.text} href="/#about" />
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
                <span className={`h-2.5 w-2.5 rounded-full ${status.open ? "bg-londis" : "bg-gray-400"}`} />
                {status.text}
              </p>
              {mainNav.map((n) => (
                <Link
                  key={n.label}
                  to={n.to}
                  className={`block rounded-lg px-3 py-3 text-lg font-medium hover:bg-brand-light ${
                    isActive(n) ? "bg-brand-light text-brand" : ""
                  }`}
                >
                  {n.label}
                </Link>
              ))}
              <div className="mt-3 grid grid-cols-2 gap-3 pb-2">
                <a href={site.phoneHref} className="btn-primary">
                  <Phone className="h-4 w-4" /> Call
                </a>
                <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </div>
            </div>
          </nav>
        )}
      </header>

      {/* Desktop menu bar */}
      <nav className="sticky top-0 z-40 hidden bg-forest shadow-md lg:block" aria-label="Main">
        <div className="container flex h-14 items-center justify-between">
          <ul className="flex h-full items-stretch">
            {mainNav.map((n) => (
              <li key={n.label} className="flex">
                <Link
                  to={n.to}
                  aria-current={isActive(n) ? "true" : undefined}
                  className={`relative flex items-center px-4 text-sm font-semibold text-white/90 transition hover:bg-white/10 hover:text-white ${
                    isActive(n) ? "bg-brand text-white" : ""
                  }`}
                >
                  {n.label}
                  {isActive(n) && <span className="absolute inset-x-0 bottom-0 h-[3px] bg-sun" />}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/#delivery" className="btn bg-sun px-5 py-2 text-ink hover:brightness-95">
            <Bike className="h-4 w-4" /> Order Delivery
          </Link>
        </div>
      </nav>
    </>
  );
}
