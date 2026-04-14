import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Paperclip, Send, Bot, User } from "lucide-react";
import GlassCard from "@/components/dashboard/GlassCard";
import type { Animal } from "@/data/animals";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const getInitialMessages = (animal: Animal): Message[] => [
  {
    id: "1",
    role: "user",
    content: `What does the sudden drop in jaw rhythm to ${animal.jawRhythm} Hz indicate?`,
  },
  {
    id: "2",
    role: "assistant",
    content: `Based on the live Edge-AI telemetry, ${animal.tagId}'s jaw rhythm dropped from a healthy 1.5 Hz baseline at 10:00 AM to ${animal.jawRhythm} Hz at 10:45 AM. Coupled with the elevated temperature of ${animal.temp}°C and heart rate at ${animal.heartRate} BPM, this 72-hour predictive window suggests **acute lethargy**, a primary early indicator of viral infection (such as ASF).

**Key Observations:**
- Jaw rhythm decline: **${((1 - animal.jawRhythm / 1.5) * 100).toFixed(0)}% below baseline**
- Temperature deviation: **+${(animal.temp - 38.5).toFixed(1)}°C** above normal
- Heart rate: **${animal.heartRate > 100 ? "elevated" : "within range"}** at ${animal.heartRate} BPM

**Recommendation:** Immediate isolation is strongly recommended. Notify on-site veterinary team and initiate the ASF rapid-test protocol within the next 4 hours. Cross-reference with pen-mates in ${animal.pen} for secondary exposure assessment.`,
  },
  {
    id: "3",
    role: "user",
    content: "Should we isolate the other animals in the same pen?",
  },
  {
    id: "4",
    role: "assistant",
    content: `For ${animal.pen}, I recommend a **tiered isolation protocol**:

1. **Immediate**: Isolate ${animal.tagId} into a quarantine zone — this is the highest priority.
2. **Within 2 hours**: Run baseline vitals scan on all ${animal.pen} pen-mates using the VITAL-TAG network.
3. **Monitoring**: Place ${animal.pen} under enhanced 15-minute telemetry polling (currently at 30-min intervals).

Historical data shows that in 83% of ASF outbreak simulations, early pen-level monitoring reduced secondary infections by **62%**. The Edge-AI model is already cross-analyzing feeding patterns of adjacent animals for anomaly detection.`,
  },
];

export default function AICopilot({ animal }: { animal: Animal }) {
  const [messages] = useState<Message[]>(() => getInitialMessages(animal));
  const [input, setInput] = useState("");

  return (
    <GlassCard className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-border/50 shrink-0">
        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">Gemini VITAL-AI Assistant</h3>
          <p className="text-[11px] text-muted-foreground">
            Analyzing {animal.tagId} · Real-time context
          </p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
          <span className="text-[11px] text-primary font-medium">Online</span>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 no-scrollbar min-h-0">
        {messages.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            className={`flex gap-3 ${msg.role === "user" ? "" : ""}`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                msg.role === "user"
                  ? "bg-secondary"
                  : "bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20"
              }`}
            >
              {msg.role === "user" ? (
                <User className="w-3.5 h-3.5 text-muted-foreground" />
              ) : (
                <Bot className="w-3.5 h-3.5 text-primary" />
              )}
            </div>
            <div
              className={`flex-1 rounded-xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-secondary/60 text-foreground"
                  : "bg-card/80 border border-primary/10 text-muted-foreground"
              }`}
            >
              {msg.content.split("\n").map((line, li) => (
                <p key={li} className={li > 0 ? "mt-2" : ""}>
                  {line.split(/(\*\*.*?\*\*)/).map((part, pi) =>
                    part.startsWith("**") && part.endsWith("**") ? (
                      <span key={pi} className="font-semibold text-foreground">
                        {part.slice(2, -2)}
                      </span>
                    ) : (
                      <span key={pi}>{part}</span>
                    )
                  )}
                </p>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input */}
      <div className="shrink-0 pt-3 border-t border-border/50">
        <div className="flex items-center gap-2 bg-secondary/40 rounded-xl px-3 py-2">
          <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-secondary/60 transition-colors text-muted-foreground">
            <Paperclip className="w-4 h-4" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask Gemini about ${animal.tagId}'s vitals...`}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          <button className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors glow-primary">
            <Send className="w-4 h-4 text-primary-foreground" />
          </button>
        </div>
      </div>
    </GlassCard>
  );
}
