import { motion } from "framer-motion";
import {
  Camera,
  Code2,
  MessageCircle,
  Music,
  Gamepad2,
  Globe,
  Coins,
  Bitcoin,
  Banknote,
  LucideIcon,
} from "lucide-react";
import { SocialLink } from "@/types";

const iconMap: Record<string, LucideIcon> = {
  Camera,
  Code2,
  MessageCircle,
  Music,
  Gamepad2,
  Globe,
  Coins,
  Bitcoin,
  Banknote,
};

interface Props {
  socials: SocialLink[];
}

export function SocialGrid({ socials }: Props) {
  return (
    <section className="relative z-10 px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center text-3xl font-semibold text-white"
      >
        Connect <span className="text-gradient">With Me</span>
      </motion.h2>

      <div className="mx-auto grid max-w-4xl grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9">
        {socials.map((link, i) => {
          const Icon = iconMap[link.icon] || Globe;
          return (
            <motion.a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.15, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex flex-col items-center gap-2 rounded-2xl bg-white/5 p-4 backdrop-blur-md transition-all hover:bg-white/10 hover:shadow-[0_0_30px_rgba(139,92,246,0.35)]"
            >
              <span className="absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:animate-pulse group-hover:opacity-100" style={{ boxShadow: "inset 0 0 20px rgba(139,92,246,0.25)" }} />
              <Icon className="relative h-6 w-6 text-white/90 transition-colors group-hover:text-white" />
              <span className="text-[10px] text-white/50 group-hover:text-white/80">{link.label}</span>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
