import { motion } from "framer-motion";
import { BrainCircuit, Thermometer, HeartPulse } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const jawData = Array.from({ length: 15 }, (_, i) => ({ v: 1.5 + Math.sin(i * 0.6) * 0.2 }));

const features = [
  {
    icon: BrainCircuit,
    title: "Jaw Rhythm AI",
    desc: "Micro-accelerometer tracks feeding patterns at 50Hz. Healthy chewing rhythm: 1.5 Hz. A drop below 0.8 Hz triggers early warning — 48 hours before visible lethargy.",
    chart: true,
  },
  {
    icon: Thermometer,
    title: "Fever Detection",
    desc: "Continuous thermistor monitoring with ±0.1°C precision. The Edge-AI baseline calibrates per-animal, detecting fever onset at 39.5°C — before the pig shows discomfort.",
    chart: false,
  },
  {
    icon: HeartPulse,
    title: "Pulse Monitoring",
    desc: "Piezoelectric pulse sensor tracks heart rate variability. Elevated BPM combined with jaw rhythm decline creates a multi-signal diagnostic for viral infection detection.",
    chart: false,
  },
];

export default function BentoGrid() {
  return (
    <section id="how-it-works" className="py-12 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-sm text-primary font-medium mb-2">Core Technology</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">How It Works</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Three integrated biosensors in a 40×34mm ear tag, powered by Edge-AI running on the ESP32-S3.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass rounded-2xl p-6 hover:border-primary/40 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{f.desc}</p>
              {f.chart && (
                <div className="h-20 mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={jawData}>
                      <Line type="monotone" dataKey="v" stroke="hsl(142,71%,45%)" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
