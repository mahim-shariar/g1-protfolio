import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getReviews } from "../services/api"; // Adjust the import path as needed

const WhyChooseUs = () => {
  const canvasRef = useRef(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch reviews from API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await getReviews();

        if (response.status === "success" && response.data?.reviews) {
          setReviews(response.data.reviews);
        } else {
          setError("Failed to load reviews");
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Error loading reviews. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Process reviews data for display
  const processedReviews = reviews.map((review, index) => ({
    id: review._id || index,
    text: review.content,
    author: review.userName,
    role: review.user?.name || "Client",
    initials: review.userName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2),
    screenshot: review.screenshot,
    rating: review.rating,
    isBest: review.isBest,
    createdAt: review.createdAt,
  }));

  // Double the testimonials for seamless looping
  const doubledTestimonials = [...processedReviews];

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

  // Star rating component
  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center space-x-1 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-lg ${
              star <= rating ? "text-yellow-400" : "text-gray-600"
            }`}
          >
            ★
          </span>
        ))}
        <span className="text-sm text-gray-400 ml-2">({rating}/5)</span>
      </div>
    );
  };

  // No Screenshot Placeholder Component
  const NoScreenshotPlaceholder = () => {
    return (
      <div className="w-full h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg border border-gray-400/30 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gray-400/30"></div>
          <div className="absolute top-1/3 left-0 w-full h-px bg-gray-400/30"></div>
          <div className="absolute top-2/3 left-0 w-full h-px bg-gray-400/30"></div>
          <div className="absolute top-0 left-0 h-full w-px bg-gray-400/30"></div>
          <div className="absolute top-0 left-1/3 h-full w-px bg-gray-400/30"></div>
          <div className="absolute top-0 left-2/3 h-full w-px bg-gray-400/30"></div>
        </div>

        {/* Camera icon */}
        <div className="relative z-10 text-gray-600 mb-2">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 4h3l2-2h6l2 2h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm8 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
          </svg>
        </div>

        {/* Text */}
        <div className="relative z-10 text-center">
          <p className="text-gray-600 text-sm font-medium">No Screenshot</p>
          <p className="text-gray-500 text-xs">Available</p>
        </div>

        {/* Subtle shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-[-100%] animate-shine"></div>
      </div>
    );
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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

              {/* Placeholder for feature visualization */}
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

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
              <p className="text-gray-400 mt-4">Loading reviews...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-400">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : processedReviews.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400">
                No reviews yet. Be the first to share your experience!
              </p>
            </div>
          ) : (
            <>
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
                      <div
                        className={`bg-black/30 backdrop-blur-sm p-6 rounded-xl border transition-all duration-300 h-full ${
                          testimonial.isBest
                            ? "border-yellow-500/50 shadow-lg shadow-yellow-500/20"
                            : "border-white/10 hover:border-cyan-500/30"
                        }`}
                      >
                        {/* Featured Badge */}
                        {testimonial.isBest && (
                          <div className="flex items-center mb-3">
                            <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                              ⭐ Featured Review
                            </span>
                          </div>
                        )}

                        {/* Star Rating */}
                        <StarRating rating={testimonial.rating} />

                        {/* Review Text */}
                        <div className="text-cyan-400 text-4xl mb-4">"</div>
                        <p className="text-gray-300 mb-4 line-clamp-4">
                          {testimonial.text}
                        </p>

                        {/* Screenshot or Placeholder */}
                        <div className="mb-4">
                          {testimonial.screenshot ? (
                            <img
                              src={testimonial.screenshot}
                              alt="Review screenshot"
                              className="w-full h-32 object-cover rounded-lg border border-white/10"
                              loading="lazy"
                            />
                          ) : (
                            <NoScreenshotPlaceholder />
                          )}
                        </div>

                        {/* Author Info */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-cyan-900/50 flex items-center justify-center text-cyan-400 font-bold mr-3">
                              {testimonial.initials}
                            </div>
                            <div>
                              <div className="text-white font-medium">
                                {testimonial.author}
                              </div>
                            </div>
                          </div>

                          {/* Date */}
                          {testimonial.createdAt && (
                            <div className="text-gray-500 text-xs text-right">
                              {formatDate(testimonial.createdAt)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Reviews Summary */}
              <div className="mt-8 text-center">
                <p className="text-gray-400">
                  Showing {processedReviews.length} verified review
                  {processedReviews.length !== 1 ? "s" : ""}
                </p>
              </div>
            </>
          )}
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

      {/* Add custom animation for the shine effect */}
      <style jsx>{`
        @keyframes shine {
          0% {
            transform: skewX(-12deg) translateX(-100%);
          }
          100% {
            transform: skewX(-12deg) translateX(200%);
          }
        }
        .animate-shine {
          animation: shine 3s infinite;
        }
      `}</style>
    </div>
  );
};

export default WhyChooseUs;
