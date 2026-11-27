import { Component, type ReactNode } from "react";
import { site } from "@/config/site";

/** If anything on a page crashes, show a friendly message instead of a blank screen. */
export default class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    console.error(error);
  }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="container py-24 text-center">
        <h1 className="text-3xl">Sorry, something went wrong</h1>
        <p className="mt-3 text-ink/70">
          Please refresh the page. You can also call us on{" "}
          <a className="font-semibold underline" href={site.phoneHref}>
            {site.phone}
          </a>
          .
        </p>
        <button className="btn-primary mt-8" onClick={() => location.reload()}>
          Refresh
        </button>
      </div>
    );
  }
}
