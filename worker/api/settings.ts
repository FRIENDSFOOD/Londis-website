import { json, SETTINGS_KEY, type Handler, type StoredSettings } from "../lib/env";

/** Public: the live hours, seasonal hours and services shown on the website. */
export const onRequestGet: Handler = async ({ env }) => {
  const stored = await env.SETTINGS.get<StoredSettings>(SETTINGS_KEY, "json");
  // Short cache so edits appear within a minute while keeping the site fast
  return json({ data: stored?.data ?? null }, 200, { "cache-control": "public, max-age=60" });
};
