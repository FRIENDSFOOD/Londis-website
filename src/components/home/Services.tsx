import Reveal from "@/components/Reveal";
import ServiceLogo from "@/components/ServiceLogo";
import { useSettings } from "@/lib/settings";

export default function Services() {
  const { settings } = useSettings();
  const services = settings.services.filter((s) => s.enabled);
  if (!services.length) return null;

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
        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 80}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white text-ink shadow-card">
                <div className="grid h-32 place-items-center border-b border-gray-100 bg-white p-6">
                  <ServiceLogo service={s} />
                </div>
                <div className="p-6">
                  <h3 className="text-lg">{s.name}</h3>
                  <p className="mt-1 text-sm text-ink/70">{s.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-white/75">Ask at the till — our team is happy to help.</p>
      </div>
    </section>
  );
}
