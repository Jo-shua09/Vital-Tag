import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Activity } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const miniData = Array.from({ length: 20 }, (_, i) => ({
  v: 1.5 + Math.sin(i * 0.5) * 0.2,
}));

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 radial-gradient-bg" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-12 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-primary font-medium">
            <Activity className="w-3 h-3" />
            Edge-AI Livestock Health
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
            <span className="text-gradient">VITAL-TAG</span>
            <br />
            <span className="text-foreground">Predictive Edge-AI for Livestock Health</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
            Monitoring microscopic shifts in vitals to detect viral outbreaks <span className="text-primary font-semibold">72 hours</span> before
            visible symptoms.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              to="/login"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all glow-primary"
            >
              Access Live Dashboard
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-secondary transition-all"
            >
              See How It Works
            </a>
          </div>
        </motion.div>

        {/* Right floating card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="hidden lg:block"
        >
          <div className="glass rounded-2xl p-6 animate-float">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-muted-foreground">Live Jaw Rhythm</p>
                <p className="text-2xl font-bold text-primary">1.52 Hz</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Activity className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={miniData}>
                  <Line type="monotone" dataKey="v" stroke="hsl(142, 71%, 45%)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { label: "Temp", value: "38.4°C", ok: true },
                { label: "Heart", value: "82 BPM", ok: true },
                { label: "Status", value: "Normal", ok: true },
              ].map((s) => (
                <div key={s.label} className="text-center p-2 rounded-lg bg-secondary/50">
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className={`text-sm font-semibold ${s.ok ? "text-primary" : "text-critical"}`}>{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
