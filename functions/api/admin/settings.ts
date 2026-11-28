import { validateSettings } from "../../../src/lib/validateSettings";
import { requireAdmin } from "../../_lib/access";
import { json, SETTINGS_KEY, type Env, type StoredSettings } from "../../_lib/env";

const MAX_BODY = 64 * 1024;

/** Admin: read the saved settings plus who last changed them. */
export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const auth = await requireAdmin(request, env);
  if (!auth.ok) return json({ error: auth.error }, auth.status);
  const stored = await env.SETTINGS.get<StoredSettings>(SETTINGS_KEY, "json");
  return json(stored ?? { data: null, updatedAt: null, updatedBy: null });
};

/** Admin: save new settings (validated strictly on the server). */
export const onRequestPut: PagesFunction<Env> = async ({ request, env }) => {
  const auth = await requireAdmin(request, env);
  if (!auth.ok) return json({ error: auth.error }, auth.status);

  // Same-origin check: only the admin page on this site may save
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return json({ error: "Forbidden" }, 403);
  if (!(request.headers.get("content-type") || "").includes("application/json"))
    return json({ error: "Expected JSON" }, 415);

  const raw = await request.text();
  if (raw.length > MAX_BODY) return json({ error: "Too large" }, 413);
  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const result = validateSettings(body);
  if (!result.ok) return json({ error: result.error }, 422);

  const stored: StoredSettings = { data: result.value, updatedAt: new Date().toISOString(), updatedBy: auth.email };
  await env.SETTINGS.put(SETTINGS_KEY, JSON.stringify(stored));
  return json(stored);
};
