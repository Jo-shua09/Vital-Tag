import { motion } from "framer-motion";
import { BrainCircuit, Target, Clock, ShieldCheck, Activity, AlertTriangle } from "lucide-react";
import GlassCard from "@/components/dashboard/GlassCard";

const pens = ["Pen A", "Pen B", "Pen C", "Pen D", "Pen E", "Pen F"];
const riskMap: Record<string, number> = {
  "Pen A": 5, "Pen B": 38, "Pen C": 22, "Pen D": 72, "Pen E": 8, "Pen F": 12,
};

const anomalies = [
  { time: "10:45 AM", tag: "VT-104", event: "Jaw rhythm collapsed to 0.22 Hz", severity: "critical" as const },
  { time: "09:30 AM", tag: "VT-005", event: "Temperature deviation +0.9°C above baseline", severity: "warning" as const },
  { time: "09:28 AM", tag: "VT-005", event: "Jaw rhythm declining: 1.2 → 0.85 Hz", severity: "warning" as const },
  { time: "08:15 AM", tag: "VT-009", event: "Feeding pattern anomaly detected", severity: "warning" as const },
  { time: "07:00 AM", tag: "SYSTEM", event: "Model retraining complete — 48k new samples ingested", severity: "info" as const },
];

const modelStats = [
  { label: "Accuracy", value: "97.2%", icon: Target, desc: "On validation set (n=12,400)" },
  { label: "False Positive Rate", value: "2.1%", icon: ShieldCheck, desc: "Below 3% target threshold" },
  { label: "Detection Lead Time", value: "68 hrs", icon: Clock, desc: "Average before visible symptoms" },
];

export default function AIInsights() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 max-w-7xl mx-auto"
    >
      <h1 className="text-xl font-bold text-foreground">AI Insights</h1>

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
          Processing <span className="text-primary font-medium">2.4 million</span> data points daily across 120 active tags.
          Current herd risk index: <span className="text-primary font-medium">12.3%</span> (elevated due to Pen D outbreak).
          Model confidence: 97.2%. Last retrained 6 hours ago with 48,000 new samples.
        </p>
      </GlassCard>

      {/* Model stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {modelStats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
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
            const bg = risk > 60 ? "bg-critical/20 border-critical/40" : risk > 30 ? "bg-warning/20 border-warning/40" : "bg-primary/10 border-primary/20";
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
        <div className="space-y-3">
          {anomalies.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-3 py-2 border-b border-border/20 last:border-0"
            >
              {a.severity === "critical" ? (
                <AlertTriangle className="w-4 h-4 text-critical shrink-0 mt-0.5" />
              ) : a.severity === "warning" ? (
                <Activity className="w-4 h-4 text-warning shrink-0 mt-0.5" />
              ) : (
                <BrainCircuit className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-foreground">{a.tag}</span>
                  <span className="text-xs text-muted-foreground shrink-0">{a.time}</span>
                </div>
                <p className="text-sm text-muted-foreground">{a.event}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
}
