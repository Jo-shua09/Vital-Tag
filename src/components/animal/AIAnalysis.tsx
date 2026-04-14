import type { Animal } from "@/data/animals";
import GlassCard from "@/components/dashboard/GlassCard";
import { BrainCircuit, AlertTriangle, ShieldCheck } from "lucide-react";

interface Props {
  animal: Animal;
}

export default function AIAnalysis({ animal }: Props) {
  const isCritical = animal.status === "critical";
  const isWarning = animal.status === "warning";

  return (
    <GlassCard className={isCritical ? "border-critical/40" : isWarning ? "border-warning/40" : ""}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
          isCritical ? "bg-critical/10" : isWarning ? "bg-warning/10" : "bg-primary/10"
        }`}>
          {isCritical ? (
            <AlertTriangle className="w-5 h-5 text-critical" />
          ) : (
            <BrainCircuit className={`w-5 h-5 ${isWarning ? "text-warning" : "text-primary"}`} />
          )}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">AI Prediction</h3>
          <p className={`text-xs font-medium ${isCritical ? "text-critical" : isWarning ? "text-warning" : "text-primary"}`}>
            Risk Score: {animal.riskScore}%
          </p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{animal.aiPrediction}</p>

      {/* Risk bar */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Low Risk</span>
          <span>High Risk</span>
        </div>
        <div className="h-2 rounded-full bg-secondary overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              isCritical ? "bg-critical" : isWarning ? "bg-warning" : "bg-primary"
            }`}
            style={{ width: `${animal.riskScore}%` }}
          />
        </div>
      </div>

      {isCritical && (
        <div className="mt-4 p-3 rounded-lg bg-critical/10 border border-critical/30 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-critical shrink-0 mt-0.5" />
          <p className="text-xs text-critical">Immediate veterinary attention required. Isolate animal from herd.</p>
        </div>
      )}
    </GlassCard>
  );
}
