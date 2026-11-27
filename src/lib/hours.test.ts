import { describe, expect, it } from "vitest";
import type { DayHours, SeasonalHours } from "@/config/site";
import { fmtRange, isOpenNow, openStatus, todaysHours, upcomingSeasonal } from "./hours";

const hours: DayHours[] = [
  { day: "Monday", open: "07:00", close: "23:00" },
  { day: "Tuesday", open: "07:00", close: "23:00" },
  { day: "Wednesday", open: "07:00", close: "23:00" },
  { day: "Thursday", open: "07:00", close: "23:00" },
  { day: "Friday", open: "07:00", close: "23:00" },
  { day: "Saturday", open: "07:00", close: "23:00" },
  { day: "Sunday", open: "08:00", close: "23:00" },
];
const seasonal: SeasonalHours[] = [
  { name: "Christmas Eve", date: "2026-12-24", open: "07:00", close: "20:00" },
  { name: "Christmas Day", date: "2026-12-25", closed: true },
  { name: "Boxing Day", date: "2026-12-26", open: "09:00", close: "21:00" },
];
// local-time helper: d(2026, 11, 27, 9, 30) = 27 Nov 2026 09:30
const d = (y: number, m: number, day: number, h = 12, min = 0) => new Date(y, m - 1, day, h, min);

describe("fmtRange", () => {
  it("formats open hours and closed days", () => {
    expect(fmtRange("07:00", "23:00")).toBe("07:00 – 23:00");
    expect(fmtRange("07:00", "23:00", true)).toBe("Closed");
  });
});

describe("regular hours", () => {
  it("is open on a Friday afternoon", () => {
    expect(isOpenNow(hours, [], d(2026, 11, 27, 15))).toBe(true);
  });
  it("is closed before opening and at closing time", () => {
    expect(isOpenNow(hours, [], d(2026, 11, 27, 6, 59))).toBe(false);
    expect(isOpenNow(hours, [], d(2026, 11, 27, 23, 0))).toBe(false);
  });
  it("uses Sunday's later opening", () => {
    expect(isOpenNow(hours, [], d(2026, 11, 29, 7, 30))).toBe(false);
    expect(isOpenNow(hours, [], d(2026, 11, 29, 8, 0))).toBe(true);
  });
});

describe("openStatus", () => {
  it("says when it closes", () => {
    expect(openStatus(hours, [], d(2026, 11, 27, 15))).toEqual({ open: true, text: "Open until 23:00" });
  });
  it("says when it opens later today", () => {
    expect(openStatus(hours, [], d(2026, 11, 27, 6))).toEqual({ open: false, text: "Opens at 07:00" });
  });
  it("says when it opens tomorrow (Saturday night → Sunday 08:00)", () => {
    expect(openStatus(hours, [], d(2026, 11, 28, 23, 30))).toEqual({ open: false, text: "Opens tomorrow at 08:00" });
  });
  it("skips a closed holiday", () => {
    // Christmas Eve 21:00 → closed Christmas Day → opens Boxing Day 09:00 (a Saturday)
    expect(openStatus(hours, seasonal, d(2026, 12, 24, 21))).toEqual({ open: false, text: "Opens Saturday at 09:00" });
  });
});

describe("seasonal hours", () => {
  it("override normal hours on the day", () => {
    expect(todaysHours(hours, seasonal, d(2026, 12, 24, 10))).toMatchObject({
      close: "20:00",
      seasonal: "Christmas Eve",
    });
    expect(isOpenNow(hours, seasonal, d(2026, 12, 24, 20, 30))).toBe(false);
    expect(isOpenNow(hours, seasonal, d(2026, 12, 25, 12))).toBe(false);
  });
  it("are listed from 30 days before and disappear after", () => {
    expect(upcomingSeasonal(seasonal, d(2026, 11, 20)).map((s) => s.name)).toEqual([]);
    expect(upcomingSeasonal(seasonal, d(2026, 11, 27)).map((s) => s.name)).toEqual([
      "Christmas Eve",
      "Christmas Day",
      "Boxing Day",
    ]);
    expect(upcomingSeasonal(seasonal, d(2026, 12, 27)).map((s) => s.name)).toEqual([]);
  });
  it("support date ranges", () => {
    const range: SeasonalHours[] = [
      { name: "Summer", from: "2027-07-01", to: "2027-07-31", open: "08:00", close: "22:00" },
    ];
    expect(isOpenNow(hours, range, d(2027, 7, 15, 22, 30))).toBe(false);
    expect(isOpenNow(hours, range, d(2027, 8, 1, 22, 30))).toBe(true);
  });
});
