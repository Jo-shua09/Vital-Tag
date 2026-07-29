import { useState } from "react";
import { motion } from "framer-motion";
import useSWR, { useSWRConfig } from "swr";
import { Loader2, PlusCircle } from "lucide-react";
import SummaryCards from "@/components/dashboard/SummaryCards";
import HerdHealthChart from "@/components/dashboard/HerdHealthChart";
import HerdTable from "@/components/dashboard/HerdTable";
import { getHerdOverview, adaptTagToAnimal, ingestReading } from "@/pages/api";
import GlassCard from "@/components/dashboard/GlassCard";

export default function Dashboard() {
  const { data: herd, error } = useSWR("herdOverview", getHerdOverview);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  if (error) return <div className="text-center text-critical">Failed to load herd data.</div>;
  if (!herd) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-2">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-center text-muted-foreground">Loading Herd Data...</p>
      </div>
    );
  }

  // Adapt the API data to the format the components expect
  const animals = Array.isArray(herd) ? herd.map(adaptTagToAnimal) : [];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-xl font-bold text-foreground">Herd Overview</h1>
        <button
          onClick={() => setRegisterModalOpen(true)}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          Register New Tag
        </button>
      </div>

      <SummaryCards animals={animals} />
      <HerdHealthChart animals={animals} />
      <HerdTable />

      {isRegisterModalOpen && <RegisterTagModal onClose={() => setRegisterModalOpen(false)} />}
    </motion.div>
  );
}

function RegisterTagModal({ onClose }: { onClose: () => void }) {
  const { mutate } = useSWRConfig();
  const [tagId, setTagId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tagId) {
      setError("Tag ID is required.");
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      // Simulate a first reading to register the tag
      await ingestReading({
        tagId: tagId.toUpperCase(),
        tempC: 38.5, // Normal starting temp
        chewHz: 1.5, // Normal starting chew
        pulseBpm: 80, // Normal starting pulse
      });
      // Refetch the herd overview to show the new tag
      mutate("herdOverview");
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to register tag.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
        <GlassCard className="w-full max-w-md">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Register a New Tag</h2>
              <button type="button" onClick={onClose} className="text-muted-foreground hover:text-foreground">
                &times;
              </button>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              Simulate an ESP32 tag coming online for the first time by providing its unique ID. Initial health metrics will be set to normal.
            </p>

            <div className="space-y-4">
              <div>
                <label htmlFor="tagId" className="text-xs text-muted-foreground mb-1.5 block">
                  Tag ID
                </label>
                <input
                  id="tagId"
                  type="text"
                  value={tagId}
                  onChange={(e) => setTagId(e.target.value)}
                  placeholder="e.g., TAG-123"
                  className="w-full px-4 py-2.5 rounded-lg bg-secondary/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              {error && <p className="text-xs text-critical">{error}</p>}

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-secondary/50 text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 w-32"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Register"}
                </button>
              </div>
            </div>
          </form>
        </GlassCard>
      </motion.div>
    </div>
  );
}
