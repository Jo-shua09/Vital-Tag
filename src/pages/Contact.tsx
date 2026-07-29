import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Contact() {
  return (
    <div className="bg-background text-foreground">
      <Navbar />
      <main className="pt-20">
        <div className="max-w-5xl mx-auto py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Get in Touch</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              We’d love to hear from you. Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions.
            </p>
          </motion.div>

          <div className="mt-16 grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="glass rounded-2xl p-8"
            >
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="text-xs text-muted-foreground mb-1.5 block">Full Name</label>
                  <input type="text" id="name" placeholder="Your Name" className="w-full px-4 py-2.5 rounded-lg bg-secondary/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                  <label htmlFor="email" className="text-xs text-muted-foreground mb-1.5 block">Email Address</label>
                  <input type="email" id="email" placeholder="you@example.com" className="w-full px-4 py-2.5 rounded-lg bg-secondary/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                  <label htmlFor="message" className="text-xs text-muted-foreground mb-1.5 block">Message</label>
                  <textarea id="message" rows={4} placeholder="How can we help?" className="w-full px-4 py-2.5 rounded-lg bg-secondary/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"></textarea>
                </div>
                <button type="submit" className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                  Send Message <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-3"><Mail className="w-5 h-5 text-primary" /> Email Us</h3>
                <p className="text-muted-foreground mt-1">Our support team will get back to you within 24 hours.</p>
                <a href="mailto:support@vitaltag.com" className="text-primary hover:underline">support@vitaltag.com</a>
              </div>
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-3"><Phone className="w-5 h-5 text-primary" /> Call Us</h3>
                <p className="text-muted-foreground mt-1">Mon-Fri from 8am to 5pm.</p>
                <a href="tel:+1-555-123-4567" className="text-primary hover:underline">+1 (555) 123-4567</a>
              </div>
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-3"><MapPin className="w-5 h-5 text-primary" /> Our Office</h3>
                <p className="text-muted-foreground mt-1">123 AgriTech Avenue, Suite 100<br />Farmington, ST 54321</p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}