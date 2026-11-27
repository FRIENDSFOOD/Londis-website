import { Apple, Candy, Gift, Smartphone, SprayCan, Wine } from "lucide-react";
import Reveal from "@/components/Reveal";

const categories = [
  { Icon: Apple, title: "Fresh Groceries & Bakery", text: "Fruit, veg, dairy, bread and chilled favourites, restocked daily." },
  { Icon: Wine, title: "Beers, Wines & Spirits", text: "A great range of chilled beers, ciders, wines and spirits." },
  { Icon: Candy, title: "Snacks & Confectionery", text: "Crisps, chocolate, sweets and soft drinks for every craving." },
  { Icon: SprayCan, title: "Household Essentials", text: "Cleaning, toiletries, baby care and all the home basics." },
  { Icon: Smartphone, title: "Mobile Top-ups & Essentials", text: "Top up your phone and pick up chargers, batteries and more." },
  { Icon: Gift, title: "Seasonal Offers", text: "Festive treats, party supplies and great-value deals all year." },
];

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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(({ Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 70}>
              <div className="card group h-full p-7 transition hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-brand-light text-brand transition group-hover:bg-brand group-hover:text-white">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg">{title}</h3>
                <p className="mt-2 text-sm text-ink/70">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
