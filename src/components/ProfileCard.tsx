import { motion } from "framer-motion";
import { Copy, Check, Activity } from "lucide-react";
import { useState } from "react";
import { SiteSettings } from "@/types";

interface Props {
  settings: SiteSettings;
}

export function ProfileCard({ settings }: Props) {
  const [copied, setCopied] = useState(false);
  const username = "piyushkumarexe";

  const copy = async () => {
    await navigator.clipboard.writeText(username);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="glass-strong relative mx-auto max-w-md rounded-3xl p-8"
    >
      <div className="absolute -inset-px rounded-3xl bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
      <div className="relative flex items-center gap-5">
        <div className="relative">
          <img
            src={settings.avatarUrl}
            alt={settings.name}
            className="h-20 w-20 rounded-2xl object-cover ring-1 ring-white/20"
          />
          <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-black">
            <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-semibold text-white">{settings.name}</h3>
          <p className="text-white/60">@{username}</p>
          <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/30">
            <Activity className="h-3 w-3" />
            {settings.status}
          </div>
        </div>
      </div>

      <div className="relative mt-6 flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
        <span className="text-sm text-white/60">Last active</span>
        <span className="text-sm font-medium text-white">Just now</span>
      </div>

      <button
        onClick={copy}
        className="group relative mt-4 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-white/10 px-4 py-3 text-sm font-medium text-white transition-all hover:bg-white/20"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? "Copied username" : "Copy username"}
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      </button>
    </motion.div>
  );
}
