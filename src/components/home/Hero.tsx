import { Link } from "react-router-dom";
import { MapPin, Phone, Clock } from "lucide-react";
import { site } from "@/config/site";
import { fmtRange, isOpenNow, todaysHours } from "@/lib/hours";

export default function Hero() {
  const open = isOpenNow();
  const t = todaysHours();
  return (
    <section id="home" className="relative isolate overflow-hidden">
      <img
        src={`${import.meta.env.BASE_URL}images/storefront.jpg`}
        alt="The Londis Supermarket shop front on Bath Lane, Leicester"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_80%]"
        fetchPriority="high"
      />
      <div className="absolute inset-0 -z-10 bg-ink/75 md:bg-transparent md:bg-gradient-to-r md:from-ink/90 md:via-ink/65 md:to-ink/10" />

      <div className="container flex min-h-[560px] flex-col justify-center py-20 md:min-h-[660px]">
        <div className="max-w-2xl text-white">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-brand-bright px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
            <Clock className="h-3.5 w-3.5" />
            {open ? "Open now" : "Open 7 days"} · Today {fmtRange(t.open, t.close, t.closed)}
          </span>
          <h1 className="text-4xl leading-tight sm:text-5xl md:text-6xl">
            Your Local Supermarket on <span className="text-brand-bright">Bath Lane</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/85">
            Fresh groceries, cold drinks, tasty treats and all the everyday bits you need — just around the corner.
            We're proud to serve our neighbours across Leicester with great value and a warm welcome.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/#location" className="btn-primary bg-brand-bright text-ink hover:bg-white">
              <MapPin className="h-4 w-4" /> Visit Our Store
            </Link>
            <a href={site.phoneHref} className="btn-outline">
              <Phone className="h-4 w-4" /> Call Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
