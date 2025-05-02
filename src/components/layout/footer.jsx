import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  MessageCircle,
  ArrowUp,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-stone-100 text-stone-800 px-4 py-8 w-full">
      {/* Footer Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div className="flex flex-col items-start">
          <Link to="/" className="flex items-center space-x-2 mb-3">
            <img
              src="/logo.png"
              alt="Ibrahim Rug Logo"
              className="h-22 w-auto object-contain"
            />
          </Link>
          <p className="text-sm mb-4 max-w-xs">
            Ibrahim Rugs – Timeless Luxury, Modern Design, Artisan Craft, and Sustainable
            Elegance in Every Weave.
          </p>
          {/* Social Icons */}
          <div className="flex space-x-6 mt-2">
            <a href="#" className="transition-colors duration-200 hover:text-stone-600">
              <Facebook size={20} />
            </a>
            <a href="#" className="transition-colors duration-200 hover:text-stone-600">
              <Instagram size={20} />
            </a>
            <a href="#" className="transition-colors duration-200 hover:text-stone-400">
              <Twitter size={20} />
            </a>
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-6 sm:mt-0">
          <h3 className="font-semibold text-xl mb-4">Information</h3>
          <ul className="space-y-2 text-md">
            <li className="hover:text-stone-600 transition-colors duration-200">
              <Link to="/about" className="inline-block">
                About Us
              </Link>
            </li>
            <li className="hover:text-stone-600 transition-colors duration-200">
              <Link to="/contact" className="inline-block">
                Contact
              </Link>
            </li>
            <li className="hover:text-stone-600 transition-colors duration-200">
              <Link to="/faqs" className="inline-block">
                FAQs
              </Link>
            </li>
            {/* <li className="hover:text-stone-600 transition-colors duration-200">
              <Link to="/care-guide" className="inline-block">
                Care Guide
              </Link>
            </li>
            <li className="hover:text-stone-600 transition-colors duration-200">
              <Link to="/size-guide" className="inline-block">
                Rug Size Guide
              </Link>
            </li> */}
          </ul>
        </div>

        {/* Policies Section */}
        <div className="mt-6 lg:mt-0">
          <h3 className="font-semibold text-xl mb-4">Policies</h3>
          <ul className="space-y-2 text-md">
            <li className="hover:text-stone-600 transition-colors duration-200">
              <Link to="/terms" className="inline-block">
                Terms of Service
              </Link>
            </li>
            <li className="hover:text-stone-600 transition-colors duration-200">
              <Link to="/privacy-policy" className="inline-block ">
                Privacy Policy
              </Link>
            </li>
            {/* <li className="hover:text-stone-600 transition-colors duration-200">
              <Link to="/refund" className="inline-block">
                Refund Policy
              </Link>
            </li>
            <li className="hover:text-stone-600 transition-colors duration-200">
              <Link to="/shipping" className="inline-block">
                Shipping & Exchange
              </Link>
            </li> */}
          </ul>
        </div>

        {/* Contact Section */}
        <div className="mt-6 lg:mt-0">
          <h3 className="font-semibold text-xl mb-4">Contact Us</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <MapPin size={20} className="text-stone-700 mt-1 flex-shrink-0" />
              <span className="text-sm">
                Mirzapur, <br /> Uttar Pradesh, India
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={20} className="text-stone-700 flex-shrink-0" />
              <a
                href="tel:+918545976660"
                className="text-sm hover:text-stone-600 transition-colors duration-200"
              >
                +91 8545976660
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={20} className="text-stone-700 flex-shrink-0" />
              <a
                href="mailto:imtiazali661986@gmail.com"
                className="text-sm hover:text-stone-600 transition-colors duration-200"
              >
                imtiazali661986@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      {/* <div className="text-center mt-8 pt-6 border-t border-stone-200 text-sm">
        <p>Copyright © {new Date().getFullYear()} Ibrahim Rug. All Rights Reserved.</p>
      </div> */}

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end space-y-4 z-50">
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/+918545976660"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-200"
        >
          <FaWhatsapp className="text-2xl" />
        </a>

        {/* Scroll To Top Button - Only visible when scrolled down */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="bg-stone-700 text-white p-3 rounded-full shadow-lg hover:bg-stone-800 transition-colors duration-200"
        >
          <ArrowUp size={24} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
