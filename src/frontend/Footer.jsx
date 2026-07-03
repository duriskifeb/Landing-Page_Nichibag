// src/frontend/Footer.jsx

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faInstagram, 
  faTiktok, 
  faWhatsapp 
} from "@fortawesome/free-brands-svg-icons";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const Footer = () => {
  const menuItems = [
    { name: "Collection", path: "/" },
    { name: "About", path: "/about" },
    { name: "Service", path: "/services" },
    { name: "Contact Us", path: "/contact" },
  ];

  const socialLinks = [
    { href: "https://www.instagram.com/nichibag.id", icon: faInstagram, label: "Instagram" },
    { href: "https://www.tiktok.com/@nichibag", icon: faTiktok, label: "TikTok" },
    { href: "https://wa.me/6287788261298", icon: faWhatsapp, label: "WhatsApp" },
    { href: "https://shopee.co.id/nichibag.id", icon: faStore, label: "Shopee" },
    { href: "https://www.tokopedia.com/nichii", icon: faStore, label: "Tokopedia" },
  ];

  return (
    <footer className="bg-[#f8d7d0] text-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Kolom 1: Logo & Deskripsi */}
          <div className="md:col-span-1">
            <h2 className="text-3xl font-bold text-red-700 mb-4">
              Nichibag.id
            </h2>
            <p className="text-sm text-red-700">
              Solusi kemasan modern yang mengutamakan kualitas, estetika, dan
              kepedulian terhadap lingkungan.
            </p>
          </div>

          {/* Kolom 2: Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-red-700">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.path}
                    className="group inline-flex items-center text-red-700 font-medium transition-all duration-300 hover:text-red-900"
                  >
                    <span className="transition-transform duration-300 ease-out group-hover:translate-x-2">
                      {item.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Hubungi Kami */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-red-700">
              Hubungi Kami
            </h3>
            <ul className="space-y-3 text-red-700">
              <li>nichibag.id@gmail.com</li>
              <li>+62 877 8826 1298</li>
              <li>Surabaya, Indonesia</li>
            </ul>
          </div>

          {/* Kolom 4: Follow Us */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-red-700">Follow Us</h3>
            {/* 👇 BAGIAN INI YANG DIPERBARUI */}
            <div className="flex flex-wrap gap-4 mt-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.15, y: -6, rotate: 4 }}
                  whileTap={{ scale: 0.9, rotate: -4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="group flex flex-col items-center justify-center gap-2 text-red-700 bg-white/50 hover:bg-red-700 hover:text-white rounded-2xl p-3 transition-colors duration-300 shadow-[0_4px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_20px_rgba(185,28,28,0.3)] w-20 border border-red-100"
                >
                  <FontAwesomeIcon icon={social.icon} className="h-6 w-6" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Garis Pemisah & Copyright */}
        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-sm text-red-700">
          <p>© {new Date().getFullYear()} Nichibag.id. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;