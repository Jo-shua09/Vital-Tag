import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, Info, AlertCircle } from "lucide-react";
import { alerts, type AlertSeverity } from "@/data/alerts";
import GlassCard from "@/components/dashboard/GlassCard";

const tabs: { label: string; value: AlertSeverity | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Critical", value: "critical" },
  { label: "Warning", value: "warning" },
  { label: "Info", value: "info" },
];

const severityConfig: Record<AlertSeverity, { icon: typeof AlertTriangle; color: string; border: string; bg: string }> = {
  critical: { icon: AlertTriangle, color: "text-critical", border: "border-l-critical", bg: "bg-critical/5" },
  warning: { icon: AlertCircle, color: "text-warning", border: "border-l-warning", bg: "bg-warning/5" },
  info: { icon: Info, color: "text-muted-foreground", border: "border-l-muted-foreground", bg: "bg-secondary/30" },
};

export default function Alerts() {
  const [filter, setFilter] = useState<AlertSeverity | "all">("all");
  const navigate = useNavigate();

  const filtered = filter === "all" ? alerts : alerts.filter((a) => a.severity === filter);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 max-w-7xl mx-auto"
    >
      <h1 className="text-xl font-bold text-foreground">Alert Log</h1>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.value}
            onClick={() => setFilter(t.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === t.value
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/50 text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Alert list */}
      <div className="space-y-3">
        {filtered.map((alert, i) => {
          const config = severityConfig[alert.severity];
          const Icon = config.icon;
          const clickable = alert.animalId !== "000";

          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <GlassCard
                className={`border-l-4 ${config.border} ${config.bg} ${
                  clickable ? "cursor-pointer hover:border-l-primary transition-all" : ""
                }`}
              >
                <div
                  onClick={() => clickable && navigate(`/animal/${alert.animalId}`)}
                  className="flex items-start gap-3"
                >
                  <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${config.color}`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-medium text-foreground">{alert.tagId}</span>
                      <span className="text-xs text-muted-foreground shrink-0">{alert.time} · {alert.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.message}</p>
                    {alert.metric && (
                      <div className="mt-2 inline-flex items-center gap-2 px-2 py-1 rounded bg-secondary/50 text-xs text-muted-foreground">
                        {alert.metric}: <span className={`font-medium ${config.color}`}>{alert.value}</span>
                      </div>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
