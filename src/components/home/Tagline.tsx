import { Link } from "react-router-dom";

export default function Tagline() {
  return (
    <section className="bg-brand">
      <div className="container flex flex-col items-center justify-between gap-6 py-12 text-center md:flex-row md:text-left">
        <h2 className="text-2xl text-white md:text-3xl">
          Fresh Food. Friendly Service. <span className="underline decoration-brand-bright decoration-4 underline-offset-8">Always Local.</span>
        </h2>
        <Link to="/contact" className="btn bg-white text-brand hover:bg-brand-light">Get in touch</Link>
      </div>
    </section>
  );
}
