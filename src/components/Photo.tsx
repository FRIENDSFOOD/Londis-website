import type { ImgHTMLAttributes } from "react";

/** Photos that are taller than they are wide. */
const PORTRAIT = new Set(["coffee", "noodles", "wine"]);

/**
 * Responsive store photo from /public/images.
 * Serves 800px / 1600px WebP versions and the full 2000px JPG, so phones get a light
 * file and large / high-density screens get the sharpest version.
 */
export default function Photo({
  name,
  sizes = "(min-width: 1024px) 25vw, 50vw",
  ...rest
}: { name: string; sizes?: string } & Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet">) {
  const base = `${import.meta.env.BASE_URL}images/${name}`;
  const p = PORTRAIT.has(name);
  const srcSet = p
    ? `${base}-800.webp 528w, ${base}-1600.webp 1056w, ${base}.jpg 1328w`
    : `${base}-800.webp 800w, ${base}-1600.webp 1600w, ${base}.jpg 2000w`;
  return <img src={`${base}.jpg`} srcSet={srcSet} sizes={sizes} loading="lazy" decoding="async" {...rest} />;
}
