import { motion } from "framer-motion";
import {
  Sparkles,
  MousePointer,
  Music,
  Palette,
  Type,
  Share2,
  Copy,
  QrCode,
  Download,
  Search,
  Shield,
  Zap,
} from "lucide-react";

const features = [
  { icon: Sparkles, label: "Glassmorphism" },
  { icon: MousePointer, label: "Mouse Parallax" },
  { icon: Zap, label: "60 FPS Animations" },
  { icon: Music, label: "Music Toggle" },
  { icon: Palette, label: "Theme Toggle" },
  { icon: Type, label: "Typing Animation" },
  { icon: Share2, label: "Share Button" },
  { icon: Copy, label: "Copy Buttons" },
  { icon: QrCode, label: "QR Generator" },
  { icon: Download, label: "vCard Download" },
  { icon: Search, label: "SEO Optimized" },
  { icon: Shield, label: "Admin Panel" },
];

export function FeatureGrid() {
  return (
    <section className="relative z-10 px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center text-3xl font-semibold text-white"
      >
        Premium <span className="text-gradient">Features</span>
      </motion.h2>
      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {features.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 text-white/80 backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            <f.icon className="h-5 w-5 text-violet-400" />
            <span className="text-sm font-medium">{f.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
