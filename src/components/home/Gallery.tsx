import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Info, X } from "lucide-react";
import Reveal from "@/components/Reveal";
import Photo from "@/components/Photo";

/** Add, remove or reorder store photos here. Files live in /public/images. */
const photos = [
  { src: "storefront-side", alt: "Londis shop windows on Bath Lane", wide: true },
  { src: "chilled", alt: "Chilled dairy and fresh food aisle" },
  { src: "aisle-fresh", alt: "Bakery, fresh produce and soft drinks aisle" },
  { src: "coffee", alt: "Freshly ground coffee to go machine", tall: true },
  { src: "snacks", alt: "Snacks and world foods aisle" },
  { src: "noodles", alt: "Instant noodles and world foods", tall: true },
  { src: "frozen", alt: "Frozen food freezers" },
  { src: "beer", alt: "Beers and ciders" },
  { src: "wine", alt: "Wine selection", tall: true },
  { src: "spirits", alt: "Spirits and off licence" },
  { src: "soft-drinks", alt: "Soft drinks" },
  { src: "water", alt: "Bottled water" },
];

export default function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const close = () => setIndex(null);
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + photos.length) % photos.length)),
    []
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, step]);

  return (
    <section id="gallery" className="section bg-white">
      <div className="container">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <span className="eyebrow">Inside Our Store</span>
          <h2 className="text-3xl md:text-4xl">Take a look around</h2>
          <p className="mt-4 text-ink/70">Bright, tidy aisles packed with everything from fresh bread to a chilled bottle of wine.</p>
        </Reveal>

        <div className="grid grid-flow-dense auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4 md:gap-4">
          {photos.map((p, i) => (
            <button
              key={p.src}
              onClick={() => setIndex(i)}
              className={`group relative overflow-hidden rounded-2xl bg-gray-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-bright ${
                p.wide ? "col-span-2" : ""
              } ${p.tall ? "row-span-2" : ""}`}
              aria-label={`View photo: ${p.alt}`}
            >
              <Photo name={p.src} alt={p.alt} sizes="(min-width: 768px) 25vw, 50vw" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <span className="absolute inset-0 bg-ink/0 transition group-hover:bg-ink/10" />
            </button>
          ))}
        </div>

        <p className="mt-6 flex items-start justify-center gap-2 text-center text-xs text-ink/70">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          Photos are for illustration only. Products, prices and promotions shown may differ from those currently in store.
        </p>
      </div>

      {index !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-4" role="dialog" aria-modal="true" onClick={close}>
          <button className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20" onClick={close} aria-label="Close">
            <X />
          </button>
          <button
            className="absolute left-3 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 md:left-8"
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            aria-label="Previous photo"
          >
            <ChevronLeft />
          </button>
          <figure className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img src={`${import.meta.env.BASE_URL}images/${photos[index].src}.jpg`} alt={photos[index].alt} className="max-h-[80vh] w-auto rounded-xl object-contain" />
            <figcaption className="mt-3 text-center text-sm text-white/80">
              {photos[index].alt} · {index + 1} / {photos.length}
            </figcaption>
          </figure>
          <button
            className="absolute right-3 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 md:right-8"
            onClick={(e) => { e.stopPropagation(); step(1); }}
            aria-label="Next photo"
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </section>
  );
}
