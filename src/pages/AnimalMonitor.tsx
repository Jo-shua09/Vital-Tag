import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Thermometer, HeartPulse, Activity, TrendingUp, Wifi } from "lucide-react";
import { animals } from "@/data/animals";
import LiveTelemetry from "@/components/animal/LiveTelemetry";
import VitalGauge from "@/components/animal/VitalGauge";
import AICopilot from "@/components/animal/AICopilot";
import GlassCard from "@/components/dashboard/GlassCard";

export default function AnimalMonitor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const animal = animals.find((a) => a.id === id);

  if (!animal) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Animal not found.</p>
      </div>
    );
  }

  const isCritical = animal.status === "critical";
  const isWarning = animal.status === "warning";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-6 max-w-7xl mx-auto h-full"
    >
      {/* ─── Header ─── */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="w-9 h-9 rounded-lg bg-secondary/50 flex items-center justify-center hover:bg-secondary transition-colors shrink-0"
        >
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
        <div className="min-w-0 flex-1">
          <h1 className="text-lg sm:text-xl font-bold text-foreground truncate">
            Subject: {animal.tagId} — Diagnostics
          </h1>
          <p className="text-xs text-muted-foreground truncate">
            {animal.pen} · {animal.breed} · {animal.weight}kg · {animal.age}
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
            <Wifi className="w-3 h-3 text-primary" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-[11px] font-medium text-primary">Live ESP32 Stream</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                isCritical ? "bg-critical animate-pulse-glow" : isWarning ? "bg-warning" : "bg-primary"
              }`}
            />
            <span
              className={`text-sm font-medium capitalize ${
                isCritical ? "text-critical" : isWarning ? "text-warning" : "text-primary"
              }`}
            >
              {animal.status}
            </span>
          </div>
        </div>
      </div>

      {/* ─── SECTION 1: Telemetry Dashboard ─── */}
      <section className="space-y-4">
        {/* Vital Sign Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <GlassCard className={`relative overflow-hidden ${animal.temp >= 39.2 ? "border-critical/30" : ""}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-critical/10 flex items-center justify-center">
                  <Thermometer className="w-5 h-5 text-critical" />
                </div>
                {animal.temp >= 39.2 && (
                  <TrendingUp className="w-4 h-4 text-critical" />
                )}
              </div>
              <p className={`text-2xl font-bold ${animal.temp >= 39.2 ? "text-critical" : "text-foreground"}`}>
                {animal.temp.toFixed(1)}°C
              </p>
              <p className="text-xs text-muted-foreground mt-1">Body Temperature</p>
              {animal.temp >= 39.2 && (
                <p className="text-[11px] text-critical mt-1 font-medium">⚠ Above threshold</p>
              )}
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard className={`relative overflow-hidden ${animal.heartRate > 100 ? "border-warning/30" : ""}`}>
              <div className="flex items-center justify-between mb-2">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${animal.heartRate > 100 ? "bg-warning/10" : "bg-primary/10"}`}>
                  <HeartPulse className={`w-5 h-5 ${animal.heartRate > 100 ? "text-warning" : "text-primary"}`} />
                </div>
                {animal.heartRate > 100 && (
                  <TrendingUp className="w-4 h-4 text-warning" />
                )}
              </div>
              <p className={`text-2xl font-bold ${animal.heartRate > 100 ? "text-warning" : "text-foreground"}`}>
                {animal.heartRate} BPM
              </p>
              <p className="text-xs text-muted-foreground mt-1">Heart Rate</p>
              {animal.heartRate > 100 && (
                <p className="text-[11px] text-warning mt-1 font-medium">Elevated</p>
              )}
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard className={`relative overflow-hidden ${animal.jawRhythm < 0.5 ? "border-critical/30" : animal.jawRhythm < 1.0 ? "border-warning/30" : ""}`}>
              <div className="flex items-center justify-between mb-2">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${animal.jawRhythm < 0.5 ? "bg-critical/10" : animal.jawRhythm < 1.0 ? "bg-warning/10" : "bg-primary/10"}`}>
                  <Activity className={`w-5 h-5 ${animal.jawRhythm < 0.5 ? "text-critical" : animal.jawRhythm < 1.0 ? "text-warning" : "text-primary"}`} />
                </div>
              </div>
              <p className={`text-2xl font-bold ${animal.jawRhythm < 0.5 ? "text-critical" : animal.jawRhythm < 1.0 ? "text-warning" : "text-foreground"}`}>
                {animal.jawRhythm.toFixed(2)} Hz
              </p>
              <p className="text-xs text-muted-foreground mt-1">Jaw Rhythm (Feeding)</p>
              {animal.jawRhythm < 0.5 && (
                <p className="text-[11px] text-critical mt-1 font-medium">Critical Drop</p>
              )}
            </GlassCard>
          </motion.div>
        </div>

        {/* Live Telemetry Chart */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <LiveTelemetry status={animal.status} />
        </motion.div>
      </section>

      {/* ─── SECTION 2: Gemini AI Copilot ─── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="min-h-[380px] sm:min-h-[420px]"
      >
        <AICopilot animal={animal} />
      </motion.section>
    </motion.div>
  );
}
