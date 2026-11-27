import { Heart, Star, Users } from "lucide-react";
import Reveal from "@/components/Reveal";
import OpeningHours from "@/components/OpeningHours";
import { site } from "@/config/site";

export default function About() {
  return (
    <section id="about" className="section bg-brand-light/60">
      <div className="container grid items-start gap-12 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <span className="eyebrow">About Us</span>
          <h2 className="text-3xl md:text-4xl">A friendly, family-run shop at the heart of the community</h2>
          <div className="mt-6 space-y-4 text-ink/75">
            <p>
              Londis on Bath Lane is run by a local family who know our customers by name. We opened our doors in{" "}
              {site.established} to give the neighbourhood a reliable, welcoming place to pick up fresh food and daily
              essentials without the hassle of a big supermarket trip.
            </p>
            <p>
              Whether you're grabbing breakfast on the way to work, stocking up for the week or sorting snacks for movie
              night, our team is always happy to help. If there's something you'd like us to stock, just ask — we love
              hearing from you.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { Icon: Heart, label: "Family run" },
              { Icon: Users, label: "Community focused" },
              { Icon: Star, label: "Great local value" },
            ].map(({ Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-ink shadow-sm ring-1 ring-black/5"
              >
                <Icon className="h-5 w-5 text-brand" /> {label}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {site.googleRating && (
              <a
                href={site.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm shadow-sm ring-1 ring-black/5"
              >
                <span className="text-sun" aria-hidden>
                  ★★★★★
                </span>
                <strong>{site.googleRating.value.toFixed(1)}</strong>
                <span className="text-ink/70">on Google ({site.googleRating.count} reviews)</span>
              </a>
            )}
            {site.googleReviewUrl && (
              <a href={site.googleReviewUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <Star className="h-4 w-4" /> Leave us a Google review
              </a>
            )}
            {site.googleMapsUrl && (
              <a href={site.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                See us on Google
              </a>
            )}
          </div>
        </Reveal>

        <Reveal delay={150} className="lg:col-span-2">
          <OpeningHours />
        </Reveal>
      </div>
    </section>
  );
}
