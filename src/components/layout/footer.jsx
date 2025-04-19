import React from "react";
import {
  FaFacebookF,
  FaPinterestP,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { FiChevronUp } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 p-8">
      {/* Footer Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div>
          {/* <img src="/logo.png" alt="Make in India" className="w-32 mb-4" /> */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/logo.png"
              alt="Ibrahim Rug Logo"
              className="h-14 w-auto object-contain"
            />
            {/* Optional: Add text next to logo */}
            {/* <span className="text-xl font-bold text-gray-800">Ibrahim Rug</span> */}
          </Link>
          <p className="text-sm">
            Immerse your space in luxury, style, and comfort with our meticulously crafted
            pieces.
          </p>
          {/* Social Icons */}
          <div className="flex space-x-4 mt-4">
            <FaFacebookF className="text-xl cursor-pointer hover:text-blue-600" />
            <FaPinterestP className="text-xl cursor-pointer hover:text-red-600" />
            <FaInstagram className="text-xl cursor-pointer hover:text-pink-600" />
            <FaTwitter className="text-xl cursor-pointer hover:text-blue-400" />
          </div>
        </div>

        {/* Information Section */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Information</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:underline cursor-pointer">About Us</li>
            <li className="hover:underline cursor-pointer">Contact</li>
            <li className="hover:underline cursor-pointer">FAQs</li>
            <li className="hover:underline cursor-pointer">Care Guide</li>
            <li className="hover:underline cursor-pointer">Rug Size Guide</li>
          </ul>
        </div>

        {/* Policies Section */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Policies</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:underline cursor-pointer">Terms of Service</li>
            <li className="hover:underline cursor-pointer">Privacy Policy</li>
            <li className="hover:underline cursor-pointer">Refund Policy</li>
            <li className="hover:underline cursor-pointer">Shipping & Exchange</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
          <button className="flex items-center space-x-2 bg-green-200 px-4 py-2 rounded-md text-green-800">
            <IoIosCall />
            <span>Call Us</span>
          </button>
          <p className="text-sm mt-3">
            <strong>Mon - Sat:</strong> 8:00 AM - 10:30 PM <br />
            <strong>Sun:</strong> 9:00 AM - 6:00 PM <br />
            All times IST
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      {/* <div className="text-center mt-6 text-sm border-t pt-4">
        Copyright © 2025 Ibrahim Rug. All Rights Reserved.
      </div> */}

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end space-y-4 z-10">
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/+918545976660"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white p-3 rounded-full shadow-lg"
        >
          <FaWhatsapp className="text-2xl" />
        </a>

        {/* Scroll To Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-gray-700 text-white p-3 rounded-full shadow-lg"
        >
          <FiChevronUp className="text-2xl" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
