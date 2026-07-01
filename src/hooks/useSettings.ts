import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { defaultSettings, SiteSettings } from "@/types";

export function useSettings() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("settings")
        .select("*")
        .order("id", { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;
      if (data) {
        const merged: SiteSettings = {
          ...defaultSettings,
          ...(data as unknown as SiteSettings),
          socials: data.socials || defaultSettings.socials,
          theme: { ...defaultSettings.theme, ...(data.theme || {}) },
          video: { ...defaultSettings.video, ...(data.video || {}) },
          effects: { ...defaultSettings.effects, ...(data.effects || {}) },
        };
        setSettings(merged);
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (next: Partial<SiteSettings>) => {
    const merged = { ...settings, ...next };
    setSettings(merged);
    try {
      const payload = { ...merged, id: settings.id ?? 1 };
      const { error } = await supabase.from("settings").upsert(payload);
      if (error) throw error;
    } catch (e) {
      console.error("Failed to update settings:", e);
    }
  };

  useEffect(() => {
    fetchSettings();

    const channel = supabase
      .channel("settings_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "settings" },
        () => fetchSettings()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { settings, loading, error, updateSettings };
}
