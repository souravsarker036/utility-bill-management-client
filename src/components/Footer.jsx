import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-200 dark:bg-gray-800 py-6 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div>
          <h1 className="text-lg font-bold">UtilityBill</h1>
          <p>Manage your monthly utility bills easily.</p>
        </div>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <Link to="/" className="hover:text-blue-500">Home</Link>
          <Link to="/about" className="hover:text-blue-500">About</Link>
          <Link to="/bills" className="hover:text-blue-500">Bills</Link>
          <Link to="/profile" className="hover:text-blue-500">Profile</Link>
        </div>
        <p className="mt-4 md:mt-0">© 2025 UtilityBill. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
