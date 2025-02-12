import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Section */}
        <div>
          <h2 className="text-xl font-semibold text-white">LibraryLogix</h2>
          <p className="mt-2 text-gray-400">
            Revolutionizing library management with AI-powered solutions for the modern era.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-white text-xl">
              <FaFacebookF />
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-xl">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-xl">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            {["Home", "Features", "Live Demo", "Testimonials", "Pricing", "Contact"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-white">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-white font-semibold">Legal</h3>
          <ul className="mt-2 space-y-2">
            {["About Us", "Privacy Policy", "Terms of Service", "Contact", "Blog"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-white">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold">Stay Updated</h3>
          <p className="mt-2 text-gray-400">
            Subscribe to our newsletter for updates and insights.
          </p>
          <div className="mt-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400"
            />
            <button className="mt-3 w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="mt-8 border-t border-gray-800 pt-4 text-center text-gray-500 text-sm">
        &copy; 2025 LibraryLogix. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
