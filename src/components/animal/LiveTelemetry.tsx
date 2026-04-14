import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { generateTelemetryPoint, type TelemetryPoint } from "@/data/telemetry";
import type { AnimalStatus } from "@/data/animals";
import GlassCard from "@/components/dashboard/GlassCard";

interface Props {
  status: AnimalStatus;
}

export default function LiveTelemetry({ status }: Props) {
  const [data, setData] = useState<TelemetryPoint[]>(() =>
    Array.from({ length: 30 }, (_, i) => generateTelemetryPoint(status, i))
  );

  useEffect(() => {
    let idx = 30;
    const interval = setInterval(() => {
      setData((prev) => {
        const next = [...prev.slice(1), generateTelemetryPoint(status, idx++)];
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [status]);

  const strokeColor = status === "critical" ? "hsl(0,72%,51%)" : status === "warning" ? "hsl(38,92%,50%)" : "hsl(142,71%,45%)";

  return (
    <GlassCard>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Live Jaw Rhythm Telemetry</h3>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <div className={`w-2 h-2 rounded-full animate-pulse-glow ${status === "critical" ? "bg-critical" : status === "warning" ? "bg-warning" : "bg-primary"}`} />
          Streaming
        </div>
      </div>
      <div className="h-48 sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="time" tick={{ fill: "hsl(240,5%,64.9%)", fontSize: 10 }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
            <YAxis domain={["auto", "auto"]} tick={{ fill: "hsl(240,5%,64.9%)", fontSize: 10 }} axisLine={false} tickLine={false} width={35} />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(240,6%,6%)", border: "1px solid hsl(240,6%,20%)", borderRadius: "8px", fontSize: 12 }}
            />
            <Line type="monotone" dataKey="jawRhythm" stroke={strokeColor} strokeWidth={2} dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
