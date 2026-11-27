import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import Logo from "./Logo";
import { site } from "@/config/site";

const links = [
  { label: "Home", to: "/#home" },
  { label: "About Us", to: "/#about" },
  { label: "Our Products", to: "/#products" },
  { label: "Services", to: "/#services" },
  { label: "Delivery", to: "/#delivery" },
  { label: "Careers", to: "/careers" },
  { label: "Location", to: "/#location" },
  { label: "Contact Us", to: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = "rounded-full px-2.5 py-2 text-sm font-medium text-ink/80 transition hover:bg-brand-light hover:text-brand";

  return (
    <header className={`sticky top-0 z-40 bg-white/95 backdrop-blur transition-shadow ${scrolled ? "shadow-md" : ""}`}>
      <div className="container flex h-20 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {links.map((l) =>
            l.to.startsWith("/#") ? (
              <Link key={l.label} to={l.to} className={linkClass}>
                {l.label}
              </Link>
            ) : (
              <NavLink
                key={l.label}
                to={l.to}
                className={({ isActive }) => `${linkClass} ${isActive ? "bg-brand-light text-brand" : ""}`}
              >
                {l.label}
              </NavLink>
            )
          )}
        </nav>

        <a href={site.phoneHref} className="btn-primary hidden lg:inline-flex">
          <Phone className="h-4 w-4" /> Call Us
        </a>

        <button
          className="grid h-11 w-11 place-items-center rounded-full text-ink hover:bg-gray-100 lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav className="border-t bg-white lg:hidden" aria-label="Mobile">
          <div className="container flex flex-col py-3">
            {links.map((l) => (
              <Link key={l.label} to={l.to} className="rounded-lg px-3 py-3 font-medium hover:bg-brand-light hover:text-brand">
                {l.label}
              </Link>
            ))}
            <a href={site.phoneHref} className="btn-primary mt-3">
              <Phone className="h-4 w-4" /> Call {site.phone}
            </a>
            <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="btn mt-3 border-2 border-ink text-ink hover:bg-ink hover:text-white">
              <MessageCircle className="h-4 w-4" /> WhatsApp {site.whatsapp}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
