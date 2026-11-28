import { beforeAll, describe, expect, it } from "vitest";
import { exportJWK, generateKeyPair, SignJWT, type KeyLike } from "jose";
import { requireAdmin, useLocalKeysForTesting } from "./access";
import { onRequestPut } from "../api/admin/settings";
import { site } from "../../src/config/site";

const TEAM = "londis-test.cloudflareaccess.com";
const AUD = "test-aud-123";
const ADMIN = "owner@example.com";
let priv: KeyLike;
let jwks: unknown;
let otherPriv: KeyLike;

beforeAll(async () => {
  const kp = await generateKeyPair("RS256");
  priv = kp.privateKey;
  const pub = await exportJWK(kp.publicKey);
  jwks = { keys: [{ ...pub, kid: "k1", alg: "RS256", use: "sig" }] };
  otherPriv = (await generateKeyPair("RS256")).privateKey;
  // Stand in for Cloudflare's public signing keys
  useLocalKeysForTesting(TEAM, jwks as never);
});

const token = (opts: { email?: string; aud?: string; key?: KeyLike; iss?: string } = {}) =>
  new SignJWT({ email: opts.email ?? ADMIN })
    .setProtectedHeader({ alg: "RS256", kid: "k1" })
    .setIssuer(opts.iss ?? `https://${TEAM}`)
    .setAudience(opts.aud ?? AUD)
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(opts.key ?? priv);

const env = (over: Record<string, unknown> = {}) => {
  const store = new Map<string, string>();
  return {
    ACCESS_TEAM_DOMAIN: TEAM,
    ACCESS_AUD: AUD,
    ADMIN_EMAILS: `${ADMIN}, manager@example.com`,
    SETTINGS: {
      get: async (k: string, t?: string) =>
        store.has(k) ? (t === "json" ? JSON.parse(store.get(k)!) : store.get(k)) : null,
      put: async (k: string, v: string) => void store.set(k, v),
    },
    _store: store,
    ...over,
  } as never;
};
const req = (jwt?: string, init: RequestInit = {}) =>
  new Request("https://friendsfood.co.uk/api/admin/settings", {
    ...init,
    headers: { ...(jwt ? { "cf-access-jwt-assertion": jwt } : {}), ...(init.headers as Record<string, string>) },
  });

describe("Cloudflare Access check (requireAdmin)", () => {
  it("lets the admin in", async () => {
    expect(await requireAdmin(req(await token()), env())).toEqual({ ok: true, email: ADMIN });
  });
  it("is case-insensitive on email", async () => {
    expect((await requireAdmin(req(await token({ email: "Owner@Example.com" })), env())).ok).toBe(true);
  });
  it("blocks a signed-in user who is not on the list", async () => {
    expect(await requireAdmin(req(await token({ email: "stranger@example.com" })), env())).toMatchObject({
      ok: false,
      status: 403,
    });
  });
  it("blocks requests with no login token", async () => {
    expect(await requireAdmin(req(), env())).toMatchObject({ ok: false, status: 401 });
  });
  it("blocks forged tokens (wrong key, wrong audience, wrong issuer)", async () => {
    for (const t of [
      await token({ key: otherPriv }),
      await token({ aud: "other-app" }),
      await token({ iss: "https://evil.cloudflareaccess.com" }),
    ])
      expect(await requireAdmin(req(t), env())).toMatchObject({ ok: false, status: 401 });
  });
  it("fails closed when not configured", async () => {
    expect(await requireAdmin(req(await token()), env({ ADMIN_EMAILS: "" }))).toMatchObject({ ok: false, status: 500 });
  });
});

describe("Saving settings (PUT /api/admin/settings)", () => {
  const body = () => JSON.stringify({ hours: site.hours, seasonalHours: [], services: site.services });
  const put = async (jwt: string | undefined, b: string, e = env(), headers: Record<string, string> = {}) =>
    onRequestPut({
      request: req(jwt, { method: "PUT", body: b, headers: { "content-type": "application/json", ...headers } }),
      env: e,
    } as never);

  it("saves valid settings for the admin and records who saved", async () => {
    const e = env();
    const res = await put(await token(), body(), e);
    expect(res.status).toBe(200);
    const saved = JSON.parse((e as { _store: Map<string, string> })._store.get("settings")!);
    expect(saved.updatedBy).toBe(ADMIN);
    expect(saved.data.hours[0]).toEqual({ day: "Monday", open: "07:00", close: "23:00" });
  });
  it("refuses saves without login", async () => {
    expect((await put(undefined, body())).status).toBe(401);
  });
  it("refuses saves from another website (origin check)", async () => {
    expect((await put(await token(), body(), env(), { origin: "https://evil.example" })).status).toBe(403);
  });
  it("refuses invalid data", async () => {
    expect((await put(await token(), JSON.stringify({ hours: [] }))).status).toBe(422);
    expect((await put(await token(), "{not json")).status).toBe(400);
  });
  it("refuses oversized requests", async () => {
    expect((await put(await token(), "x".repeat(70_000))).status).toBe(413);
  });
});
