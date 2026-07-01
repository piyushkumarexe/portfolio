import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { VisitorSession, DailyStat } from "@/types";

function getDevice() {
  const ua = navigator.userAgent;
  if (/Mobi|Android/i.test(ua)) return "Mobile";
  if (/Tablet|iPad/i.test(ua)) return "Tablet";
  return "Desktop";
}

function getBrowser() {
  const ua = navigator.userAgent;
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Safari")) return "Safari";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Edge")) return "Edge";
  return "Other";
}

export function useVisitors(sessionId: string, enabled = true) {
  const [online, setOnline] = useState(0);
  const [today, setToday] = useState(0);
  const [total, setTotal] = useState(0);
  const [unique, setUnique] = useState(0);
  const [returning, setReturning] = useState(0);
  const [recent, setRecent] = useState<VisitorSession[]>([]);
  const [weekly, setWeekly] = useState<DailyStat[]>([]);
  const [monthly, setMonthly] = useState<DailyStat[]>([]);
  const [countries, setCountries] = useState<Record<string, number>>({});
  const [devices, setDevices] = useState<Record<string, number>>({});
  const [browsers, setBrowsers] = useState<Record<string, number>>({});

  const heartbeat = useCallback(async () => {
    if (!enabled || !sessionId) return;
    try {
      await supabase.from("visitors").upsert(
        {
          session_id: sessionId,
          last_active: new Date().toISOString(),
          device: getDevice(),
          browser: getBrowser(),
          country: Intl.DateTimeFormat().resolvedOptions().timeZone,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        { onConflict: "session_id" }
      );
    } catch {
      // ignore
    }
  }, [enabled, sessionId]);

  const fetchStats = useCallback(async () => {
    try {
      const { data } = await supabase.from("visitors").select("*");
      const rows: VisitorSession[] = (data as VisitorSession[]) ?? [];
      const now = new Date();
      const fiveMinAgo = new Date(now.getTime() - 5 * 60 * 1000).toISOString();
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();

      setTotal(rows.length);
      setOnline(rows.filter((r) => r.last_active > fiveMinAgo).length);
      setToday(rows.filter((r) => r.last_active >= todayStart).length);
      setUnique(rows.filter((r) => r.visits_count === 1).length);
      setReturning(rows.filter((r) => r.visits_count > 1).length);
      setRecent(
        rows.sort((a, b) => b.last_active.localeCompare(a.last_active)).slice(0, 20)
      );

      const countryMap: Record<string, number> = {};
      const deviceMap: Record<string, number> = {};
      const browserMap: Record<string, number> = {};
      const weeklyMap: Record<string, number> = {};
      const monthlyMap: Record<string, number> = {};

      rows.forEach((r) => {
        countryMap[r.country || "Unknown"] = (countryMap[r.country || "Unknown"] || 0) + 1;
        deviceMap[r.device || "Unknown"] = (deviceMap[r.device || "Unknown"] || 0) + 1;
        browserMap[r.browser || "Unknown"] = (browserMap[r.browser || "Unknown"] || 0) + 1;

        const date = r.last_active.slice(0, 10);
        monthlyMap[date] = (monthlyMap[date] || 0) + 1;
        const rowDate = new Date(r.last_active);
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        if (rowDate >= weekAgo) {
          weeklyMap[date] = (weeklyMap[date] || 0) + 1;
        }
      });

      setCountries(countryMap);
      setDevices(deviceMap);
      setBrowsers(browserMap);
      setWeekly(Object.entries(weeklyMap).map(([date, count]) => ({ date, count })).sort((a, b) => a.date.localeCompare(b.date)));
      setMonthly(Object.entries(monthlyMap).map(([date, count]) => ({ date, count })).sort((a, b) => a.date.localeCompare(b.date)));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;
    heartbeat();
    fetchStats();
    const interval = setInterval(() => {
      heartbeat();
      fetchStats();
    }, 15000);
    return () => clearInterval(interval);
  }, [enabled, heartbeat, fetchStats]);

  return {
    online,
    today,
    total,
    unique,
    returning,
    recent,
    weekly,
    monthly,
    countries,
    devices,
    browsers,
  };
}
