import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import vitalTagLogo from "@/assets/vital-tag-logo.png";

export default function LoadingScreen({ onFinished }: { onFinished: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "done">("loading");

  useEffect(() => {
    const duration = 2200;
    const interval = 30;
    const step = 100 / (duration / interval);
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step + Math.random() * 1.5;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setPhase("done"), 300);
          setTimeout(onFinished, 900);
          return 100;
        }
        return next;
      });
    }, interval);
    return () => clearInterval(timer);
  }, [onFinished]);

  return (
    <AnimatePresence>
      {phase !== "done" ? null : null}
      <motion.div
        key="loader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
      >
        {/* Radial glow behind logo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.4, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-[400px] h-[400px] rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(142 71% 45% / 0.15) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center"
        >
          <motion.img
            src={vitalTagLogo}
            alt="VITAL-TAG"
            className="w-28 h-28 sm:w-36 sm:h-36 object-contain mb-6"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="w-48 sm:w-56 h-1 rounded-full bg-secondary overflow-hidden">
            <motion.div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} transition={{ duration: 0.1 }} />
          </div>

          {/* Status text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-xs text-muted-foreground tracking-wider"
          >
            {progress < 30
              ? "Initializing Edge-AI…"
              : progress < 60
                ? "Connecting to herd sensors…"
                : progress < 90
                  ? "Loading telemetry dashboard…"
                  : "Ready"}
          </motion.p>
        </motion.div>

        {/* Heartbeat line decoration */}
        <motion.svg
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="absolute bottom-16 w-full max-w-md h-12"
          viewBox="0 0 400 50"
          fill="none"
        >
          <motion.path
            d="M0 25 L80 25 L100 10 L120 40 L140 5 L160 45 L180 25 L400 25"
            stroke="hsl(142 71% 45%)"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </motion.svg>
      </motion.div>
    </AnimatePresence>
  );
}
