import { motion } from "framer-motion";
import { Check, Download, User, MessageCircle, Code2, Camera } from "lucide-react";
import { useState } from "react";

const buttons = [
  { id: "username", label: "Username", value: "piyushkumarexe", icon: User },
  { id: "discord", label: "Discord", value: "piyushkumarexe", icon: MessageCircle },
  { id: "github", label: "GitHub", value: "piyushkumarexe", icon: Code2 },
  { id: "instagram", label: "Instagram", value: "piyushkumar.exee", icon: Camera },
];

export function QuickActions() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (id: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const downloadVCard = () => {
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "FN:PIYUSH EXE",
      "NICKNAME:piyushkumarexe",
      "TITLE:Bot Developer",
      "URL:https://piyushkumarexe.dev",
      "END:VCARD",
    ].join("\n");
    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "piyush-exe.vcf";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="relative z-10 px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3"
      >
        {buttons.map((btn) => (
          <motion.button
            key={btn.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => copy(btn.id, btn.value)}
            className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-white/80 ring-1 ring-white/10 backdrop-blur-md transition-all hover:bg-white/10 hover:ring-white/20"
          >
            {copied === btn.id ? <Check className="h-4 w-4 text-emerald-400" /> : <btn.icon className="h-4 w-4" />}
            {copied === btn.id ? `Copied ${btn.label}` : `Copy ${btn.label}`}
          </motion.button>
        ))}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={downloadVCard}
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600/80 to-blue-600/80 px-4 py-2 text-sm text-white shadow-lg shadow-violet-900/30 backdrop-blur-md transition-all hover:opacity-90"
        >
          <Download className="h-4 w-4" />
          Download vCard
        </motion.button>
      </motion.div>
    </section>
  );
}
