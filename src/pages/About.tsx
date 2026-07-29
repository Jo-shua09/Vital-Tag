import { motion } from "framer-motion";
import { Users, Target, Cpu } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import vitalTagLogo from "@/assets/vital-tag-logo.png";

const teamMembers = [
  { name: "Dr. Evelyn Reed", role: "Founder & Lead Veterinarian" },
  { name: "Marcus Chen", role: "Head of Engineering" },
  { name: "Sofia Garcia", role: "AI & Data Science Lead" },
];

export default function About() {
  return (
    <div className="bg-background text-foreground">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto px-4"
          >
            <img src={vitalTagLogo} alt="VITAL-TAG Logo" className="h-24 w-auto mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Revolutionizing Livestock Health</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              We are dedicated to bringing cutting-edge technology to the agricultural sector, empowering farmers with real-time data and AI-driven
              insights to ensure the health and productivity of their herds.
            </p>
          </motion.div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-background/50">
          <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <Target className="w-12 h-12 mx-auto text-primary mb-4" />
              <h3 className="text-xl font-semibold">Our Mission</h3>
              <p className="mt-2 text-muted-foreground">
                To provide farmers with affordable, reliable, and non-invasive tools for proactive livestock health management.
              </p>
            </div>
            <div className="text-center">
              <Cpu className="w-12 h-12 mx-auto text-primary mb-4" />
              <h3 className="text-xl font-semibold">Our Technology</h3>
              <p className="mt-2 text-muted-foreground">
                We leverage edge computing and custom AI models to deliver instant alerts and predictive health analytics directly from the field.
              </p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 mx-auto text-primary mb-4" />
              <h3 className="text-xl font-semibold">Our Team</h3>
              <p className="mt-2 text-muted-foreground">
                A passionate group of veterinarians, engineers, and data scientists committed to improving animal welfare and farm efficiency.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Meet the Innovators</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {teamMembers.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  className="glass rounded-2xl p-6"
                >
                  <h4 className="font-semibold text-foreground">{member.name}</h4>
                  <p className="text-sm text-primary">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
