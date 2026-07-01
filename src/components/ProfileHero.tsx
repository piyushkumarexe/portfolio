import { motion } from "framer-motion";
import { SiteSettings } from "@/types";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { TypingText } from "./TypingText";

interface Props {
  settings: SiteSettings;
}

export function ProfileHero({ settings }: Props) {
  const parallax = useMouseParallax(settings.effects.parallax);

  return (
    <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative mb-10"
        style={{
          transform: `translate(${parallax.x * 10}px, ${parallax.y * 10}px)`,
        }}
      >
        <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-violet-500/40 to-blue-500/40 blur-2xl animate-pulse" />
        <div className="absolute -inset-1 rounded-full border border-white/10 animate-spin-slow" />
        <div className="absolute -inset-3 rounded-full border border-dashed border-white/10 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "18s" }} />
        <div className="relative h-40 w-40 overflow-hidden rounded-full ring-2 ring-white/20 ring-offset-4 ring-offset-black/40">
          <img
            src={settings.avatarUrl}
            alt={settings.name}
            className="h-full w-full object-cover"
            loading="eager"
          />
        </div>
        <div className="absolute bottom-2 right-2 h-5 w-5 rounded-full bg-emerald-500 ring-4 ring-black animate-pulse" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-center text-5xl font-bold tracking-tight text-white sm:text-7xl md:text-8xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {settings.name.split(" ").map((word, i) => (
          <span key={i} className={i === 1 ? "text-gradient" : ""}>
            {word}{" "}
          </span>
        ))}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="mt-4 text-center text-xl font-light tracking-wide text-white/80 sm:text-2xl"
      >
        <TypingText text={settings.subtitle} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6 flex items-center gap-2 rounded-full glass px-5 py-2 text-sm text-white/70"
      >
        <span className="text-lg">{settings.countryCode === "IN" ? "🇮🇳" : "🌍"}</span>
        <span>{settings.country}</span>
      </motion.div>
    </section>
  );
}
