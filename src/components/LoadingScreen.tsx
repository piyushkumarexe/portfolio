import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface Props {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 2200;

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setProgress(Math.floor(p * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(onComplete, 400);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-xl"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-violet-500 to-blue-500 blur-2xl opacity-40 animate-pulse" />
          <div className="relative flex h-28 w-28 items-center justify-center rounded-full glass-strong">
            <span className="bg-gradient-to-br from-white to-violet-300 bg-clip-text text-3xl font-bold text-transparent">
              PE
            </span>
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-2xl font-semibold tracking-[0.2em] text-white"
        >
          PIYUSH EXE
        </motion.h2>

        <div className="mt-8 h-1 w-64 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-violet-500 to-blue-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-3 text-sm tracking-widest text-white/50">{progress}%</p>
      </motion.div>
    </AnimatePresence>
  );
}
