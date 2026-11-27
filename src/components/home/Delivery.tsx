import { ArrowUpRight, Bike, Search } from "lucide-react";
import Reveal from "@/components/Reveal";
import { site } from "@/config/site";

export default function Delivery() {
  return (
    <section id="delivery" className="section bg-brand-light">
      <div className="container">
        <Reveal className="mx-auto mb-10 max-w-2xl text-center">
          <span className="eyebrow">Delivery</span>
          <h2 className="text-3xl md:text-4xl">Can't pop in? We'll bring it to you</h2>
          <p className="mt-4 text-ink/70">
            Order your shopping from Londis Bath Lane on your favourite delivery app and get it to your door, fast.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {site.delivery.map((d, i) => {
            const href = d.url || d.fallback;
            const inner = (
              <>
                <span className="h-1.5 w-12 rounded-full" style={{ backgroundColor: d.color }} aria-hidden />
                <span className="mt-4 block font-display text-xl sm:text-2xl font-bold text-ink">{d.name}</span>
                <span className="mt-auto flex items-center gap-1.5 pt-5 text-xs sm:text-sm font-semibold text-ink/70 group-hover:text-ink">
                  {href ? (
                    <>
                      Order now <ArrowUpRight className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4" /> Search "Londis Bath Lane" in the app
                    </>
                  )}
                </span>
              </>
            );
            return (
              <Reveal key={d.name} delay={i * 70}>
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card group flex h-full min-h-[150px] flex-col p-5 sm:p-6 transition hover:-translate-y-1 hover:shadow-xl"
                    aria-label={`Order from Londis Bath Lane on ${d.name}`}
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="card flex h-full min-h-[150px] flex-col p-5 sm:p-6">{inner}</div>
                )}
              </Reveal>
            );
          })}
        </div>

        <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-ink/60">
          <Bike className="h-4 w-4" />
          Delivery areas, fees and prices are set by each app and may differ from in-store prices. Challenge 25 applies to age-restricted items.
        </p>
      </div>
    </section>
  );
}
