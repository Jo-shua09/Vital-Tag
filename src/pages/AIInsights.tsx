import { motion } from "framer-motion";
import useSWR from "swr";
import { BrainCircuit, Target, Clock, ShieldCheck, Activity, AlertTriangle, Info, Loader2 } from "lucide-react";
import GlassCard from "@/components/dashboard/GlassCard";
import { getAlerts, ApiAlert } from "@/pages/api";

const pens = ["Pen A", "Pen B", "Pen C", "Pen D", "Pen E", "Pen F"];
const riskMap: Record<string, number> = {
  "Pen A": 5,
  "Pen B": 38,
  "Pen C": 22,
  "Pen D": 72,
  "Pen E": 8,
  "Pen F": 12,
};

const modelStats = [
  { label: "Accuracy", value: "97.2%", icon: Target, desc: "On validation set (n=12,400)" },
  { label: "False Positive Rate", value: "2.1%", icon: ShieldCheck, desc: "Below 3% target threshold" },
  { label: "Detection Lead Time", value: "68 hrs", icon: Clock, desc: "Average before visible symptoms" },
];

export default function AIInsights() {
  const { data: anomalies, error: alertsError } = useSWR("aiAnomalies", () => getAlerts(false)); // Fetch unacknowledged alerts

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6 max-w-7xl mx-auto">
      <h1 className="text-xl font-bold text-foreground">AI Insights</h1>

      {/* Demo Data Notice */}
      <GlassCard className="border-warning/30 bg-warning/5">
        <div className="flex items-center gap-3">
          <Info className="w-5 h-5 text-warning shrink-0" />
          <div>
            <h3 className="text-sm font-semibold text-warning">Demonstration Data</h3>
            <p className="text-xs text-muted-foreground">
              This page uses static data as AI endpoints are not yet available. It serves to illustrate future capabilities.
            </p>
          </div>
        </div>
      </GlassCard>
      {/* Summary */}
      <GlassCard className="border-primary/30">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <BrainCircuit className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Herd-Wide AI Summary</h3>
            <p className="text-xs text-muted-foreground">TFLite Micro · ESP32-S3 Edge Inference</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Processing <span className="text-primary font-medium">2.4 million</span> data points daily across 120 active tags. Current herd risk index:{" "}
          <span className="text-primary font-medium">12.3%</span> (elevated due to Pen D outbreak). Model confidence: 97.2%. Last retrained 6 hours
          ago with 48,000 new samples.
        </p>
      </GlassCard>

      {/* Model stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {modelStats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <GlassCard className="text-center">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl font-bold text-primary">{s.value}</p>
              <p className="text-sm font-medium text-foreground mt-1">{s.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Risk heatmap */}
      <GlassCard>
        <h3 className="text-sm font-semibold text-foreground mb-4">Pen Risk Heatmap</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {pens.map((pen) => {
            const risk = riskMap[pen];
            const bg =
              risk > 60 ? "bg-critical/20 border-critical/40" : risk > 30 ? "bg-warning/20 border-warning/40" : "bg-primary/10 border-primary/20";
            const textColor = risk > 60 ? "text-critical" : risk > 30 ? "text-warning" : "text-primary";
            return (
              <div key={pen} className={`p-4 rounded-xl border text-center ${bg}`}>
                <p className="text-sm font-medium text-foreground">{pen}</p>
                <p className={`text-xl font-bold ${textColor} mt-1`}>{risk}%</p>
                <p className="text-xs text-muted-foreground">risk score</p>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* Anomaly feed */}
      <GlassCard>
        <h3 className="text-sm font-semibold text-foreground mb-4">Anomaly Detection Feed</h3>
        {alertsError && <div className="text-critical">Failed to load anomalies.</div>}
        {!anomalies && !alertsError && (
          <div className="flex items-center justify-center h-24 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading anomalies...
          </div>
        )}
        {anomalies && anomalies.length === 0 && !alertsError && (
          <div className="text-center text-muted-foreground py-4">No active anomalies detected.</div>
        )}
        <div className="space-y-3">
          {Array.isArray(anomalies) &&
            anomalies.map((alert: ApiAlert, i) => {
              let IconComponent;
              if (alert.severity === "critical") {
                IconComponent = AlertTriangle;
              } else if (alert.severity === "warning") {
                IconComponent = Activity;
              } else {
                IconComponent = BrainCircuit; // Default for info or system alerts
              }

              const iconColor =
                alert.severity === "critical" ? "text-critical" : alert.severity === "warning" ? "text-warning" : "text-muted-foreground";

              return (
                <motion.div
                  key={alert._id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3 py-2 border-b border-border/20 last:border-0"
                >
                  <IconComponent className={`w-4 h-4 shrink-0 mt-0.5 ${iconColor}`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-medium text-foreground">{alert.tagId}</span>
                      <span className="text-xs text-muted-foreground shrink-0">
                        {new Date(alert.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.message}</p>
                  </div>
                </motion.div>
              );
            })}
        </div>
      </GlassCard>
    </motion.div>
  );
}
