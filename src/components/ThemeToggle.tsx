import { useState } from "react";
import { Moon, Palette, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const themes = [
  { name: "midnight", icon: Moon, accent: "#8b5cf6", secondary: "#3b82f6" },
  { name: "obsidian", icon: Sun, accent: "#06b6d4", secondary: "#10b981" },
  { name: "neon", icon: Palette, accent: "#f43f5e", secondary: "#f59e0b" },
] as const;

interface Props {
  onChange?: (accent: string, secondary: string) => void;
}

export function ThemeToggle({ onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const select = (i: number) => {
    setActive(i);
    onChange?.(themes[i].accent, themes[i].secondary);
    setOpen(false);
  };

  const Icon = themes[active].icon;

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white/80 backdrop-blur-md transition-colors hover:bg-white/20"
        aria-label="Toggle theme"
      >
        <Icon className="h-5 w-5" />
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            className="absolute right-0 mt-2 w-40 rounded-2xl bg-white/10 p-2 backdrop-blur-xl"
          >
            {themes.map((t, i) => (
              <button
                key={t.name}
                onClick={() => select(i)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-white transition-colors ${
                  active === i ? "bg-white/15" : "hover:bg-white/10"
                }`}
              >
                <t.icon className="h-4 w-4" style={{ color: t.accent }} />
                <span className="capitalize">{t.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
