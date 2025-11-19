import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getContactInfo } from "../services/api";
import emailjs from "@emailjs/browser";
import {
  FaEnvelope,
  FaComments,
  FaVideo,
  FaClock,
  FaCheckCircle,
  FaArrowRight,
  FaLightbulb,
  FaRocket,
  FaCalendarAlt,
  FaStar,
  FaShieldAlt,
  FaHeadset,
  FaYoutube,
  FaInstagram,
  FaFilm,
  FaMagic,
  FaAward,
} from "react-icons/fa";
import bg from "/ICON.png";

const ContactPage = () => {
  const canvasRef = useRef(null);
  const formRef = useRef(null);
  const animationRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingCompleted, setBookingCompleted] = useState(false);

  // EmailJS configuration
  const EMAILJS_CONFIG = {
    SERVICE_ID: import.meta.env.VITE_SERVICE_ID,
    TEMPLATE_ID: import.meta.env.VITE_TEMPLATE_ID,
    PUBLIC_KEY: import.meta.env.VITE_PUBLIC_KEY,
  };

  // Floating Gradient Blobs Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Blob {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 120 + 80;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        this.color = [
          `rgba(45, 212, 191, ${Math.random() * 0.3 + 0.2})`, // Teal shades with higher opacity
          `rgba(13, 148, 136, ${Math.random() * 0.3 + 0.2})`, // Teal shades with higher opacity
          `rgba(20, 184, 166, ${Math.random() * 0.3 + 0.2})`, // Teal shades with higher opacity
        ][Math.floor(Math.random() * 3)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < -this.size) this.x = canvas.width + this.size;
        if (this.x > canvas.width + this.size) this.x = -this.size;
        if (this.y < -this.size) this.y = canvas.height + this.size;
        if (this.y > canvas.height + this.size) this.y = -this.size;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = 0.3; // Increased opacity for better visibility

        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.size
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const blobs = Array.from({ length: 10 }, () => new Blob()); // Increased number of blobs

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle background gradient
      const bgGradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );
      bgGradient.addColorStop(0, "rgba(249, 250, 251, 0.95)"); // Less transparent
      bgGradient.addColorStop(1, "rgba(255, 255, 255, 0.98)"); // Less transparent
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      blobs.forEach((blob) => {
        blob.update();
        blob.draw();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Floating Logo Component - Only using bg logo
  const FloatingLogos = () => {
    const logoPositions = [
      { left: "10%", top: "15%", size: 40, delay: 0 },
      { left: "85%", top: "20%", size: 35, delay: 1 },
      { left: "15%", top: "70%", size: 45, delay: 2 },
      { left: "80%", top: "65%", size: 38, delay: 3 },
      { left: "5%", top: "40%", size: 32, delay: 4 },
      { left: "90%", top: "45%", size: 42, delay: 5 },
      { left: "25%", top: "10%", size: 36, delay: 6 },
      { left: "75%", top: "85%", size: 44, delay: 7 },
      { left: "45%", top: "5%", size: 30, delay: 8 },
      { left: "55%", top: "90%", size: 48, delay: 9 },
      { left: "35%", top: "30%", size: 34, delay: 10 },
      { left: "65%", top: "60%", size: 40, delay: 11 },
    ];

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {logoPositions.map((position, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: position.left,
              top: position.top,
              width: position.size,
              height: position.size,
            }}
            animate={{
              y: [0, -25, 0],
              x: [0, 15, 0],
              rotate: [0, 8, -6, 0],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{
              duration: 18 + index * 2,
              repeat: Infinity,
              delay: position.delay,
              ease: "easeInOut",
            }}
          >
            <div
              className="relative group"
              style={{
                width: position.size,
                height: position.size,
              }}
            >
              <img
                src={bg}
                alt="Video Editor"
                className="w-full h-full object-contain opacity-15 group-hover:opacity-30 transition-opacity duration-500"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(44%) sepia(45%) saturate(572%) hue-rotate(135deg) brightness(92%) contrast(90%)",
                }}
              />
              {/* Subtle glow effect on hover */}
              <div className="absolute inset-0 bg-teal-400/10 rounded-full blur-sm group-hover:bg-teal-400/20 transition-all duration-500 opacity-0 group-hover:opacity-100" />
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  // Fetch contact data from API
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        setLoading(true);
        const response = await getContactInfo();
        setContactData(response.data.contact);
        setError(null);
      } catch (err) {
        console.error("Error fetching contact data:", err);
        setError("Failed to load contact information");
        setContactData({
          email: "hello@videoagency.com",
          phone: "+1 (555) 123-4567",
          address: {
            city: "Los Angeles",
            state: "CA",
            country: "USA",
          },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
  }, []);

  // Listen for booking completion
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.event === "calendly.event_scheduled") {
        setBookingCompleted(true);
        console.log("Booking completed!", event.data);
      }
    };

    if (isBookingOpen) {
      window.addEventListener("message", handleMessage);
    }

    return () => window.removeEventListener("message", handleMessage);
  }, [isBookingOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const templateParams = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        subject: formData.subject,
        time: new Date().toLocaleString(),
      };

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      console.log("Email sent successfully:", formData);
      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }, 5000);
    } catch (error) {
      console.error("Failed to send email:", error);
      alert(
        "Sorry, there was an error sending your message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const quickQueries = [
    "Pricing information",
    "Small edit requests",
    "File format questions",
    "Turnaround times",
    "Portfolio examples",
    "General information",
  ];

  const complexProjects = [
    "Multi-video campaigns",
    "Brand strategy development",
    "Large budget projects ($5,000+)",
    "Ongoing partnerships",
    "Complex motion graphics",
    "Full production services",
  ];

  const supportFeatures = [
    {
      icon: FaShieldAlt,
      title: "Quality Guarantee",
      description: "100% satisfaction or we'll make it right",
    },
    {
      icon: FaHeadset,
      title: "Dedicated Support",
      description: "Direct communication with your editor",
    },
    {
      icon: FaStar,
      title: "Proven Results",
      description: "500+ successful projects delivered",
    },
  ];

  const services = [
    {
      icon: FaYoutube,
      name: "YouTube Videos",
      color: "from-red-400 to-red-500",
    },
    {
      icon: FaInstagram,
      name: "Social Content",
      color: "from-pink-400 to-pink-500",
    },
    {
      icon: FaFilm,
      name: "Commercial Ads",
      color: "from-blue-400 to-blue-500",
    },
    {
      icon: FaMagic,
      name: "Motion Graphics",
      color: "from-purple-400 to-purple-500",
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-gray-50 to-white flex flex-col items-center justify-center pt-20 pb-10 overflow-hidden">
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Floating Logos - Only using bg logo */}
      <FloatingLogos />

      {/* Multiple Teal Gradient Orbs - Only Teal Shades */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top Left - Light Teal */}
        <motion.div
          className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-r from-teal-300/25 to-teal-400/25 rounded-full blur-3xl"
          animate={{
            x: [0, 80, 0],
            y: [0, -60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Top Right - Medium Teal */}
        <motion.div
          className="absolute top-32 right-32 w-72 h-72 bg-gradient-to-r from-teal-400/30 to-teal-500/30 rounded-full blur-3xl"
          animate={{
            x: [0, -70, 0],
            y: [0, 50, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Bottom Left - Dark Teal */}
        <motion.div
          className="absolute bottom-40 left-40 w-96 h-96 bg-gradient-to-r from-teal-500/20 to-teal-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, 60, 0],
            y: [0, 70, 0],
            scale: [1.1, 1.3, 1.1],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Bottom Right - Cyan Teal */}
        <motion.div
          className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-cyan-400/25 to-teal-400/25 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Center - Bright Teal */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-teal-200/20 to-teal-300/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Middle Left - Emerald Teal */}
        <motion.div
          className="absolute top-1/3 -left-10 w-60 h-60 bg-gradient-to-r from-emerald-400/25 to-teal-400/25 rounded-full blur-3xl"
          animate={{
            x: [0, 90, 0],
            y: [0, -30, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Middle Right - Deep Teal */}
        <motion.div
          className="absolute bottom-1/3 -right-10 w-56 h-56 bg-gradient-to-r from-teal-500/30 to-teal-600/30 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 40, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-12">
        {/* Header Section */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-gradient-to-r from-teal-50 to-teal-100 border border-teal-200 mb-8 shadow-lg backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse"></div>
            <span className="text-teal-600 font-semibold text-sm tracking-wider">
              Choose Your Path
            </span>
            <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse"></div>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="text-gray-800">How Can We</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-500">
              Help You Today?
            </span>
          </motion.h1>

          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Quick questions get quick answers via email. Complex projects
            deserve proper discussion through a scheduled call.
          </motion.p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Quick Questions - Left Side */}
          <div className="space-y-8">
            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-teal-200 p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FaEnvelope className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Quick Questions
                </h2>
                <p className="text-gray-600">
                  Perfect for simple queries and fast responses
                </p>
              </div>

              {/* When to Use */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FaLightbulb className="w-4 h-4 text-teal-500" />
                  Perfect for:
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {quickQueries.map((query, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3 text-sm text-gray-600 p-2 rounded-lg hover:bg-teal-50 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
                      {query}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Response Info */}
              <div className="bg-teal-50 rounded-xl p-4 mb-6 border border-teal-200">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <FaClock className="w-4 h-4 text-teal-500" />
                    <span className="text-gray-700">Response Time</span>
                  </div>
                  <span className="font-semibold text-teal-600">
                    Within 24 hours
                  </span>
                </div>
              </div>

              {/* Email Form */}
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Your Name"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="What's your question about?"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      placeholder="Briefly describe your question..."
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-teal-400 to-teal-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-teal-200 transition-all duration-300 flex items-center justify-center gap-2 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Quick Message
                        <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <FaCheckCircle className="w-16 h-16 text-teal-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600">
                    We'll get back to you within 24 hours with a response.
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Services Card - Clean White */}
            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-gray-200 p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FaAward className="w-8 h-8 text-gray-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Our Services
                </h2>
                <p className="text-gray-600">
                  Professional video editing across all platforms
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200 group hover:bg-gray-100 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-gray-800 font-semibold text-sm leading-tight">
                      {service.name}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Side - Two Cards Stack */}
          <div className="space-y-8">
            {/* Complex Projects Card */}
            <motion.div
              className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-3xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              whileHover={{ y: -5 }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
              </div>

              {/* Header */}
              <div className="text-center mb-8 relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
                  <FaComments className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Proper Discussion
                </h2>
                <p className="text-teal-100">
                  For complex projects that need detailed planning
                </p>
              </div>

              {/* When to Use */}
              <div className="mb-6 relative z-10">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <FaRocket className="w-4 h-4 text-teal-200" />
                  Ideal for:
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {complexProjects.map((project, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3 text-sm text-teal-100 p-2 rounded-lg hover:bg-white/10 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-1.5 h-1.5 bg-teal-200 rounded-full"></div>
                      {project}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Call Benefits */}
              <div className="bg-white/10 rounded-xl p-4 mb-6 backdrop-blur-sm border border-white/20">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-teal-100">Session Type</span>
                    <span className="font-semibold text-white">
                      1:1 Video Call
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-teal-100">Duration</span>
                    <span className="font-semibold text-white">60 Minutes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-teal-100">Outcome</span>
                    <span className="font-semibold text-white">
                      Custom Plan
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="relative z-10">
                <motion.button
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full py-4 bg-white text-teal-600 font-semibold rounded-xl shadow-2xl hover:shadow-white/20 transition-all duration-300 flex items-center justify-center gap-3 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaCalendarAlt className="w-5 h-5" />
                  Book Strategy Call
                  <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <p className="text-center text-teal-200 text-sm mt-3">
                  Get instant access to our calendar
                </p>
              </div>
            </motion.div>

            {/* Additional Support Card */}
            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-orange-200 p-6 shadow-xl hover:shadow-2xl transition-all duration-500 group"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <FaHeadset className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Why Choose Us?
                </h3>
                <p className="text-gray-600 text-sm">
                  Professional video editing with exceptional support
                </p>
              </div>

              <div className="space-y-4">
                {supportFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-orange-50 transition-colors group"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 text-xs">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Client Satisfaction</span>
                  <span className="font-bold text-orange-500">98%</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-gray-600">Projects Completed</span>
                  <span className="font-bold text-orange-500">500+</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <p className="text-gray-600 mb-4">
            Not sure which option is right for you?
          </p>
          <motion.button
            onClick={() => setIsBookingOpen(true)}
            className="px-8 py-3 border-2 border-teal-400 text-teal-600 font-semibold rounded-xl hover:bg-teal-50 transition-all duration-300 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Figure It Out Together
          </motion.button>
        </motion.div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {isBookingOpen && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-teal-400 to-teal-500 p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Book Your Strategy Call
                    </h2>
                    <p className="text-teal-100">
                      60-minute video consultation for complex projects
                    </p>
                  </div>
                  <button
                    onClick={() => setIsBookingOpen(false)}
                    className="text-white hover:text-teal-100 transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Calendly Iframe */}
              <div className="h-[600px]">
                <iframe
                  src="https://calendly.com/thezoneonestorage/30min?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=ffffff&text_color=000000&primary_color=0d9488"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="Book Your Strategy Call"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>

              {bookingCompleted && (
                <motion.div
                  className="bg-emerald-50 border border-emerald-200 p-4 text-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  <div className="flex items-center justify-center">
                    <FaCheckCircle className="w-5 h-5 text-emerald-500 mr-2" />
                    <span className="text-emerald-700 font-medium">
                      Booking confirmed! Check your email for details.
                    </span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactPage;
