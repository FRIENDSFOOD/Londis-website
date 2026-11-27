import { Info } from "lucide-react";
import Reveal from "@/components/Reveal";
import Photo from "@/components/Photo";

const categories = [
  { img: "aisle-fresh", title: "Fresh & Bakery", text: "Bread, fruit, veg and cupboard staples, restocked daily." },
  { img: "chilled", title: "Chilled & Dairy", text: "Milk, cheese, yoghurts, meats and ready-to-eat favourites." },
  { img: "frozen", title: "Frozen Food", text: "Pizzas, ice cream, ready meals and freezer essentials." },
  { img: "snacks", title: "Snacks & Confectionery", text: "Crisps, chocolate, sweets and treats for every craving." },
  { img: "beer", title: "Beers & Ciders", text: "Ice-cold lagers, ales and ciders — singles and multipacks." },
  { img: "wine", title: "Wines & Spirits", text: "Reds, whites, rosé, fizz and popular spirits." },
  { img: "soft-drinks", title: "Soft Drinks & Water", text: "Fizzy drinks, juices, energy drinks and bottled water." },
  { img: "noodles", title: "World Foods", text: "Instant noodles and flavours from around the world." },
];

const alsoInStore = ["Household essentials", "Toiletries", "Coffee to go", "Mobile top-ups", "Seasonal offers"];

export default function Categories() {
  return (
    <section id="products" className="section bg-white">
      <div className="container">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <span className="eyebrow">Our Products</span>
          <h2 className="text-3xl md:text-4xl">Everything you need, all in one place</h2>
          <p className="mt-4 text-ink/70">
            From your morning milk to a last-minute dinner, we keep the shelves full of the things you use every day.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {categories.map((c, i) => (
            <Reveal key={c.title} delay={(i % 4) * 70}>
              <article className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 shadow-card">
                <Photo
                  name={c.img}
                  alt={c.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
                  <h3 className="text-base leading-tight sm:text-xl">{c.title}</h3>
                  <p className="mt-1 hidden text-sm text-white/85 sm:block">{c.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <span className="mr-1 text-sm font-semibold text-ink/70">Also in store:</span>
          {alsoInStore.map((x) => (
            <span key={x} className="rounded-full bg-brand-light px-3 py-1.5 text-sm font-medium">
              {x}
            </span>
          ))}
        </div>
        <p className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-ink/70">
          <Info className="h-3.5 w-3.5 shrink-0" /> Photos taken in our store. Products and prices may vary.
        </p>
      </div>
    </section>
  );
}
