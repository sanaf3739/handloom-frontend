import React from "react";
import { Link } from "react-router";

const MenuItems = ({ isOpen, setIsOpen }) => {
  return (
    // <div
    //   className={`absolute left-0 right-0 top-full bg-white shadow-lg md:hidden transition-transform duration-300 ${
    //     isOpen
    //       ? "translate-y-0 opacity-100"
    //       : "-translate-y-full opacity-0 pointer-events-none"
    //   }`}
    // >
      <nav className="px-4">
        <ul className="space-y-3">
          <li>
            <Link
              to="/categories/best-seller"
              className="block w-full py-2 text-center hover:bg-gray-100 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Best Seller
            </Link>
          </li>
          <li>
            <Link
              to="/categories/hand-tufted"
              className="block w-full py-2 text-center hover:bg-gray-100 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Hand Tufted
            </Link>
          </li>
          <li>
            <Link
              to="/categories/hand-knotted"
              className="block w-full py-2 text-center hover:bg-gray-100 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Hand Knotted
            </Link>
          </li>
          <li>
            <Link
              to="/categories/hand-woven"
              className="block w-full py-2 text-center hover:bg-gray-100 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Hand Woven
            </Link>
          </li>
        </ul>
      </nav>
    // </div>
  );
};

export default MenuItems;
