import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

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

  // Enhanced particle positions - spread throughout the entire container
  const particlePositions = [
    { top: "10%", left: "15%", size: "w-3 h-3", color: "bg-teal-500/70" },
    { top: "20%", left: "80%", size: "w-2 h-2", color: "bg-emerald-500/60" },
    { top: "30%", left: "25%", size: "w-3 h-3", color: "bg-teal-400/70" },
    { top: "40%", left: "70%", size: "w-2 h-2", color: "bg-emerald-400/60" },
    { top: "50%", left: "10%", size: "w-3 h-3", color: "bg-teal-500/70" },
    { top: "60%", left: "85%", size: "w-2 h-2", color: "bg-emerald-500/60" },
    { top: "70%", left: "35%", size: "w-3 h-3", color: "bg-teal-400/70" },
    { top: "80%", left: "65%", size: "w-2 h-2", color: "bg-emerald-400/60" },
    { top: "25%", left: "45%", size: "w-2 h-2", color: "bg-teal-500/60" },
    { top: "45%", left: "55%", size: "w-3 h-3", color: "bg-emerald-500/70" },
    { top: "65%", left: "20%", size: "w-2 h-2", color: "bg-teal-400/60" },
    { top: "85%", left: "75%", size: "w-3 h-3", color: "bg-emerald-400/70" },
    { top: "15%", left: "60%", size: "w-3 h-3", color: "bg-teal-500/70" },
    { top: "35%", left: "30%", size: "w-2 h-2", color: "bg-emerald-500/60" },
    { top: "55%", left: "90%", size: "w-3 h-3", color: "bg-teal-400/70" },
    { top: "75%", left: "40%", size: "w-2 h-2", color: "bg-emerald-400/60" },
  ];

  return (
    <div
      ref={containerRef}
      className="flex flex-col text-left justify-center items-center w-full mx-auto py-16 gap-20 md:gap-32 relative overflow-hidden"
    >
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Large Animated Gradient Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-teal-200/30 to-emerald-200/40 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 12, // Slowed down
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-r from-emerald-200/25 to-teal-200/35 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 10, // Slowed down
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Floating Geometric Shapes */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-16 h-16 border-2 border-teal-300/40 rounded-lg"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8, // Slowed down
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-1/3 left-1/4 w-12 h-12 border-2 border-emerald-300/50 rounded-full"
          animate={{
            y: [0, -40, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 7, // Slowed down
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Rotating Rings */}
        <motion.div
          className="absolute top-1/3 right-1/3 w-32 h-32 border border-teal-300/30 rounded-full"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 40, // Slowed down
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute bottom-1/4 left-1/3 w-20 h-20 border border-emerald-300/40 rounded-full"
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 35, // Slowed down
            repeat: Infinity,
            ease: "linear",
            delay: 3,
          }}
        />

        {/* Enhanced Visible Grid Pattern */}
        <motion.div
          className="absolute inset-0 opacity-25" // Increased opacity
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 30, // Slowed down
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundImage: `
              linear-gradient(rgba(20, 184, 166, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(20, 184, 166, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px", // Slightly larger grid
          }}
        />

        {/* ENHANCED VISIBLE FLOATING PARTICLES */}
        {particlePositions.map((particle, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${particle.size} ${particle.color} shadow-lg`}
            style={{
              top: particle.top,
              left: particle.left,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 30 - 15, 0],
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 6 + Math.random() * 4, // Slowed down
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          />
        ))}

        {/* Additional Large Floating Elements */}
        <motion.div
          className="absolute top-1/2 left-1/4 w-8 h-8 bg-teal-500/80 rounded-full shadow-lg"
          animate={{
            y: [0, -60, 0],
            x: [0, 20, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 9, // Slowed down
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />

        <motion.div
          className="absolute top-1/3 right-1/4 w-6 h-6 bg-emerald-500/80 rounded-full shadow-lg"
          animate={{
            y: [0, -50, 0],
            x: [0, -15, 0],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 8, // Slowed down
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5,
          }}
        />

        {/* Pulse Dots */}
        <motion.div
          className="absolute top-40 right-40 w-4 h-4 bg-teal-500/80 rounded-full shadow-lg"
          animate={{
            scale: [1, 2.5, 1],
            opacity: [0.8, 0, 0.8],
          }}
          transition={{
            duration: 5, // Slowed down
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-40 left-40 w-3 h-3 bg-emerald-500/80 rounded-full shadow-lg"
          animate={{
            scale: [1, 3, 1],
            opacity: [0.7, 0, 0.7],
          }}
          transition={{
            duration: 6, // Slowed down
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Sparkle Effects */}
        <motion.div
          className="absolute top-20 right-20 w-2 h-2 bg-white rounded-full shadow-lg"
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3, // Slowed down
            repeat: Infinity,
            ease: "easeOut",
            delay: 1,
          }}
        />

        <motion.div
          className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-white rounded-full shadow-lg"
          animate={{
            scale: [0, 2, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 4, // Slowed down
            repeat: Infinity,
            ease: "easeOut",
            delay: 3,
          }}
        />

        {/* Additional subtle background elements */}
        <motion.div
          className="absolute top-10 left-10 w-24 h-24 bg-teal-300/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-10 right-10 w-20 h-20 bg-emerald-300/20 rounded-full blur-xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Header Section */}
      <div className="flex flex-col items-center justify-center gap-5 px-4 mx-auto text-center relative z-10">
        {/* Cozy Badge */}
        <motion.div
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-teal-200 shadow-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
          <span className="text-teal-700 font-medium text-sm tracking-wide">
            Our Services
          </span>
          <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          className="text-2xl font-bold md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <span className="text-gray-800">Professional</span>
          <span className="bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent bg-size-200 animate-gradient block mt-2">
            Video Editing Services
          </span>
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600 max-w-2xl mx-auto mt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Tailored solutions to elevate your content and grow your audience
        </motion.p>
      </div>

      {/* Services Steps */}
      <div className="relative flex flex-col items-center justify-center w-full gap-20 p-4 md:gap-48 z-10">
        {/* Service 1 & 2 */}
        <div className="relative flex flex-col items-center justify-center w-full max-w-4xl gap-16 md:flex-row md:gap-48">
          {/* Service 2 */}
          <motion.div
            className="relative z-20 order-2 md:order-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={cardVariants}
          >
            <div className="relative group">
              {/* Cozy Card */}
              <div className="relative bg-gradient-to-br from-white to-teal-50 rounded-3xl border-2 border-teal-200 p-8 shadow-lg shadow-teal-200/30 md:w-80 w-72 transform transition-all duration-500 group-hover:shadow-teal-300/40 group-hover:scale-105 group-hover:border-teal-300 backdrop-blur-sm">
                {/* Hand-drawn like corner accent */}
                <div className="absolute -top-2 -left-2 w-8 h-8 bg-teal-100 rounded-full opacity-60"></div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-teal-100 rounded-full opacity-60"></div>

                {/* Icon Container */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-teal-500/30 group-hover:rotate-12 transition-transform duration-500">
                  {services[1].icon}
                </div>

                {/* Number Badge */}
                <div className="inline-flex items-center justify-center w-14 h-14 bg-white text-teal-600 rounded-2xl font-serif text-xl font-bold mb-6 border-2 border-teal-200 shadow-sm group-hover:bg-teal-50 transition-colors duration-300">
                  {services[1].number}
                </div>

                {/* Content */}
                <div className="space-y-5">
                  <h2 className="text-2xl font-serif font-bold tracking-tight text-gray-800 leading-tight">
                    {services[1].title}
                  </h2>
                  <div className="h-1 w-16 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full opacity-80"></div>
                  <p className="text-gray-600 leading-relaxed text-base font-light">
                    {services[1].description}
                  </p>
                </div>

                {/* Cozy hover effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-50/50 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>
              </div>
            </div>
          </motion.div>

          {/* Connector - Hidden on mobile/tablet, visible on desktop */}
          <div className="absolute z-10 w-96 h-48 transform md:top-8 md:rotate-[0deg] rotate-[70deg] hidden md:block">
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
              {/* Cozy Card */}
              <div className="relative bg-gradient-to-br from-white to-emerald-50 rounded-3xl border-2 border-emerald-200 p-8 shadow-lg shadow-emerald-200/30 md:w-80 w-72 transform transition-all duration-500 group-hover:shadow-emerald-300/40 group-hover:scale-105 group-hover:border-emerald-300 backdrop-blur-sm">
                {/* Hand-drawn like corner accent */}
                <div className="absolute -top-2 -left-2 w-8 h-8 bg-emerald-100 rounded-full opacity-60"></div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-100 rounded-full opacity-60"></div>

                {/* Icon Container */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-emerald-500/30 group-hover:-rotate-12 transition-transform duration-500">
                  {services[0].icon}
                </div>

                {/* Number Badge */}
                <div className="inline-flex items-center justify-center w-14 h-14 bg-white text-emerald-600 rounded-2xl font-serif text-xl font-bold mb-6 border-2 border-emerald-200 shadow-sm group-hover:bg-emerald-50 transition-colors duration-300">
                  {services[0].number}
                </div>

                {/* Content */}
                <div className="space-y-5">
                  <h2 className="text-2xl font-serif font-bold tracking-tight text-gray-800 leading-tight">
                    {services[0].title}
                  </h2>
                  <div className="h-1 w-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full opacity-80"></div>
                  <p className="text-gray-600 leading-relaxed text-base font-light">
                    {services[0].description}
                  </p>
                </div>

                {/* Cozy hover effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-50/50 to-teal-50/50 opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Connector between sections - WIDER - Hidden on mobile/tablet */}
        <div className="absolute z-10 md:top-[22rem] top-[55rem] w-[30rem] h-72 transform md:rotate-[45deg] -rotate-[90deg] hidden md:block">
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
        <div className="relative flex flex-col items-center justify-center w-full gap-16 p-4 md:gap-48">
          <div className="relative flex flex-col items-center justify-center w-full max-w-4xl gap-16 md:flex-row md:gap-48">
            {/* Service 4 */}
            <motion.div
              className="relative z-20 order-2 md:order-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={cardVariants}
            >
              <div className="relative group">
                {/* Cozy Card */}
                <div className="relative bg-gradient-to-br from-white to-teal-50 rounded-3xl border-2 border-teal-200 p-8 shadow-lg shadow-teal-200/30 md:w-80 w-72 transform transition-all duration-500 group-hover:shadow-teal-300/40 group-hover:scale-105 group-hover:border-teal-300 backdrop-blur-sm">
                  {/* Hand-drawn like corner accent */}
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-teal-100 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-teal-100 rounded-full opacity-60"></div>

                  {/* Icon Container */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-teal-500/30 group-hover:rotate-12 transition-transform duration-500">
                    {services[3].icon}
                  </div>

                  {/* Number Badge */}
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-white text-teal-600 rounded-2xl font-serif text-xl font-bold mb-6 border-2 border-teal-200 shadow-sm group-hover:bg-teal-50 transition-colors duration-300">
                    {services[3].number}
                  </div>

                  {/* Content */}
                  <div className="space-y-5">
                    <h2 className="text-2xl font-serif font-bold tracking-tight text-gray-800 leading-tight">
                      {services[3].title}
                    </h2>
                    <div className="h-1 w-16 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full opacity-80"></div>
                    <p className="text-gray-600 leading-relaxed text-base font-light">
                      {services[3].description}
                    </p>
                  </div>

                  {/* Cozy hover effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-50/50 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>
                </div>
              </div>
            </motion.div>

            {/* Connector - Hidden on mobile/tablet */}
            <div className="absolute z-10 w-96 h-48 transform md:top-8 md:rotate-[0deg] rotate-[70deg] hidden md:block">
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
                {/* Cozy Card */}
                <div className="relative bg-gradient-to-br from-white to-emerald-50 rounded-3xl border-2 border-emerald-200 p-8 shadow-lg shadow-emerald-200/30 md:w-80 w-72 transform transition-all duration-500 group-hover:shadow-emerald-300/40 group-hover:scale-105 group-hover:border-emerald-300 backdrop-blur-sm">
                  {/* Hand-drawn like corner accent */}
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-emerald-100 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-100 rounded-full opacity-60"></div>

                  {/* Icon Container */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-emerald-500/30 group-hover:-rotate-12 transition-transform duration-500">
                    {services[2].icon}
                  </div>

                  {/* Number Badge */}
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-white text-emerald-600 rounded-2xl font-serif text-xl font-bold mb-6 border-2 border-emerald-200 shadow-sm group-hover:bg-emerald-50 transition-colors duration-300">
                    {services[2].number}
                  </div>

                  {/* Content */}
                  <div className="space-y-5">
                    <h2 className="text-2xl font-serif font-bold tracking-tight text-gray-800 leading-tight">
                      {services[2].title}
                    </h2>
                    <div className="h-1 w-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full opacity-80"></div>
                    <p className="text-gray-600 leading-relaxed text-base font-light">
                      {services[2].description}
                    </p>
                  </div>

                  {/* Cozy hover effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-50/50 to-teal-50/50 opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Connector between sections - WIDER - Hidden on mobile/tablet */}
          <div className="absolute z-10 md:top-[22rem] top-[55rem] w-[30rem] h-72 transform md:rotate-[50deg] -rotate-[90deg] hidden md:block">
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
        <div className="relative flex flex-col items-center justify-center w-full gap-16 p-4 md:gap-48">
          <div className="relative flex flex-col items-center justify-center w-full max-w-4xl gap-16 md:flex-row md:gap-48">
            {/* Service 6 */}
            <motion.div
              className="relative z-20 order-2 md:order-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={cardVariants}
            >
              <div className="relative group">
                {/* Cozy Card */}
                <div className="relative bg-gradient-to-br from-white to-teal-50 rounded-3xl border-2 border-teal-200 p-8 shadow-lg shadow-teal-200/30 md:w-80 w-72 transform transition-all duration-500 group-hover:shadow-teal-300/40 group-hover:scale-105 group-hover:border-teal-300 backdrop-blur-sm">
                  {/* Hand-drawn like corner accent */}
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-teal-100 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-teal-100 rounded-full opacity-60"></div>

                  {/* Icon Container */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-teal-500/30 group-hover:rotate-12 transition-transform duration-500">
                    {services[5].icon}
                  </div>

                  {/* Number Badge */}
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-white text-teal-600 rounded-2xl font-serif text-xl font-bold mb-6 border-2 border-teal-200 shadow-sm group-hover:bg-teal-50 transition-colors duration-300">
                    {services[5].number}
                  </div>

                  {/* Content */}
                  <div className="space-y-5">
                    <h2 className="text-2xl font-serif font-bold tracking-tight text-gray-800 leading-tight">
                      {services[5].title}
                    </h2>
                    <div className="h-1 w-16 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full opacity-80"></div>
                    <p className="text-gray-600 leading-relaxed text-base font-light">
                      {services[5].description}
                    </p>
                  </div>

                  {/* Cozy hover effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-50/50 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>
                </div>
              </div>
            </motion.div>

            {/* Connector - Hidden on mobile/tablet */}
            <div className="absolute z-10 w-96 h-48 transform md:top-8 md:rotate-[0deg] rotate-[70deg] hidden md:block">
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
                {/* Cozy Card */}
                <div className="relative bg-gradient-to-br from-white to-emerald-50 rounded-3xl border-2 border-emerald-200 p-8 shadow-lg shadow-emerald-200/30 md:w-80 w-72 transform transition-all duration-500 group-hover:shadow-emerald-300/40 group-hover:scale-105 group-hover:border-emerald-300 backdrop-blur-sm">
                  {/* Hand-drawn like corner accent */}
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-emerald-100 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-100 rounded-full opacity-60"></div>

                  {/* Icon Container */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-emerald-500/30 group-hover:-rotate-12 transition-transform duration-500">
                    {services[4].icon}
                  </div>

                  {/* Number Badge */}
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-white text-emerald-600 rounded-2xl font-serif text-xl font-bold mb-6 border-2 border-emerald-200 shadow-sm group-hover:bg-emerald-50 transition-colors duration-300">
                    {services[4].number}
                  </div>

                  {/* Content */}
                  <div className="space-y-5">
                    <h2 className="text-2xl font-serif font-bold tracking-tight text-gray-800 leading-tight">
                      {services[4].title}
                    </h2>
                    <div className="h-1 w-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full opacity-80"></div>
                    <p className="text-gray-600 leading-relaxed text-base font-light">
                      {services[4].description}
                    </p>
                  </div>

                  {/* Cozy hover effect */}
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
        className="text-center mt-16 relative z-10"
      >
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-teal-200 shadow-sm mb-6">
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

      {/* Enhanced Custom CSS */}
      <style jsx>{`
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

export default NextGenServices;
