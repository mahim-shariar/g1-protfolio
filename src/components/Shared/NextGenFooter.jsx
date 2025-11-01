import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaLinkedin,
  FaArrowRight,
} from "react-icons/fa";

const NextGenFooter = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  // Footer data
  const footerData = {
    logo: {
      src: "/logo.svg",
      alt: "Company Logo",
      tagline: "Cutting-edge video editing",
    },
    links: [
      { name: "Services", href: "#services" },
      { name: "Work", href: "#portfolio" },
      { name: "About", href: "#about" },
      { name: "Contact", href: "#contact" },
    ],
    social: [
      {
        name: "Instagram",
        href: "#",
        icon: FaInstagram,
        color: "hover:text-pink-500",
      },
      {
        name: "YouTube",
        href: "#",
        icon: FaYoutube,
        color: "hover:text-red-500",
      },
      {
        name: "Twitter",
        href: "#",
        icon: FaTwitter,
        color: "hover:text-blue-400",
      },
      {
        name: "LinkedIn",
        href: "#",
        icon: FaLinkedin,
        color: "hover:text-blue-600",
      },
    ],
  };

  return (
    <footer className="relative bg-white border-t border-gray-200/50 overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-100/30 rounded-full blur-3xl"></div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(20, 184, 166, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(20, 184, 166, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left: Logo and tagline */}
          <motion.div
            className="flex items-center mb-6 md:mb-0"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {/* Animated logo */}
            <div className="relative mr-4">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                V
              </div>
              <div className="absolute -inset-2 bg-teal-500/10 rounded-lg blur-sm"></div>
            </div>

            <div>
              <p className="text-gray-800 font-medium">VIDEO EDITING</p>
              <p className="text-gray-600 text-sm">{footerData.logo.tagline}</p>
            </div>
          </motion.div>

          {/* Right: Links and social icons */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            {/* Quick links */}
            <motion.div
              className="flex space-x-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {footerData.links.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className="relative text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm group/link"
                  onHoverStart={() => setHoveredItem(`link-${index}`)}
                  onHoverEnd={() => setHoveredItem(null)}
                  whileHover={{ y: -2 }}
                >
                  {link.name}
                  {/* Animated underline */}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: hoveredItem === `link-${index}` ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* Arrow indicator on hover */}
                  <FaArrowRight
                    className="inline-block ml-1 text-teal-500 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 transform group-hover/link:translate-x-1"
                    size={10}
                  />
                </motion.a>
              ))}
            </motion.div>

            {/* Social icons with React Icons */}
            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {footerData.social.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    className={`relative p-2 text-gray-500 transition-colors duration-300 group ${social.color}`}
                    onHoverStart={() => setHoveredItem(`social-${index}`)}
                    onHoverEnd={() => setHoveredItem(null)}
                    whileHover={{ y: -3, scale: 1.1 }}
                    aria-label={social.name}
                  >
                    {/* Hover effect background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-emerald-500/10 rounded-lg"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: hoveredItem === `social-${index}` ? 1 : 0,
                        scale: hoveredItem === `social-${index}` ? 1 : 0.8,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Icon */}
                    <IconComponent
                      className="relative z-10 transition-colors duration-300"
                      size={18}
                    />

                    {/* Subtle glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        boxShadow:
                          "0 0 15px rgba(20, 184, 166, 0.2), 0 0 30px rgba(16, 185, 129, 0.1)",
                      }}
                      animate={{
                        boxShadow:
                          hoveredItem === `social-${index}`
                            ? [
                                "0 0 15px rgba(20, 184, 166, 0.2), 0 0 30px rgba(16, 185, 129, 0.1)",
                                "0 0 20px rgba(20, 184, 166, 0.3), 0 0 40px rgba(16, 185, 129, 0.2)",
                                "0 0 15px rgba(20, 184, 166, 0.2), 0 0 30px rgba(16, 185, 129, 0.1)",
                              ]
                            : "0 0 0px rgba(20, 184, 166, 0), 0 0 0px rgba(16, 185, 129, 0)",
                      }}
                      transition={{
                        duration: 0.5,
                        repeat:
                          hoveredItem === `social-${index}` ? Infinity : 0,
                        repeatType: "reverse",
                      }}
                    />

                    {/* Tooltip on hover */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="bg-gray-800 text-white text-xs py-1 px-2 rounded-md whitespace-nowrap">
                        {social.name}
                      </div>
                      <div className="w-2 h-2 bg-gray-800 rotate-45 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"></div>
                    </div>
                  </motion.a>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Bottom copyright */}
        <motion.div
          className="mt-12 pt-6 border-t border-gray-200/50 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} NextGen Editing. All rights reserved.
          </p>

          {/* Additional info */}
          <div className="flex justify-center items-center mt-2 space-x-4 text-xs text-gray-500">
            <span>Powered by AI Technology</span>
            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
            <span>4K & 8K Support</span>
            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
            <span>Global Delivery</span>
          </div>
        </motion.div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${
                Math.random() > 0.5
                  ? "rgba(20, 184, 166, 0.3)"
                  : "rgba(16, 185, 129, 0.3)"
              }, transparent)`,
              animation: `float ${
                10 + Math.random() * 10
              }s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-10px) translateX(5px);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-5px) translateX(10px);
            opacity: 0.7;
          }
          75% {
            transform: translateY(-15px) translateX(5px);
            opacity: 0.5;
          }
        }
      `}</style>
    </footer>
  );
};

export default NextGenFooter;
