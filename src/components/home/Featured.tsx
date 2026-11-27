import Reveal from "@/components/Reveal";

const items = [
  { img: "/images/chilled.jpg", title: "Chilled & Fresh", text: "Milk, cheese, yoghurts, meats and ready-to-eat favourites, kept perfectly chilled." },
  { img: "/images/beer.jpg", title: "Drinks & Off Licence", text: "Ice-cold beers and ciders, quality wines and popular spirits for any occasion." },
  { img: "/images/aisle-fresh.jpg", title: "Everyday Essentials", text: "Fresh bread, fruit and veg, cupboard staples and soft drinks in one easy aisle." },
];

export default function Featured() {
  return (
    <section className="section bg-brand-light/50">
      <div className="container">
        <Reveal className="mb-12 max-w-2xl">
          <span className="eyebrow">In Store</span>
          <h2 className="text-3xl md:text-4xl">Shop our favourite aisles</h2>
        </Reveal>
        <div className="grid gap-8 md:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 100}>
              <article className="card group h-full overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl">{item.title}</h3>
                  <p className="mt-2 text-sm text-ink/70">{item.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
