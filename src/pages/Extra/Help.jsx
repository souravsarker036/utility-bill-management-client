import React from "react";
import { motion } from "framer-motion";

const Help = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto p-6 space-y-6"
    >
      <h2 className="text-3xl font-bold text-center mb-4 mt-20">Help & Support</h2>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Common Questions</h3>
        <details className="collapse collapse-arrow border border-base-200 rounded-box">
          <summary className="collapse-title text-lg font-medium">
            How can I pay my bill?
          </summary>
          <div className="collapse-content">
            <p>
              Navigate to the “All Bills” page, open a bill, and click the “Pay
              Now” button. Only current month bills can be paid online.
            </p>
          </div>
        </details>

        <details className="collapse collapse-arrow border border-base-200 rounded-box">
          <summary className="collapse-title text-lg font-medium">
            How do I download my report?
          </summary>
          <div className="collapse-content">
            <p>
              Go to “My Bills” page and click the “Download PDF” button. The
              system will generate and download your bill summary instantly.
            </p>
          </div>
        </details>

        <details className="collapse collapse-arrow border border-base-200 rounded-box">
          <summary className="collapse-title text-lg font-medium">
            My payment failed. What should I do?
          </summary>
          <div className="collapse-content">
            <p>
              Please check your network connection and ensure you’re paying for
              the current month’s bill. If it still fails, contact support at{" "}
              <span className="text-primary">support@UtilityBillsTeam.io</span>.
            </p>
          </div>
        </details>
      </div>
    </motion.div>
  );
};

export default Help;
