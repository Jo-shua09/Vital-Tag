import { motion } from "framer-motion";
import SummaryCards from "@/components/dashboard/SummaryCards";
import HerdHealthChart from "@/components/dashboard/HerdHealthChart";
import HerdTable from "@/components/dashboard/HerdTable";

export default function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 max-w-7xl mx-auto"
    >
      <SummaryCards />
      <HerdHealthChart />
      <HerdTable />
    </motion.div>
  );
}
