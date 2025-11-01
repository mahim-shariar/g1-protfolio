import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import BookingModal from "../BookingModal";

const NextGenNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navbarRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/projects" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/whyChooseUs" },
    { name: "Contact", path: "/contact" },
    { name: "Faqs", path: "/faqs" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  // Function to handle book a call click
  const handleBookCall = () => {
    setIsModalOpen(true);
    setIsOpen(false);
  };

  return (
    <motion.nav
      ref={navbarRef}
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md py-2 border-b border-teal-200 shadow-sm"
          : "bg-transparent py-4"
      }`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <Link to="/" className="flex items-center">
              <div className="relative group">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 flex items-center justify-center overflow-hidden">
                  <span className="text-white font-bold text-lg">V</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="absolute -inset-1 bg-teal-500/20 rounded-lg blur-sm group-hover:blur-md transition-all duration-300 opacity-50 group-hover:opacity-70"></div>
              </div>
              <span className="ml-3 text-gray-800 font-bold text-xl tracking-tight">
                VISUAL<span className="text-teal-500">STUDIO</span>
              </span>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <motion.div
            className="hidden md:flex items-center space-x-1"
            variants={containerVariants}
          >
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                className="relative"
                variants={itemVariants}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <Link
                  to={item.path}
                  className={`relative px-4 py-2 group block ${
                    location.pathname === item.path
                      ? "text-teal-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  <div
                    className={`absolute bottom-0 left-0 w-full h-0.5 ${
                      location.pathname === item.path
                        ? "bg-teal-500 scale-x-100"
                        : "bg-teal-500 scale-x-0 group-hover:scale-x-100"
                    } transition-transform duration-300 origin-left`}
                  ></div>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-teal-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </motion.div>
            ))}
            <motion.button
              className="ml-4 px-6 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium rounded-full relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={itemVariants}
              onClick={handleBookCall}
            >
              <span className="relative z-10">Book a Call</span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 rounded-full shadow-lg shadow-teal-500/20 group-hover:shadow-teal-500/30 transition-all duration-300"></div>
            </motion.button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.div className="md:hidden" variants={itemVariants}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-between items-center">
                <motion.span
                  className="w-6 h-0.5 bg-teal-500 block"
                  animate={{
                    rotate: isOpen ? 45 : 0,
                    y: isOpen ? 8 : 0,
                  }}
                ></motion.span>
                <motion.span
                  className="w-6 h-0.5 bg-teal-500 block"
                  animate={{ opacity: isOpen ? 0 : 1 }}
                ></motion.span>
                <motion.span
                  className="w-6 h-0.5 bg-teal-500 block"
                  animate={{
                    rotate: isOpen ? -45 : 0,
                    y: isOpen ? -8 : 0,
                  }}
                ></motion.span>
              </div>
            </button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden mt-4 overflow-hidden"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="py-4 bg-white/95 backdrop-blur-lg rounded-lg border border-teal-200 shadow-xl">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={index}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsOpen(false)}
                  >
                    <Link
                      to={item.path}
                      className={`block px-6 py-3 transition-colors duration-300 ${
                        location.pathname === item.path
                          ? "text-teal-600 bg-teal-50"
                          : "text-gray-600 hover:text-gray-900 hover:bg-teal-50"
                      }`}
                    >
                      <span className="flex items-center">
                        <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                        {item.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
                <div className="px-6 py-4 mt-2">
                  <motion.button
                    className="w-full px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium rounded-full relative overflow-hidden"
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBookCall}
                  >
                    <span className="relative z-10">Book a Call</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Animated elements */}
      {!scrolled && (
        <>
          <motion.div
            className="absolute top-0 left-1/4 w-1 h-1 rounded-full bg-teal-400"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-0 right-1/3 w-1 h-1 rounded-full bg-emerald-400"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </>
      )}

      {/* TidyCal Modal */}
      <BookingModal
        onClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
      />
    </motion.nav>
  );
};

export default NextGenNavbar;
