import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  const canvasRef = useRef(null);
  const [activeFeature, setActiveFeature] = useState(0);

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      text: "Their editing transformed our content completely. The cinematic quality and attention to detail exceeded our expectations.",
      author: "John Carter",
      role: "Creative Director, Vision Studios",
      initials: "JC",
    },
    {
      id: 2,
      text: "The turnaround time was incredible without sacrificing quality. They understood our brand vision perfectly from day one.",
      author: "Sarah Johnson",
      role: "Marketing Director, TechVision",
      initials: "SJ",
    },
    {
      id: 3,
      text: "Working with this team elevated our video content to a professional level. Their color grading expertise is unmatched.",
      author: "Michael Chen",
      role: "Content Creator, Digital Waves",
      initials: "MC",
    },
    {
      id: 4,
      text: "The motion graphics and visual effects added so much value to our product launch video. Absolutely stunning work!",
      author: "Emma Rodriguez",
      role: "Product Manager, InnovateCo",
      initials: "ER",
    },
    {
      id: 5,
      text: "Their creative input took our documentary to the next level. The storytelling and pacing were absolutely perfect.",
      author: "David Wilson",
      role: "Director, True Stories Films",
      initials: "DW",
    },
    {
      id: 6,
      text: "The team's responsiveness and ability to incorporate feedback made the collaboration seamless and enjoyable.",
      author: "Lisa Thompson",
      role: "Brand Manager, StyleCo",
      initials: "LT",
    },
  ];

  // Double the testimonials for seamless looping
  const doubledTestimonials = [...testimonials, ...testimonials];

  // Background grid animation (same as HeroSection)
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

  // Features data
  const features = [
    {
      title: "Cinematic Excellence",
      description:
        "We transform raw footage into cinematic masterpieces with professional color grading, seamless transitions, and Hollywood-level storytelling techniques.",
      icon: "🎬",
      stats: "98% Client Satisfaction",
    },
    {
      title: "Cutting-Edge Technology",
      description:
        "Utilizing the latest editing software and AI-powered tools to deliver stunning visual effects, 8K resolution editing, and immersive audio experiences.",
      icon: "🚀",
      stats: "4K/8K Ready",
    },
    {
      title: "Rapid Turnaround",
      description:
        "Our streamlined workflow and dedicated team ensure your projects are delivered on time without compromising quality, even with tight deadlines.",
      icon: "⏱️",
      stats: "40% Faster Delivery",
    },
    {
      title: "Creative Collaboration",
      description:
        "We work closely with you throughout the process, incorporating your vision while adding our professional expertise to elevate your content.",
      icon: "🤝",
      stats: "Unlimited Revisions",
    },
  ];

  const stats = [
    { value: "500+", label: "Projects Completed" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "24/7", label: "Support Available" },
    { value: "48h", label: "Avg. Delivery Time" },
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
            Why Choose Us
          </motion.h2>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            variants={itemVariants}
          >
            The Next Generation of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Video Editing
            </span>
          </motion.h1>

          <motion.p
            className="text-lg text-gray-300 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            We combine artistic vision with technical expertise to create videos
            that captivate audiences and deliver results.
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
            >
              <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Features Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Feature List */}
          <div>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`p-6 mb-6 rounded-xl cursor-pointer transition-all duration-300 ${
                  activeFeature === index
                    ? "bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border-l-4 border-cyan-400"
                    : "bg-black/20 border-l-4 border-transparent hover:bg-black/30"
                }`}
                onClick={() => setActiveFeature(index)}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ x: 10 }}
              >
                <div className="flex items-start">
                  <span className="text-2xl mr-4">{feature.icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 mb-3">{feature.description}</p>
                    <div className="text-cyan-400 text-sm font-mono">
                      {feature.stats}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Feature Visual */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            key={activeFeature}
          >
            <div className="relative w-full h-96 lg:h-full rounded-xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>

              {/* Placeholder for feature visualization - would be replaced with actual graphics */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-7xl text-cyan-400/30">
                  {features[activeFeature].icon}
                </div>
              </div>

              <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 rounded text-sm font-mono z-20 backdrop-blur-sm text-cyan-300">
                {features[activeFeature].title
                  .toUpperCase()
                  .replace(/\s/g, "_")}
                .MP4
              </div>

              <div className="absolute top-4 right-4 flex gap-2 z-20">
                <span className="w-3 h-3 rounded-full bg-cyan-500 shadow-lg shadow-cyan-900/50"></span>
                <span className="w-3 h-3 rounded-full bg-cyan-400 shadow-lg shadow-cyan-800/50"></span>
                <span className="w-3 h-3 rounded-full bg-cyan-300 shadow-lg shadow-cyan-700/50"></span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Testimonials Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-white text-center mb-10">
            What Our Clients Say
          </h2>

          {/* Marquee Container */}
          <div className="relative overflow-hidden">
            {/* Gradient overlays for the edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

            {/* Marquee */}
            <motion.div
              className="flex"
              animate={{
                x: [0, -1000],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                },
              }}
            >
              {doubledTestimonials.map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${index}`}
                  className="flex-shrink-0 w-80 mx-3"
                >
                  <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-cyan-500/30 transition-all duration-300 h-full">
                    <div className="text-cyan-400 text-4xl mb-4">"</div>
                    <p className="text-gray-300 mb-4">{testimonial.text}</p>
                    <div className="flex items-center mt-4">
                      <div className="w-10 h-10 rounded-full bg-cyan-900/50 flex items-center justify-center text-cyan-400 font-bold mr-3">
                        {testimonial.initials}
                      </div>
                      <div>
                        <div className="text-white font-medium">
                          {testimonial.author}
                        </div>
                        <div className="text-cyan-400 text-sm">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center bg-black/30 backdrop-blur-sm p-10 rounded-2xl border border-cyan-500/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          variants={glowVariants}
          animate="pulse"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Elevate Your Content?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who have transformed their vision
            into captivating visual stories with our editing expertise.
          </p>

          <motion.button
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-full relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Start Your Project Today</span>
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
          • CINEMATIC EDITING • COLOR GRADING • MOTION GRAPHICS • VISUAL EFFECTS
          • 4K/8K EDITING • DRONE FOOTAGE • SOUND DESIGN • CINEMATIC SEQUENCES •
          AI-ENHANCED WORKFLOWS • PREMIERE PRO • AFTER EFFECTS • DAVINCI RESOLVE
          •
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WhyChooseUs;
