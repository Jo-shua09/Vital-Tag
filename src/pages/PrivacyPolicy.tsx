import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="max-w-4xl mx-auto py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="prose prose-invert lg:prose-xl mx-auto"
        >
          <h1>Privacy Policy</h1>
          <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>
          <p>
            Welcome to VITAL-TAG. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you use our application.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We may collect personal information such as your name, email address, and farm details when you register for an account. We also collect
            telemetry data from your VITAL-TAG devices, including temperature, pulse, and jaw rhythm, which is associated with your account.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>
            We use the information we collect to provide, operate, and maintain our services, to improve and personalize your experience, and to
            communicate with you. Telemetry data is used to provide health alerts and AI-driven insights about your livestock.
          </p>

          <h2>3. Data Security</h2>
          <p>We implement a variety of security measures to maintain the safety of your personal information and data.</p>
        </motion.div>
      </div>
    </div>
  );
}
