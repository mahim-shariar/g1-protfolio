import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { getActiveStatistics, getVideoReviews } from "../../services/api";
import SectionHeader from "../Shared/SectionHeader";

const MotionCredibilityStrip = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const canvasRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 }); // Reduced amount for mobile

  const [statistics, setStatistics] = useState([]);
  const [videoReviews, setVideoReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Video Reviews State
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

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

  // Fetch video reviews from API
  useEffect(() => {
    const fetchVideoReviews = async () => {
      try {
        setReviewsLoading(true);
        const response = await getVideoReviews();

        const transformedReviews =
          response.data?.reviews?.map((review, index) => ({
            id: review._id || review.id || index,
            name: review.userName,
            role: review.user?.role || "Client",
            company: review.user?.company || "Satisfied Client",
            videoThumbnail: getVideoThumbnail(review.video),
            review: review.content,
            rating: review.rating,
            stats: getPerformanceStats(review.rating),
            duration: getVideoDuration(review.video),
            videoUrl: review.video,
            isBest: review.isBest,
            user: review.user,
          })) || [];

        setVideoReviews(transformedReviews);
      } catch (err) {
        console.error("Error fetching video reviews:", err);
        setVideoReviews(getFallbackReviews());
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchVideoReviews();
  }, []);

  // Helper functions
  const getVideoThumbnail = (videoUrl) => {
    if (!videoUrl) return getDefaultThumbnail();
    if (videoUrl.includes("cloudinary.com")) {
      return videoUrl.replace(
        "/upload/",
        "/upload/w_600,h_400,c_fill,q_auto,f_auto/"
      );
    }
    return getDefaultThumbnail();
  };

  const getVideoDuration = (videoUrl) => {
    const durations = ["1:45", "2:30", "3:15", "4:20", "2:50"];
    return durations[Math.floor(Math.random() * durations.length)];
  };

  const getDefaultThumbnail = () => {
    const thumbnails = [
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=600&h=400&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=400&fit=crop",
    ];
    return thumbnails[Math.floor(Math.random() * thumbnails.length)];
  };

  const getPerformanceStats = (rating) => {
    const stats = {
      1: "Quality work delivered",
      2: "Good results achieved",
      3: "Great engagement boost",
      4: "Excellent editing quality",
      5: "Exceptional service delivery",
    };
    return stats[rating] || "Professional service delivered";
  };

  const getFallbackReviews = () => [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Content Creator",
      company: "Beauty Vlog",
      videoThumbnail:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=600&h=400&fit=crop",
      review:
        "I was amazed by how quickly they turned around my weekly vlog. The editing was so professional and they perfectly captured my brand's aesthetic.",
      rating: 5,
      stats: "3x faster delivery than my previous editor",
      duration: "2:34",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      isBest: true,
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "Marketing Director",
      company: "TechStart Inc",
      videoThumbnail:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=400&fit=crop",
      review:
        "Our product launch video needed to be perfect, and they delivered beyond expectations. The attention to detail was exceptional.",
      rating: 5,
      stats: "215% increase in engagement",
      duration: "1:45",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      isBest: false,
    },
  ];

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Navigation functions
  const nextReview = () => {
    if (videoReviews.length === 0) return;
    setCurrentReviewIndex((prev) => (prev + 1) % videoReviews.length);
  };

  const prevReview = () => {
    if (videoReviews.length === 0) return;
    setCurrentReviewIndex(
      (prev) => (prev - 1 + videoReviews.length) % videoReviews.length
    );
  };

  // Star rating component
  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-sm md:text-lg ${
              star <= rating ? "text-yellow-400" : "text-gray-400"
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  // Simple Video Player Component
  const VideoPlayer = ({ videoUrl, thumbnail }) => {
    return (
      <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-2xl h-48 sm:h-56 md:h-64 lg:h-80 bg-black">
        {/* Default HTML5 Video Player */}
        <video
          className="w-full h-full object-cover"
          poster={thumbnail}
          controls
          controlsList="nodownload"
          preload="metadata"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Best Review Badge */}
        {videoReviews[currentReviewIndex]?.isBest && (
          <div className="absolute top-2 md:top-4 left-2 md:left-4 bg-yellow-500 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium z-10">
            ⭐ Featured
          </div>
        )}
      </div>
    );
  };

  // Video Review Component
  const VideoReviewSection = () => {
    if (reviewsLoading) {
      return (
        <div className="mb-12 md:mb-20 text-center py-8 md:py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full mx-auto"
          />
          <span className="ml-3 text-gray-600 text-sm md:text-base">
            Loading video reviews...
          </span>
        </div>
      );
    }

    if (videoReviews.length === 0) {
      return (
        <div className="mb-12 md:mb-20 text-center py-8 md:py-12">
          <div className="text-gray-500 text-sm md:text-base">
            No video reviews available yet
          </div>
          <p className="text-xs md:text-sm text-gray-400 mt-1 md:mt-2">
            Check back later for client video testimonials
          </p>
        </div>
      );
    }

    const currentReview = videoReviews[currentReviewIndex];

    return (
      <div className="mb-12 md:mb-20">
        <div className="max-w-6xl mx-auto px-2 sm:px-4">
          {/* Card Container */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl border border-gray-200 shadow-xl md:shadow-2xl overflow-hidden relative">
            {/* Navigation Buttons - Only show if multiple reviews */}
            {videoReviews.length > 1 && (
              <>
                {/* Mobile Navigation - Bottom */}
                <div className="block md:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center space-x-4 z-10">
                  <button
                    onClick={prevReview}
                    className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 border border-gray-200"
                  >
                    <svg
                      className="w-5 h-5 text-gray-700"
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

                  <button
                    onClick={nextReview}
                    className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 border border-gray-200"
                  >
                    <svg
                      className="w-5 h-5 text-gray-700"
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

                {/* Desktop Navigation - Sides */}
                <div className="hidden md:flex absolute top-1/2 left-4 right-4 transform -translate-y-1/2 justify-between z-10">
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
              </>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px] md:min-h-[500px]">
              {/* Video Section */}
              <div className="relative p-4 md:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white">
                {/* Video Container with Default Player */}
                <VideoPlayer
                  videoUrl={currentReview.videoUrl}
                  thumbnail={currentReview.videoThumbnail}
                />

                {/* Client Info */}
                <div className="mt-4 md:mt-6 text-center">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900">
                    {currentReview.name}
                  </h3>
                  <p className="text-teal-600 font-medium text-sm md:text-base">
                    {currentReview.role}
                  </p>
                  <p className="text-gray-500 text-xs md:text-sm">
                    {currentReview.company}
                  </p>
                  <div className="mt-2 flex justify-center">
                    <StarRating rating={currentReview.rating} />
                  </div>
                </div>
              </div>

              {/* Review Text Section */}
              <div className="p-4 md:p-6 lg:p-8 flex flex-col justify-center">
                <div className="mb-4 md:mb-6">
                  <div className="text-teal-500 text-4xl md:text-6xl mb-2 md:mb-4">
                    "
                  </div>

                  {/* Review Text */}
                  <div className="h-32 md:h-48 overflow-y-auto">
                    <p className="text-gray-700 text-sm md:text-lg leading-relaxed">
                      {currentReview.review}
                    </p>
                  </div>

                  {/* Stats Badge */}
                  <div className="bg-teal-50 inline-flex items-center px-3 md:px-4 py-1 md:py-2 rounded-full mt-3 md:mt-4">
                    <span className="text-teal-700 font-semibold text-xs md:text-sm">
                      🎯 {currentReview.stats}
                    </span>
                  </div>
                </div>

                {/* Navigation Dots and Counter - Only show if multiple reviews */}
                {videoReviews.length > 1 && (
                  <div className="flex items-center justify-between mt-4 md:mt-8">
                    <div className="flex items-center space-x-2 md:space-x-3">
                      {videoReviews.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentReviewIndex(index)}
                          className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                            index === currentReviewIndex
                              ? "bg-teal-500 scale-125"
                              : "bg-gray-300 hover:bg-gray-400"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="text-gray-500 text-xs md:text-sm">
                      {currentReviewIndex + 1} of {videoReviews.length}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

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

  // Prepare scrolling items
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

  // Particle background effect
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

    // Create particles - reduced count for mobile
    const particles = [];
    const particleCount = window.innerWidth < 768 ? 40 : 80;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.3 + 0.1,
        direction: Math.random() * Math.PI * 2,
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connecting lines
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

  return (
    <motion.section
      ref={ref}
      className="relative py-12 md:py-20 lg:py-24 overflow-hidden bg-gradient-to-br from-white to-gray-50"
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
        className="absolute inset-0 w-full h-full opacity-30 md:opacity-50"
      />

      {/* Glowing orbs with light colors - Reduced size for mobile */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-teal-100 rounded-full blur-2xl md:blur-3xl animate-pulse-slow"></div>
      <div
        className="absolute bottom-1/3 right-1/3 w-40 h-40 md:w-80 md:h-80 bg-emerald-100 rounded-full blur-2xl md:blur-3xl animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute top-2/3 left-1/3 w-32 h-32 md:w-64 md:h-64 bg-green-100 rounded-full blur-2xl md:blur-3xl animate-pulse-slow"
        style={{ animationDelay: "4s" }}
      ></div>

      {/* Subtle vignette effect */}
      <div className="absolute inset-0 shadow-[inset_0_0_50px_10px_rgba(255,255,255,0.5)] md:shadow-[inset_0_0_100px_20px_rgba(255,255,255,0.5)]"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <SectionHeader
          subtitle="What Our Clients Say"
          title="Trusted by Creators"
          highlight="Worldwide"
          description="Delivering exceptional video editing results that transform content and drive engagement"
          center={true}
          titleSize="xl"
          titleWeight="normal"
          descriptionSize="base md:lg"
          highlightColor="teal-500"
          lineSpacing="tight"
          dotColor="teal-500"
        />

        {/* Video Reviews Section */}
        <VideoReviewSection />

        {/* Loading State for Statistics */}
        {loading && (
          <div className="flex justify-center items-center py-6 md:py-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full"
            />
            <span className="ml-2 text-gray-600 text-sm md:text-base">
              Loading statistics...
            </span>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-6 md:py-8">
            <p className="text-amber-600 text-sm md:text-base">{error}</p>
          </div>
        )}

        {/* Scrolling Credibility Strip */}
        {!loading && (
          <div className="relative overflow-hidden py-6 md:py-8 border-y border-teal-200 bg-gradient-to-r from-teal-50 to-emerald-50 backdrop-blur-sm">
            {/* Glowing edges */}
            <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-white to-transparent z-10"></div>

            <motion.div
              className="flex whitespace-nowrap"
              animate={{
                x: [0, -800],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: window.innerWidth < 768 ? 25 : 35,
                  ease: "linear",
                },
              }}
            >
              {/* First set */}
              <div className="flex items-center">
                {scrollingItems.map((item, index) => (
                  <div
                    key={`first-${item.id}`}
                    className="mx-6 md:mx-10 flex items-center"
                  >
                    <div
                      className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
                        index === 0
                          ? "bg-teal-500 shadow-lg shadow-teal-500/30"
                          : index === 1
                          ? "bg-emerald-500 shadow-lg shadow-emerald-500/30"
                          : "bg-green-500 shadow-lg shadow-green-500/30"
                      } mr-3 md:mr-4`}
                    ></div>
                    <span className="text-gray-700 text-sm md:text-lg lg:text-xl font-medium tracking-wide">
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
                    className="mx-6 md:mx-10 flex items-center"
                  >
                    <div
                      className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
                        index === 0
                          ? "bg-teal-500 shadow-lg shadow-teal-500/30"
                          : index === 1
                          ? "bg-emerald-500 shadow-lg shadow-emerald-500/30"
                          : "bg-green-500 shadow-lg shadow-green-500/30"
                      } mr-3 md:mr-4`}
                    ></div>
                    <span className="text-gray-700 text-sm md:text-lg lg:text-xl font-medium tracking-wide">
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
        )}

        {/* Stats Grid */}
        {!loading && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mt-12 md:mt-16"
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
              className="text-center p-4 md:p-6 lg:p-8 bg-white rounded-xl md:rounded-2xl border border-teal-100 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
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
                y: window.innerWidth >= 768 ? -5 : 0,
                borderColor: "rgba(20, 184, 166, 0.3)",
                transition: { duration: 0.3 },
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-teal-600 mb-1 md:mb-2">
                  {getVideosValue()}
                </div>
                <div className="text-gray-600 font-light tracking-wide text-sm md:text-base">
                  Videos Delivered
                </div>
              </div>
            </motion.div>

            {/* Stat 2 - Trusted Brands */}
            <motion.div
              className="text-center p-4 md:p-6 lg:p-8 bg-white rounded-xl md:rounded-2xl border border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
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
                y: window.innerWidth >= 768 ? -5 : 0,
                borderColor: "rgba(16, 185, 129, 0.3)",
                transition: { duration: 0.3 },
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-600 mb-1 md:mb-2">
                  {getBrandsValue()}
                </div>
                <div className="text-gray-600 font-light tracking-wide text-sm md:text-base">
                  Trusted Brands
                </div>
              </div>
            </motion.div>

            {/* Stat 3 - Years Experience */}
            <motion.div
              className="text-center p-4 md:p-6 lg:p-8 bg-white rounded-xl md:rounded-2xl border border-green-100 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
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
                y: window.innerWidth >= 768 ? -5 : 0,
                borderColor: "rgba(34, 197, 94, 0.3)",
                transition: { duration: 0.3 },
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-600 mb-1 md:mb-2">
                  {getYearsValue()}
                </div>
                <div className="text-gray-600 font-light tracking-wide text-sm md:text-base">
                  Years Experience
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>

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
