import { describe, expect, it } from "vitest";
import { site } from "@/config/site";
import { validateSettings } from "./validateSettings";

const good = () => ({
  hours: structuredClone(site.hours),
  seasonalHours: [{ name: "Christmas Day", date: "2026-12-25", closed: true }],
  services: structuredClone(site.services),
});

describe("validateSettings (server-side check on every admin save)", () => {
  it("accepts the default settings", () => {
    const r = validateSettings(good());
    expect(r.ok).toBe(true);
  });
  it("rejects missing or reordered days", () => {
    const s = good();
    s.hours = s.hours.slice(0, 6);
    expect(validateSettings(s).ok).toBe(false);
    const t = good();
    [t.hours[0], t.hours[1]] = [t.hours[1], t.hours[0]];
    expect(validateSettings(t).ok).toBe(false);
  });
  it("rejects bad times and closing before opening", () => {
    const s = good();
    s.hours[0] = { day: "Monday", open: "7am", close: "23:00" };
    expect(validateSettings(s).ok).toBe(false);
    const t = good();
    t.hours[0] = { day: "Monday", open: "23:00", close: "07:00" };
    expect(validateSettings(t).ok).toBe(false);
  });
  it("blocks script injection in logo file names and unknown icons", () => {
    const s = good();
    s.services[0].logo = '"><script>alert(1)</script>.png';
    expect(validateSettings(s).ok).toBe(false);
    const t = good();
    t.services[0].icon = "javascript:alert(1)";
    expect(validateSettings(t).ok).toBe(false);
  });
  it("limits text length and list sizes", () => {
    const s = good();
    s.services[0].description = "x".repeat(201);
    expect(validateSettings(s).ok).toBe(false);
    const t = good();
    t.seasonalHours = Array.from({ length: 61 }, (_, i) => ({ name: `E${i}`, date: "2027-01-01", closed: true }));
    expect(validateSettings(t).ok).toBe(false);
  });
  it("drops unknown fields so nothing unexpected is stored", () => {
    const s = good() as Record<string, unknown> & ReturnType<typeof good>;
    (s.services[0] as Record<string, unknown>).evil = "<img onerror=alert(1)>";
    s.extra = "x";
    const r = validateSettings(s);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(JSON.stringify(r.value)).not.toContain("evil");
      expect(JSON.stringify(r.value)).not.toContain("extra");
    }
  });
  it("checks date ranges", () => {
    const s = good();
    s.seasonalHours = [{ name: "Summer", from: "2027-08-31", to: "2027-07-01", open: "08:00", close: "22:00" }] as never;
    expect(validateSettings(s).ok).toBe(false);
  });
});
