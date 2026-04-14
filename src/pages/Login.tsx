import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import vitalTagLogo from "@/assets/vital-tag-logo.png";

export default function Login() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"login" | "signup">("login");

  return (
    <div className="min-h-screen radial-gradient-bg flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src={vitalTagLogo} alt="VITAL-TAG" className="w-20 h-20 object-contain mx-auto" />
          <p className="text-sm text-muted-foreground">Livestock Health Command Center</p>
        </div>

        <div className="glass rounded-2xl p-6 sm:p-8">
          {/* Tabs */}
          <div className="flex rounded-lg bg-secondary/50 p-1 mb-6">
            {(["login", "signup"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                  tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t === "login" ? "Log In" : "Sign Up"}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {tab === "signup" && (
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Farm Name</label>
                <input
                  type="text"
                  placeholder="e.g. Green Valley Farms"
                  className="w-full px-4 py-2.5 rounded-lg bg-secondary/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            )}
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Email</label>
              <input
                type="email"
                placeholder="farmer@example.com"
                className="w-full px-4 py-2.5 rounded-lg bg-secondary/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-lg bg-secondary/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <button className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
              {tab === "login" ? "Log In" : "Create Account"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-card px-3 text-xs text-muted-foreground">or</span>
            </div>
          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="w-full py-3 rounded-lg border border-primary/50 text-primary font-semibold text-sm hover:bg-primary/10 transition-all flex items-center justify-center gap-2 glow-primary"
          >
            <Zap className="w-4 h-4" />
            Instant Demo Access
          </button>
          <p className="text-xs text-muted-foreground text-center mt-3">Skip authentication and explore the live dashboard with demo data.</p>
        </div>
      </motion.div>
    </div>
  );
}
