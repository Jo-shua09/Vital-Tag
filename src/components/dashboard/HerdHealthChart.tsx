import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { herdHealthHistory } from "@/data/telemetry";
import GlassCard from "./GlassCard";

export default function HerdHealthChart() {
  return (
    <GlassCard>
      <h3 className="text-sm font-semibold text-foreground mb-4">7-Day Herd Health Trend</h3>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={herdHealthHistory}>
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
