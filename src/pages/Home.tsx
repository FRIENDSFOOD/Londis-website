import Hero from "@/components/home/Hero";
import QuickInfo from "@/components/home/QuickInfo";
import Categories from "@/components/home/Categories";
import Delivery from "@/components/home/Delivery";
import Services from "@/components/home/Services";
import Gallery from "@/components/home/Gallery";
import About from "@/components/home/About";
import Location from "@/components/home/Location";
import Tagline from "@/components/home/Tagline";

/** Home page — sections in order. Reorder here to move a section. */
export default function Home() {
  return (
    <>
      <Hero />
      <QuickInfo />
      <Categories />
      <Delivery />
      <Services />
      <Gallery />
      <About />
      <Location />
      <Tagline />
    </>
  );
}
