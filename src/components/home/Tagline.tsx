import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { site } from "@/config/site";

export default function Tagline() {
  return (
    <section className="bg-sun">
      <div className="container flex flex-col items-center justify-between gap-6 py-12 text-center md:flex-row md:text-left">
        <div>
          <h2 className="text-2xl text-ink md:text-3xl">Fresh food. Friendly service. Always local.</h2>
          <p className="mt-1 text-ink/80">Questions or special requests? Message us — we're happy to help.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-forest text-white hover:bg-ink"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp us
          </a>
          <Link to="/contact" className="btn border-2 border-ink text-ink hover:bg-ink hover:text-white">
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
}
