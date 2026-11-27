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

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
export const isSupabaseConfigured = !!(SUPABASE_URL && SUPABASE_KEY);

/**
 * Public read of the live settings. Uses a plain HTTP request (no Supabase library),
 * so the public website stays small; the library is only loaded on /admin.
 */
export async function fetchSettings(): Promise<Settings> {
  if (!isSupabaseConfigured) return defaultSettings;
  const res = await fetch(`${SUPABASE_URL}/rest/v1/site_settings?id=eq.1&select=data`, {
    headers: { apikey: SUPABASE_KEY!, Authorization: `Bearer ${SUPABASE_KEY}` },
  });
  if (!res.ok) throw new Error(`Settings request failed (${res.status})`);
  const rows = (await res.json()) as { data?: Partial<Settings> }[];
  return mergeSettings(rows[0]?.data);
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
