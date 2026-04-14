import GlassCard from "@/components/dashboard/GlassCard";

interface Props {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  warningThreshold: number;
  criticalThreshold: number;
  icon: React.ReactNode;
}

export default function VitalGauge({ label, value, unit, min, max, warningThreshold, criticalThreshold, icon }: Props) {
  const pct = Math.min(((value - min) / (max - min)) * 100, 100);
  const isWarning = value >= warningThreshold;
  const isCritical = value >= criticalThreshold;
  const color = isCritical ? "text-critical" : isWarning ? "text-warning" : "text-primary";
  const strokeCol = isCritical ? "hsl(0,72%,51%)" : isWarning ? "hsl(38,92%,50%)" : "hsl(142,71%,45%)";

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <GlassCard className="flex flex-col items-center">
      <div className="relative w-24 h-24 mb-3">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="hsl(240,6%,20%)" strokeWidth="6" />
          <circle
            cx="50" cy="50" r={radius} fill="none"
            stroke={strokeCol} strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-700"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <p className={`text-xl font-bold ${color}`}>
        {typeof value === "number" ? value.toFixed(1) : value}{unit}
      </p>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
    </GlassCard>
  );
}
