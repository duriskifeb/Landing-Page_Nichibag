// src/frontend/Navbar.jsx

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Logo from "../assets/logoss.png";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { getTotalItems } = useCart();

  const menuItems = [
    { name: "Collection", path: "/" },
    { name: "About", path: "/about" },
    { name: "Service", path: "/services" },
    { name: "Contact Us", path: "/contact" },
  ];

  // Efek shadow saat di-scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tutup menu mobile saat navigasi
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const NavLink = ({ to, children }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${
          isActive
            ? "bg-rose-500 text-white shadow-md"
            : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/50"
        }`}
      >
        {children}
      </Link>
    );
  };

  return (
    <>
      <div className="fixed top-4 left-0 w-full z-50 flex justify-center px-4 pointer-events-none">
        <nav
          className={`pointer-events-auto w-full max-w-5xl bg-white/60 backdrop-blur-xl border border-white/50 rounded-full transition-all duration-300 flex items-center justify-between px-4 py-2 ${
            isScrolled ? "shadow-[0_8px_30px_rgb(0,0,0,0.12)] y-2" : "shadow-sm"
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 ml-2">
            <img src={Logo} alt="Nichibag" className="h-10 w-auto" />
          </Link>

          {/* Menu Desktop */}
          <ul className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <li key={item.name}>
                <NavLink to={item.path}>{item.name}</NavLink>
              </li>
            ))}
          </ul>

          {/* Tombol Aksi & Hamburger */}
          <div className="flex items-center gap-3">
            <Link to="/cart" className="relative p-2 text-gray-800 hover:text-rose-500 transition-colors">
              <ShoppingBag size={22} />
              {getTotalItems() > 0 && (
                <span className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                  {getTotalItems()}
                </span>
              )}
            </Link>
            <button
                onClick={() => navigate('/katalog')}
                className="hidden md:block bg-[#f8d7d0] text-red-700 font-bold px-6 py-2 rounded-full hover:bg-rose-400 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
                Shop Now
            </button>
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2 mr-2">
              <Menu size={26} className="text-gray-800" />
            </button>
          </div>
        </nav>
      </div>

      {/* Menu Mobile (Slide-out) */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={`fixed top-0 right-0 h-full w-2/3 max-w-sm bg-white shadow-xl transform transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()} // Mencegah menu tertutup saat diklik di dalam area menu
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <img src={Logo} alt="Nichibag" className="h-12 w-auto" />
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                    <X size={28} className="text-gray-800" />
                </button>
            </div>
            <ul className="flex flex-col space-y-6 text-xl">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="font-semibold text-gray-800 hover:text-red-800">{item.name}</Link>
                </li>
              ))}
            </ul>
             <button
                onClick={() => navigate('/katalog')}
                className="mt-8 w-full bg-[#f8d7d0] text-red-500 font-bold px-6 py-3 rounded-full hover:bg-red-400 transition-all duration-300"
            >
                Shop Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;