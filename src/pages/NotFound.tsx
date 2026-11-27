import { usePageMeta } from "@/lib/usePageMeta";
import { Link } from "react-router-dom";

export default function NotFound() {
  usePageMeta("Page not found");
  return (
    <section className="section">
      <div className="container text-center">
        <p className="font-display text-7xl font-extrabold text-brand">404</p>
        <h1 className="mt-4 text-3xl">This aisle doesn't exist</h1>
        <p className="mt-3 text-ink/70">The page you're looking for couldn't be found.</p>
        <Link to="/" className="btn-primary mt-8">Back to home</Link>
      </div>
    </section>
  );
}
