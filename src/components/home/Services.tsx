import { Banknote, Coffee, Package, Receipt, Smartphone, Ticket } from "lucide-react";
import Reveal from "@/components/Reveal";

// TODO: remove any service the store doesn't offer
const services = [
  { Icon: Coffee, title: "Coffee To Go", text: "Freshly ground, 100% arabica coffee — ready in moments." },
  { Icon: Receipt, title: "Bill Payments", text: "Pay utility bills and top up gas & electric keys." },
  { Icon: Ticket, title: "National Lottery", text: "Lotto, EuroMillions, Thunderball and scratchcards." },
  { Icon: Smartphone, title: "Mobile Top-ups", text: "Quick top-ups for all major UK networks." },
  { Icon: Package, title: "Parcel Services", text: "Drop off and collect parcels on your schedule." },
  { Icon: Banknote, title: "Cash Machine", text: "Convenient cash withdrawals when you need them." },
];

export default function Services() {
  return (
    <section id="services" className="section bg-brand text-white">
      <div className="container">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <span className="mb-3 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
            Services
          </span>
          <h2 className="text-3xl md:text-4xl">More than just a shop</h2>
          <p className="mt-4 text-white/85">Handy in-store services that save you a trip into town.</p>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 70}>
              <div className="flex h-full gap-4 rounded-2xl bg-white/10 p-6 ring-1 ring-white/15 transition hover:bg-white/15">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white text-brand">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg">{title}</h3>
                  <p className="mt-1 text-sm text-white/85">{text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-white/75">Service availability may vary — please ask in store.</p>
      </div>
    </section>
  );
}
