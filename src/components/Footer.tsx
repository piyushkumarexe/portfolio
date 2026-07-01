import { motion } from "framer-motion";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative z-10 border-t border-white/10 px-6 py-8 text-center"
    >
      <p className="text-sm text-white/40">
        © {new Date().getFullYear()} PIYUSH EXE. Crafted with cinematic precision.
      </p>
    </motion.footer>
  );
}
