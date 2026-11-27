import { Link } from "react-router-dom";
import { Mail, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import Logo from "./Logo";
import SocialIcons from "./SocialIcons";
import { fmtRange, todayName } from "@/lib/hours";
import { useSettings } from "@/lib/settings";
import { site } from "@/config/site";

export default function Footer() {
  const year = new Date().getFullYear();
  const { settings } = useSettings();
  const today = todayName();
  return (
    <footer className="bg-ink text-white/80">
      <div className="container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2">
          <Logo light />
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            <span className="block font-display text-lg font-bold text-white">{site.slogan}</span>
            Your friendly neighbourhood supermarket on Bath Lane — stocked with fresh food, drinks and everyday
            essentials, seven days a week.
          </p>
          <SocialIcons className="mt-6" />
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Quick links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/#about" className="hover:text-brand-bright">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/#products" className="hover:text-brand-bright">
                Our Products
              </Link>
            </li>
            <li>
              <Link to="/#services" className="hover:text-brand-bright">
                Services
              </Link>
            </li>
            <li>
              <Link to="/#delivery" className="hover:text-brand-bright">
                Delivery
              </Link>
            </li>
            <li>
              <Link to="/careers" className="hover:text-brand-bright">
                Careers
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-brand-bright">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-brand-bright">
                Privacy &amp; Cookies
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Opening hours</h3>
          <ul className="space-y-1.5 text-sm">
            {settings.hours.map((h) => (
              <li
                key={h.day}
                className={`flex justify-between gap-4 ${h.day === today ? "font-semibold text-white" : ""}`}
              >
                <span>{h.day.slice(0, 3)}</span>
                <span>{fmtRange(h.open, h.close, h.closed)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Visit us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-bright" />
              {site.address.full}
            </li>
            <li>
              <a href={site.phoneHref} className="flex gap-2 hover:text-brand-bright">
                <Phone className="h-4 w-4 text-brand-bright" />
                {site.phone}
              </a>
            </li>
            <li>
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 hover:text-brand-bright"
              >
                <MessageCircle className="h-4 w-4 text-brand-bright" />
                WhatsApp {site.whatsapp}
              </a>
            </li>
            {site.email && (
              <li>
                <a href={`mailto:${site.email}`} className="flex gap-2 hover:text-brand-bright">
                  <Mail className="h-4 w-4 text-brand-bright" />
                  {site.email}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center gap-3 pb-8 pt-6 text-center text-xs lg:flex-row lg:justify-between lg:gap-8 lg:pb-24 lg:text-left">
          <p>
            © {site.established < year ? `${site.established}–${year}` : year} {site.companyName} trading as{" "}
            {site.tradingAs}. Registered in England &amp; Wales, company no. {site.companyNumber}. All rights reserved.
          </p>
          <p className="flex items-center gap-2 font-medium text-white">
            <ShieldCheck className="h-4 w-4 text-brand-bright" />
            We operate Challenge 25. No alcohol or tobacco sales to under 18s.
          </p>
        </div>
      </div>
    </footer>
  );
}
