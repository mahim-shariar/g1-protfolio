import { useState, useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const WhyWorkWithUs = () => {
  const [activePoint, setActivePoint] = useState(0);
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  // Points data - updated content to match second component
  const points = [
    {
      id: 1,
      title: "Fast delivery, zero guesswork.",
      description:
        "Our streamlined workflow ensures rapid turnaround times with precision editing that hits the mark every time.",
      icon: "🚀",
      color: "cyan",
    },
    {
      id: 2,
      title: "Collaborative process with clear revisions.",
      description:
        "Real-time collaboration tools and structured feedback loops ensure your vision is perfectly executed.",
      icon: "💬",
      color: "purple",
    },
    {
      id: 3,
      title: "Custom edits that fit your style.",
      description:
        "Tailored editing approaches that adapt to your unique brand identity and content requirements.",
      icon: "🎯",
      color: "cyan",
    },
  ];

  // Online image sources for each point - using second component's images
  const images = [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
  ];

  // Set active point based on scroll
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setActivePoint((prev) => (prev + 1) % points.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isInView, points.length]);

  const handleCardClick = (index) => {
    setActivePoint(index);
  };

  const colorVariants = {
    cyan: {
      gradient: "from-cyan-400 to-cyan-600",
      light: "cyan-400",
      dark: "cyan-600",
      primary: "cyan-400",
      secondary: "cyan-500",
    },
    purple: {
      gradient: "from-purple-400 to-purple-600",
      light: "purple-400",
      dark: "purple-600",
      primary: "purple-400",
      secondary: "purple-500",
    },
  };

  const currentColor = colorVariants[points[activePoint].color];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-20 bg-gradient-to-b from-black to-gray-950 overflow-hidden"
    >
      {/* Background Elements - Updated to match second component */}
      <div className="absolute inset-0">
        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Grid Pattern - Updated to match second component */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 245, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 245, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            backgroundPosition: "center center",
            maskImage:
              "radial-gradient(circle at center, black, transparent 70%)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section - Updated to match second component */}
        <motion.div className="text-center mb-16" style={{ y, opacity }}>
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-cyan-300 font-mono uppercase tracking-widest">
              The Next Generation Advantage
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Why Work
            <motion.span
              className="block  text-cyan-400 mt-2"
              animate={{ backgroundPosition: ["0%", "100%"] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              With Us
            </motion.span>
          </motion.h2>

          <motion.p
            className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Experience the future of video editing with our cutting-edge
            approach that combines innovative technology with creative
            excellence.
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Interactive Cards - Updated colors */}
          <div className="space-y-6">
            {points.map((point, index) => (
              <motion.div
                key={point.id}
                className={`group relative p-8 rounded-3xl cursor-pointer transition-all duration-500 ${
                  activePoint === index
                    ? `bg-${colorVariants[point.color].primary}/10 border-${
                        colorVariants[point.color].primary
                      }/50 shadow-lg shadow-${
                        colorVariants[point.color].primary
                      }/20`
                    : "bg-gray-900/20 border-gray-700/30 hover:bg-gray-800/30"
                } border-2 backdrop-blur-xl`}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                onClick={() => handleCardClick(index)}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Active Indicator */}
                {activePoint === index && (
                  <motion.div
                    className={`absolute inset-0 rounded-3xl bg-${
                      colorVariants[point.color].primary
                    }/10 blur-xl`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    layoutId="activeIndicator"
                  />
                )}

                <div className="relative z-10 flex items-start space-x-6">
                  {/* Icon */}
                  <motion.div
                    className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl ${
                      activePoint === index
                        ? "bg-cyan-400 text-black"
                        : "bg-gray-800/50 text-gray-400"
                    }`}
                    whileHover={{ rotate: 5 }}
                  >
                    {point.icon}
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3
                      className={`text-2xl font-bold mb-3 ${
                        activePoint === index ? "text-white" : "text-gray-200"
                      }`}
                    >
                      {point.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {point.description}
                    </p>

                    {/* Features - Updated colors */}
                    {activePoint === index && (
                      <motion.div
                        className="flex flex-wrap gap-2 mt-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {index === 0 && (
                          <>
                            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm border border-cyan-500/30">
                              Streamlined
                            </span>
                            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm border border-cyan-500/30">
                              48h Delivery
                            </span>
                          </>
                        )}
                        {index === 1 && (
                          <>
                            <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30">
                              Real-Time Updates
                            </span>
                            <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30">
                              Unlimited Revisions
                            </span>
                          </>
                        )}
                        {index === 2 && (
                          <>
                            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm border border-cyan-500/30">
                              Style Matching
                            </span>
                            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm border border-cyan-500/30">
                              Brand Consistency
                            </span>
                          </>
                        )}
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column - Visual Display - Updated colors */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* Main Image Container */}
            <div className="relative rounded-3xl overflow-hidden border border-cyan-500/30 shadow-2xl shadow-cyan-500/10">
              <motion.div
                className="aspect-video rounded-3xl overflow-hidden"
                animate={{
                  boxShadow: [
                    `0 20px 40px rgba(34, 211, 238, 0.15)`,
                    `0 25px 50px rgba(192, 132, 252, 0.2)`,
                    `0 20px 40px rgba(34, 211, 238, 0.15)`,
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <motion.img
                  src={images[activePoint]}
                  alt={points[activePoint].title}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7 }}
                  key={activePoint}
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </motion.div>

              {/* Floating Badges - Updated colors */}
              <motion.div
                className="absolute top-6 right-6 bg-cyan-500/10 backdrop-blur-md rounded-2xl px-4 py-2 border border-cyan-500/30"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                  <span className="text-cyan-300 text-sm font-medium font-mono">
                    Live Demo
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-6 left-6 bg-purple-500/10 backdrop-blur-md rounded-2xl px-4 py-2 border border-purple-500/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-purple-300 text-sm font-medium font-mono">
                    Quality Analysis
                  </span>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                </div>
              </motion.div>
            </div>

            {/* Progress Dots - Updated colors */}
            <div className="flex justify-center mt-8 space-x-3">
              {points.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActivePoint(index)}
                  className={`relative rounded-full p-1 transition-all duration-300 ${
                    activePoint === index ? "scale-110" : "hover:scale-105"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activePoint === index
                        ? `bg-${colorVariants[points[index].color].primary}`
                        : "bg-gray-600"
                    }`}
                  />
                </motion.button>
              ))}
            </div>

            {/* Image Caption - Added from second component */}
            <motion.div
              className="text-center mt-4 p-3 bg-black/50 backdrop-blur-sm rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-cyan-300 font-semibold">
                {points[activePoint].title}
              </p>
              <p className="text-gray-300 text-sm mt-1">
                {points[activePoint].description}
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Section - Updated colors */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {[
            {
              number: "97%",
              label: "Client Satisfaction",
              suffix: "+",
              color: "cyan",
            },
            {
              number: "48",
              label: "Hour Delivery",
              suffix: "h",
              color: "purple",
            },
            {
              number: "∞",
              label: "Revisions Included",
              suffix: "",
              color: "cyan",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className={`text-center p-8 rounded-3xl bg-gray-900/20 backdrop-blur-lg border border-${stat.color}-500/20 hover:border-${stat.color}-500/40 transition-all duration-300`}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className={`text-5xl font-bold text-${stat.color}-400 mb-2`}>
                {stat.number}
                <span className="text-2xl">{stat.suffix}</span>
              </div>
              <div className="text-gray-300 font-medium">{stat.label}</div>
              <div className="text-gray-400 text-sm mt-1">
                {index === 0 && "Based on 250+ projects"}
                {index === 1 && "Express options available"}
                {index === 2 && "Until you're 100% satisfied"}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyWorkWithUs;
