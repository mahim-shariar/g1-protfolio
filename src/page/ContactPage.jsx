import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getContactInfo } from "../services/api";
import emailjs from "@emailjs/browser";

const ContactPage = () => {
  const canvasRef = useRef(null);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
    phone: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSocial, setExpandedSocial] = useState(false);

  // EmailJS configuration - REPLACE WITH YOUR ACTUAL CREDENTIALS
  const EMAILJS_CONFIG = {
    SERVICE_ID: import.meta.env.VITE_SERVICE_ID,
    TEMPLATE_ID: import.meta.env.VITE_TEMPLATE_ID,
    PUBLIC_KEY: import.meta.env.VITE_PUBLIC_KEY,
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
        // Set fallback data
        setContactData({
          email: "hello@videoagency.com",
          phone: "+1 (555) 123-4567",
          address: {
            city: "Los Angeles",
            state: "CA",
            country: "USA",
          },
          socialLinks: {
            facebook: "videoagency",
            twitter: "videoagency",
            instagram: "videoagency",
            linkedin: "videoagency",
            youtube: "videoagency",
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

  // Background grid animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const drawGrid = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines
      ctx.strokeStyle = "rgba(66, 153, 225, 0.1)";
      ctx.lineWidth = 1;

      const cellSize = 50;
      const offsetX = (time * 0.01) % cellSize;
      const offsetY = (time * 0.01) % cellSize;

      // Vertical lines
      for (let x = offsetX; x < canvas.width; x += cellSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = offsetY; y < canvas.height; y += cellSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw pulsing gradient overlay
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) * 0.8
      );

      const pulseIntensity = (Math.sin(time * 0.002) + 1) * 0.2;
      gradient.addColorStop(
        0,
        `rgba(100, 50, 255, ${0.03 + pulseIntensity * 0.03})`
      );
      gradient.addColorStop(
        0.5,
        `rgba(0, 0, 80, ${0.05 + pulseIntensity * 0.03})`
      );
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.6)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(drawGrid);
    };

    animationFrameId = requestAnimationFrame(drawGrid);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const glowVariants = {
    pulse: {
      boxShadow: [
        "0 0 5px rgba(59, 130, 246, 0.5), 0 0 10px rgba(59, 130, 246, 0.3), 0 0 15px rgba(59, 130, 246, 0.2)",
        "0 0 10px rgba(59, 130, 246, 0.8), 0 0 20px rgba(59, 130, 246, 0.5), 0 0 30px rgba(59, 130, 246, 0.3)",
        "0 0 5px rgba(59, 130, 246, 0.5), 0 0 10px rgba(59, 130, 246, 0.3), 0 0 15px rgba(59, 130, 246, 0.2)",
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

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
      // Send email using EmailJS
      const templateParams = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        subject: `New Project Inquiry: ${formData.projectType}`,
        time: new Date().toLocaleString(),
        phone: formData.phone,
      };

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      console.log("Email sent successfully:", formData);
      setIsSubmitted(true);

      // Reset form after successful submission
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          projectType: "",
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

  // Social media platform configurations
  const socialPlatforms = [
    {
      key: "instagram",
      icon: "📷",
      name: "Instagram",
      baseUrl: "https://instagram.com/",
      placeholder: "username",
    },
    {
      key: "facebook",
      icon: "👥",
      name: "Facebook",
      baseUrl: "https://facebook.com/",
      placeholder: "username",
    },
    {
      key: "twitter",
      icon: "🐦",
      name: "Twitter",
      baseUrl: "https://twitter.com/",
      placeholder: "username",
    },
    {
      key: "linkedin",
      icon: "💼",
      name: "LinkedIn",
      baseUrl: "https://linkedin.com/in/",
      placeholder: "profile",
    },
    {
      key: "youtube",
      icon: "🎥",
      name: "YouTube",
      baseUrl: "https://youtube.com/",
      placeholder: "channel",
    },
  ];

  // Filter social platforms that have data
  const activeSocialLinks = socialPlatforms.filter(
    (platform) =>
      contactData?.socialLinks?.[platform.key] &&
      contactData.socialLinks[platform.key].trim() !== ""
  );

  // Dynamic contact info based on API data
  const contactInfo = [
    {
      icon: "📧",
      title: "Email",
      value: contactData?.email || "hello@videoagency.com",
      link: `mailto:${contactData?.email || "hello@videoagency.com"}`,
    },
    {
      icon: "📞",
      title: "Phone",
      value: contactData?.phone || "+1 (555) 123-4567",
      link: `tel:${contactData?.phone || "+15551234567"}`,
    },
    {
      icon: "📍",
      title: "Location",
      value: contactData?.address
        ? `${contactData.address.city}, ${contactData.address.state}`
        : "Los Angeles, CA",
      link: contactData?.address
        ? `https://maps.google.com/?q=${encodeURIComponent(
            `${contactData.address.city}, ${contactData.address.state}, ${contactData.address.country}`
          )}`
        : "https://maps.google.com/?q=Los+Angeles",
    },
  ];

  const projectTypes = [
    "Commercial Advertisement",
    "Social Media Content",
    "Documentary",
    "Music Video",
    "Corporate Video",
    "Event Coverage",
    "Motion Graphics",
    "Other",
  ];

  // Process steps for working together
  const processSteps = [
    {
      step: "01",
      title: "Consultation",
      description: "We discuss your vision, goals, and requirements in detail.",
      icon: "💬",
    },
    {
      step: "02",
      title: "Planning",
      description: "We create a detailed project plan and timeline.",
      icon: "📋",
    },
    {
      step: "03",
      title: "Production",
      description:
        "Our team brings your vision to life with creative execution.",
      icon: "🎬",
    },
    {
      step: "04",
      title: "Delivery",
      description: "We deliver the final product and ensure your satisfaction.",
      icon: "🚀",
    },
  ];

  // Why choose us points
  const whyChooseUs = [
    {
      icon: "⏱️",
      title: "Fast Turnaround",
      description: "Quick project completion without compromising quality",
    },
    {
      icon: "💎",
      title: "Premium Quality",
      description: "High-end production value for professional results",
    },
    {
      icon: "🤝",
      title: "Collaborative Process",
      description: "We work closely with you throughout the entire process",
    },
    {
      icon: "🔄",
      title: "Flexible Revisions",
      description: "Multiple revision rounds to perfect your project",
    },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black flex flex-col items-center justify-center py-20">
      {/* Animated background canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Gradient overlays for cinematic effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-black/80"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/5 to-cyan-900/5"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-cyan-400 font-mono uppercase tracking-widest text-sm md:text-base mb-4"
            variants={itemVariants}
          >
            Get In Touch
          </motion.h2>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            variants={itemVariants}
          >
            Let's Create{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Something Amazing
            </span>{" "}
            Together
          </motion.h1>

          <motion.p
            className="text-lg text-gray-300 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Ready to bring your vision to life? Tell us about your project and
            we'll get back to you within 24 hours.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              Contact Information
            </h3>

            {loading ? (
              // Loading skeleton
              Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-start p-4 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10"
                >
                  <div className="w-8 h-8 bg-gray-700 rounded-lg animate-pulse mr-4"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-700 rounded w-1/3 mb-2 animate-pulse"></div>
                    <div className="h-3 bg-gray-700 rounded w-1/2 animate-pulse"></div>
                  </div>
                </div>
              ))
            ) : error ? (
              // Error state
              <div className="text-red-400 p-4 bg-red-900/20 rounded-xl border border-red-500/30">
                {error} - Showing default contact information
              </div>
            ) : (
              <>
                {/* Basic Contact Info */}
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.link}
                    target={item.link.startsWith("http") ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="flex items-start p-4 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10 hover:border-cyan-500/30 transition-all duration-300 group"
                    whileHover={{ x: 10 }}
                  >
                    <span className="text-2xl mr-4">{item.icon}</span>
                    <div>
                      <h4 className="text-white font-semibold">{item.title}</h4>
                      <p className="text-cyan-400">{item.value}</p>
                    </div>
                  </motion.a>
                ))}

                {/* Expandable Social Links */}
                {activeSocialLinks.length > 0 && (
                  <motion.div
                    className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
                    initial={false}
                    animate={{ height: expandedSocial ? "auto" : "80px" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <button
                      onClick={() => setExpandedSocial(!expandedSocial)}
                      className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-all duration-300"
                    >
                      <div className="flex items-center">
                        <span className="text-2xl mr-4">🌐</span>
                        <div className="text-left">
                          <h4 className="text-white font-semibold">
                            Social Media
                          </h4>
                          <p className="text-cyan-400 text-sm">
                            {expandedSocial
                              ? "Click to collapse"
                              : `${activeSocialLinks.length} platforms available`}
                          </p>
                        </div>
                      </div>
                      <motion.span
                        animate={{ rotate: expandedSocial ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-cyan-400 text-xl"
                      >
                        ▼
                      </motion.span>
                    </button>

                    <motion.div
                      initial={false}
                      animate={{
                        opacity: expandedSocial ? 1 : 0,
                        y: expandedSocial ? 0 : -10,
                      }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-white/10"
                    >
                      {activeSocialLinks.map((platform, index) => (
                        <motion.a
                          key={platform.key}
                          href={`${platform.baseUrl}${
                            contactData.socialLinks[platform.key]
                          }`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-4 hover:bg-white/5 transition-all duration-200 group"
                          whileHover={{ x: 5 }}
                        >
                          <span className="text-xl mr-4">{platform.icon}</span>
                          <div className="flex-1">
                            <span className="text-white font-medium">
                              {platform.name}
                            </span>
                            <span className="text-cyan-400 ml-2">
                              @{contactData.socialLinks[platform.key]}
                            </span>
                          </div>
                          <span className="text-gray-500 group-hover:text-cyan-400 transition-colors">
                            ↗
                          </span>
                        </motion.a>
                      ))}
                    </motion.div>
                  </motion.div>
                )}

                {/* All Social Platforms (even empty ones for admin reference) */}
                <motion.div
                  className="bg-black/20 backdrop-blur-sm rounded-xl border border-white/5 p-4"
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 className="text-white font-semibold mb-3 text-sm">
                    Available Platforms
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {socialPlatforms.map((platform) => (
                      <div
                        key={platform.key}
                        className={`text-center p-2 rounded-lg text-xs ${
                          contactData?.socialLinks?.[platform.key] &&
                          contactData.socialLinks[platform.key].trim() !== ""
                            ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                            : "bg-gray-800/30 text-gray-500 border border-gray-700/30"
                        }`}
                      >
                        <div className="text-lg mb-1">{platform.icon}</div>
                        <div>{platform.name}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}

            {/* Stats */}
            <div className="grid grid-cols-1 gap-4 mt-10">
              <div className="text-center p-4 bg-black/30 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="text-2xl font-bold text-cyan-400 mb-2">24h</div>
                <div className="text-gray-400 text-sm">Response Time</div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-black/30 backdrop-blur-sm p-8 rounded-2xl border border-white/10"
            >
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="text-6xl mb-6">🎬</div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Thank You!
                  </h3>
                  <p className="text-cyan-400">
                    We've received your message and will get back to you within
                    24 hours.
                  </p>
                </motion.div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Start Your Project
                  </h3>
                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all duration-300"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all duration-300"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        type="number"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all duration-300"
                        placeholder="Your phone number"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="projectType"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Project Type
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all duration-300"
                      >
                        <option value="">Select project type</option>
                        {projectTypes.map((type, index) => (
                          <option key={index} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Project Details
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all duration-300"
                        placeholder="Tell us about your project, timeline, and any specific requirements..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                      variants={glowVariants}
                      animate="pulse"
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    >
                      <span className="relative z-10">
                        {isSubmitting ? (
                          <div className="flex items-center justify-center">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Sending...
                          </div>
                        ) : (
                          "Send Message"
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>

        {/* Process Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-white text-center mb-10">
            Our Process
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-cyan-500/30 transition-all duration-300 group"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="text-cyan-400 text-2xl mr-3">{step.icon}</div>
                  <div className="text-cyan-400 font-mono text-sm font-bold bg-cyan-400/10 px-2 py-1 rounded">
                    {step.step}
                  </div>
                </div>
                <h4 className="text-white font-semibold mb-3">{step.title}</h4>
                <p className="text-gray-300 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-white text-center mb-10">
            Why Choose Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-start p-6 bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 hover:border-cyan-500/30 transition-all duration-300 group"
                whileHover={{ x: 5 }}
              >
                <span className="text-3xl mr-4 text-cyan-400">{item.icon}</span>
                <div>
                  <h4 className="text-white font-semibold mb-2">
                    {item.title}
                  </h4>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Don't wait any longer. Contact us today and let's discuss how we can
            bring your creative vision to life with professional video
            production services.
          </p>
          <motion.button
            onClick={() =>
              document
                .querySelector("form")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Get Started Now</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.button>
        </motion.div>
      </div>

      {/* Animated decorative elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-cyan-400"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/3 w-2 h-2 rounded-full bg-purple-500"
        animate={{
          scale: [1, 2, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Scrolling text effect at bottom */}
      <motion.div
        className="absolute bottom-10 left-0 right-0 mx-auto w-full max-w-5xl px-4 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          className="text-gray-500 text-xs md:text-sm font-mono whitespace-nowrap"
          animate={{ x: [0, -1000] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          • CONTACT US • START YOUR PROJECT • GET A QUOTE • VIDEO EDITING •
          MOTION GRAPHICS • COLOR GRADING • CINEMATIC EDITING • DRONE FOOTAGE •
          VISUAL EFFECTS • 4K/8K EDITING •
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
