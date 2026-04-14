import { motion } from "framer-motion";
import { Cpu, Wifi, Radio, Server } from "lucide-react";

const specs = [
  { label: "MCU", value: "ESP32-S3 (Dual-core 240MHz)" },
  { label: "Accelerometer", value: "MPU6050 (50Hz sampling)" },
  { label: "Thermistor", value: "NTC 10kΩ ±0.1°C" },
  { label: "Pulse Sensor", value: "Piezoelectric BPM" },
  { label: "AI Model", value: "TFLite Micro (97.2% accuracy)" },
  { label: "Connectivity", value: "LoRa SX1276 + WiFi fallback" },
  { label: "Power", value: "LiPo 500mAh (6-month life)" },
  { label: "Form Factor", value: "40×34mm ear tag" },
];

export default function TechArchitecture() {
  return (
    <section id="technology" className="py-12 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-sm text-primary font-medium mb-2">Under The Hood</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Technology & Architecture</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Specs */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Hardware Specifications</h3>
            <div className="space-y-3">
              {specs.map((s) => (
                <div key={s.label} className="flex justify-between items-center py-2 border-b border-border/30 last:border-0">
                  <span className="text-sm text-muted-foreground">{s.label}</span>
                  <span className="text-sm font-medium text-foreground">{s.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Network topology */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6 flex flex-col items-center justify-center"
          >
            <h3 className="text-lg font-semibold mb-8 text-foreground">Network Topology</h3>
            <div className="flex flex-col items-center gap-6 w-full max-w-xs">
              {[
                { icon: Cpu, label: "VITAL-TAG (ESP32-S3)", sub: "Edge AI Processing" },
                { icon: Radio, label: "LoRa SX1276", sub: "Long Range RF" },
                { icon: Wifi, label: "Gateway Hub", sub: "WiFi Bridge" },
                { icon: Server, label: "Cloud Dashboard", sub: "Real-time Monitoring" },
              ].map((node, i) => (
                <div key={node.label} className="w-full">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 border border-border/30"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <node.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{node.label}</p>
                      <p className="text-xs text-muted-foreground">{node.sub}</p>
                    </div>
                  </motion.div>
                  {i < 3 && (
                    <div className="flex justify-center my-1">
                      <div className="w-px h-4 bg-primary/40" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
