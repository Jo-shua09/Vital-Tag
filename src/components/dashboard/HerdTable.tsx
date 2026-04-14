import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ChevronRight } from "lucide-react";
import { animals, type AnimalStatus } from "@/data/animals";
import GlassCard from "./GlassCard";

const statusColors: Record<AnimalStatus, string> = {
  healthy: "bg-primary",
  warning: "bg-warning",
  critical: "bg-critical",
};

const statusText: Record<AnimalStatus, string> = {
  healthy: "text-primary",
  warning: "text-warning",
  critical: "text-critical",
};

export default function HerdTable() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = animals.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.tagId.toLowerCase().includes(search.toLowerCase()) ||
      a.pen.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <GlassCard className="overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h3 className="text-sm font-semibold text-foreground">Herd List</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tag, pen..."
            className="pl-9 pr-4 py-2 rounded-lg bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 w-full sm:w-56"
          />
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-3 px-3 text-xs text-muted-foreground font-medium">Tag</th>
              <th className="text-left py-3 px-3 text-xs text-muted-foreground font-medium">Pen</th>
              <th className="text-left py-3 px-3 text-xs text-muted-foreground font-medium">Temp</th>
              <th className="text-left py-3 px-3 text-xs text-muted-foreground font-medium">Heart</th>
              <th className="text-left py-3 px-3 text-xs text-muted-foreground font-medium">Jaw</th>
              <th className="text-left py-3 px-3 text-xs text-muted-foreground font-medium">Status</th>
              <th className="text-right py-3 px-3 text-xs text-muted-foreground font-medium">Updated</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a, i) => (
              <motion.tr
                key={a.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => navigate(`/animal/${a.id}`)}
                className="border-b border-border/20 hover:bg-secondary/30 cursor-pointer transition-colors group"
              >
                <td className="py-3 px-3 font-medium text-foreground">{a.tagId}</td>
                <td className="py-3 px-3 text-muted-foreground">{a.pen}</td>
                <td className={`py-3 px-3 ${a.temp > 39.5 ? "text-critical" : "text-foreground"}`}>
                  {a.temp}°C
                </td>
                <td className={`py-3 px-3 ${a.heartRate > 100 ? "text-critical" : "text-foreground"}`}>
                  {a.heartRate} BPM
                </td>
                <td className={`py-3 px-3 ${a.jawRhythm < 0.8 ? "text-critical" : a.jawRhythm < 1.2 ? "text-warning" : "text-foreground"}`}>
                  {a.jawRhythm.toFixed(2)} Hz
                </td>
                <td className="py-3 px-3">
                  <span className="inline-flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${statusColors[a.status]} ${a.status === "critical" ? "animate-pulse-glow" : ""}`} />
                    <span className={`text-xs font-medium capitalize ${statusText[a.status]}`}>{a.status}</span>
                  </span>
                </td>
                <td className="py-3 px-3 text-right text-muted-foreground flex items-center justify-end gap-1">
                  {a.lastUpdate}
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {filtered.map((a) => (
          <div
            key={a.id}
            onClick={() => navigate(`/animal/${a.id}`)}
            className={`p-4 rounded-xl bg-secondary/30 border cursor-pointer transition-all hover:bg-secondary/50 ${
              a.status === "critical" ? "border-critical/40" : a.status === "warning" ? "border-warning/40" : "border-border/30"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-foreground">{a.tagId} — {a.name}</span>
              <span className="inline-flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${statusColors[a.status]} ${a.status === "critical" ? "animate-pulse-glow" : ""}`} />
                <span className={`text-xs font-medium capitalize ${statusText[a.status]}`}>{a.status}</span>
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <span className="text-muted-foreground">Temp</span>
                <p className="font-medium text-foreground">{a.temp}°C</p>
              </div>
              <div>
                <span className="text-muted-foreground">Heart</span>
                <p className="font-medium text-foreground">{a.heartRate} BPM</p>
              </div>
              <div>
                <span className="text-muted-foreground">Jaw</span>
                <p className="font-medium text-foreground">{a.jawRhythm.toFixed(2)} Hz</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
