import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-base-200 py-8 mt-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="logo" className="w-10 h-10 rounded-full"/>
            <h3 className="text-lg font-bold">UtilityBills</h3>
          </div>
          <p className="mt-3 text-sm">Manage monthly utility bills — view, pay, and track your history with PDF reports.</p>
          <p className="mt-4 text-xs">© {new Date().getFullYear()} UtilityBills</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Useful Links</h4>
          <ul className="text-sm space-y-1">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/help">Help / FAQ</Link></li>
            <li><Link to="/bills">All Bills</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Short</h4>
          <p className="text-sm">Built with React, TailwindCSS & DaisyUI. Responsive & accessible design.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
