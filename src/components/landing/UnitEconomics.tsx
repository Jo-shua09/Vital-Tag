import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

export default function UnitEconomics() {
  return (
    <section id="economics" className="py-12 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-sm text-primary font-medium mb-2">ROI Analysis</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Unit Economics</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Without */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6 border-critical/30"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-critical/20 flex items-center justify-center">
                <X className="w-4 h-4 text-critical" />
              </div>
              <h3 className="text-lg font-semibold text-critical">Without VITAL-TAG</h3>
            </div>
            <div className="space-y-4">
              {[
                "Diseases detected only after visible symptoms",
                "Average 5-7 day response lag",
                "₦150,000+ loss per infected pig",
                "Herd-wide spread risk: 40-60%",
                "Manual, infrequent health checks",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <X className="w-4 h-4 text-critical shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* With */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6 border-primary/30 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-bl-lg">Recommended</div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Check className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-primary">With VITAL-TAG</h3>
            </div>
            <div className="space-y-4">
              {[
                "72-hour advance disease prediction",
                "Real-time automated monitoring 24/7",
                "₦8,000 per tag unit cost at scale",
                "Outbreak containment: isolate in hours",
                "Edge-AI processes data on-device",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
