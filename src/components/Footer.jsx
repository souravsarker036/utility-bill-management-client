import React from "react";
import { Link } from "react-router-dom";
import { FaRegFileAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900 text-white py-12 mt-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

    
        <div className="space-y-4">
          <Link
            to="/"
            className="font-bold text-2xl flex items-center gap-2 text-white hover:text-yellow-300 transition-colors"
          >
            <FaRegFileAlt className="text-3xl" />
            UtilityBills
          </Link>

          <p className="text-sm opacity-80">
            Manage monthly utility bills — view, pay, and track your history with PDF reports.
          </p>
          <p className="text-xs opacity-70">
            © {new Date().getFullYear()} UtilityBills
          </p>
        </div>

        
        <div className="space-y-2">
          <h4 className="font-semibold text-lg border-b border-white/30 pb-1">Useful Links</h4>
          <ul className="text-sm space-y-1">
            <li>
              <Link to="/about" className="hover:text-yellow-300 transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link to="/help" className="hover:text-yellow-300 transition-colors">
                Help / FAQ
              </Link>
            </li>
            <li>
              <Link to="/bills" className="hover:text-yellow-300 transition-colors">
                All Bills
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-yellow-300 transition-colors">
                Login
              </Link>
            </li>
          </ul>
        </div>

        
        <div className="space-y-2">
          <h4 className="font-semibold text-lg border-b border-white/30 pb-1">About</h4>
          <p className="text-sm opacity-80">
            Built with React, TailwindCSS & DaisyUI. Fully responsive, modern & accessible design.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
