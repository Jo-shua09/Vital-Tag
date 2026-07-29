import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useSWR, { useSWRConfig } from "swr";
import { AlertTriangle, Info, AlertCircle, Check, Loader2 } from "lucide-react";
import { type AlertSeverity } from "@/data/alerts";
import GlassCard from "@/components/dashboard/GlassCard";
import { getAlerts, acknowledgeAlert, ApiAlert } from "@/pages/api";

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
  const [showAcknowledged, setShowAcknowledged] = useState(false);
  const [acknowledgingId, setAcknowledgingId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();

  const { data: alerts, error } = useSWR(`/alerts?acknowledged=${showAcknowledged}`, () => getAlerts(showAcknowledged));

  const handleAcknowledge = async (alertId: string) => {
    setAcknowledgingId(alertId);
    try {
      await acknowledgeAlert(alertId);
      // Optimistically update or just refetch
      mutate(`/alerts?acknowledged=${showAcknowledged}`);
    } finally {
      setAcknowledgingId(null);
    }
  };

  const filtered = Array.isArray(alerts) ? (filter === "all" ? alerts : alerts.filter((a) => a.severity === filter)) : [];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6 max-w-7xl mx-auto">
      <h1 className="text-xl font-bold text-foreground">Alert Log</h1>

      {/* Severity Filters */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.value}
            onClick={() => setFilter(t.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === t.value ? "bg-primary text-primary-foreground" : "bg-secondary/50 text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Acknowledged Filter */}
      <div className="flex items-center gap-2">
        <label htmlFor="acknowledged" className="text-sm font-medium text-foreground">
          Show Acknowledged Alerts
        </label>
        <input
          type="checkbox"
          id="acknowledged"
          checked={showAcknowledged}
          onChange={(e) => setShowAcknowledged(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
        />
      </div>

      {/* Alert list */}
      <div className="space-y-3">
        {error && <div className="text-critical">Failed to load alerts.</div>}
        {!alerts && !error && (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <GlassCard key={i} className="h-[108px]">
                <div className="flex items-center gap-3 animate-pulse">
                  <div className="w-4 h-4 rounded-full bg-muted-foreground/20 shrink-0 mt-0.5" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-1/4 rounded bg-muted-foreground/20" />
                    <div className="h-4 w-3/4 rounded bg-muted-foreground/20" />
                    <div className="h-6 w-1/3 rounded bg-muted-foreground/20" />
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
        {filtered.map((alert: ApiAlert, i) => {
          const config = severityConfig[alert.severity];
          const Icon = config.icon;

          return (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
              <GlassCard
                className={`border-l-4 ${config.border} ${config.bg} ${
                  !alert.tagId.startsWith("SYS") ? "hover:border-l-primary transition-all" : ""
                }`}
              >
                <div onClick={() => !alert.tagId.startsWith("SYS") && navigate(`/animal/${alert.tagId}`)} className="flex items-start gap-3">
                  <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${config.color}`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-medium text-foreground">{alert.tagId}</span>
                      <span className="text-xs text-muted-foreground shrink-0">
                        {new Date(alert.timestamp).toLocaleString(undefined, {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.message}</p>
                    {alert.metric && (
                      <div className="mt-2 inline-flex items-center gap-2 px-2 py-1 rounded bg-secondary/50 text-xs text-muted-foreground">
                        {alert.metric}: <span className={`font-medium ${config.color}`}>{alert.value}</span>
                      </div>
                    )}
                  </div>
                  {!alert.acknowledged && (
                    <div className="ml-auto shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleAcknowledge(alert._id);
                        }}
                        disabled={acknowledgingId === alert._id}
                        className="p-2 rounded-md hover:bg-secondary flex items-center justify-center gap-1.5 text-xs text-primary disabled:opacity-50 disabled:cursor-not-allowed w-[100px]"
                      >
                        {acknowledgingId === alert._id ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <>
                            <Check className="w-3 h-3" /> Acknowledge
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
