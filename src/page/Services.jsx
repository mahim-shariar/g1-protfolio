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
import bg from "/ICON.png";

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Dummy services data for marquee
  const dummyServices = [
    {
      _id: "1",
      title: "YouTube Videos",
      description:
        "Professional YouTube content creation with optimized formatting and audience engagement strategies",
      icon: <FaYoutube className="w-6 h-6" />,
      features: [
        "4K Resolution",
        "SEO Optimization",
        "Audience Retention",
        "Multi-Format Delivery",
      ],
      details:
        "Professional YouTube content creation with optimized formatting and audience engagement strategies. We create engaging content that keeps viewers watching and coming back for more.",
      examples: [
        "Channel Intros",
        "Educational Content",
        "Product Reviews",
        "Vlog Series",
      ],
      deliveryTime: "3-5 business days",
      revisions: "3 rounds included",
    },
    {
      _id: "2",
      title: "Short Form Video",
      description:
        "Viral-optimized short content designed for maximum engagement and platform-specific formatting",
      icon: <GiFilmSpool className="w-6 h-6" />,
      features: [
        "Platform Optimization",
        "Trend Integration",
        "Engagement Hooks",
        "Vertical Format",
      ],
      details:
        "Viral-optimized short content designed for maximum engagement and platform-specific formatting. Perfect for TikTok, Instagram Reels, and YouTube Shorts.",
      examples: [
        "TikTok Videos",
        "Instagram Reels",
        "YouTube Shorts",
        "Facebook Stories",
      ],
      deliveryTime: "1-2 business days",
      revisions: "2 rounds included",
    },
    {
      _id: "3",
      title: "SaaS Video",
      description:
        "Professional software demonstration videos that showcase features and drive conversions",
      icon: <FaCube className="w-6 h-6" />,
      features: [
        "Feature Showcase",
        "User Onboarding",
        "Conversion Focus",
        "Professional Voiceover",
      ],
      details:
        "Professional software demonstration videos that showcase features and drive conversions. Perfect for product launches and user onboarding.",
      examples: [
        "Product Demos",
        "Feature Updates",
        "Tutorial Videos",
        "Customer Testimonials",
      ],
      deliveryTime: "4-6 business days",
      revisions: "3 rounds included",
    },
    {
      _id: "4",
      title: "Ad Creatives & VSLs",
      description:
        "High-converting video sales letters and advertising creatives designed to maximize ROI",
      icon: <FaRocket className="w-6 h-6" />,
      features: [
        "Conversion Optimization",
        "A/B Testing",
        "Sales Psychology",
        "Multi-Platform",
      ],
      details:
        "High-converting video sales letters and advertising creatives designed to maximize ROI. We create ads that convert and drive sales.",
      examples: [
        "Facebook Ads",
        "YouTube Ads",
        "Sales Videos",
        "Landing Page Videos",
      ],
      deliveryTime: "5-7 business days",
      revisions: "2 rounds included",
    },
    {
      _id: "5",
      title: "Demo Videos",
      description:
        "Product demonstration videos that highlight key features and user benefits effectively",
      icon: <FaVideo className="w-6 h-6" />,
      features: [
        "Feature Focus",
        "Benefit Driven",
        "Professional Lighting",
        "Clear Audio",
      ],
      details:
        "Product demonstration videos that highlight key features and user benefits effectively. Show your product in the best light possible.",
      examples: [
        "Product Launches",
        "How-To Guides",
        "Comparison Videos",
        "Unboxing Videos",
      ],
      deliveryTime: "3-4 business days",
      revisions: "3 rounds included",
    },
    {
      _id: "6",
      title: "Podcasts",
      description:
        "Professional podcast production with crystal clear audio and engaging visual components",
      icon: <FaRegLightbulb className="w-6 h-6" />,
      features: [
        "Audio Enhancement",
        "Video Podcasts",
        "Show Notes",
        "Multi-Platform Distribution",
      ],
      details:
        "Professional podcast production with crystal clear audio and engaging visual components. We make your podcast sound and look professional.",
      examples: [
        "Interview Shows",
        "Educational Content",
        "Entertainment",
        "Business Podcasts",
      ],
      deliveryTime: "2-3 business days",
      revisions: "Unlimited audio revisions",
    },
    {
      _id: "7",
      title: "Reels Video",
      description:
        "Platform-specific Reels content with trending audio and engagement-driven editing techniques",
      icon: <FaFilm className="w-6 h-6" />,
      features: [
        "Trend Integration",
        "Engagement Hooks",
        "Platform Optimization",
        "Viral Potential",
      ],
      details:
        "Platform-specific Reels content with trending audio and engagement-driven editing techniques. Create content that stops the scroll.",
      examples: [
        "Instagram Reels",
        "Trend Challenges",
        "Brand Awareness",
        "Product Showcases",
      ],
      deliveryTime: "1-2 business days",
      revisions: "2 rounds included",
    },
    {
      _id: "8",
      title: "Motion Graphics",
      description:
        "Dynamic animations and visual effects that bring your content to life",
      icon: <FaMagic className="w-6 h-6" />,
      features: [
        "2D & 3D Animation",
        "Visual Effects",
        "Logo Animations",
        "Kinetic Typography",
      ],
      details:
        "Dynamic animations and visual effects that bring your content to life. Add that extra wow factor to your videos.",
      examples: [
        "Animated Logos",
        "Explainer Videos",
        "Title Sequences",
        "Social Media Animations",
      ],
      deliveryTime: "5-7 business days",
      revisions: "2 rounds included",
    },
  ];

  // Mock API call - using dummy data
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Use dummy data
        setServices(dummyServices);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to load services. Please try again later.");
        // Fallback to dummy data even on error
        setServices(dummyServices);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Enhanced workflow steps with teal color palette
  const workflowSteps = [
    {
      title: "Discovery & Strategy",
      description:
        "We dive deep into your vision, goals, and target audience to create a winning strategy",
      icon: <FaRocketchat className="w-8 h-8" />,
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
      shape: "rounded-3xl",
    },
    {
      title: "Creative Development",
      description:
        "Our team crafts stunning visuals and compelling narratives that bring your story to life",
      icon: <FaPalette className="w-8 h-8" />,
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
      shape: "rounded-full",
    },
    {
      title: "Production & Editing",
      description:
        "We execute with precision using cutting-edge tools and techniques for flawless results",
      icon: <FaVideo className="w-8 h-8" />,
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
      shape: "rounded-lg",
    },
    {
      title: "Refinement & Delivery",
      description:
        "We polish every detail and deliver your project in all required formats, ready to shine",
      icon: <FaShippingFast className="w-8 h-8" />,
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
      shape: "rounded-2xl",
    },
  ];

  // Floating Logo Component
  const FloatingLogos = () => {
    const logoPositions = [
      { left: "5%", top: "10%", size: 35, delay: 0, rotation: 5 },
      { left: "90%", top: "15%", size: 28, delay: 1, rotation: -3 },
      { left: "8%", top: "75%", size: 32, delay: 2, rotation: 8 },
      { left: "85%", top: "70%", size: 30, delay: 3, rotation: -6 },
      { left: "3%", top: "45%", size: 25, delay: 4, rotation: 4 },
      { left: "92%", top: "50%", size: 34, delay: 5, rotation: -7 },
      { left: "20%", top: "8%", size: 29, delay: 6, rotation: 6 },
      { left: "80%", top: "88%", size: 31, delay: 7, rotation: -4 },
      { left: "40%", top: "3%", size: 26, delay: 8, rotation: 3 },
      { left: "60%", top: "92%", size: 33, delay: 9, rotation: -5 },
      { left: "30%", top: "25%", size: 27, delay: 10, rotation: 7 },
      { left: "70%", top: "65%", size: 30, delay: 11, rotation: -8 },
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
              y: [0, -20, 0],
              x: [0, 12, 0],
              rotate: [0, position.rotation, 0],
              scale: [0.7, 0.9, 0.7],
            }}
            transition={{
              duration: 15 + index * 2,
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
                className="w-full h-full object-contain opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(44%) sepia(45%) saturate(572%) hue-rotate(135deg) brightness(92%) contrast(90%)",
                }}
              />
              {/* Subtle glow effect on hover */}
              <div className="absolute inset-0 bg-teal-400/5 rounded-full blur-sm group-hover:bg-teal-400/10 transition-all duration-500 opacity-0 group-hover:opacity-100" />
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

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

  // Marquee services data
  const marqueeServices = [...services, ...services];

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
        <div className="relative z-10 text-gray-600 text-xl text-center px-4">
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

  return (
    <div className="relative min-h-screen w-full bg-white flex flex-col items-center justify-center pt-20 pb-10 overflow-hidden">
      {/* Subtle Teal Gradient Orbs Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top Left - Very Light Teal */}
        <motion.div
          className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-r from-teal-100/15 to-teal-200/15 rounded-full blur-3xl"
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

        {/* Top Right - Light Teal */}
        <motion.div
          className="absolute top-32 right-32 w-72 h-72 bg-gradient-to-r from-teal-200/20 to-teal-300/20 rounded-full blur-3xl"
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

        {/* Bottom Left - Medium Teal */}
        <motion.div
          className="absolute bottom-40 left-40 w-96 h-96 bg-gradient-to-r from-teal-300/15 to-teal-400/15 rounded-full blur-3xl"
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

        {/* Bottom Right - Light Cyan Teal */}
        <motion.div
          className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-cyan-200/15 to-teal-200/15 rounded-full blur-3xl"
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

        {/* Center - Very Subtle Teal */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-teal-100/10 to-teal-200/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Middle Left - Light Emerald Teal */}
        <motion.div
          className="absolute top-1/3 -left-10 w-60 h-60 bg-gradient-to-r from-emerald-200/15 to-teal-200/15 rounded-full blur-3xl"
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

        {/* Middle Right - Medium Teal */}
        <motion.div
          className="absolute bottom-1/3 -right-10 w-56 h-56 bg-gradient-to-r from-teal-300/20 to-teal-400/20 rounded-full blur-3xl"
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

      {/* Floating Logos */}
      <FloatingLogos />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-12">
        {/* Header Section */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Enhanced Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-gradient-to-r from-teal-50 to-teal-100 backdrop-blur-sm border border-teal-200 mb-8 shadow-lg shadow-teal-100"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse"></div>
            <span className="text-teal-600 font-semibold text-sm tracking-wider">
              Core services
            </span>
            <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse"></div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="mb-8 text-2xl font-bold tracking-tight text-gray-800 md:text-3xl lg:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Types of work
            <span className="bg-gradient-to-r from-teal-400 via-teal-500 to-teal-400 bg-clip-text text-transparent bg-size-200 animate-gradient block mt-2">
              ‍We do
            </span>
          </motion.h1>

          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Professional video editing services tailored to your unique needs
            and vision
          </motion.p>
        </motion.div>

        {/* Marquee Section */}
        <div className="relative py-12 overflow-hidden mb-20">
          {/* Top Marquee - Moving Right */}
          <div className="flex mb-6">
            <div className="flex space-x-5 animate-marquee-right">
              {marqueeServices.slice(0, 8).map((service, index) => (
                <motion.div
                  key={`${service._id}-top-${index}`}
                  className="flex-shrink-0 w-[380px]"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-white rounded-2xl p-6 border border-teal-200 shadow-xl shadow-teal-100 relative overflow-hidden h-full min-h-[220px] flex flex-col group hover:shadow-2xl hover:border-teal-300 transition-all duration-300">
                    {/* Card Content */}
                    <div className="relative z-10 flex flex-col items-center h-full text-center">
                      {/* Icon Container */}
                      <motion.div
                        className="p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl shadow-lg shadow-teal-100 mb-4 border border-teal-200"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="text-teal-500">{service.icon}</div>
                      </motion.div>

                      {/* Title */}
                      <h3 className="mb-3 text-lg font-bold leading-tight tracking-tight text-gray-800 group-hover:text-teal-600 transition-colors duration-300">
                        {service.title}
                      </h3>

                      {/* Accent Line */}
                      <div className="w-16 h-1 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full mb-4" />

                      {/* Description */}
                      <p className="flex-1 text-sm font-light leading-relaxed text-gray-600">
                        {service.description}
                      </p>

                      {/* Learn More Button */}
                      <motion.button
                        className="mt-4 px-4 py-2 bg-teal-50 text-teal-600 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 border border-teal-200 hover:bg-teal-100 hover:border-teal-300"
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

          {/* Bottom Marquee - Moving Left */}
          <div className="flex">
            <div className="flex space-x-5 animate-marquee-left">
              {marqueeServices.slice(4, 12).map((service, index) => (
                <motion.div
                  key={`${service._id}-bottom-${index}`}
                  className="flex-shrink-0 w-[380px]"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-white rounded-2xl p-6 border border-teal-200 shadow-xl shadow-teal-100 relative overflow-hidden h-full min-h-[220px] flex flex-col group hover:shadow-2xl hover:border-teal-300 transition-all duration-300">
                    {/* Card Content */}
                    <div className="relative z-10 flex flex-col items-center h-full text-center">
                      {/* Icon Container */}
                      <motion.div
                        className="p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl shadow-lg shadow-teal-100 mb-4 border border-teal-200"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="text-teal-500">{service.icon}</div>
                      </motion.div>

                      {/* Title */}
                      <h3 className="mb-3 text-lg font-bold leading-tight tracking-tight text-gray-800 group-hover:text-teal-600 transition-colors duration-300">
                        {service.title}
                      </h3>

                      {/* Accent Line */}
                      <div className="w-16 h-1 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full mb-4" />

                      {/* Description */}
                      <p className="flex-1 text-sm font-light leading-relaxed text-gray-600">
                        {service.description}
                      </p>

                      {/* Learn More Button */}
                      <motion.button
                        className="mt-4 px-4 py-2 bg-teal-50 text-teal-600 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 border border-teal-200 hover:bg-teal-100 hover:border-teal-300"
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

          {/* Gradient Overlays */}
          <div className="absolute top-0 left-0 z-20 w-32 h-full pointer-events-none bg-gradient-to-r from-white to-transparent" />
          <div className="absolute top-0 right-0 z-20 w-32 h-full pointer-events-none bg-gradient-to-l from-white to-transparent" />
          <div className="absolute bottom-0 left-0 z-20 w-32 h-full pointer-events-none bg-gradient-to-r from-white to-transparent" />
          <div className="absolute bottom-0 right-0 z-20 w-32 h-full pointer-events-none bg-gradient-to-l from-white to-transparent" />
        </div>

        {/* Rest of the component remains the same... */}
        {/* Professional Video Editing Process Section */}
        <motion.div
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-gradient-to-r from-teal-50 to-teal-100 backdrop-blur-sm border border-teal-200 mb-6 shadow-lg shadow-teal-100">
              <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse"></div>
              <span className="text-teal-600 font-semibold text-sm tracking-wider">
                Our Process
              </span>
              <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse"></div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              How We Bring Your{" "}
              <span className="bg-gradient-to-r from-teal-400 to-teal-500 bg-clip-text text-transparent">
                Vision to Life
              </span>
            </h2>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A seamless, collaborative journey from concept to final delivery
            </p>
          </motion.div>

          {/* Professional Video Editing Process Steps */}
          <div className="relative">
            {/* Timeline with Video Editing Icons */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-400/20 to-teal-600/20 transform -translate-x-1/2 hidden lg:block">
              {/* Video Editing Tools Icons */}
              {[FaCut, FaVideo, FaLayerGroup, FaExpand].map((Icon, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.3 }}
                  viewport={{ once: true }}
                  style={{
                    top: `${25 + i * 25}%`,
                  }}
                >
                  <div className="w-10 h-10 bg-white border-2 border-teal-300 rounded-full flex items-center justify-center shadow-lg">
                    <Icon className="w-4 h-4 text-teal-500" />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="space-y-20 lg:space-y-24">
              {workflowSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {/* Step Indicator with Video Editing Theme */}
                  <div className="absolute -left-4 lg:left-1/2 top-8 lg:top-1/2 transform lg:-translate-x-1/2 lg:-translate-y-1/2 z-20">
                    <motion.div
                      className="w-16 h-16 bg-white border-4 border-white rounded-full shadow-2xl flex items-center justify-center relative"
                      whileInView={{
                        scale: [0, 1.2, 1],
                      }}
                      transition={{
                        duration: 0.8,
                        delay: index * 0.3,
                      }}
                      viewport={{ once: true }}
                    >
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-lg relative z-10`}
                      >
                        {index + 1}
                      </div>

                      {/* Video Play Ring Animation */}
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
                          whileInView={{
                            scale: [0, 1],
                            rotate: [0, 360],
                          }}
                          transition={{
                            duration: 0.8,
                            delay: index * 0.4,
                          }}
                          viewport={{ once: true }}
                          whileHover={{
                            scale: 1.1,
                          }}
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
                              whileHover={{
                                scale: [1, 1.5, 1],
                              }}
                              transition={{
                                duration: 0.6,
                              }}
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
                          <span>{Math.round((index + 1) * 25)}% Complete</span>
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
                          animate={{
                            y: [0, -10, 0],
                            rotate: [0, 5, 0],
                          }}
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
                          animate={{
                            y: [0, 8, 0],
                            rotate: [0, -5, 0],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            delay: index * 0.7,
                          }}
                        >
                          <FaLayerGroup className="w-4 h-4 text-teal-500" />
                        </motion.div>
                      </div>

                      {/* Connection Line for Mobile */}
                      {index < workflowSteps.length - 1 && (
                        <motion.div
                          className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-teal-300 to-teal-200 lg:hidden"
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          transition={{ duration: 0.6, delay: index * 0.4 }}
                          viewport={{ once: true }}
                        />
                      )}
                    </motion.div>

                    {/* Step Indicator for Mobile */}
                    <div className="lg:hidden mt-6 text-center">
                      <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-200 shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.5 }}
                        viewport={{ once: true }}
                      >
                        <div
                          className={`w-3 h-3 rounded-full bg-gradient-to-r ${step.color}`}
                        />
                        <span className="text-sm font-medium text-teal-700">
                          Step {index + 1}
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Process Summary */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-2xl p-8 border border-teal-200 shadow-xl relative overflow-hidden">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                viewport={{ once: true }}
              >
                <FaVideo className="w-12 h-12 text-teal-500 mx-auto mb-4 relative z-10" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 relative z-10">
                Ready to Start Your Video Project?
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto mb-6 relative z-10">
                Join hundreds of satisfied clients who have transformed their
                vision into stunning video content through our professional
                editing process.
              </p>
              <motion.button
                className="px-8 py-3 bg-gradient-to-r from-teal-400 to-teal-500 text-white font-semibold rounded-full shadow-lg hover:shadow-teal-200 relative z-10"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(45, 212, 191, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Video Journey
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Client Collaboration Section */}
        <motion.div
          className="mb-20 bg-white rounded-3xl border border-teal-200 p-8 md:p-12 relative overflow-hidden shadow-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Collaborative{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-500">
                  Partnership
                </span>
              </h2>
              <p className="text-gray-600 mb-6">
                We believe the best results come from true collaboration. That's
                why we work closely with you throughout the entire process,
                ensuring your vision is realized exactly as you imagined.
              </p>

              <div className="space-y-4">
                {[
                  "Regular progress updates and reviews",
                  "Direct communication with your dedicated editor",
                  "Flexible revision process",
                  "Multiple delivery formats for any platform",
                ].map((item, i) => (
                  <div key={i} className="flex items-start">
                    <div className="bg-teal-100 p-2 rounded-lg mr-3">
                      <svg
                        className="w-5 h-5 text-teal-500"
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
                    <span className="text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Collaboration visual */}
              <div className="bg-white rounded-2xl overflow-hidden p-6 border border-teal-200 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-teal-400 rounded-full flex items-center justify-center text-white font-bold">
                      C
                    </div>
                    <div className="ml-3">
                      <div className="text-gray-800 font-medium">Client</div>
                      <div className="text-teal-500 text-sm">You</div>
                    </div>
                  </div>
                  <div className="text-teal-500 animate-pulse">
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
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                      E
                    </div>
                    <div className="ml-3">
                      <div className="text-gray-800 font-medium">Editor</div>
                      <div className="text-teal-600 text-sm">Our Team</div>
                    </div>
                  </div>
                </div>

                <div className="bg-teal-50 rounded-lg p-4 mb-3 border border-teal-200">
                  <div className="text-teal-500 text-sm mb-1">
                    Client Feedback
                  </div>
                  <div className="text-gray-800">
                    "Can we make the intro more dynamic?"
                  </div>
                </div>

                <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                  <div className="text-teal-600 text-sm mb-1">
                    Editor Response
                  </div>
                  <div className="text-gray-800">
                    "Sure! I'll add some motion graphics to enhance it."
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="bg-gradient-to-r from-teal-50 to-teal-100 border border-teal-200 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden shadow-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Ready to Elevate Your Content?
          </motion.h2>

          <motion.p
            className="text-gray-600 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Let's discuss your project and create something extraordinary
            together.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-teal-400 to-teal-500 text-white font-medium rounded-full relative overflow-hidden group shadow-lg hover:shadow-teal-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Start a Project</span>
            </motion.button>

            <motion.button
              className="px-8 py-3 border border-teal-300 text-teal-600 font-medium rounded-full relative overflow-hidden group bg-white/80 backdrop-blur-sm shadow-lg hover:border-teal-400"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(45, 212, 191, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Book a Consultation</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {isModalOpen && selectedService && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-white rounded-2xl border border-teal-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="text-4xl mb-2 text-teal-500">
                      {selectedService.icon}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {selectedService.title}
                    </h2>
                  </div>
                  <button
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                    onClick={closeModal}
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

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Service Overview
                  </h3>
                  <p className="text-gray-600">{selectedService.details}</p>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Features
                    </h3>
                    <ul className="space-y-2">
                      {selectedService.features?.map((feature, i) => (
                        <li
                          key={i}
                          className="text-teal-500 text-sm flex items-center"
                        >
                          <span className="w-2 h-2 bg-teal-400 rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Project Examples
                    </h3>
                    <ul className="space-y-2">
                      {selectedService.examples?.map((example, i) => (
                        <li
                          key={i}
                          className="text-gray-600 text-sm flex items-center"
                        >
                          <span className="w-2 h-2 bg-teal-300 rounded-full mr-2" />
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Delivery Time
                    </h3>
                    <p className="text-gray-600">
                      {selectedService.deliveryTime}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Revisions
                    </h3>
                    <p className="text-gray-600">{selectedService.revisions}</p>
                  </div>
                </div>

                <motion.button
                  className="w-full py-3 bg-gradient-to-r from-teal-400 to-teal-500 text-white font-medium rounded-lg shadow-lg hover:shadow-teal-200"
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
        @keyframes marquee-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-left {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-marquee-right {
          animation: marquee-right 60s linear infinite;
        }

        .animate-marquee-left {
          animation: marquee-left 60s linear infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }

        .bg-size-200 {
          background-size: 200% 200%;
        }
      `}</style>
    </div>
  );
};

export default Services;
