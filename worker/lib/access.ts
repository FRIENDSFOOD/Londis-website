import { createLocalJWKSet, createRemoteJWKSet, jwtVerify, type JSONWebKeySet } from "jose";
import type { Env } from "./env";

/**
 * Verifies the Cloudflare Access login token on admin requests.
 * Cloudflare Access sits in front of /admin and /api/admin and adds a signed token;
 * we check that signature here too (defence in depth) and that the email is on the allow-list.
 * Fails closed: if anything is missing or misconfigured, access is denied.
 */
type KeySource = ReturnType<typeof createRemoteJWKSet> | ReturnType<typeof createLocalJWKSet>;
const jwksCache = new Map<string, KeySource>();

/** Tests only: supply Cloudflare's public keys directly instead of downloading them. */
export function useLocalKeysForTesting(teamDomain: string, keys: JSONWebKeySet) {
  jwksCache.set(`https://${teamDomain}`, createLocalJWKSet(keys));
}

export type AccessResult = { ok: true; email: string } | { ok: false; status: 401 | 403 | 500; error: string };

export async function requireAdmin(request: Request, env: Env): Promise<AccessResult> {
  const team = (env.ACCESS_TEAM_DOMAIN || "").trim();
  const aud = (env.ACCESS_AUD || "").trim();
  const allowed = (env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  if (!team || !aud || !allowed.length) return { ok: false, status: 500, error: "Admin login is not configured yet" };

  const token = request.headers.get("cf-access-jwt-assertion");
  if (!token) return { ok: false, status: 401, error: "Please sign in" };

  const issuer = `https://${team}`;
  let jwks = jwksCache.get(issuer);
  if (!jwks) {
    jwks = createRemoteJWKSet(new URL(`${issuer}/cdn-cgi/access/certs`));
    jwksCache.set(issuer, jwks);
  }
  try {
    const { payload } = await jwtVerify(token, jwks, { issuer, audience: aud });
    const email = typeof payload.email === "string" ? payload.email.toLowerCase() : "";
    if (!email || !allowed.includes(email)) return { ok: false, status: 403, error: "This account is not an admin" };
    return { ok: true, email };
  } catch {
    return { ok: false, status: 401, error: "Your sign-in has expired — please sign in again" };
  }
}
