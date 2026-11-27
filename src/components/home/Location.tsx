import { Car, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import Reveal from "@/components/Reveal";
import MapEmbed from "@/components/MapEmbed";
import { directionsUrl, site } from "@/config/site";

export default function Location() {
  return (
    <section id="location" className="section bg-gray-50">
      <div className="container grid gap-10 lg:grid-cols-5">
        <Reveal className="lg:col-span-2">
          <span className="eyebrow">Location</span>
          <h2 className="text-3xl md:text-4xl">Find us on Bath Lane</h2>
          <p className="mt-4 text-ink/70">
            We're easy to reach on foot, by bike or by car — pop in whenever you're passing.
          </p>
          <ul className="mt-8 space-y-5">
            <li className="flex gap-4">
              <MapPin className="mt-1 h-6 w-6 shrink-0 text-brand" />
              <div>
                <p className="font-semibold">{site.storeName}</p>
                <p className="text-ink/70">
                  {site.address.line1}, {site.address.city}, {site.address.postcode}
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <Phone className="mt-1 h-6 w-6 shrink-0 text-brand" />
              <a href={site.phoneHref} className="font-semibold hover:text-brand">{site.phone}</a>
            </li>
            <li className="flex gap-4">
              <MessageCircle className="mt-1 h-6 w-6 shrink-0 text-brand" />
              <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-brand">
                WhatsApp {site.whatsapp}
              </a>
            </li>
            <li className="flex gap-4">
              <Car className="mt-1 h-6 w-6 shrink-0 text-brand" />
              <p className="text-ink/70">Easy to reach from Leicester city centre.</p>
            </li>
          </ul>
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8">
            <Navigation className="h-4 w-4" /> Get Directions
          </a>
        </Reveal>
        <Reveal delay={150} className="lg:col-span-3">
          <MapEmbed className="h-[420px]" />
        </Reveal>
      </div>
    </section>
  );
}
