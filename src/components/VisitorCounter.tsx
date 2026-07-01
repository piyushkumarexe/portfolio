import { motion } from "framer-motion";
import { Eye, Users, RotateCcw, UserCheck } from "lucide-react";

interface Props {
  online: number;
  today: number;
  total: number;
  returning: number;
}

export function VisitorCounter({ online, today, total, returning }: Props) {
  const items = [
    { label: "Online now", value: online, icon: Eye },
    { label: "Today's visitors", value: today, icon: Users },
    { label: "Total visitors", value: total, icon: UserCheck },
    { label: "Returning", value: returning, icon: RotateCcw },
  ];

  return (
    <section className="relative z-10 px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4"
      >
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-5 text-center"
          >
            <item.icon className="mx-auto mb-3 h-5 w-5 text-violet-400" />
            <p className="text-3xl font-bold text-white">{item.value.toLocaleString()}</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-white/50">{item.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
