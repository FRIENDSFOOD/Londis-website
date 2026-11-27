import { usePageMeta } from "@/lib/usePageMeta";
import Hero from "@/components/home/Hero";
import Delivery from "@/components/home/Delivery";
import Categories from "@/components/home/Categories";
import Services from "@/components/home/Services";
import Gallery from "@/components/home/Gallery";
import About from "@/components/home/About";
import Location from "@/components/home/Location";
import Tagline from "@/components/home/Tagline";

export default function Home() {
  usePageMeta();
  return (
    <>
      <Hero />
      <Delivery />
      <Categories />
      <Services />
      <Gallery />
      <About />
      <Location />
      <Tagline />
    </>
  );
}
