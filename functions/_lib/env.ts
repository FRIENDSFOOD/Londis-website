/** Bindings and settings available to the Cloudflare functions (set in wrangler.toml). */
export interface Env {
  /** KV storage holding the live settings (key: "settings"). */
  SETTINGS: KVNamespace;
  /** Cloudflare Access team domain, e.g. "friendsfood.cloudflareaccess.com". */
  ACCESS_TEAM_DOMAIN: string;
  /** Cloudflare Access application "Audience (AUD) tag" for the admin app. */
  ACCESS_AUD: string;
  /** Comma-separated list of emails allowed to save changes. */
  ADMIN_EMAILS: string;
}

export const SETTINGS_KEY = "settings";

export type StoredSettings = {
  data: unknown;
  updatedAt: string;
  updatedBy: string;
};

export const json = (body: unknown, status = 200, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...extra },
  });
