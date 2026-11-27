import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { site, type DayHours, type SeasonalHours, type Service } from "@/config/site";
import { supabase } from "@/lib/supabase";

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

export async function fetchSettings(): Promise<Settings> {
  if (!supabase) return defaultSettings;
  const { data, error } = await supabase.from("site_settings").select("data").eq("id", 1).maybeSingle();
  if (error) throw error;
  return mergeSettings(data?.data as Partial<Settings>);
}

export async function saveSettings(s: Settings) {
  if (!supabase) throw new Error("Supabase is not connected");
  const { error } = await supabase
    .from("site_settings")
    .upsert({ id: 1, data: s, updated_at: new Date().toISOString() });
  if (error) throw error;
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
