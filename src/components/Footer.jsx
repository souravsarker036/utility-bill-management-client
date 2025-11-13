import React from "react";
import { Link } from "react-router-dom";
import { FaRegFileAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 py-8 mt-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* === Left Section === */}
        <div>
          <Link
            to="/"
            className="font-bold text-xl flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <FaRegFileAlt className="text-2xl text-indigo-600" />
            UtilityBills
          </Link>

          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
            Manage monthly utility bills — view, pay, and track your history with PDF reports.
          </p>
          <p className="mt-4 text-xs text-gray-500">
            © {new Date().getFullYear()} UtilityBills
          </p>
        </div>

        {/* === Middle Section === */}
        <div>
          <h4 className="font-semibold mb-2">Useful Links</h4>
          <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
            <li><Link to="/about" className="hover:text-indigo-600">About</Link></li>
            <li><Link to="/help" className="hover:text-indigo-600">Help / FAQ</Link></li>
            <li><Link to="/bills" className="hover:text-indigo-600">All Bills</Link></li>
            <li><Link to="/login" className="hover:text-indigo-600">Login</Link></li>
          </ul>
        </div>

        {/* === Right Section === */}
        <div>
          <h4 className="font-semibold mb-2">Short</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Built with React, TailwindCSS & DaisyUI. Responsive & accessible design.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
