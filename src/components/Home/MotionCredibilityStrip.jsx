import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useAnimation,
  AnimatePresence,
} from "framer-motion";
import { getStatistics, getActiveStatistics } from "../../services/api";
import SectionHeader from "../Shared/SectionHeader";

const MotionCredibilityStrip = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const canvasRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const [statistics, setStatistics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Video Reviews State
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Video reviews data - EXACTLY as you provided
  const videoReviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Content Creator",
      company: "Beauty Vlog",
      videoThumbnail:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=600&h=400&fit=crop",
      review:
        "I was amazed by how quickly they turned around my weekly vlog. The editing was so professional and they perfectly captured my brand's aesthetic. The color grading made my footage look cinematic!",
      rating: 5,
      stats: "3x faster delivery than my previous editor",
      duration: "2:34",
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "Marketing Director",
      company: "TechStart Inc",
      videoThumbnail:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=400&fit=crop",
      review:
        "Our product launch video needed to be perfect, and they delivered beyond expectations. The attention to detail in the motion graphics and sound design was exceptional. Our engagement rates skyrocketed!",
      rating: 5,
      stats: "215% increase in engagement",
      duration: "1:45",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Documentary Filmmaker",
      company: "Independent Films",
      videoThumbnail:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=400&fit=crop",
      review:
        "As a documentary filmmaker, storytelling is everything. They understood my vision completely and helped me craft a narrative that moved my audience. The pacing and emotional impact were perfect.",
      rating: 5,
      stats: "Film festival selection",
      duration: "3:12",
    },
  ];

  // Fetch statistics data
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        const response = await getActiveStatistics();
        setStatistics(response.data?.statistics || []);
      } catch (err) {
        console.error("Error fetching statistics:", err);
        setError("Failed to load statistics");
        // Fallback to default statistics if API fails
        setStatistics([
          { value: "500+", title: "Videos Delivered" },
          { value: "40+", title: "Trusted Brands" },
          { value: "3+", title: "Years Experience" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Auto-advance video reviews - EXACTLY as you provided
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentReviewIndex((prev) => (prev + 1) % videoReviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [videoReviews.length]);

  // Navigation functions - EXACTLY as you provided
  const nextReview = () => {
    setDirection(1);
    setCurrentReviewIndex((prev) => (prev + 1) % videoReviews.length);
  };

  const prevReview = () => {
    setDirection(-1);
    setCurrentReviewIndex(
      (prev) => (prev - 1 + videoReviews.length) % videoReviews.length
    );
  };

  // Slide variants for smooth transitions - EXACTLY as you provided
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  const slideTransition = {
    x: { type: "spring", stiffness: 300, damping: 30 },
    opacity: { duration: 0.2 },
  };

  // Star rating component - EXACTLY as you provided
  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-lg ${
              star <= rating ? "text-yellow-400" : "text-gray-400"
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  // Particle background effect - EXACTLY as you provided
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

    // Create particles
    const particles = [];
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.3 + 0.1, // Lower opacity for light background
        direction: Math.random() * Math.PI * 2,
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connecting lines - very subtle for light background
      ctx.strokeStyle = "rgba(20, 184, 166, 0.03)";
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(20, 184, 166, ${particle.opacity})`;
        ctx.fill();

        // Move particles
        particle.x += Math.cos(particle.direction) * particle.speed;
        particle.y += Math.sin(particle.direction) * particle.speed;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    animationFrameId = requestAnimationFrame(drawParticles);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // Find specific statistics by title
  const getStatisticByTitle = (title) => {
    return statistics.find((stat) =>
      stat.title.toLowerCase().includes(title.toLowerCase())
    );
  };

  // Get values for specific statistics
  const getVideosValue = () => {
    const projectStat = getStatisticByTitle("project");
    return projectStat ? `${projectStat.value}+` : "500+";
  };

  const getBrandsValue = () => {
    const brandStat = getStatisticByTitle("brand");
    return brandStat ? `${brandStat.value}+` : "40+";
  };

  const getYearsValue = () => {
    const yearStat = getStatisticByTitle("year");
    return yearStat ? `${yearStat.value}+` : "3+";
  };

  // Prepare scrolling items - use default titles with API values
  const scrollingItems = [
    {
      id: 1,
      value: getVideosValue(),
      title: "Videos Delivered",
      type: "number",
    },
    {
      id: 2,
      value: getBrandsValue(),
      title: "Trusted Brands",
      type: "number",
    },
    {
      id: 3,
      value: getYearsValue(),
      title: "Years Experience",
      type: "number",
    },
  ];

  // Video Review Component - EXACTLY as you provided but integrated
  const VideoReviewSection = () => {
    const currentReview = videoReviews[currentReviewIndex];

    return (
      <div className="mb-20">
        <div className="max-w-6xl mx-auto">
          {/* Card Container */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-2xl overflow-hidden relative">
            {/* Navigation Buttons */}
            <div className="absolute top-1/2 left-4 right-4 transform -translate-y-1/2 flex justify-between z-10">
              {/* Previous Button */}
              <button
                onClick={prevReview}
                className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 border border-gray-200"
              >
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Next Button */}
              <button
                onClick={nextReview}
                className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 border border-gray-200"
              >
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
              {/* Video Section */}
              <div className="relative p-8 bg-gradient-to-br from-gray-50 to-white">
                {/* Video Container */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl h-64 lg:h-80 bg-gray-200">
                  {/* Animated Thumbnail with Slide Transition */}
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.img
                      key={currentReview.id}
                      src={currentReview.videoThumbnail}
                      alt="Video review thumbnail"
                      className="absolute inset-0 w-full h-full object-cover"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={slideTransition}
                    />
                  </AnimatePresence>

                  {/* Play Button */}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <button className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform duration-300">
                      <svg
                        className="w-6 h-6 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>

                  {/* Video Duration */}
                  <div className="absolute bottom-4 right-4 bg-black/80 text-white px-2 py-1 rounded text-sm">
                    {currentReview.duration}
                  </div>
                </div>

                {/* Client Info with Slide Transition */}
                <div className="mt-6 text-center h-24">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentReview.id}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={slideTransition}
                    >
                      <h3 className="text-xl font-bold text-gray-900">
                        {currentReview.name}
                      </h3>
                      <p className="text-teal-600 font-medium">
                        {currentReview.role}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {currentReview.company}
                      </p>
                      <div className="mt-2 flex justify-center">
                        <StarRating rating={currentReview.rating} />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Review Text Section */}
              <div className="p-8 flex flex-col justify-center">
                <div className="mb-6">
                  <div className="text-teal-500 text-6xl mb-4">"</div>

                  {/* Review Text with Slide Transition */}
                  <div className="h-48 overflow-hidden">
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.p
                        key={currentReview.id}
                        className="text-gray-700 text-lg leading-relaxed"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={slideTransition}
                      >
                        {currentReview.review}
                      </motion.p>
                    </AnimatePresence>
                  </div>

                  {/* Stats Badge with Slide Transition */}
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentReview.stats}
                      className="bg-teal-50 inline-flex items-center px-4 py-2 rounded-full mt-4"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={slideTransition}
                    >
                      <span className="text-teal-700 font-semibold text-sm">
                        🎯 {currentReview.stats}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation Dots and Counter */}
                <div className="flex items-center justify-between mt-8">
                  <div className="flex items-center space-x-3">
                    {videoReviews.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          const newDirection =
                            index > currentReviewIndex ? 1 : -1;
                          setDirection(newDirection);
                          setCurrentReviewIndex(index);
                        }}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentReviewIndex
                            ? "bg-teal-500 scale-125"
                            : "bg-gray-300 hover:bg-gray-400"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="text-gray-500 text-sm">
                    {currentReviewIndex + 1} of {videoReviews.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.section
      ref={ref}
      className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-white to-gray-50"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: 0.8,
            ease: "easeOut",
          },
        },
      }}
    >
      {/* Animated particle background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-50"
      />

      {/* Glowing orbs with light colors */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-100 rounded-full blur-3xl animate-pulse-slow"></div>
      <div
        className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-emerald-100 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute top-2/3 left-1/3 w-64 h-64 bg-green-100 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "4s" }}
      ></div>

      {/* Subtle vignette effect */}
      <div className="absolute inset-0 shadow-[inset_0_0_100px_20px_rgba(255,255,255,0.5)]"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <SectionHeader
          subtitle="What Our Clients Say"
          title="Trusted by Creators"
          highlight="Worldwide"
          description="Delivering exceptional video editing results that transform content
            and drive engagement"
          center={true}
          titleSize="2xl"
          titleWeight="normal"
          descriptionSize="lg"
          highlightColor="teal-500"
          lineSpacing="tight"
          dotColor="teal-500"
        />

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full"
            />
            <span className="ml-3 text-gray-600">Loading statistics...</span>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-8">
            <p className="text-amber-600">{error}</p>
          </div>
        )}

        {/* Video Reviews Section - EXACTLY as you provided */}
        <VideoReviewSection />

        {/* Scrolling Credibility Strip */}
        <div className="relative overflow-hidden py-8 border-y border-teal-200 bg-gradient-to-r from-teal-50 to-emerald-50 backdrop-blur-sm">
          {/* Glowing edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>

          {/* Subtle pulse effect on the strip */}
          <div className="absolute inset-0 bg-teal-200/30 opacity-0 hover:opacity-100 transition-opacity duration-1000"></div>

          <motion.div
            className="flex whitespace-nowrap"
            animate={{
              x: [0, -1000],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 35,
                ease: "linear",
              },
            }}
          >
            {/* First set */}
            <div className="flex items-center">
              {scrollingItems.map((item, index) => (
                <div
                  key={`first-${item.id}`}
                  className="mx-10 flex items-center"
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      index === 0
                        ? "bg-teal-500 shadow-lg shadow-teal-500/30"
                        : index === 1
                        ? "bg-emerald-500 shadow-lg shadow-emerald-500/30"
                        : "bg-green-500 shadow-lg shadow-green-500/30"
                    } mr-4`}
                  ></div>
                  <span className="text-gray-700 text-lg md:text-xl font-medium tracking-wide">
                    <span className="text-teal-600 font-bold">
                      {item.value}
                    </span>{" "}
                    {item.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Duplicate set for seamless looping */}
            <div className="flex items-center">
              {scrollingItems.map((item, index) => (
                <div
                  key={`second-${item.id}`}
                  className="mx-10 flex items-center"
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      index === 0
                        ? "bg-teal-500 shadow-lg shadow-teal-500/30"
                        : index === 1
                        ? "bg-emerald-500 shadow-lg shadow-emerald-500/30"
                        : "bg-green-500 shadow-lg shadow-green-500/30"
                    } mr-4`}
                  ></div>
                  <span className="text-gray-700 text-lg md:text-xl font-medium tracking-wide">
                    <span className="text-teal-600 font-bold">
                      {item.value}
                    </span>{" "}
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
              },
            },
          }}
        >
          {/* Stat 1 - Videos Delivered */}
          <motion.div
            className="text-center p-8 bg-white rounded-2xl border border-teal-100 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: "easeOut",
                },
              },
            }}
            whileHover={{
              y: -5,
              borderColor: "rgba(20, 184, 166, 0.3)",
              transition: { duration: 0.3 },
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="text-5xl font-bold text-teal-600 mb-2">
                {getVideosValue()}
              </div>
              <div className="text-gray-600 font-light tracking-wide">
                Videos Delivered
              </div>
            </div>
          </motion.div>

          {/* Stat 2 - Trusted Brands */}
          <motion.div
            className="text-center p-8 bg-white rounded-2xl border border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: "easeOut",
                  delay: 0.1,
                },
              },
            }}
            whileHover={{
              y: -5,
              borderColor: "rgba(16, 185, 129, 0.3)",
              transition: { duration: 0.3 },
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="text-5xl font-bold text-emerald-600 mb-2">
                {getBrandsValue()}
              </div>
              <div className="text-gray-600 font-light tracking-wide">
                Trusted Brands
              </div>
            </div>
          </motion.div>

          {/* Stat 3 - Years Experience */}
          <motion.div
            className="text-center p-8 bg-white rounded-2xl border border-green-100 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: "easeOut",
                  delay: 0.2,
                },
              },
            }}
            whileHover={{
              y: -5,
              borderColor: "rgba(34, 197, 94, 0.3)",
              transition: { duration: 0.3 },
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="text-5xl font-bold text-green-600 mb-2">
                {getYearsValue()}
              </div>
              <div className="text-gray-600 font-light tracking-wide">
                Years Experience
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Add to your global CSS or style tag */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </motion.section>
  );
};

export default MotionCredibilityStrip;
