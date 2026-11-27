import { useEffect } from "react";

const DEFAULT_TITLE = "Londis Bath Lane, Leicester | Big on choice. Close to home.";

/** Sets the browser tab title (and description) for each page. */
export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} | Londis Bath Lane, Leicester` : DEFAULT_TITLE;
    const meta = document.querySelector('meta[name="description"]');
    const prev = meta?.getAttribute("content");
    if (meta && description) meta.setAttribute("content", description);
    return () => {
      if (meta && prev) meta.setAttribute("content", prev);
    };
  }, [title, description]);
}
