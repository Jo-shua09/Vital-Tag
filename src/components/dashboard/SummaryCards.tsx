import { motion } from "framer-motion";
import { Tag, HeartPulse, AlertTriangle, Wifi } from "lucide-react";
import { Animal } from "@/data/animals";
import GlassCard from "./GlassCard";

interface SummaryCardsProps {
  animals: Animal[];
}

export default function SummaryCards({ animals }: SummaryCardsProps) {
  const total = animals.length;
  const critical = animals.filter((a) => a.status === "critical").length;
  const warnings = animals.filter((a) => a.status === "warning").length;
  const healthyPercentage = total > 0 ? Math.round(((total - critical - warnings) / total) * 100) : 100;

  const cards = [
    { icon: Tag, label: "Active Tags", value: total.toString(), color: "text-primary", bg: "bg-primary/10" },
    { icon: HeartPulse, label: "Herd Health", value: `${healthyPercentage}%`, color: "text-primary", bg: "bg-primary/10" },
    { icon: AlertTriangle, label: "Critical Alerts", value: critical.toString(), color: "text-critical", bg: "bg-critical/10" },
    { icon: Wifi, label: "Network", value: "Online", color: "text-primary", bg: "bg-primary/10" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c, i) => (
        <motion.div key={c.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
          <GlassCard className="hover:border-primary/30 transition-all cursor-default">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{c.label}</p>
                <p className={`text-2xl font-bold mt-1 ${c.color}`}>{c.value}</p>
              </div>
              <div className={`w-9 h-9 rounded-lg ${c.bg} flex items-center justify-center shrink-0`}>
                <c.icon className={`w-4 h-4 ${c.color}`} />
              </div>
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}
