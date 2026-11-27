import Hero from "@/components/home/Hero";
import Delivery from "@/components/home/Delivery";
import Categories from "@/components/home/Categories";
import Featured from "@/components/home/Featured";
import Services from "@/components/home/Services";
import Gallery from "@/components/home/Gallery";
import About from "@/components/home/About";
import Location from "@/components/home/Location";
import Tagline from "@/components/home/Tagline";

export default function Home() {
  return (
    <>
      <Hero />
      <Delivery />
      <Categories />
      <Featured />
      <Services />
      <Gallery />
      <About />
      <Location />
      <Tagline />
    </>
  );
}
