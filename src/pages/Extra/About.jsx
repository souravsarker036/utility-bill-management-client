import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-6 space-y-6"
    >
      <h2 className="text-3xl font-bold text-center mb-4 mt-16">About This System</h2>
      <p>
        This Smart Bill Management System is designed to simplify bill tracking,
        payment, and analysis for users in modern households and organizations.
        It integrates secure authentication, PDF reporting, and intuitive data
        visualization using React, Tailwind, and modern REST APIs.
      </p>

      <ul className="list-disc ml-6 space-y-2">
        <li>Manage all bills from electricity, water, gas, and internet in one place.</li>
        <li>Track payments with automated validation for current month bills.</li>
        <li>Generate downloadable PDF reports for record keeping.</li>
        <li>Optimized for both desktop and mobile devices.</li>
      </ul>
    </motion.div>
  );
};

export default About;
