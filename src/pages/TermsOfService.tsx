import { motion } from "framer-motion";

export default function TermsOfService() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="max-w-4xl mx-auto py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="prose prose-invert lg:prose-xl mx-auto"
        >
          <h1>Terms of Service</h1>
          <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>
          <p>
            Please read these Terms of Service carefully before using the VITAL-TAG application. Your access to and use of the Service is conditioned
            on your acceptance of and compliance with these Terms.
          </p>

          <h2>1. Accounts</h2>
          <p>
            When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so
            constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
          </p>

          <h2>2. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive property of VITAL-TAG Inc. and its
            licensors.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
