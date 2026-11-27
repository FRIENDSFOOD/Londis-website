/**
 * "Our Products" section. Each card uses a photo from /public/images (name without extension).
 * Add, remove or reorder cards here.
 */
export type ProductCategory = { img: string; title: string; text: string };

export const categories: ProductCategory[] = [
  { img: "aisle-fresh", title: "Fresh & Bakery", text: "Bread, fruit, veg and cupboard staples, restocked daily." },
  { img: "chilled", title: "Chilled & Dairy", text: "Milk, cheese, yoghurts, meats and ready-to-eat favourites." },
  { img: "frozen", title: "Frozen Food", text: "Pizzas, ice cream, ready meals and freezer essentials." },
  { img: "snacks", title: "Snacks & Confectionery", text: "Crisps, chocolate, sweets and treats for every craving." },
  { img: "beer", title: "Beers & Ciders", text: "Ice-cold lagers, ales and ciders — singles and multipacks." },
  { img: "wine", title: "Wines & Spirits", text: "Reds, whites, rosé, fizz and popular spirits." },
  { img: "soft-drinks", title: "Soft Drinks & Water", text: "Fizzy drinks, juices, energy drinks and bottled water." },
  { img: "noodles", title: "World Foods", text: "Instant noodles and flavours from around the world." },
];

/** Shown as small tags under the photo cards. */
export const alsoInStore: string[] = [
  "Household essentials",
  "Toiletries",
  "Coffee to go",
  "Mobile top-ups",
  "Seasonal offers",
];
