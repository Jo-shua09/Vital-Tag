import { motion } from "framer-motion";
import { Rss } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Blog() {
  return (
    <div className="bg-background text-foreground">
      <Navbar />
      <main className="pt-20">
        <div className="max-w-4xl mx-auto py-32 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Rss className="w-16 h-16 mx-auto text-primary mb-6" />
            <h1 className="text-4xl font-bold text-foreground">Our Blog is Coming Soon</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              We're preparing insightful articles, case studies, and updates from the world of agricultural technology. Stay tuned!
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
