import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  enabled?: boolean;
}

export function MusicToggle({ enabled = true }: Props) {
  const [playing, setPlaying] = useState(false);
  const audioCtx = useRef<AudioContext | null>(null);
  const nodes = useRef<{ osc: OscillatorNode; gain: GainNode } | null>(null);

  useEffect(() => {
    return () => {
      nodes.current?.osc.stop();
      audioCtx.current?.close();
    };
  }, []);

  const toggle = async () => {
    if (!enabled) return;
    if (playing) {
      nodes.current?.gain.gain.setTargetAtTime(0, audioCtx.current!.currentTime, 0.1);
      setPlaying(false);
      return;
    }

    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    audioCtx.current = ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.setValueAtTime(110, ctx.currentTime);
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(400, ctx.currentTime);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 1.5);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    osc.start();

    nodes.current = { osc, gain };
    setPlaying(true);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggle}
      className={`relative flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md transition-colors ${
        playing ? "bg-violet-500/30 text-white shadow-[0_0_20px_rgba(139,92,246,0.5)]" : "bg-white/10 text-white/80 hover:bg-white/20"
      }`}
      aria-label="Toggle ambient music"
    >
      {playing ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
    </motion.button>
  );
}
