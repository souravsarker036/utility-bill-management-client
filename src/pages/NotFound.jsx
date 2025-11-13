import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center h-[70vh] text-center space-y-4"
    >
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="text-lg text-gray-500">Oops! Page not found.</p>
      <Link to="/" className="btn btn-primary">
        Go Back Home
      </Link>
    </motion.div>
  );
};

export default NotFound;
