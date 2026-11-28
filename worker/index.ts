/**
 * Cloudflare Worker for the Londis Bath Lane website.
 * - /api/* routes are handled here (public settings, protected admin).
 * - Everything else is the built website in dist/, served by Cloudflare's static assets
 *   (single-page-app fallback and the headers in public/_headers are applied by Cloudflare).
 */
import * as publicSettings from "./api/settings";
import * as adminMe from "./api/admin/me";
import * as adminSettings from "./api/admin/settings";
import { json, type Env, type Handler } from "./lib/env";

type Route = Partial<Record<"GET" | "PUT", Handler>>;

const routes: Record<string, Route> = {
  "/api/settings": { GET: publicSettings.onRequestGet },
  "/api/admin/me": { GET: adminMe.onRequestGet },
  "/api/admin/settings": { GET: adminSettings.onRequestGet, PUT: adminSettings.onRequestPut },
};

const apiHeaders = {
  "x-content-type-options": "nosniff",
  "x-frame-options": "DENY",
  "referrer-policy": "strict-origin-when-cross-origin",
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname.startsWith("/api/")) {
      const route = routes[pathname.replace(/\/+$/, "")];
      if (!route) return json({ error: "Not found" }, 404, apiHeaders);
      const handler = route[request.method as "GET" | "PUT"];
      if (!handler)
        return json({ error: "Method not allowed" }, 405, { ...apiHeaders, allow: Object.keys(route).join(", ") });
      try {
        const res = await handler({ request, env });
        for (const [k, v] of Object.entries(apiHeaders)) res.headers.set(k, v);
        return res;
      } catch (e) {
        console.error(e);
        return json({ error: "Server error" }, 500, apiHeaders);
      }
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
