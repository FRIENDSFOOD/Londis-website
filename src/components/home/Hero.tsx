import { Link } from "react-router-dom";
import { ArrowRight, Bike, ShoppingBasket } from "lucide-react";
import Photo from "@/components/Photo";
import { site } from "@/config/site";

/**
 * Banner: deep-green text panel on the left, the real shop photo shown clearly on the right
 * (on phones the photo sits on top, text below).
 */
export default function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden bg-forest text-white">
      {/* Photo: top on phones, right-hand 60% on desktop, fading into the green panel */}
      <div className="relative h-64 sm:h-80 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[60%]">
        <Photo
          name="storefront"
          sizes="(min-width: 1024px) 60vw, 100vw"
          loading="eager"
          fetchPriority="high"
          alt="The Londis shop front on Bath Lane, Leicester"
          className="h-full w-full object-cover object-[center_88%]"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-forest to-transparent lg:inset-y-0 lg:left-0 lg:h-auto lg:w-2/5 lg:bg-gradient-to-r" />
      </div>

      <div className="container relative pb-24 pt-6 lg:flex lg:min-h-[600px] lg:items-center lg:pb-32 lg:pt-16">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider ring-1 ring-white/20">
            <span className="h-2 w-2 rounded-full bg-sun" />
            Open 7 days · Since {site.established}
          </span>
          <h1 className="mt-5 text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
            Big on choice.
            <br />
            <span className="text-londis">Close to home.</span>
          </h1>
          <p className="mt-4 font-script text-2xl font-semibold text-sun sm:text-3xl">Your local Londis on Bath Lane</p>
          <p className="mt-4 max-w-lg text-base text-white/85 sm:text-lg">
            Fresh groceries, cold drinks, off licence, everyday essentials and handy services — open early till late,
            right in the heart of Leicester.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/#delivery" className="btn bg-sun text-ink hover:brightness-95">
              <Bike className="h-4 w-4" /> Order Delivery
            </Link>
            <Link to="/#products" className="btn-outline">
              <ShoppingBasket className="h-4 w-4" /> Browse Products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
