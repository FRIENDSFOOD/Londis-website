import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import ErrorBoundary from "@/components/ErrorBoundary";

// Admin (and the Supabase login code) only downloads when someone opens /admin
const Admin = lazy(() => import("@/pages/Admin"));
// Other pages load when first visited, so the home page downloads less
const Careers = lazy(() => import("@/pages/Careers"));
const Contact = lazy(() => import("@/pages/Contact"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // wait for the page to render, then jump to the section
      const t = setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 50);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Toaster position="top-center" richColors />
      <ErrorBoundary>
        <Routes>
          <Route
            path="/admin"
            element={
              <Suspense fallback={<div className="grid min-h-screen place-items-center text-ink/70">Loading…</div>}>
                <Admin />
              </Suspense>
            }
          />
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </>
  );
}
