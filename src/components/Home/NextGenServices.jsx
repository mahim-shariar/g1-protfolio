import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import SectionHeader from "../Shared/SectionHeader";
import bg from "/ICON.png";

const NextGenServices = () => {
  const containerRef = useRef(null);
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      number: "01",
      icon: "🎬",
      title: "YouTube Video Editing",
      description:
        "Professional editing for YouTube content creators with complete packages including color grading, sound design, and motion graphics.",
      color: "teal",
    },
    {
      number: "02",
      icon: "⚡",
      title: "Short Form Content",
      description:
        "Transform your long-form content into viral short-form videos optimized for TikTok, Reels & Shorts with trending audio.",
      color: "emerald",
    },
    {
      number: "03",
      icon: "🎭",
      title: "Corporate Videos",
      description:
        "High-quality corporate video production for businesses, including promotional videos and company presentations.",
      color: "teal",
    },
    {
      number: "04",
      icon: "💼",
      title: "Podcast Editing",
      description:
        "Complete podcast editing service including audio cleanup, video synchronization, and multi-camera editing.",
      color: "emerald",
    },
    {
      number: "05",
      title: "Motion Graphics",
      icon: "✨",
      description:
        "Custom animated graphics and visual effects to make your content stand out and engage your audience.",
      color: "teal",
    },
    {
      number: "06",
      title: "Content Strategy",
      icon: "📈",
      description:
        "Complete content planning and strategy to grow your channel and maximize audience engagement.",
      color: "emerald",
    },
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const serviceProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [0, services.length - 1]
  );

  useEffect(() => {
    const unsubscribe = serviceProgress.on("change", (latest) => {
      setActiveService(Math.floor(latest));
    });
    return () => unsubscribe();
  }, [serviceProgress]);

  // Animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const rightCardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const connectorVariants = {
    hidden: {
      pathLength: 0,
      strokeDashoffset: 1000,
    },
    visible: {
      pathLength: 1,
      strokeDashoffset: 0,
      transition: {
        duration: 2,
        ease: "easeInOut",
      },
    },
  };

  // Enhanced particle positions - with brighter colors
  const particlePositions = [
    { top: "10%", left: "15%", size: "w-3 h-3", color: "bg-teal-400/80" },
    { top: "20%", left: "80%", size: "w-2 h-2", color: "bg-emerald-400/70" },
    { top: "30%", left: "25%", size: "w-3 h-3", color: "bg-teal-300/80" },
    { top: "40%", left: "70%", size: "w-2 h-2", color: "bg-emerald-300/70" },
    { top: "50%", left: "10%", size: "w-3 h-3", color: "bg-teal-400/80" },
    { top: "60%", left: "85%", size: "w-2 h-2", color: "bg-emerald-400/70" },
    { top: "70%", left: "35%", size: "w-3 h-3", color: "bg-teal-300/80" },
    { top: "80%", left: "65%", size: "w-2 h-2", color: "bg-emerald-300/70" },
    { top: "25%", left: "45%", size: "w-2 h-2", color: "bg-teal-400/70" },
    { top: "45%", left: "55%", size: "w-3 h-3", color: "bg-emerald-400/80" },
    { top: "65%", left: "20%", size: "w-2 h-2", color: "bg-teal-300/70" },
    { top: "85%", left: "75%", size: "w-3 h-3", color: "bg-emerald-300/80" },
    { top: "15%", left: "60%", size: "w-3 h-3", color: "bg-teal-400/80" },
    { top: "35%", left: "30%", size: "w-2 h-2", color: "bg-emerald-400/70" },
    { top: "55%", left: "90%", size: "w-3 h-3", color: "bg-teal-300/80" },
    { top: "75%", left: "40%", size: "w-2 h-2", color: "bg-emerald-300/70" },
  ];

  // Background Logo Animation Component without any blur
  const BackgroundLogoAnimation = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main Background Logo - No blur */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-0"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{
            scale: [1, 1.03, 1],
            opacity: [0.12, 0.18, 0.12],
            rotate: [0, 1, 0, -1, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <img
            src={bg}
            alt="Background Logo"
            className="w-[80%] max-w-[1000px] h-auto opacity-20"
          />
        </motion.div>

        {/* Secondary Larger Logo for Depth - No blur */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-0"
          animate={{
            scale: [1.05, 1.12, 1.05],
            opacity: [0.08, 0.12, 0.08],
            rotate: [0, -2, 0, 2, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
            delay: 2,
          }}
        >
          <img
            src={bg}
            alt="Background Logo Glow"
            className="w-[85%] max-w-[1200px] h-auto opacity-15"
          />
        </motion.div>

        {/* ENHANCED VISIBLE FLOATING PARTICLES - Brighter colors */}
        {particlePositions.map((particle, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${particle.size} ${particle.color} z-10`}
            style={{
              top: particle.top,
              left: particle.left,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [1, 1.1, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          />
        ))}

        {/* Additional Large Floating Elements - Brighter */}
        <motion.div
          className="absolute top-1/2 left-1/4 w-8 h-8 bg-teal-400/90 rounded-full z-10"
          animate={{
            y: [0, -40, 0],
            x: [0, 15, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />

        <motion.div
          className="absolute top-1/3 right-1/4 w-6 h-6 bg-emerald-400/90 rounded-full z-10"
          animate={{
            y: [0, -35, 0],
            x: [0, -12, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5,
          }}
        />

        {/* Pulse Dots */}
        <motion.div
          className="absolute top-40 right-40 w-4 h-4 bg-teal-400/90 rounded-full z-10"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.9, 0.3, 0.9],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-40 left-40 w-3 h-3 bg-emerald-400/90 rounded-full z-10"
          animate={{
            scale: [1, 2.2, 1],
            opacity: [0.8, 0.2, 0.8],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Sparkle Effects */}
        <motion.div
          className="absolute top-20 right-20 w-2 h-2 bg-white/95 rounded-full z-10"
          animate={{
            scale: [0, 1.2, 0],
            opacity: [0, 0.9, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeOut",
            delay: 1,
          }}
        />

        <motion.div
          className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-white/95 rounded-full z-10"
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeOut",
            delay: 3,
          }}
        />

        {/* Subtle Floating Particles - Brighter */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`logo-particle-${i}`}
            className="absolute w-1 h-1 bg-gradient-to-r from-teal-300/70 to-teal-200/60 rounded-full z-5"
            style={{
              left: `${10 + i * 10}%`,
              top: `${15 + i * 10}%`,
            }}
            animate={{
              y: [0, -12, 0, -8, 0],
              x: [0, 3, -2, 3, 0],
              scale: [1, 1.1, 0.9, 1.05, 1],
              opacity: [0.3, 0.5, 0.3, 0.4, 0.3],
            }}
            transition={{
              duration: 8 + i * 1.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Glow Effect Behind Background Logo - No blur */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-0"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.1, 0.18, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <div className="w-[500px] h-[500px] bg-teal-300/15 rounded-full" />
        </motion.div>

        {/* Additional subtle background elements - No blur */}
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-teal-200/25 rounded-full z-0"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-10 right-10 w-16 h-16 bg-emerald-200/25 rounded-full z-0"
          animate={{
            scale: [1.05, 1, 1.05],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Large Animated Gradient Orbs - No blur */}
        <motion.div
          className="absolute top-20 left-10 w-60 h-60 bg-gradient-to-r from-teal-200/40 to-emerald-200/50 rounded-full z-0"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-20 right-10 w-52 h-52 bg-gradient-to-r from-emerald-200/35 to-teal-200/45 rounded-full z-0"
          animate={{
            scale: [1.15, 1, 1.15],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Floating Geometric Shapes - Brighter */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-14 h-14 border-2 border-teal-200/50 rounded-lg z-5"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 3, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-1/3 left-1/4 w-10 h-10 border-2 border-emerald-200/60 rounded-full z-5"
          animate={{
            y: [0, -25, 0],
            x: [0, 8, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Rotating Rings - Thinner and brighter */}
        <motion.div
          className="absolute top-1/3 right-1/3 w-28 h-28 border border-teal-200/40 rounded-full z-5"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute bottom-1/4 left-1/3 w-18 h-18 border border-emerald-200/50 rounded-full z-5"
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
            delay: 3,
          }}
        />
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col text-left justify-center items-center w-full mx-auto py-12 gap-16 md:gap-24 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-teal-50/90"
    >
      {/* Enhanced Background without any blur */}
      <BackgroundLogoAnimation />

      {/* Header Section */}
      <SectionHeader
        subtitle="Our Services"
        title="Professional"
        highlight="Video Editing Services"
        description="Tailored solutions to elevate your content and grow your audience"
        center={true}
        titleSize="2xl"
        titleWeight="normal"
        descriptionSize="lg"
        lineSpacing="tight"
        highlightColor="teal-500"
        dotColor="teal-500"
      />

      {/* Services Steps */}
      <div className="relative flex flex-col items-center justify-center w-full gap-12 p-4 md:gap-20 z-10">
        {/* Service 1 & 2 */}
        <div className="relative flex flex-col items-center justify-center w-full max-w-4xl gap-12 md:flex-row md:gap-32">
          {/* Service 2 */}
          <motion.div
            className="relative z-20 order-2 md:order-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={cardVariants}
          >
            <div className="relative group">
              <div className="relative bg-gradient-to-br from-white to-teal-50 rounded-3xl border-2 border-teal-200 p-8 shadow-lg shadow-teal-200/30 md:w-80 w-72 transform transition-all duration-500 group-hover:shadow-teal-300/40 group-hover:scale-105 group-hover:border-teal-300">
                <div className="absolute -top-2 -left-2 w-8 h-8 bg-teal-100 rounded-full opacity-60"></div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-teal-100 rounded-full opacity-60"></div>

                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-teal-500/30 group-hover:rotate-12 transition-transform duration-500">
                  {services[1].icon}
                </div>

                <div className="inline-flex items-center justify-center w-14 h-14 bg-white text-teal-600 rounded-2xl font-serif text-xl font-bold mb-6 border-2 border-teal-200 shadow-sm group-hover:bg-teal-50 transition-colors duration-300">
                  {services[1].number}
                </div>

                <div className="space-y-5">
                  <h2 className="text-2xl font-serif font-bold tracking-tight text-gray-800 leading-tight">
                    {services[1].title}
                  </h2>
                  <div className="h-1 w-16 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full opacity-80"></div>
                  <p className="text-gray-600 leading-relaxed text-base font-light">
                    {services[1].description}
                  </p>
                </div>

                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-50/50 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>
              </div>
            </div>
          </motion.div>

          {/* Connector - Hidden on mobile/tablet, visible on desktop */}
          <div className="absolute z-10 w-80 h-40 transform md:top-6 md:rotate-[0deg] rotate-[70deg] hidden md:block">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 400 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M10,100 Q200,50 390,100"
                stroke="url(#gradient)"
                strokeWidth="3"
                strokeDasharray="8 8"
                fill="none"
                variants={connectorVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0d9488" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Service 1 */}
          <motion.div
            className="relative z-20 order-1 md:order-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={rightCardVariants}
          >
            <div className="relative group">
              <div className="relative bg-gradient-to-br from-white to-emerald-50 rounded-3xl border-2 border-emerald-200 p-8 shadow-lg shadow-emerald-200/30 md:w-80 w-72 transform transition-all duration-500 group-hover:shadow-emerald-300/40 group-hover:scale-105 group-hover:border-emerald-300">
                <div className="absolute -top-2 -left-2 w-8 h-8 bg-emerald-100 rounded-full opacity-60"></div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-100 rounded-full opacity-60"></div>

                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-emerald-500/30 group-hover:-rotate-12 transition-transform duration-500">
                  {services[0].icon}
                </div>

                <div className="inline-flex items-center justify-center w-14 h-14 bg-white text-emerald-600 rounded-2xl font-serif text-xl font-bold mb-6 border-2 border-emerald-200 shadow-sm group-hover:bg-emerald-50 transition-colors duration-300">
                  {services[0].number}
                </div>

                <div className="space-y-5">
                  <h2 className="text-2xl font-serif font-bold tracking-tight text-gray-800 leading-tight">
                    {services[0].title}
                  </h2>
                  <div className="h-1 w-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full opacity-80"></div>
                  <p className="text-gray-600 leading-relaxed text-base font-light">
                    {services[0].description}
                  </p>
                </div>

                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-50/50 to-teal-50/50 opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Connector between sections */}
        <div className="absolute z-10 md:top-[18rem] top-[45rem] w-80 h-56 transform md:rotate-[45deg] -rotate-[90deg] hidden md:block">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 400 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M10,100 Q200,150 390,100"
              stroke="url(#gradient2)"
              strokeWidth="3"
              strokeDasharray="8 8"
              fill="none"
              variants={connectorVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            />
            <defs>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#0d9488" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Service 3 & 4 */}
        <div className="relative flex flex-col items-center justify-center w-full gap-12 p-4 md:gap-20">
          <div className="relative flex flex-col items-center justify-center w-full max-w-4xl gap-12 md:flex-row md:gap-32">
            {/* Service 4 */}
            <motion.div
              className="relative z-20 order-2 md:order-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={cardVariants}
            >
              <div className="relative group">
                <div className="relative bg-gradient-to-br from-white to-teal-50 rounded-3xl border-2 border-teal-200 p-8 shadow-lg shadow-teal-200/30 md:w-80 w-72 transform transition-all duration-500 group-hover:shadow-teal-300/40 group-hover:scale-105 group-hover:border-teal-300">
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-teal-100 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-teal-100 rounded-full opacity-60"></div>

                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-teal-500/30 group-hover:rotate-12 transition-transform duration-500">
                    {services[3].icon}
                  </div>

                  <div className="inline-flex items-center justify-center w-14 h-14 bg-white text-teal-600 rounded-2xl font-serif text-xl font-bold mb-6 border-2 border-teal-200 shadow-sm group-hover:bg-teal-50 transition-colors duration-300">
                    {services[3].number}
                  </div>

                  <div className="space-y-5">
                    <h2 className="text-2xl font-serif font-bold tracking-tight text-gray-800 leading-tight">
                      {services[3].title}
                    </h2>
                    <div className="h-1 w-16 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full opacity-80"></div>
                    <p className="text-gray-600 leading-relaxed text-base font-light">
                      {services[3].description}
                    </p>
                  </div>

                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-50/50 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>
                </div>
              </div>
            </motion.div>

            {/* Connector - Hidden on mobile/tablet */}
            <div className="absolute z-10 w-80 h-40 transform md:top-6 md:rotate-[0deg] rotate-[70deg] hidden md:block">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 400 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M10,100 Q200,50 390,100"
                  stroke="url(#gradient3)"
                  strokeWidth="3"
                  strokeDasharray="8 8"
                  fill="none"
                  variants={connectorVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                />
                <defs>
                  <linearGradient
                    id="gradient3"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#0d9488" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Service 3 */}
            <motion.div
              className="relative z-20 order-1 md:order-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={rightCardVariants}
            >
              <div className="relative group">
                <div className="relative bg-gradient-to-br from-white to-emerald-50 rounded-3xl border-2 border-emerald-200 p-8 shadow-lg shadow-emerald-200/30 md:w-80 w-72 transform transition-all duration-500 group-hover:shadow-emerald-300/40 group-hover:scale-105 group-hover:border-emerald-300">
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-emerald-100 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-100 rounded-full opacity-60"></div>

                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-emerald-500/30 group-hover:-rotate-12 transition-transform duration-500">
                    {services[2].icon}
                  </div>

                  <div className="inline-flex items-center justify-center w-14 h-14 bg-white text-emerald-600 rounded-2xl font-serif text-xl font-bold mb-6 border-2 border-emerald-200 shadow-sm group-hover:bg-emerald-50 transition-colors duration-300">
                    {services[2].number}
                  </div>

                  <div className="space-y-5">
                    <h2 className="text-2xl font-serif font-bold tracking-tight text-gray-800 leading-tight">
                      {services[2].title}
                    </h2>
                    <div className="h-1 w-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full opacity-80"></div>
                    <p className="text-gray-600 leading-relaxed text-base font-light">
                      {services[2].description}
                    </p>
                  </div>

                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-50/50 to-teal-50/50 opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Connector between sections */}
          <div className="absolute z-10 md:top-[18rem] top-[45rem] w-80 h-56 transform md:rotate-[50deg] -rotate-[90deg] hidden md:block">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 400 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M10,100 Q200,150 390,100"
                stroke="url(#gradient4)"
                strokeWidth="3"
                strokeDasharray="8 8"
                fill="none"
                variants={connectorVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              />
              <defs>
                <linearGradient
                  id="gradient4"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#0d9488" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Service 5 & 6 */}
        <div className="relative flex flex-col items-center justify-center w-full gap-12 p-4 md:gap-20">
          <div className="relative flex flex-col items-center justify-center w-full max-w-4xl gap-12 md:flex-row md:gap-32">
            {/* Service 6 */}
            <motion.div
              className="relative z-20 order-2 md:order-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={cardVariants}
            >
              <div className="relative group">
                <div className="relative bg-gradient-to-br from-white to-teal-50 rounded-3xl border-2 border-teal-200 p-8 shadow-lg shadow-teal-200/30 md:w-80 w-72 transform transition-all duration-500 group-hover:shadow-teal-300/40 group-hover:scale-105 group-hover:border-teal-300">
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-teal-100 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-teal-100 rounded-full opacity-60"></div>

                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-teal-500/30 group-hover:rotate-12 transition-transform duration-500">
                    {services[5].icon}
                  </div>

                  <div className="inline-flex items-center justify-center w-14 h-14 bg-white text-teal-600 rounded-2xl font-serif text-xl font-bold mb-6 border-2 border-teal-200 shadow-sm group-hover:bg-teal-50 transition-colors duration-300">
                    {services[5].number}
                  </div>

                  <div className="space-y-5">
                    <h2 className="text-2xl font-serif font-bold tracking-tight text-gray-800 leading-tight">
                      {services[5].title}
                    </h2>
                    <div className="h-1 w-16 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full opacity-80"></div>
                    <p className="text-gray-600 leading-relaxed text-base font-light">
                      {services[5].description}
                    </p>
                  </div>

                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-50/50 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>
                </div>
              </div>
            </motion.div>

            {/* Connector - Hidden on mobile/tablet */}
            <div className="absolute z-10 w-80 h-40 transform md:top-6 md:rotate-[0deg] rotate-[70deg] hidden md:block">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 400 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M10,100 Q200,50 390,100"
                  stroke="url(#gradient5)"
                  strokeWidth="3"
                  strokeDasharray="8 8"
                  fill="none"
                  variants={connectorVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                />
                <defs>
                  <linearGradient
                    id="gradient5"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#0d9488" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Service 5 */}
            <motion.div
              className="relative z-20 order-1 md:order-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={rightCardVariants}
            >
              <div className="relative group">
                <div className="relative bg-gradient-to-br from-white to-emerald-50 rounded-3xl border-2 border-emerald-200 p-8 shadow-lg shadow-emerald-200/30 md:w-80 w-72 transform transition-all duration-500 group-hover:shadow-emerald-300/40 group-hover:scale-105 group-hover:border-emerald-300">
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-emerald-100 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-100 rounded-full opacity-60"></div>

                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-emerald-500/30 group-hover:-rotate-12 transition-transform duration-500">
                    {services[4].icon}
                  </div>

                  <div className="inline-flex items-center justify-center w-14 h-14 bg-white text-emerald-600 rounded-2xl font-serif text-xl font-bold mb-6 border-2 border-emerald-200 shadow-sm group-hover:bg-emerald-50 transition-colors duration-300">
                    {services[4].number}
                  </div>

                  <div className="space-y-5">
                    <h2 className="text-2xl font-serif font-bold tracking-tight text-gray-800 leading-tight">
                      {services[4].title}
                    </h2>
                    <div className="h-1 w-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full opacity-80"></div>
                    <p className="text-gray-600 leading-relaxed text-base font-light">
                      {services[4].description}
                    </p>
                  </div>

                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-50/50 to-teal-50/50 opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Cozy CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-center mt-12 relative z-10 p-6"
      >
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 border border-teal-200 shadow-sm mb-6">
          <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
          <span className="text-teal-700 font-medium text-sm tracking-wide">
            Ready to Start?
          </span>
          <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
        </div>

        <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
          Ready to elevate your content with our professional editing services?
          Schedule a free consultation to discuss your project needs.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-full font-semibold text-lg hover:from-teal-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-teal-500/25">
            Book Free Call
          </button>
          <button className="px-8 py-4 bg-transparent border border-teal-500 text-teal-600 rounded-full font-semibold text-lg hover:bg-teal-50 transition-all duration-300">
            View Portfolio
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NextGenServices;
