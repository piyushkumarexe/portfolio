import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  enabled?: boolean;
}

export function GlowCursor({ enabled = true }: Props) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setTrail((prev) => [...prev.slice(-8), { x: e.clientX, y: e.clientY, id: Date.now() }]);
      setHidden(false);
    };
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.body.addEventListener("mouseleave", onLeave);
    document.body.addEventListener("mouseenter", onEnter);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.body.removeEventListener("mouseleave", onLeave);
      document.body.removeEventListener("mouseenter", onEnter);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {trail.map((t, i) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0.35, scale: 1 }}
          animate={{ opacity: 0, scale: 0.2 }}
          transition={{ duration: 0.5 }}
          className="pointer-events-none fixed z-[9998] h-2 w-2 rounded-full bg-white/30"
          style={{
            left: t.x - 4,
            top: t.y - 4,
            filter: `blur(${i * 0.5}px)`,
          }}
        />
      ))}
      <motion.div
        className="pointer-events-none fixed z-[9999] h-8 w-8 rounded-full border border-white/30"
        animate={{
          x: pos.x - 16,
          y: pos.y - 16,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        style={{
          boxShadow: "0 0 30px rgba(139, 92, 246, 0.4), inset 0 0 20px rgba(139, 92, 246, 0.15)",
        }}
      />
    </>
  );
}
