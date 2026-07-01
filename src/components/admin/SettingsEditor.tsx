import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SiteSettings, SocialLink } from "@/types";
import { FileUploader } from "./FileUploader";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  settings: SiteSettings;
  onSave: (s: SiteSettings) => void;
}

export function SettingsEditor({ settings, onSave }: Props) {
  const [form, setForm] = useState<SiteSettings>(settings);

  useEffect(() => {
    setForm(settings);
  }, [settings]);

  const update = <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const updateSocial = (id: string, key: keyof SocialLink, value: string) => {
    setForm((f) => ({
      ...f,
      socials: f.socials.map((s) => (s.id === id ? { ...s, [key]: value } : s)),
    }));
  };

  const addSocial = () => {
    setForm((f) => ({
      ...f,
      socials: [...f.socials, { id: crypto.randomUUID(), label: "New", url: "#", icon: "Globe" }],
    }));
  };

  const removeSocial = (id: string) => {
    setForm((f) => ({ ...f, socials: f.socials.filter((s) => s.id !== id) }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-3xl p-6"
    >
      <h3 className="mb-6 text-xl font-semibold text-white">Site Settings</h3>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Field label="Name" value={form.name} onChange={(v) => update("name", v)} />
          <Field label="Subtitle" value={form.subtitle} onChange={(v) => update("subtitle", v)} />
          <Field label="Role" value={form.role} onChange={(v) => update("role", v)} />
          <Field label="Country" value={form.country} onChange={(v) => update("country", v)} />
          <Field label="Status" value={form.status} onChange={(v) => update("status", v)} />
          <FileUploader
            label="Profile Picture"
            folder="avatars"
            accept="image/*"
            onUpload={(url) => update("avatarUrl", url)}
          />
          <FileUploader
            label="Fallback Background"
            folder="backgrounds"
            accept="image/*"
            onUpload={(url) => update("video", { ...form.video, fallbackImage: url })}
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm text-white/70">Biography</label>
          <textarea
            value={form.biography}
            onChange={(e) => update("biography", e.target.value)}
            rows={4}
            className="w-full rounded-xl bg-white/5 p-3 text-white outline-none ring-1 ring-white/10 focus:ring-violet-500"
          />

          <label className="block text-sm text-white/70">Social Links</label>
          <div className="max-h-64 space-y-2 overflow-auto pr-2">
            {form.socials.map((s) => (
              <div key={s.id} className="flex gap-2">
                <input
                  value={s.label}
                  onChange={(e) => updateSocial(s.id, "label", e.target.value)}
                  placeholder="Label"
                  className="w-24 rounded-lg bg-white/5 px-3 py-2 text-sm text-white outline-none ring-1 ring-white/10"
                />
                <input
                  value={s.url}
                  onChange={(e) => updateSocial(s.id, "url", e.target.value)}
                  placeholder="URL"
                  className="flex-1 rounded-lg bg-white/5 px-3 py-2 text-sm text-white outline-none ring-1 ring-white/10"
                />
                <input
                  value={s.icon}
                  onChange={(e) => updateSocial(s.id, "icon", e.target.value)}
                  placeholder="Icon"
                  className="w-20 rounded-lg bg-white/5 px-3 py-2 text-sm text-white outline-none ring-1 ring-white/10"
                />
                <button
                  onClick={() => removeSocial(s.id)}
                  className="rounded-lg bg-rose-500/10 px-2 text-rose-400 hover:bg-rose-500/20"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={addSocial}
            className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20"
          >
            <Plus className="h-4 w-4" /> Add social
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-white/70">Video</h4>
          <Field
            label="Video URL"
            value={form.video.url}
            onChange={(v) => update("video", { ...form.video, url: v })}
          />
          <Range label="Overlay" min={0} max={1} step={0.05} value={form.video.overlay} onChange={(v) => update("video", { ...form.video, overlay: v })} />
          <Range label="Brightness" min={0.1} max={2} step={0.05} value={form.video.brightness} onChange={(v) => update("video", { ...form.video, brightness: v })} />
          <Range label="Blur" min={0} max={20} step={0.5} value={form.video.blur} onChange={(v) => update("video", { ...form.video, blur: v })} />
          <Range label="Playback Speed" min={0.25} max={2} step={0.25} value={form.video.playbackSpeed} onChange={(v) => update("video", { ...form.video, playbackSpeed: v })} />
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-white/70">Effects</h4>
          <Toggle label="Particles" value={form.effects.particles} onChange={(v) => update("effects", { ...form.effects, particles: v })} />
          <Toggle label="Cursor Glow" value={form.effects.cursor} onChange={(v) => update("effects", { ...form.effects, cursor: v })} />
          <Toggle label="Parallax" value={form.effects.parallax} onChange={(v) => update("effects", { ...form.effects, parallax: v })} />
          <Range label="Blur Strength" min={0} max={60} step={1} value={form.effects.blurStrength} onChange={(v) => update("effects", { ...form.effects, blurStrength: v })} />
          <Range label="Animation Speed" min={0.2} max={3} step={0.1} value={form.effects.animationSpeed} onChange={(v) => update("effects", { ...form.effects, animationSpeed: v })} />
        </div>
      </div>

      <button
        onClick={() => onSave(form)}
        className="mt-8 w-full rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 py-3 font-medium text-white transition-opacity hover:opacity-90"
      >
        Save Changes
      </button>
    </motion.div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="mb-1 block text-sm text-white/70">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl bg-white/5 px-4 py-2.5 text-white outline-none ring-1 ring-white/10 focus:ring-violet-500"
      />
    </div>
  );
}

function Range({ label, min, max, step, value, onChange }: { label: string; min: number; max: number; step: number; value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span className="text-white/70">{label}</span>
        <span className="text-white/50">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-violet-500"
      />
    </div>
  );
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between">
      <span className="text-sm text-white/70">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`relative h-6 w-11 rounded-full transition-colors ${value ? "bg-violet-600" : "bg-white/10"}`}
      >
        <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${value ? "left-6" : "left-1"}`} />
      </button>
    </label>
  );
}
