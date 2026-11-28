import { requireAdmin } from "../../_lib/access";
import { json, type Env } from "../../_lib/env";

/** Admin: who is signed in (used by the admin page). */
export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const auth = await requireAdmin(request, env);
  if (!auth.ok) return json({ error: auth.error }, auth.status);
  return json({ email: auth.email });
};
