import { useState } from "react";
import { motion } from "framer-motion";
import { MusicToggle } from "./MusicToggle";
import { ThemeToggle } from "./ThemeToggle";
import { ShareModal } from "./ShareModal";
import { Share2 } from "lucide-react";

interface Props {
  effectsEnabled: boolean;
}

export function FloatingControls({ effectsEnabled }: Props) {
  const [shareOpen, setShareOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed right-4 top-4 z-50 flex items-center gap-2"
      >
        <MusicToggle enabled={effectsEnabled} />
        <ThemeToggle />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShareOpen(true)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white/80 backdrop-blur-md transition-colors hover:bg-white/20"
          aria-label="Share profile"
        >
          <Share2 className="h-5 w-5" />
        </motion.button>
      </motion.div>
      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} />
    </>
  );
}
