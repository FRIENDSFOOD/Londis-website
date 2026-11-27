import { Link } from "react-router-dom";

export default function Tagline() {
  return (
    <section className="border-t border-gray-200 bg-brand-light">
      <div className="container flex flex-col items-center justify-between gap-6 py-12 text-center md:flex-row md:text-left">
        <h2 className="text-2xl text-ink md:text-3xl">Fresh Food. Friendly Service. Always Local.</h2>
        <Link to="/contact" className="btn-primary">Get in touch</Link>
      </div>
    </section>
  );
}
