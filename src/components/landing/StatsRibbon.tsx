import { motion } from "framer-motion";
import { TrendingDown, Clock, DollarSign } from "lucide-react";

const stats = [
  {
    icon: TrendingDown,
    value: "₦150,000",
    label: "Average loss per infected pig",
    color: "text-critical",
  },
  {
    icon: Clock,
    value: "72 Hours",
    label: "Early detection before symptoms",
    color: "text-primary",
  },
  {
    icon: DollarSign,
    value: "₦8,000",
    label: "VITAL-TAG unit cost at scale",
    color: "text-primary",
  },
];

export default function StatsRibbon() {
  return (
    <section className="relative py-8 border-y border-border/50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col justify-center items-center gap-10 place-content-center">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-6 gap-x-20">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex items-center gap-4 justify-center sm:justify-start"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div>
                <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground mt-6">Saving a single pig pays for the entire pen's monitoring system.</p>
      </div>
    </section>
  );
}
