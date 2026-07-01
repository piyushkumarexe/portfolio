import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { SiteSettings, VisitorSession } from "@/types";
import { useSessionId } from "@/hooks/useSession";
import { useVisitors } from "@/hooks/useVisitors";
import { AdminLogin } from "./AdminLogin";
import { AnalyticsCharts } from "./AnalyticsCharts";
import { SettingsEditor } from "./SettingsEditor";
import { Users, Activity, Clock, Globe, Monitor, Compass } from "lucide-react";

interface Props {
  settings: SiteSettings;
  onSettingsChange: (s: SiteSettings) => void;
}

export function AdminDashboard({ settings, onSettingsChange }: Props) {
  const [session, setSession] = useState<boolean | null>(null);
  const sessionId = useSessionId();
  const stats = useVisitors(sessionId, true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(!!data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(!!newSession);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  if (session === null) return null;
  if (!session) return <AdminLogin onLogin={() => setSession(true)} />;

  return (
    <div className="min-h-screen px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <button
            onClick={signOut}
            className="rounded-xl bg-white/10 px-5 py-2 text-sm text-white transition-colors hover:bg-white/20"
          >
            Sign out
          </button>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          <StatCard icon={Activity} label="Online" value={stats.online} />
          <StatCard icon={Clock} label="Today" value={stats.today} />
          <StatCard icon={Users} label="Total" value={stats.total} />
          <StatCard icon={Users} label="Unique" value={stats.unique} />
          <StatCard icon={Activity} label="Returning" value={stats.returning} />
          <StatCard icon={Globe} label="Countries" value={Object.keys(stats.countries).length} />
        </div>

        <div className="mb-8">
          <AnalyticsCharts weekly={stats.weekly} monthly={stats.monthly} />
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          <Breakdown title="Devices" data={stats.devices} icon={Monitor} />
          <Breakdown title="Browsers" data={stats.browsers} icon={Compass} />
        </div>

        <div className="mb-8">
          <h3 className="mb-4 text-lg font-medium text-white">Realtime Activity</h3>
          <div className="glass max-h-80 overflow-auto rounded-2xl p-4">
            <table className="w-full text-left text-sm text-white/70">
              <thead>
                <tr className="border-b border-white/10 text-white/50">
                  <th className="pb-3">Session</th>
                  <th className="pb-3">Device</th>
                  <th className="pb-3">Browser</th>
                  <th className="pb-3">Last active</th>
                </tr>
              </thead>
              <tbody>
                {stats.recent.map((r: VisitorSession) => (
                  <tr key={r.session_id} className="border-b border-white/5">
                    <td className="py-3 font-mono text-xs">{r.session_id.slice(0, 8)}</td>
                    <td className="py-3">{r.device}</td>
                    <td className="py-3">{r.browser}</td>
                    <td className="py-3">{new Date(r.last_active).toLocaleTimeString()}</td>
                  </tr>
                ))}
                {stats.recent.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-white/40">
                      No visitor data yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <SettingsEditor settings={settings} onSave={onSettingsChange} />
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: typeof Activity; label: string; value: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-4 text-center"
    >
      <Icon className="mx-auto mb-2 h-5 w-5 text-violet-400" />
      <p className="text-2xl font-bold text-white">{value.toLocaleString()}</p>
      <p className="text-xs text-white/50">{label}</p>
    </motion.div>
  );
}

function Breakdown({ title, data, icon: Icon }: { title: string; data: Record<string, number>; icon: typeof Monitor }) {
  const total = Object.values(data).reduce((a, b) => a + b, 0) || 1;
  return (
    <div className="glass rounded-2xl p-5">
      <div className="mb-4 flex items-center gap-2">
        <Icon className="h-5 w-5 text-violet-400" />
        <h4 className="font-medium text-white">{title}</h4>
      </div>
      <div className="space-y-3">
        {Object.entries(data)
          .sort((a, b) => b[1] - a[1])
          .map(([key, value]) => (
            <div key={key}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="text-white/70">{key}</span>
                <span className="text-white/50">{value}</span>
              </div>
              <div className="h-2 w-full rounded-full bg-white/10">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-blue-500"
                  style={{ width: `${(value / total) * 100}%` }}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
