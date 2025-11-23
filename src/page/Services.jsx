import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaVideo,
  FaFilm,
  FaYoutube,
  FaMagic,
  FaRocket,
  FaCube,
  FaRegLightbulb,
  FaRocketchat,
  FaPalette,
  FaShippingFast,
  FaHandshake,
  FaPlay,
  FaExpand,
  FaCut,
  FaLayerGroup,
} from "react-icons/fa";
import { GiFilmSpool } from "react-icons/gi";
import prosess from "../assets/prosess.png";
import development from "../assets/video-development.jpg";
import delivery from "../assets/video-delivry.png";
import production from "../assets/production.jpg";
import davinchi from "../assets/davenchi.png";
import premier from "../assets/premier.png";
import cap_cut from "../assets/cap-cut.png";
import after_effect from "../assets/after-effect.png";
import blender from "../assets/blender.png";
import final_cut from "../assets/final-cut.png";
import SectionHeader from "../components/Shared/SectionHeader";
import { getServices } from "../services/api";

// Icon mapping for services
const serviceIcons = {
  "YouTube Videos": <FaYoutube className="w-5 h-5 sm:w-6 sm:h-6" />,
  "Short Form Video": <GiFilmSpool className="w-5 h-5 sm:w-6 sm:h-6" />,
  "SaaS Video": <FaCube className="w-5 h-5 sm:w-6 sm:h-6" />,
  "Ad Creatives & VSLs": <FaRocket className="w-5 h-5 sm:w-6 sm:h-6" />,
  "Demo Videos": <FaVideo className="w-5 h-5 sm:w-6 sm:h-6" />,
  Podcasts: <FaRegLightbulb className="w-5 h-5 sm:w-6 sm:h-6" />,
  "Reels Video": <FaFilm className="w-5 h-5 sm:w-6 sm:h-6" />,
  "Motion Graphics": <FaMagic className="w-5 h-5 sm:w-6 sm:h-6" />,
  premium: <FaVideo className="w-5 h-5 sm:w-6 sm:h-6" />,
  default: <FaVideo className="w-5 h-5 sm:w-6 sm:h-6" />,
};

// Function to get icon for service
const getServiceIcon = (serviceTitle, serviceIcon) => {
  if (serviceIcon) {
    return <span className="text-xl sm:text-2xl">{serviceIcon}</span>;
  }
  return serviceIcons[serviceTitle] || serviceIcons.default;
};

// Floating App Logos Component - Mobile Optimized
const FloatingAppLogos = () => {
  const videoTools = [
    { name: "DaVinci Resolve", logo: davinchi },
    { name: "Premier Pro", logo: premier },
    { name: "Final Cut Pro", logo: final_cut },
    { name: "CapCut", logo: cap_cut },
    { name: "After Effects", logo: after_effect },
    { name: "Blender", logo: blender },
  ];

  // Generate responsive positions
  const getRandomPosition = (index) => {
    const mobilePositions = [
      { top: "10%", left: "5%", scale: 0.5 },
      { top: "15%", right: "8%", scale: 0.6 },
      { top: "70%", left: "4%", scale: 0.5 },
      { bottom: "15%", right: "6%", scale: 0.7 },
      { top: "45%", right: "3%", scale: 0.4 },
      { bottom: "25%", left: "15%", scale: 0.6 },
    ];

    const desktopPositions = [
      { top: "15%", left: "8%", scale: 0.6 },
      { top: "22%", right: "12%", scale: 0.8 },
      { top: "65%", left: "6%", scale: 0.7 },
      { bottom: "20%", right: "8%", scale: 1.0 },
      { top: "42%", right: "5%", scale: 0.5 },
      { bottom: "32%", left: "20%", scale: 0.9 },
    ];

    return window.innerWidth < 768
      ? mobilePositions[index % mobilePositions.length]
      : desktopPositions[index % desktopPositions.length];
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-25">
      {/* Floating App Logos */}
      {videoTools.map((tool, index) => {
        const position = getRandomPosition(index);

        return (
          <motion.div
            key={`floating-${tool.name}`}
            className="absolute z-30"
            style={position}
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [
                position.scale * 0.8,
                position.scale * 1.1,
                position.scale * 0.8,
              ],
              y: [0, -20, 0, -15, 0],
              x: [0, 5, -8, 4, 0],
              rotate: [0, 3, -2, 1, 0],
            }}
            transition={{
              duration: 12 + Math.random() * 6,
              repeat: Infinity,
              delay: index * 1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <motion.div
              className="relative bg-gradient-to-br from-white/30 to-white/12 backdrop-blur-xl rounded-lg sm:rounded-xl p-2 sm:p-3 border border-white/40 shadow-md sm:shadow-lg"
              whileHover={{
                scale: window.innerWidth >= 768 ? 1.4 : 1.1,
                rotateY: window.innerWidth >= 768 ? 180 : 0,
                transition: {
                  duration: 0.6,
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                },
              }}
            >
              <motion.img
                src={tool.logo}
                alt={tool.name}
                className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
                animate={{
                  filter: [
                    "brightness(1.1) drop-shadow(0 0 8px rgba(13, 148, 136, 0.4))",
                    "brightness(1.3) drop-shadow(0 0 15px rgba(20, 184, 166, 0.6))",
                    "brightness(1.1) drop-shadow(0 0 8px rgba(13, 148, 136, 0.4))",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: index * 0.6,
                  ease: "easeInOut",
                }}
              />

              {/* Tool Name Tooltip - Only on desktop */}
              <motion.div
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-teal-800/95 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap opacity-0 border border-teal-600/30 backdrop-blur-sm shadow-lg hidden sm:block"
                whileHover={{
                  opacity: 1,
                  y: -2,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
              >
                {tool.name}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-1.5 h-1.5 bg-teal-800/95 rotate-45" />
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Subtle Floating Particles - Reduced for mobile */}
      {Array.from({ length: window.innerWidth < 768 ? 4 : 6 }).map((_, i) => {
        const mobilePositions = [
          { top: "25%", left: "12%" },
          { top: "50%", right: "18%" },
          { top: "75%", left: "8%" },
          { bottom: "28%", right: "12%" },
        ];

        const desktopPositions = [
          { top: "30%", left: "16%" },
          { top: "45%", right: "22%" },
          { top: "70%", left: "11%" },
          { bottom: "32%", right: "16%" },
          { top: "55%", right: "9%" },
          { bottom: "42%", left: "26%" },
        ];

        const position =
          window.innerWidth < 768 ? mobilePositions[i] : desktopPositions[i];

        return (
          <motion.div
            key={`floating-particle-${i}`}
            className="absolute w-1 h-1 bg-gradient-to-r from-teal-400/50 to-teal-300/30 rounded-full opacity-60 z-20"
            style={position}
            animate={{
              y: [0, -15, 0, -8, 0],
              x: [0, 4, -6, 3, 0],
              scale: [1, 1.2, 0.8, 1.1, 1],
              opacity: [0.3, 0.5, 0.3, 0.4, 0.3],
              rotate: [0, 45, 90, 135, 180],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Enhanced workflow steps with mobile optimizations
  const workflowSteps = [
    {
      title: "Discovery & Strategy",
      description:
        "We dive deep into your vision, goals, and target audience to create a winning strategy",
      icon: <FaRocketchat className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: "from-teal-400 to-teal-500",
      duration: "1-2 days",
      features: [
        "Creative Brief",
        "Target Analysis",
        "Content Strategy",
        "Goal Setting",
      ],
      image: prosess,
      imageAlt: "Discovery and strategy process",
      shape: "rounded-t-xl",
    },
    {
      title: "Creative Development",
      description:
        "Our team crafts stunning visuals and compelling narratives that bring your story to life",
      icon: <FaPalette className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: "from-teal-300 to-teal-400",
      duration: "2-4 days",
      features: [
        "Storyboarding",
        "Visual Design",
        "Script Writing",
        "Style Frames",
      ],
      image: development,
      imageAlt: "Creative development process",
      shape: "rounded-t-xl",
    },
    {
      title: "Production & Editing",
      description:
        "We execute with precision using cutting-edge tools and techniques for flawless results",
      icon: <FaVideo className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: "from-teal-400 to-teal-500",
      duration: "3-5 days",
      features: [
        "Video Editing",
        "Motion Graphics",
        "Color Grading",
        "Sound Design",
      ],
      image: production,
      imageAlt: "Production and editing process",
      shape: "rounded-t-xl",
    },
    {
      title: "Refinement & Delivery",
      description:
        "We polish every detail and deliver your project in all required formats, ready to shine",
      icon: <FaShippingFast className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: "from-teal-300 to-teal-400",
      duration: "1-2 days",
      features: [
        "Quality Check",
        "Client Review",
        "Format Optimization",
        "Final Delivery",
      ],
      image: delivery,
      imageAlt: "Refinement and delivery process",
      shape: "rounded-t-xl",
    },
  ];

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getServices();

        if (
          response &&
          response.status === "success" &&
          response.data &&
          response.data.services
        ) {
          const transformedServices = response.data.services.map((service) => ({
            _id: service._id,
            title: service.title,
            description: service.description,
            icon: getServiceIcon(service.title, service.icon),
            features: service.features || [],
            details: service.details || service.description,
            examples: service.examples || [],
            deliveryTime: service.deliveryTime
              ? `${service.deliveryTime} business days`
              : "3-5 business days",
            revisions: service.revisions
              ? `${service.revisions} rounds included`
              : "2 rounds included",
            ...service,
          }));

          setServices(transformedServices);
        } else {
          throw new Error("Invalid response format from server");
        }
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to load services. Please try again later.");
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Handle Learn More click
  const handleLearnMore = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedService(null), 300);
  };

  // Create marquee data only if we have services
  const marqueeServices = services.length > 0 ? [...services, ...services] : [];

  // Loading state
  if (loading) {
    return (
      <div className="relative min-h-screen w-full bg-white flex items-center justify-center pt-20 pb-10">
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading services...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && services.length === 0) {
    return (
      <div className="relative min-h-screen w-full bg-white flex items-center justify-center pt-20 pb-10">
        <div className="relative z-10 text-gray-600 text-lg text-center px-4">
          <p className="mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-teal-400 text-white rounded-lg hover:bg-teal-500 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (!loading && services.length === 0) {
    return (
      <div className="relative min-h-screen w-full bg-white flex items-center justify-center pt-20 pb-10">
        <div className="relative z-10 text-gray-600 text-lg text-center px-4">
          <p className="mb-4">No services available at the moment.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-teal-400 text-white rounded-lg hover:bg-teal-500 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-white flex flex-col items-center justify-center pt-16 sm:pt-20 pb-8 sm:pb-10 overflow-hidden">
      {/* Subtle Teal Gradient Orbs Background - Mobile Optimized */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top Left */}
        <motion.div
          className="absolute top-10 sm:top-20 left-10 sm:left-20 w-48 h-48 sm:w-80 sm:h-80 bg-gradient-to-r from-teal-100/10 to-teal-200/10 sm:from-teal-100/15 sm:to-teal-200/15 rounded-full blur-2xl sm:blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Top Right */}
        <motion.div
          className="absolute top-16 sm:top-32 right-16 sm:right-32 w-40 h-40 sm:w-72 sm:h-72 bg-gradient-to-r from-teal-200/15 to-teal-300/15 sm:from-teal-200/20 sm:to-teal-300/20 rounded-full blur-2xl sm:blur-3xl"
          animate={{
            x: [0, -35, 0],
            y: [0, 25, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Bottom Left */}
        <motion.div
          className="absolute bottom-20 sm:bottom-40 left-20 sm:left-40 w-56 h-56 sm:w-96 sm:h-96 bg-gradient-to-r from-teal-300/10 to-teal-400/10 sm:from-teal-300/15 sm:to-teal-400/15 rounded-full blur-2xl sm:blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, 35, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Center */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-teal-100/5 to-teal-200/5 sm:from-teal-100/10 sm:to-teal-200/10 rounded-full blur-2xl sm:blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Floating App Logos */}
      <FloatingAppLogos />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12">
          <SectionHeader
            subtitle="Core services"
            title="Types of work"
            highlight="‍We do"
            description="Professional video editing services tailored to your unique needs and vision"
            center={true}
            titleSize="xl"
            titleWeight="normal"
            descriptionSize="base"
            lineSpacing="tight"
            highlightColor="teal-500"
            dotColor="teal-500"
          />
        </div>

        {/* Marquee Section - Mobile Optimized */}
        {services.length > 0 && (
          <div className="relative py-8 sm:py-12 overflow-hidden mb-12 sm:mb-20">
            {/* Single Marquee for Mobile, Double for Desktop */}
            <div className="hidden sm:block">
              {/* Top Marquee - Desktop Only */}
              <div className="flex mb-6">
                <div className="flex space-x-4 sm:space-x-5 animate-marquee-left">
                  {marqueeServices
                    .slice(0, Math.min(8, marqueeServices.length))
                    .map((service, index) => (
                      <motion.div
                        key={`${service._id}-top-${index}`}
                        className="flex-shrink-0 w-[300px] sm:w-[380px]"
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-teal-200 shadow-lg sm:shadow-xl shadow-teal-100 relative overflow-hidden h-full min-h-[180px] sm:min-h-[220px] flex flex-col group hover:shadow-xl sm:hover:shadow-2xl hover:border-teal-300 transition-all duration-300">
                          <div className="relative z-10 flex flex-col items-center h-full text-center">
                            {/* Icon Container */}
                            <motion.div
                              className="p-3 sm:p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg shadow-teal-100 mb-3 sm:mb-4 border border-teal-200"
                              whileHover={{
                                scale: 1.05,
                                rotate: window.innerWidth >= 640 ? 5 : 0,
                              }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <div className="text-teal-500">
                                {service.icon}
                              </div>
                            </motion.div>

                            {/* Title */}
                            <h3 className="mb-2 sm:mb-3 text-base sm:text-lg font-bold leading-tight tracking-tight text-gray-800 group-hover:text-teal-600 transition-colors duration-300">
                              {service.title}
                            </h3>

                            {/* Accent Line */}
                            <div className="w-12 sm:w-16 h-0.5 sm:h-1 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full mb-3 sm:mb-4" />

                            {/* Description */}
                            <p className="flex-1 text-xs sm:text-sm font-light leading-relaxed text-gray-600">
                              {service.description}
                            </p>

                            {/* Learn More Button */}
                            <motion.button
                              className="mt-3 sm:mt-4 px-3 py-1.5 sm:px-4 sm:py-2 bg-teal-50 text-teal-600 rounded-lg text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 border border-teal-200 hover:bg-teal-100 hover:border-teal-300"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleLearnMore(service)}
                            >
                              Learn More
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>

              {/* Bottom Marquee - Desktop Only */}
              <div className="flex">
                <div className="flex space-x-4 sm:space-x-5 animate-marquee-right">
                  {marqueeServices
                    .slice(
                      Math.min(4, marqueeServices.length),
                      Math.min(12, marqueeServices.length)
                    )
                    .map((service, index) => (
                      <motion.div
                        key={`${service._id}-bottom-${index}`}
                        className="flex-shrink-0 w-[300px] sm:w-[380px]"
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-teal-200 shadow-lg sm:shadow-xl shadow-teal-100 relative overflow-hidden h-full min-h-[180px] sm:min-h-[220px] flex flex-col group hover:shadow-xl sm:hover:shadow-2xl hover:border-teal-300 transition-all duration-300">
                          <div className="relative z-10 flex flex-col items-center h-full text-center">
                            {/* Icon Container */}
                            <motion.div
                              className="p-3 sm:p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg shadow-teal-100 mb-3 sm:mb-4 border border-teal-200"
                              whileHover={{
                                scale: 1.05,
                                rotate: window.innerWidth >= 640 ? -5 : 0,
                              }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <div className="text-teal-500">
                                {service.icon}
                              </div>
                            </motion.div>

                            {/* Title */}
                            <h3 className="mb-2 sm:mb-3 text-base sm:text-lg font-bold leading-tight tracking-tight text-gray-800 group-hover:text-teal-600 transition-colors duration-300">
                              {service.title}
                            </h3>

                            {/* Accent Line */}
                            <div className="w-12 sm:w-16 h-0.5 sm:h-1 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full mb-3 sm:mb-4" />

                            {/* Description */}
                            <p className="flex-1 text-xs sm:text-sm font-light leading-relaxed text-gray-600">
                              {service.description}
                            </p>

                            {/* Learn More Button */}
                            <motion.button
                              className="mt-3 sm:mt-4 px-3 py-1.5 sm:px-4 sm:py-2 bg-teal-50 text-teal-600 rounded-lg text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 border border-teal-200 hover:bg-teal-100 hover:border-teal-300"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleLearnMore(service)}
                            >
                              Learn More
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>
            </div>

            {/* Single Marquee for Mobile */}
            <div className="sm:hidden">
              <div className="flex">
                <div className="flex space-x-4 animate-marquee-left">
                  {marqueeServices
                    .slice(0, Math.min(6, marqueeServices.length))
                    .map((service, index) => (
                      <motion.div
                        key={`${service._id}-mobile-${index}`}
                        className="flex-shrink-0 w-[280px]"
                      >
                        <div className="bg-white rounded-xl p-4 border border-teal-200 shadow-lg shadow-teal-100 relative overflow-hidden h-full min-h-[160px] flex flex-col group">
                          <div className="relative z-10 flex flex-col items-center h-full text-center">
                            {/* Icon Container */}
                            <div className="p-3 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl shadow-md shadow-teal-100 mb-3 border border-teal-200">
                              <div className="text-teal-500">
                                {service.icon}
                              </div>
                            </div>

                            {/* Title */}
                            <h3 className="mb-2 text-sm font-bold leading-tight tracking-tight text-gray-800">
                              {service.title}
                            </h3>

                            {/* Accent Line */}
                            <div className="w-12 h-0.5 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full mb-2" />

                            {/* Description */}
                            <p className="flex-1 text-xs font-light leading-relaxed text-gray-600">
                              {service.description}
                            </p>

                            {/* Learn More Button */}
                            <motion.button
                              className="mt-2 px-3 py-1.5 bg-teal-50 text-teal-600 rounded-lg text-xs border border-teal-200 hover:bg-teal-100 hover:border-teal-300"
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleLearnMore(service)}
                            >
                              Learn More
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>
            </div>

            {/* Gradient Overlays */}
            <div className="absolute top-0 left-0 z-20 w-16 sm:w-32 h-full pointer-events-none bg-gradient-to-r from-white to-transparent" />
            <div className="absolute top-0 right-0 z-20 w-16 sm:w-32 h-full pointer-events-none bg-gradient-to-l from-white to-transparent" />
          </div>
        )}

        {/* Professional Video Editing Process Section - Mobile Optimized with Image on Top Cards */}
        <motion.div
          className="mb-12 sm:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="mb-8 sm:mb-12">
            <SectionHeader
              subtitle="Our Process"
              title="How We Bring Your"
              highlight="Vision to Life"
              description="A seamless, collaborative journey from concept to final delivery"
              center={true}
              titleSize="xl"
              titleWeight="normal"
              descriptionSize="base"
              lineSpacing="tight"
              highlightColor="teal-500"
              dotColor="teal-500"
              highlightOnNewLine={false}
            />
          </div>

          {/* Process Steps - Stack on mobile with image on top, timeline on desktop */}
          <div className="relative">
            {/* Timeline - Desktop Only */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-400/20 to-teal-600/20 transform -translate-x-1/2 hidden lg:block">
              {[FaCut, FaVideo, FaLayerGroup, FaExpand].map((Icon, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.3 }}
                  viewport={{ once: true }}
                  style={{ top: `${25 + i * 25}%` }}
                >
                  <div className="w-8 h-8 bg-white border-2 border-teal-300 rounded-full flex items-center justify-center shadow-lg">
                    <Icon className="w-3 h-3 text-teal-500" />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="space-y-8 sm:space-y-16 lg:space-y-24">
              {workflowSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {/* Mobile Layout - Stacked Card with Image on Top */}
                  <div className="lg:hidden">
                    <motion.div
                      className="bg-white rounded-xl border border-teal-200 shadow-lg hover:shadow-xl transition-all duration-500 group hover:border-teal-300 overflow-hidden mb-8"
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      viewport={{ once: true }}
                    >
                      {/* Image Section - Top of Card */}
                      <div className="relative">
                        <div
                          className={`w-full h-48 ${step.shape} overflow-hidden`}
                        >
                          <img
                            src={step.image}
                            alt={step.imageAlt}
                            className="w-full h-full object-cover"
                          />

                          {/* Video Player Overlay */}
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <motion.button
                              className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <FaPlay className="w-4 h-4 text-teal-600 ml-0.5" />
                            </motion.button>
                          </div>
                        </div>

                        {/* Step Number Badge */}
                        <div className="absolute top-4 left-4">
                          <motion.div
                            className="w-10 h-10 bg-white border-2 border-white rounded-full shadow-lg flex items-center justify-center relative"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ duration: 0.6, delay: index * 0.3 }}
                            viewport={{ once: true }}
                          >
                            <div
                              className={`w-8 h-8 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-sm relative z-10`}
                            >
                              {index + 1}
                            </div>
                          </motion.div>
                        </div>

                        {/* Duration Badge */}
                        <div className="absolute top-4 right-4">
                          <motion.div
                            className="bg-black/70 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm"
                            initial={{ opacity: 0, x: 10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.4 }}
                            viewport={{ once: true }}
                          >
                            ⏱️ {step.duration}
                          </motion.div>
                        </div>
                      </div>

                      {/* Content Section - Bottom of Card */}
                      <div className="p-5">
                        {/* Header */}
                        <div className="flex items-start gap-3 mb-4">
                          <motion.div
                            className={`p-3 rounded-xl bg-gradient-to-r ${step.color} shadow-lg flex-shrink-0`}
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ duration: 0.6, delay: index * 0.4 }}
                            viewport={{ once: true }}
                          >
                            <div className="text-white">{step.icon}</div>
                          </motion.div>
                          <div className="flex-1 min-w-0">
                            <motion.h3
                              className="text-xl font-bold text-gray-800 mb-1 group-hover:text-teal-600 transition-colors"
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: index * 0.5 }}
                              viewport={{ once: true }}
                            >
                              {step.title}
                            </motion.h3>
                          </div>
                        </div>

                        {/* Description */}
                        <motion.p
                          className="text-gray-600 text-sm mb-4 leading-relaxed"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.6 }}
                          viewport={{ once: true }}
                        >
                          {step.description}
                        </motion.p>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          {step.features.map((feature, featureIndex) => (
                            <motion.div
                              key={featureIndex}
                              className="flex items-center gap-2 text-xs text-gray-700"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: index * 0.2 + featureIndex * 0.1,
                              }}
                              viewport={{ once: true }}
                            >
                              <div
                                className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.color} flex-shrink-0`}
                              />
                              <span className="truncate">{feature}</span>
                            </motion.div>
                          ))}
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-4">
                          <div className="w-full bg-teal-200 rounded-full h-1.5 relative overflow-hidden">
                            <motion.div
                              className={`h-1.5 rounded-full bg-gradient-to-r ${step.color} relative`}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${(index + 1) * 25}%` }}
                              transition={{ duration: 1, delay: index * 0.3 }}
                              viewport={{ once: true }}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-teal-500 mt-1">
                            <span>Start</span>
                            <span>
                              {Math.round((index + 1) * 25)}% Complete
                            </span>
                            <span>Finish</span>
                          </div>
                        </div>
                      </div>

                      {/* Connection Line for Mobile Steps */}
                      {index < workflowSteps.length - 1 && (
                        <motion.div
                          className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-gradient-to-b from-teal-300 to-teal-200"
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          transition={{ duration: 0.6, delay: index * 0.4 }}
                          viewport={{ once: true }}
                        />
                      )}
                    </motion.div>
                  </div>

                  {/* Desktop Layout - Original Side-by-Side */}
                  <div className="hidden lg:flex flex-col lg:flex-row items-center gap-8">
                    {/* Step Indicator */}
                    <div className="absolute lg:left-1/2 lg:top-1/2 transform lg:-translate-x-1/2 lg:-translate-y-1/2 z-20">
                      <motion.div
                        className="w-16 h-16 bg-white border-4 border-white rounded-full shadow-2xl flex items-center justify-center relative"
                        whileInView={{ scale: [0, 1.2, 1] }}
                        transition={{ duration: 0.8, delay: index * 0.3 }}
                        viewport={{ once: true }}
                      >
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-lg relative z-10`}
                        >
                          {index + 1}
                        </div>
                        <motion.div
                          className="absolute -inset-2 border-2 border-teal-400 rounded-full"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 0, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.5,
                          }}
                        />
                      </motion.div>
                    </div>

                    {/* Content Card */}
                    <div
                      className={`flex-1 ${
                        index % 2 === 0 ? "lg:pr-16" : "lg:pl-16"
                      } lg:w-1/2`}
                    >
                      <motion.div
                        className="bg-white rounded-2xl p-8 border border-teal-200 shadow-xl hover:shadow-2xl transition-all duration-500 group hover:border-teal-300 relative overflow-hidden"
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                        viewport={{ once: true }}
                      >
                        {/* Video Timeline Background */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-teal-100">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${step.color}`}
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            transition={{ duration: 1.5, delay: index * 0.3 }}
                            viewport={{ once: true }}
                          />
                        </div>

                        {/* Header */}
                        <div className="flex items-start gap-4 mb-6 relative z-10">
                          <motion.div
                            className={`p-4 rounded-2xl bg-gradient-to-r ${step.color} shadow-lg relative overflow-hidden`}
                            whileInView={{ scale: [0, 1], rotate: [0, 360] }}
                            transition={{ duration: 0.8, delay: index * 0.4 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.1 }}
                          >
                            <div className="text-white relative z-10">
                              {step.icon}
                            </div>
                          </motion.div>
                          <div className="flex-1">
                            <motion.h3
                              className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-teal-600 transition-colors"
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: index * 0.5 }}
                              viewport={{ once: true }}
                            >
                              {step.title}
                            </motion.h3>
                            <div className="flex items-center gap-2 text-sm text-teal-500">
                              <span>⏱️</span>
                              <span>{step.duration}</span>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <motion.p
                          className="text-gray-600 mb-6 leading-relaxed relative z-10"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.6, delay: index * 0.6 }}
                          viewport={{ once: true }}
                        >
                          {step.description}
                        </motion.p>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-3 relative z-10">
                          {step.features.map((feature, featureIndex) => (
                            <motion.div
                              key={featureIndex}
                              className="flex items-center gap-2 text-sm text-gray-700"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: index * 0.2 + featureIndex * 0.1,
                              }}
                              viewport={{ once: true }}
                            >
                              <motion.div
                                className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.color}`}
                                whileHover={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 0.6 }}
                              />
                              <span>{feature}</span>
                            </motion.div>
                          ))}
                        </div>

                        {/* Video Progress Bar */}
                        <div className="mt-6 relative z-10">
                          <div className="w-full bg-teal-200 rounded-full h-2 relative overflow-hidden">
                            <motion.div
                              className={`h-2 rounded-full bg-gradient-to-r ${step.color} relative`}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${(index + 1) * 25}%` }}
                              transition={{ duration: 1, delay: index * 0.3 }}
                              viewport={{ once: true }}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-teal-500 mt-2">
                            <span>Start</span>
                            <span>
                              {Math.round((index + 1) * 25)}% Complete
                            </span>
                            <span>Finish</span>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Professional Video Editing Image Section */}
                    <div
                      className={`flex-1 ${
                        index % 2 === 0 ? "lg:pl-16" : "lg:pr-16"
                      } lg:w-1/2`}
                    >
                      <motion.div
                        className="relative"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: index * 0.3 }}
                        viewport={{ once: true }}
                      >
                        {/* Main Image with Video Player Frame */}
                        <motion.div
                          className={`relative w-72 h-64 mx-auto ${step.shape} overflow-hidden border-4 border-white shadow-2xl bg-gray-900 group`}
                          whileHover={{
                            scale: 1.02,
                            transition: { type: "spring", stiffness: 300 },
                          }}
                        >
                          <img
                            src={step.image}
                            alt={step.imageAlt}
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                          />

                          {/* Video Player Controls */}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <motion.button
                                  className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center hover:bg-teal-400 transition-colors"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <FaPlay className="w-3 h-3 text-white ml-0.5" />
                                </motion.button>
                                <div className="flex-1 mx-3">
                                  <div className="w-full bg-teal-600 rounded-full h-1">
                                    <motion.div
                                      className="h-1 bg-teal-400 rounded-full"
                                      initial={{ width: "0%" }}
                                      whileInView={{
                                        width: `${(index + 1) * 25}%`,
                                      }}
                                      transition={{
                                        duration: 2,
                                        delay: index * 0.4,
                                      }}
                                      viewport={{ once: true }}
                                    />
                                  </div>
                                </div>
                                <div className="text-xs text-teal-300">
                                  0:0{index + 1} / 0:04
                                </div>
                              </div>
                              <motion.button
                                className="text-teal-300 hover:text-teal-100 transition-colors"
                                whileHover={{ scale: 1.1 }}
                              >
                                <FaExpand className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>

                        {/* Video Editing Tools Animation */}
                        <div className="absolute -top-4 -right-4">
                          <motion.div
                            className="w-12 h-12 bg-white rounded-lg shadow-lg border border-teal-200 flex items-center justify-center"
                            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              delay: index * 0.5,
                            }}
                          >
                            <FaCut className="w-5 h-5 text-teal-500" />
                          </motion.div>
                        </div>

                        <div className="absolute -bottom-4 -left-4">
                          <motion.div
                            className="w-10 h-10 bg-white rounded-lg shadow-lg border border-teal-200 flex items-center justify-center"
                            animate={{ y: [0, 8, 0], rotate: [0, -5, 0] }}
                            transition={{
                              duration: 2.5,
                              repeat: Infinity,
                              delay: index * 0.7,
                            }}
                          >
                            <FaLayerGroup className="w-4 h-4 text-teal-500" />
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Process Summary */}
          <motion.div
            className="mt-12 sm:mt-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-teal-200 shadow-lg relative overflow-hidden">
              <FaVideo className="w-8 h-8 sm:w-12 sm:h-12 text-teal-500 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
                Ready to Start Your Video Project?
              </h3>
              <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto mb-4 sm:mb-6">
                Join hundreds of satisfied clients who have transformed their
                vision into stunning video content through our professional
                editing process.
              </p>
              <motion.button
                className="px-6 py-2.5 sm:px-8 sm:py-3 bg-gradient-to-r from-teal-400 to-teal-500 text-white font-semibold rounded-full shadow-lg hover:shadow-teal-200 text-sm sm:text-base"
                whileHover={{ scale: window.innerWidth >= 640 ? 1.05 : 1 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Video Journey
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Client Collaboration Section - Mobile Optimized */}
        <motion.div
          className="mb-12 sm:mb-20 bg-white rounded-xl sm:rounded-3xl border border-teal-200 p-6 sm:p-8 md:p-12 relative overflow-hidden shadow-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
                Collaborative{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-500">
                  Partnership
                </span>
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
                We believe the best results come from true collaboration. That's
                why we work closely with you throughout the entire process,
                ensuring your vision is realized exactly as you imagined.
              </p>

              <div className="space-y-3 sm:space-y-4">
                {[
                  "Regular progress updates and reviews",
                  "Direct communication with your dedicated editor",
                  "Flexible revision process",
                  "Multiple delivery formats for any platform",
                ].map((item, i) => (
                  <div key={i} className="flex items-start">
                    <div className="bg-teal-100 p-1.5 sm:p-2 rounded-lg mr-3 flex-shrink-0">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    <span className="text-gray-600 text-sm sm:text-base">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Collaboration visual */}
              <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden p-4 sm:p-6 border border-teal-200 shadow-lg">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="flex items-center">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-teal-400 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                      C
                    </div>
                    <div className="ml-2 sm:ml-3">
                      <div className="text-gray-800 font-medium text-sm sm:text-base">
                        Client
                      </div>
                      <div className="text-teal-500 text-xs sm:text-sm">
                        You
                      </div>
                    </div>
                  </div>
                  <div className="text-teal-500 animate-pulse">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                      E
                    </div>
                    <div className="ml-2 sm:ml-3">
                      <div className="text-gray-800 font-medium text-sm sm:text-base">
                        Editor
                      </div>
                      <div className="text-teal-600 text-xs sm:text-sm">
                        Our Team
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-teal-50 rounded-lg p-3 sm:p-4 mb-2 sm:mb-3 border border-teal-200">
                  <div className="text-teal-500 text-xs sm:text-sm mb-1">
                    Client Feedback
                  </div>
                  <div className="text-gray-800 text-sm sm:text-base">
                    "Can we make the intro more dynamic?"
                  </div>
                </div>

                <div className="bg-teal-50 rounded-lg p-3 sm:p-4 border border-teal-200">
                  <div className="text-teal-600 text-xs sm:text-sm mb-1">
                    Editor Response
                  </div>
                  <div className="text-gray-800 text-sm sm:text-base">
                    "Sure! I'll add some motion graphics to enhance it."
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Section - Mobile Optimized */}
        <motion.div
          className="bg-gradient-to-r from-teal-50 to-teal-100 border border-teal-200 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 text-center relative overflow-hidden shadow-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Elevate Your Content?
          </motion.h2>

          <motion.p
            className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto mb-4 sm:mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Let's discuss your project and create something extraordinary
            together.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="px-6 py-2.5 sm:px-8 sm:py-3 bg-gradient-to-r from-teal-400 to-teal-500 text-white font-medium rounded-full text-sm sm:text-base shadow-lg hover:shadow-teal-200"
              whileHover={{ scale: window.innerWidth >= 640 ? 1.05 : 1 }}
              whileTap={{ scale: 0.95 }}
            >
              Start a Project
            </motion.button>

            <motion.button
              className="px-6 py-2.5 sm:px-8 sm:py-3 border border-teal-300 text-teal-600 font-medium rounded-full text-sm sm:text-base bg-white/80 backdrop-blur-sm shadow-lg hover:border-teal-400"
              whileHover={{
                scale: window.innerWidth >= 640 ? 1.05 : 1,
                backgroundColor: "rgba(45, 212, 191, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Book a Consultation
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Service Detail Modal - Mobile Optimized */}
      <AnimatePresence>
        {isModalOpen && selectedService && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-3 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-white rounded-xl sm:rounded-2xl border border-teal-200 max-w-2xl w-full max-h-[85vh] sm:max-h-[90vh] overflow-y-auto shadow-xl sm:shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-start mb-4 sm:mb-6">
                  <div>
                    <div className="text-2xl sm:text-4xl mb-1 sm:mb-2 text-teal-500">
                      {selectedService.icon}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                      {selectedService.title}
                    </h2>
                  </div>
                  <button
                    className="text-gray-500 hover:text-gray-700 transition-colors p-1"
                    onClick={closeModal}
                  >
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
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

                <div className="mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                    Service Overview
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {selectedService.details}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                      Features
                    </h3>
                    <ul className="space-y-1 sm:space-y-2">
                      {selectedService.features?.map((feature, i) => (
                        <li
                          key={i}
                          className="text-teal-500 text-xs sm:text-sm flex items-center"
                        >
                          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-teal-400 rounded-full mr-2 flex-shrink-0" />
                          <span className="truncate">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                      Project Examples
                    </h3>
                    <ul className="space-y-1 sm:space-y-2">
                      {selectedService.examples?.map((example, i) => (
                        <li
                          key={i}
                          className="text-gray-600 text-xs sm:text-sm flex items-center"
                        >
                          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-teal-300 rounded-full mr-2 flex-shrink-0" />
                          <span className="truncate">{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                      Delivery Time
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {selectedService.deliveryTime}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                      Revisions
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {selectedService.revisions}
                    </p>
                  </div>
                </div>

                <motion.button
                  className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-teal-400 to-teal-500 text-white font-medium rounded-lg text-sm sm:text-base shadow-lg hover:shadow-teal-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Discuss This Service
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-marquee-left {
          animation: marquee-left 40s linear infinite;
        }

        .animate-marquee-right {
          animation: marquee-right 40s linear infinite;
        }

        @media (max-width: 640px) {
          .animate-marquee-left {
            animation: marquee-left 30s linear infinite;
          }
        }
      `}</style>
    </div>
  );
};

export default Services;
