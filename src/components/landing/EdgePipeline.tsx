import { motion } from "framer-motion";
import { Waves, BrainCircuit, Radio, BarChart3 } from "lucide-react";

const steps = [
  { icon: Waves, title: "Sense", desc: "3 biosensors capture jaw, temp & pulse at 50Hz" },
  { icon: BrainCircuit, title: "Process", desc: "TFLite Micro runs inference on-device in <200ms" },
  { icon: Radio, title: "Transmit", desc: "LoRa sends compressed alerts over 2km range" },
  { icon: BarChart3, title: "Visualize", desc: "Dashboard displays live health & AI predictions" },
];

export default function EdgePipeline() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-sm text-primary font-medium mb-2">Data Pipeline</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Edge-to-Cloud in 4 Steps</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="relative glass rounded-2xl p-6 text-center group hover:border-primary/40 transition-all"
            >
              <div className="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                {i + 1}
              </div>
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <s.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
