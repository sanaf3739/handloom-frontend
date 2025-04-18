import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Menu, ShoppingBag, User, Search } from "lucide-react";
import { useSelector } from "react-redux";

export const Header = ({ isOpen, setIsOpen }) => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  // Control header visibility and styling based on scroll
  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;

      // Add background and shadow when scrolled
      if (currentScrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Show header when scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setShow(true);
      }
      // Hide header when scrolling down
      else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShow(false);
      }

      // Update scroll position
      setLastScrollY(currentScrollY);
    };

    // Add scroll event listener
    window.addEventListener("scroll", controlHeader);

    // Clean up event listener
    return () => {
      window.removeEventListener("scroll", controlHeader);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 transition-all duration-300 z-50 shadow-md py-3 ${
        show ? "translate-y-0" : "-translate-y-full"
      } ${isScrolled ? "bg-white" : "bg-transparent"}`}
    >
      <div className="px-5 h-14">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/logo.png"
              alt="Ibrahim Rug Logo"
              className="h-14 w-auto object-contain"
            />
            {/* Optional: Add text next to logo */}
            {/* <span className="text-xl font-bold text-gray-800">Ibrahim Rug</span> */}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-2 lg:space-x-8">
              <li>
                <Link
                  to="/categories/best-seller"
                  className="text-gray-700 hover:text-amber-700 transition-colors font-medium"
                >
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link
                  to="/categories/hand-tufted"
                  className="text-gray-700 hover:text-amber-700 transition-colors font-medium"
                >
                  Hand Tufted
                </Link>
              </li>
              <li>
                <Link
                  to="/categories/hand-knotted"
                  className="text-gray-700 hover:text-amber-700 transition-colors font-medium"
                >
                  Hand Knotted
                </Link>
              </li>
              <li>
                <Link
                  to="/categories/hand-woven"
                  className="text-gray-700 hover:text-amber-700 transition-colors font-medium"
                >
                  Hand Woven
                </Link>
              </li>
            </ul>
          </nav>

          {/* Desktop Action Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-700 hover:text-amber-700"
            >
              <Search size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-700 hover:text-amber-700"
            >
              <User size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-700 hover:text-amber-700 relative"
            >
              <Link to="/cart">
                <ShoppingBag size={20} />
              </Link>
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                  {cartItems.length}
                </span>
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 h-12 w-12 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <Menu size={30} />
          </button>
        </div>
      </div>
    </header>
  );
};
