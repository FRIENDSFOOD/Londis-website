import { Link } from "react-router-dom";
import Photo from "@/components/Photo";
import { Bike, Clock, ShoppingBasket } from "lucide-react";
import { site } from "@/config/site";

export default function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden">
      <Photo
        name="storefront"
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        alt="The Londis Supermarket shop front on Bath Lane, Leicester"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_80%]"
      />
      <div className="absolute inset-0 -z-10 bg-ink/75 md:bg-transparent md:bg-gradient-to-r md:from-ink/90 md:via-ink/65 md:to-ink/10" />

      <div className="container flex min-h-[500px] flex-col justify-center pb-24 pt-14 md:min-h-[640px] md:pb-28 md:pt-20">
        <div className="max-w-2xl text-white">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white ring-1 ring-white/30 backdrop-blur">
            <Clock className="h-3.5 w-3.5" />
            Open 7 days · Since {site.established}
          </span>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
            Your local supermarket on Bath Lane, Leicester
          </p>
          <h1 className="mt-3 text-5xl leading-[1.05] sm:text-6xl md:text-7xl">
            Big on choice.
            <br />
            Close to home.
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/85 sm:text-lg">
            Fresh groceries, cold drinks, tasty treats and all the everyday bits you need — just around the corner.
            We're proud to serve our neighbours across Leicester with great value and a warm welcome.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/#delivery" className="btn bg-white text-ink hover:bg-brand-light">
              <Bike className="h-4 w-4" /> Order Delivery
            </Link>
            <Link to="/#products" className="btn-outline">
              <ShoppingBasket className="h-4 w-4" /> Browse Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
