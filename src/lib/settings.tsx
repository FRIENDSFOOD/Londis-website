import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { site, type DayHours, type SeasonalHours, type Service } from "@/config/site";

export type Settings = {
  hours: DayHours[];
  seasonalHours: SeasonalHours[];
  services: Service[];
};

export const defaultSettings: Settings = {
  hours: site.hours,
  seasonalHours: site.seasonalHours,
  services: site.services,
};

/** Merge saved data over defaults so a partial/empty row never breaks the site. */
export function mergeSettings(data: Partial<Settings> | null | undefined): Settings {
  return {
    hours: Array.isArray(data?.hours) && data!.hours.length === 7 ? data!.hours : defaultSettings.hours,
    seasonalHours: Array.isArray(data?.seasonalHours) ? data!.seasonalHours : defaultSettings.seasonalHours,
    services: Array.isArray(data?.services) ? data!.services : defaultSettings.services,
  };
}

/**
 * Public read of the live settings from the Cloudflare function at /api/settings.
 * If it isn't available (local dev without Cloudflare, or a preview), the site
 * simply uses the defaults from src/config/site.ts.
 */
export async function fetchSettings(): Promise<Settings> {
  const res = await fetch(`${import.meta.env.BASE_URL}api/settings`, { headers: { accept: "application/json" } });
  if (!res.ok || !(res.headers.get("content-type") || "").includes("application/json")) return defaultSettings;
  const body = (await res.json()) as { data?: Partial<Settings> | null };
  return mergeSettings(body.data);
}

type Ctx = { settings: Settings; reload: () => Promise<void> };
const SettingsContext = createContext<Ctx>({ settings: defaultSettings, reload: async () => {} });

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const reload = useCallback(async () => {
    try {
      setSettings(await fetchSettings());
    } catch (e) {
      console.warn("Could not load live settings, using defaults", e);
    }
  }, []);
  useEffect(() => {
    reload();
  }, [reload]);
  return <SettingsContext.Provider value={{ settings, reload }}>{children}</SettingsContext.Provider>;
}

export const useSettings = () => useContext(SettingsContext);
