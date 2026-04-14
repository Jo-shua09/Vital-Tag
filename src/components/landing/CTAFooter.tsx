import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import vitalTagLogo from "@/assets/vital-tag-logo.png";

export default function CTAFooter() {
  return (
    <>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Ready to Secure Your Herd?</h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Access the live monitoring dashboard and see VITAL-TAG's Edge-AI in action with real-time telemetry data.
              </p>
              <Link
                to="/login"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-all glow-primary"
              >
                Launch Dashboard
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-border/50 py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={vitalTagLogo} alt="VITAL-TAG" className="w-8 h-8 object-contain" />
            <span className="text-sm font-semibold text-foreground">
              VITAL<span className="text-primary">-TAG</span>
            </span>
          </div>
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} VITAL-TAG. Predictive Edge-AI for Livestock Health Security.</p>
        </div>
      </footer>
    </>
  );
}
