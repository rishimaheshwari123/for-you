import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-cyan-600 py-6 border-t-2">
      <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-700">
        <p>&copy; {new Date().getFullYear()} Meal App. All rights reserved.</p>
        <p>
          Designed & Developed by{" "}
          <span className="text-cyan-600 font-semibold">Rishi Maheshwari</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
