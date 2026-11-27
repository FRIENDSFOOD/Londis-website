import { Link } from "react-router-dom";
import Photo from "@/components/Photo";
import { Bike, MapPin, Phone, Clock } from "lucide-react";
import { site } from "@/config/site";
import { fmtRange, isOpenNow, todaysHours } from "@/lib/hours";
import { useSettings } from "@/lib/settings";

export default function Hero() {
  const { settings } = useSettings();
  const open = isOpenNow(settings.hours, settings.seasonalHours);
  const t = todaysHours(settings.hours, settings.seasonalHours);
  return (
    <section id="home" className="relative isolate overflow-hidden">
      <Photo
        name="storefront"
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        alt="The Londis Supermarket shop front on Bath Lane, Leicester"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_80%]"
      />
      <div className="absolute inset-0 -z-10 bg-ink/75 md:bg-transparent md:bg-gradient-to-r md:from-ink/90 md:via-ink/65 md:to-ink/10" />

      <div className="container flex min-h-[560px] flex-col justify-center py-20 md:min-h-[660px]">
        <div className="max-w-2xl text-white">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white ring-1 ring-white/30 backdrop-blur">
            <Clock className="h-3.5 w-3.5" />
            {open ? "Open now" : "Open 7 days"} · Today {fmtRange(t.open, t.close, t.closed)}
          </span>
          <h1 className="text-4xl leading-tight sm:text-5xl md:text-6xl">
            Your Local Supermarket on Bath Lane
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/85">
            Fresh groceries, cold drinks, tasty treats and all the everyday bits you need — just around the corner.
            We're proud to serve our neighbours across Leicester with great value and a warm welcome.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/#location" className="btn bg-white text-ink hover:bg-brand-light">
              <MapPin className="h-4 w-4" /> Visit Our Store
            </Link>
            <Link to="/#delivery" className="btn-outline">
              <Bike className="h-4 w-4" /> Order Delivery
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
