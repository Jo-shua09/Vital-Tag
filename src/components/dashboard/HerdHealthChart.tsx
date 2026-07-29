import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Animal } from "@/data/animals";
import GlassCard from "./GlassCard";

interface HerdHealthChartProps {
  animals: Animal[];
}

export default function HerdHealthChart({ animals }: HerdHealthChartProps) {
  // This is a placeholder to show a chart structure even with no data.
  // In a real app, you'd generate this trend from historical data.
  const healthTrend = [
    { day: "Mon", healthy: 0, warning: 0, critical: 0 },
    { day: "Tue", healthy: 0, warning: 0, critical: 0 },
    { day: "Wed", healthy: 0, warning: 0, critical: 0 },
    { day: "Thu", healthy: 0, warning: 0, critical: 0 },
    { day: "Fri", healthy: 0, warning: 0, critical: 0 },
    { day: "Sat", healthy: 0, warning: 0, critical: 0 },
    { day: "Sun", healthy: 0, warning: 0, critical: 0 },
  ];

  // Override today's data with live counts
  const todayIndex = new Date().getDay() - 1; // Monday = 0
  if (todayIndex >= 0 && todayIndex < 7) {
    healthTrend[todayIndex].healthy = animals.filter((a) => a.status === "healthy").length;
    healthTrend[todayIndex].warning = animals.filter((a) => a.status === "warning").length;
    healthTrend[todayIndex].critical = animals.filter((a) => a.status === "critical").length;
  }

  return (
    <GlassCard>
      <h3 className="text-sm font-semibold text-foreground mb-4">7-Day Herd Health Trend</h3>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={healthTrend}>
            <defs>
              <linearGradient id="gHealthy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(142,71%,45%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(142,71%,45%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gWarning" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(38,92%,50%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(38,92%,50%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,6%,20%)" />
            <XAxis dataKey="day" tick={{ fill: "hsl(240,5%,64.9%)", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "hsl(240,5%,64.9%)", fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(240,6%,6%)",
                border: "1px solid hsl(240,6%,20%)",
                borderRadius: "8px",
                fontSize: 12,
              }}
            />
            <Area type="monotone" dataKey="healthy" stroke="hsl(142,71%,45%)" fill="url(#gHealthy)" strokeWidth={2} />
            <Area type="monotone" dataKey="warning" stroke="hsl(38,92%,50%)" fill="url(#gWarning)" strokeWidth={2} />
            <Area type="monotone" dataKey="critical" stroke="hsl(0,72%,51%)" fill="hsl(0,72%,51%,0.1)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
