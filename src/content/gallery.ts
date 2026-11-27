/**
 * "Inside our store" gallery. `src` is a photo name in /public/images (without extension).
 * `wide` spans two columns, `tall` spans two rows.
 */
export type GalleryPhoto = { src: string; alt: string; wide?: boolean; tall?: boolean };

export const photos: GalleryPhoto[] = [
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
