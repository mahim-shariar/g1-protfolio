import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useAnimation,
} from "framer-motion";
import SectionHeader from "../components/Shared/SectionHeader";
import davinchi from "../assets/davenchi.png";
import premier from "../assets/premier.png";
import cap_cut from "../assets/cap-cut.png";
import after_effect from "../assets/after-effect.png";
import final_cut from "../assets/final-cut.png";
import {
  getActiveStatistics,
  getVideoReviews,
  getReviews,
} from "../services/api";

// Floating App Logos Component - Mobile Optimized
const FloatingAppLogos = () => {
  const videoTools = [
    { name: "DaVinci Resolve", logo: davinchi },
    { name: "Premier Pro", logo: premier },
    { name: "Final Cut Pro", logo: final_cut },
    { name: "CapCut", logo: cap_cut },
    { name: "After Effects", logo: after_effect },
  ];

  // Generate responsive positions for floating logos
  const getRandomPosition = (index) => {
    // Mobile positions (smaller screens)
    const mobilePositions = [
      { top: "10%", left: "5%", scale: 0.5 },
      { top: "15%", right: "8%", scale: 0.6 },
      { top: "70%", left: "4%", scale: 0.5 },
      { bottom: "15%", right: "6%", scale: 0.7 },
      { top: "45%", right: "3%", scale: 0.4 },
    ];

    // Desktop positions (larger screens)
    const desktopPositions = [
      { top: "15%", left: "8%", scale: 0.6 },
      { top: "22%", right: "12%", scale: 0.8 },
      { top: "65%", left: "6%", scale: 0.7 },
      { bottom: "20%", right: "8%", scale: 1.0 },
      { top: "42%", right: "5%", scale: 0.5 },
    ];

    return window.innerWidth < 768
      ? mobilePositions[index % mobilePositions.length]
      : desktopPositions[index % desktopPositions.length];
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-25">
      {/* Floating App Logos in Random Positions */}
      {videoTools.map((tool, index) => {
        const position = getRandomPosition(index);

        return (
          <motion.div
            key={`floating-${tool.name}`}
            className="absolute z-30"
            style={position}
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{
              opacity: [0.4, 0.9, 0.4],
              scale: [
                position.scale * 0.8,
                position.scale * 1.2,
                position.scale * 0.8,
              ],
              y: [0, -30, 0, -20, 0],
              x: [0, 8, -12, 6, 0],
              rotate: [0, 4, -2, 2, 0],
            }}
            transition={{
              duration: 14 + Math.random() * 8,
              repeat: Infinity,
              delay: index * 1.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <motion.div
              className="relative bg-gradient-to-br from-white/30 to-white/12 backdrop-blur-xl rounded-xl p-2 sm:p-3 border border-white/40 shadow-lg"
              whileHover={{
                scale: window.innerWidth < 768 ? 1.2 : 1.4,
                rotateY: window.innerWidth < 768 ? 0 : 180,
                transition: {
                  duration: 0.8,
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
                    "brightness(1.1) drop-shadow(0 0 8px rgba(13, 148, 136, 0.5))",
                    "brightness(1.4) drop-shadow(0 0 15px rgba(20, 184, 166, 0.8))",
                    "brightness(1.1) drop-shadow(0 0 8px rgba(13, 148, 136, 0.5))",
                  ],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  delay: index * 0.8,
                  ease: "easeInOut",
                }}
              />

              {/* Tool Name Tooltip - Hidden on mobile */}
              <motion.div
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-teal-800/95 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap opacity-0 border border-teal-600/30 backdrop-blur-sm shadow-lg hidden sm:block"
                whileHover={{
                  opacity: 1,
                  y: -2,
                  transition: { duration: 0.4, ease: "easeOut" },
                }}
              >
                {tool.name}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-1.5 h-1.5 bg-teal-800/95 rotate-45" />
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Subtle Floating Particles - Reduced on mobile */}
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
              y: [0, -20, 0, -12, 0],
              x: [0, 6, -8, 5, 0],
              scale: [1, 1.3, 0.9, 1.2, 1],
              opacity: [0.3, 0.6, 0.3, 0.5, 0.3],
              rotate: [0, 45, 90, 135, 180],
            }}
            transition={{
              duration: 10 + Math.random() * 6,
              delay: Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}

      {/* Subtle Glow Spots - Reduced on mobile */}
      {Array.from({ length: window.innerWidth < 768 ? 2 : 3 }).map((_, i) => {
        const mobilePositions = [
          { top: "30%", left: "25%" },
          { bottom: "35%", left: "20%" },
        ];

        const desktopPositions = [
          { top: "35%", left: "30%" },
          { top: "50%", right: "35%" },
          { bottom: "40%", left: "25%" },
        ];

        const position =
          window.innerWidth < 768 ? mobilePositions[i] : desktopPositions[i];

        return (
          <motion.div
            key={`floating-glow-${i}`}
            className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full z-15"
            style={position}
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0, 0.06, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              delay: i * 4,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <div className="w-full h-full bg-teal-400/20 rounded-full blur-2xl" />
          </motion.div>
        );
      })}
    </div>
  );
};

// Responsive Animated Logo Cards for Differentiators
const AnimatedLogoCard = ({ item, index }) => {
  return (
    <motion.div
      className={`relative p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 ${item.borderColor} ${item.bgColor} backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{
        scale: window.innerWidth < 768 ? 1.01 : 1.02,
        y: window.innerWidth < 768 ? -2 : -5,
      }}
    >
      {/* Metric Badge - Smaller on mobile */}
      <div
        className={`absolute -top-2 -right-2 sm:-top-3 sm:-right-3 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-gradient-to-r ${item.color} text-white text-xs sm:text-sm font-bold shadow-lg z-10`}
      >
        {item.metric}
      </div>

      {/* Icon - Smaller on mobile */}
      <motion.div
        className="text-2xl sm:text-4xl mb-3 sm:mb-4 relative z-10"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {item.icon}
      </motion.div>

      {/* Title - Smaller text on mobile */}
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 relative z-10">
        {item.title}
      </h3>

      {/* Description - Smaller text on mobile */}
      <p className="text-gray-700 text-xs sm:text-sm leading-relaxed relative z-10">
        {item.description}
      </p>
    </motion.div>
  );
};

// Responsive Animated Comparison Card
const AnimatedComparisonCard = ({ item, index }) => {
  return (
    <motion.div
      key={index}
      className="text-center p-4 sm:p-6 bg-gradient-to-br from-white to-gray-50 rounded-lg sm:rounded-xl border border-gray-100 hover:border-teal-200 transition-all duration-300 relative overflow-hidden group"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{
        scale: window.innerWidth < 768 ? 1.02 : 1.05,
        boxShadow: "0 20px 40px -10px rgba(13, 148, 136, 0.1)",
      }}
    >
      <div className="text-xs sm:text-sm text-gray-500 mb-2 font-medium relative z-10">
        {item.aspect}
      </div>

      <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-3 relative z-10">
        <div className="text-right">
          <div className="text-xs text-gray-400">Others</div>
          <div className="text-xs sm:text-sm text-gray-600 line-through">
            {item.others}
          </div>
        </div>

        <motion.div
          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-teal-500 flex items-center justify-center"
          whileHover={{ scale: 1.2, rotate: 180 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <span className="text-white text-sm sm:text-lg">→</span>
        </motion.div>

        <div className="text-left">
          <div className="text-xs text-teal-600 font-medium">We Offer</div>
          <div className="text-xs sm:text-sm font-semibold text-gray-900">
            {item.you}
          </div>
        </div>
      </div>

      <div className="inline-block px-2 py-1 sm:px-3 sm:py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-bold relative z-10">
        {item.advantage}
      </div>
    </motion.div>
  );
};

// Responsive Marquee Testimonial Card Component
const MarqueeTestimonial = ({ testimonial, index }) => {
  return (
    <motion.div
      className="relative group cursor-default mb-4 sm:mb-5"
      whileHover={{
        scale: window.innerWidth < 768 ? 1.01 : 1.03,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 25,
          duration: 0.3,
        },
      }}
      initial={{
        opacity: 0,
        y: 20,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        delay: testimonial.delay || index * 0.1,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {/* Enhanced glow effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-emerald-400/20 rounded-xl sm:rounded-2xl blur-xl"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* Main card with responsive padding and layout */}
      <motion.div
        className="relative bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-lg sm:shadow-xl p-4 sm:p-6 group-hover:shadow-xl sm:group-hover:shadow-2xl group-hover:border-teal-200/50 h-[160px] sm:h-[190px] flex flex-col"
        whileHover={{
          borderColor: "rgba(94, 234, 212, 0.5)",
          transition: { duration: 0.3 },
        }}
      >
        {/* Smoother gradient border */}
        <motion.div
          className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-teal-400/10 via-emerald-400/10 to-teal-400/10"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        />

        {/* Floating elements - responsive size */}
        <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full flex items-center justify-center">
          <motion.div
            className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.8, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Responsive rating stars */}
        <div className="flex mb-2 sm:mb-3">
          {[...Array(5)].map((_, i) => (
            <motion.svg
              key={i}
              className={`w-3 h-3 sm:w-4 sm:h-4 ${
                i < testimonial.rating ? "text-amber-400" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: {
                  delay: (testimonial.delay || index * 0.1) + i * 0.08,
                  duration: 0.5,
                  ease: "backOut",
                },
              }}
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.2 },
              }}
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </motion.svg>
          ))}
        </div>

        {/* Responsive quote text */}
        <motion.p
          className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 font-light relative z-10 line-clamp-3 flex-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              delay: (testimonial.delay || index * 0.1) + 0.2,
              duration: 0.5,
              ease: "easeOut",
            },
          }}
        >
          <motion.span
            className="text-xl sm:text-2xl text-teal-400 font-serif leading-none mr-1"
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              transition: {
                delay: (testimonial.delay || index * 0.1) + 0.15,
                type: "spring",
                stiffness: 200,
              },
            }}
          >
            "
          </motion.span>
          {testimonial.quote}
          <motion.span
            className="text-xl sm:text-2xl text-teal-400 font-serif leading-none ml-1"
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              transition: {
                delay: (testimonial.delay || index * 0.1) + 0.25,
                type: "spring",
                stiffness: 200,
              },
            }}
          >
            "
          </motion.span>
        </motion.p>

        {/* Responsive author info */}
        <div className="relative pt-2 sm:pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <motion.div
                className="font-bold text-gray-800 text-xs sm:text-sm mb-0.5 sm:mb-1 truncate"
                initial={{ opacity: 0, x: -10 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    delay: (testimonial.delay || index * 0.1) + 0.3,
                    duration: 0.4,
                  },
                }}
              >
                {testimonial.author}
              </motion.div>
              <motion.div
                className="text-gray-600 text-xs truncate"
                initial={{ opacity: 0, x: -10 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    delay: (testimonial.delay || index * 0.1) + 0.35,
                    duration: 0.4,
                  },
                }}
              >
                {testimonial.role}
              </motion.div>
            </div>

            {/* Responsive stats badge */}
            <motion.div
              className="px-2 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full shadow-lg flex-shrink-0 ml-2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: {
                  delay: (testimonial.delay || index * 0.1) + 0.4,
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                },
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              <span className="text-white text-xs sm:text-sm font-bold font-mono whitespace-nowrap">
                {testimonial.stats}
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Responsive Marquee Column Component
const MarqueeColumn = ({ testimonials, direction = "down", speed = 20 }) => {
  const isMobile = window.innerWidth < 768;

  return (
    <div
      className={`relative ${
        isMobile ? "h-[400px] p-2" : "h-[550px] p-4"
      } overflow-hidden rounded-xl sm:rounded-2xl backdrop-blur-sm`}
    >
      <motion.div
        className="flex flex-col space-y-4 sm:space-y-5"
        animate={{
          y:
            direction === "down"
              ? [isMobile ? -180 : -220, 0]
              : [0, isMobile ? -180 : -220],
        }}
        transition={{
          y: {
            repeat: Infinity,
            repeatType: "loop",
            duration: isMobile ? speed * 0.8 : speed,
            ease: "linear",
          },
        }}
      >
        {testimonials.map((testimonial, index) => (
          <div key={`${testimonial.id}-${index}`}>
            <MarqueeTestimonial testimonial={testimonial} index={index} />
          </div>
        ))}
      </motion.div>

      {/* Gradient fades */}
      <div className="absolute top-0 left-0 right-0 h-16 sm:h-24 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
    </div>
  );
};

const WhyChooseUs = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // New state for video reviews and statistics
  const [videoReviews, setVideoReviews] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);
  const [testimonials, setTestimonials] = useState([]);
  const [testimonialsCount, setTestimonialsCount] = useState(0);
  const [error, setError] = useState(null);

  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Fetch statistics data
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setStatsLoading(true);
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
        setStatsLoading(false);
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

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setTestimonialsLoading(true);
        setError(null);

        const response = await getReviews({ isBest: true });

        if (response.status === "success" && response.data?.reviews) {
          setTestimonialsCount(response.results);
          const transformedTestimonials = response.data.reviews.map(
            (review, index) => ({
              id: review._id || index,
              quote: review.content,
              author: review.userName,
              role: review.user?.name || "Client",
              stats: `${review.rating}/5`,
              rating: review.rating,
              isBest: review.isBest,
              delay: index * 0.1,
            })
          );

          setTestimonials(transformedTestimonials);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError("Failed to load testimonials");

        // Enhanced fallback testimonials with same structure as API data
        const fallbackTestimonials = [
          {
            id: 1,
            quote:
              "They turned our raw footage into an ad that tripled conversions. The quality and professionalism exceeded our expectations.",
            author: "Sarah Chen",
            role: "Marketing Director",
            stats: "3x conversions",
            rating: 5,
            delay: 0,
          },
          {
            id: 2,
            quote:
              "The AI-powered editing cut our production time by 70% while improving quality dramatically.",
            author: "Marcus Rodriguez",
            role: "Creative Lead",
            stats: "70% faster",
            rating: 5,
            delay: 0.1,
          },
          {
            id: 3,
            quote:
              "Our engagement increased by 240% after implementing their edited content. Phenomenal results!",
            author: "Alex Thompson",
            role: "CEO",
            stats: "240% growth",
            rating: 5,
            delay: 0.2,
          },
          {
            id: 4,
            quote:
              "Outstanding service! The team delivered exceptional quality and met all our deadlines perfectly.",
            author: "Jessica Kim",
            role: "Project Manager",
            stats: "100% on-time",
            rating: 5,
            delay: 0.3,
          },
          {
            id: 5,
            quote:
              "The video editing transformed our brand presence and significantly boosted our social media engagement.",
            author: "David Park",
            role: "Brand Manager",
            stats: "500% ROI",
            rating: 5,
            delay: 0.4,
          },
          {
            id: 6,
            quote:
              "Professional, fast, and high-quality work. Will definitely work with them again! Amazing team.",
            author: "Emily Watson",
            role: "Founder",
            stats: "5/5 Stars",
            rating: 5,
            delay: 0.5,
          },
        ];

        setTestimonials(fallbackTestimonials);
        setTestimonialsCount(fallbackTestimonials.length);
      } finally {
        setTestimonialsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Helper functions for video reviews
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
        "I was amazed by how quickly they turned around my weekly vlog. The editing was so professional and they perfectly captured my brand's aesthetic. The color grading made my footage look cinematic!",
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
        "Our product launch video needed to be perfect, and they delivered beyond expectations. The attention to detail in the motion graphics and sound design was exceptional. Our engagement rates skyrocketed!",
      rating: 5,
      stats: "215% increase in engagement",
      duration: "1:45",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      isBest: false,
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
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      isBest: true,
    },
  ];

  // Dummy testimonials data for marquee
  const dummyTestimonials = [
    {
      id: 1,
      text: "Absolutely stunning work! The team transformed our raw footage into a cinematic masterpiece that exceeded all expectations.",
      author: "Sarah Johnson",
      role: "Content Creator",
      initials: "SJ",
      rating: 5,
      isBest: true,
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      text: "Professional, fast, and incredibly talented. Our corporate video came out better than we ever imagined!",
      author: "Michael Chen",
      role: "Marketing Director",
      initials: "MC",
      rating: 5,
      isBest: false,
      createdAt: "2024-01-12",
    },
    {
      id: 3,
      text: "The attention to detail and creative vision brought our story to life in ways we couldn't have imagined.",
      author: "Emily Rodriguez",
      role: "Documentary Filmmaker",
      initials: "ER",
      rating: 5,
      isBest: true,
      createdAt: "2024-01-10",
    },
    {
      id: 4,
      text: "Outstanding color grading and seamless transitions. They truly understand cinematic storytelling.",
      author: "David Thompson",
      role: "YouTuber",
      initials: "DT",
      rating: 4,
      isBest: false,
      createdAt: "2024-01-08",
    },
    {
      id: 5,
      text: "Working with this team was a game-changer for our brand. The final product speaks for itself!",
      author: "Lisa Wang",
      role: "Brand Manager",
      initials: "LW",
      rating: 5,
      isBest: false,
      createdAt: "2024-01-05",
    },
    {
      id: 6,
      text: "Incredible turnaround time without compromising quality. Will definitely work with them again!",
      author: "Robert Martinez",
      role: "Event Coordinator",
      initials: "RM",
      rating: 5,
      isBest: true,
      createdAt: "2024-01-03",
    },
  ];

  // Fetch reviews from API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setTimeout(() => {
          setReviews(dummyTestimonials);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setReviews(dummyTestimonials);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Auto-advance video reviews
  useEffect(() => {
    if (videoReviews.length === 0) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentReviewIndex((prev) => (prev + 1) % videoReviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [videoReviews.length]);

  // Navigation functions
  const nextReview = () => {
    if (videoReviews.length === 0) return;
    setDirection(1);
    setCurrentReviewIndex((prev) => (prev + 1) % videoReviews.length);
  };

  const prevReview = () => {
    if (videoReviews.length === 0) return;
    setDirection(-1);
    setCurrentReviewIndex(
      (prev) => (prev - 1 + videoReviews.length) % videoReviews.length
    );
  };

  // Slide variants for smooth transitions
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

  // Star rating component
  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.span
            key={star}
            className={`text-lg ${
              star <= rating ? "text-yellow-400" : "text-gray-400"
            }`}
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            ★
          </motion.span>
        ))}
      </div>
    );
  };

  // Responsive Video Player Component
  const VideoPlayer = ({ videoUrl, thumbnail, isBest, duration }) => {
    return (
      <div
        className={`relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-2xl ${
          isMobile ? "h-48" : "h-64 lg:h-80"
        } bg-black`}
      >
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
        {isBest && (
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-yellow-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium z-10">
            ⭐ Featured
          </div>
        )}

        {/* Video Duration */}
        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-black/80 text-white px-2 py-1 rounded text-xs sm:text-sm">
          {duration}
        </div>
      </div>
    );
  };

  // Updated Video Review Component with API integration
  const VideoReviewSection = () => {
    if (reviewsLoading) {
      return (
        <div className="mb-12 sm:mb-20 text-center py-8 sm:py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-teal-500 border-t-transparent rounded-full mx-auto"
          />
          <span className="ml-2 sm:ml-3 text-gray-600 text-sm sm:text-base">
            Loading video reviews...
          </span>
        </div>
      );
    }

    if (videoReviews.length === 0) {
      return (
        <div className="mb-12 sm:mb-20 text-center py-8 sm:py-12">
          <div className="text-gray-500 text-sm sm:text-base">
            No video reviews available yet
          </div>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2">
            Check back later for client video testimonials
          </p>
        </div>
      );
    }

    const currentReview = videoReviews[currentReviewIndex];

    return (
      <div className="mb-12 sm:mb-20">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            Real Client Results
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-lg px-4">
            See how we've helped content creators and businesses achieve their
            goals with professional video editing
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4">
          {/* Card Container */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-gray-200 shadow-xl sm:shadow-2xl overflow-hidden relative">
            {/* Navigation Buttons - Only show if multiple reviews */}
            {videoReviews.length > 1 && (
              <div
                className={`absolute top-1/2 left-3 right-3 sm:left-4 sm:right-4 transform -translate-y-1/2 flex justify-between z-10`}
              >
                <motion.button
                  onClick={prevReview}
                  className={`${
                    isMobile ? "w-8 h-8" : "w-12 h-12"
                  } bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white border border-gray-200 relative z-20`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className={`${
                      isMobile ? "w-4 h-4" : "w-6 h-6"
                    } text-gray-700`}
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
                </motion.button>

                <motion.button
                  onClick={nextReview}
                  className={`${
                    isMobile ? "w-8 h-8" : "w-12 h-12"
                  } bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white border border-gray-200 relative z-20`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className={`${
                      isMobile ? "w-4 h-4" : "w-6 h-6"
                    } text-gray-700`}
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
                </motion.button>
              </div>
            )}

            <div
              className={`grid grid-cols-1 ${
                isMobile ? "" : "lg:grid-cols-2"
              } min-h-[${isMobile ? "400px" : "500px"}] relative z-10`}
            >
              {/* Video Section */}
              <div
                className={`relative ${
                  isMobile ? "p-4" : "p-8"
                } bg-gradient-to-br from-gray-50 to-white`}
              >
                {/* Video Container with Default Player */}
                <VideoPlayer
                  videoUrl={currentReview.videoUrl}
                  thumbnail={currentReview.videoThumbnail}
                  isBest={currentReview.isBest}
                  duration={currentReview.duration}
                />

                {/* Client Info with Slide Transition */}
                <div
                  className={`mt-4 sm:mt-6 text-center ${
                    isMobile ? "h-20" : "h-24"
                  }`}
                >
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
                      <h3
                        className={`${
                          isMobile ? "text-lg" : "text-xl"
                        } font-bold text-gray-900`}
                      >
                        {currentReview.name}
                      </h3>
                      <p className="text-teal-600 font-medium text-sm sm:text-base">
                        {currentReview.role}
                      </p>
                      <p className="text-gray-500 text-xs sm:text-sm">
                        {currentReview.company}
                      </p>
                      <div className="mt-1 sm:mt-2 flex justify-center">
                        <StarRating rating={currentReview.rating} />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Review Text Section */}
              <div
                className={`${
                  isMobile ? "p-4" : "p-8"
                } flex flex-col justify-center`}
              >
                <div className={`${isMobile ? "mb-4" : "mb-6"}`}>
                  <div className="text-teal-500 text-4xl sm:text-6xl mb-3 sm:mb-4">
                    "
                  </div>

                  {/* Review Text with Slide Transition */}
                  <div
                    className={`${isMobile ? "h-32" : "h-48"} overflow-hidden`}
                  >
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.p
                        key={currentReview.id}
                        className="text-gray-700 text-sm sm:text-lg leading-relaxed"
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
                      className="bg-teal-50 inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 rounded-full mt-3 sm:mt-4"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={slideTransition}
                    >
                      <span className="text-teal-700 font-semibold text-xs sm:text-sm">
                        🎯 {currentReview.stats}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation Dots and Counter - Only show if multiple reviews */}
                {videoReviews.length > 1 && (
                  <div className="flex items-center justify-between mt-4 sm:mt-8">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      {videoReviews.map((_, index) => (
                        <motion.button
                          key={index}
                          onClick={() => {
                            const newDirection =
                              index > currentReviewIndex ? 1 : -1;
                            setDirection(newDirection);
                            setCurrentReviewIndex(index);
                          }}
                          className={`${
                            isMobile ? "w-2 h-2" : "w-3 h-3"
                          } rounded-full transition-all duration-300 ${
                            index === currentReviewIndex
                              ? "bg-teal-500 scale-125"
                              : "bg-gray-300 hover:bg-gray-400"
                          }`}
                          whileHover={{ scale: 1.3 }}
                          whileTap={{ scale: 0.8 }}
                        />
                      ))}
                    </div>

                    <div className="text-gray-500 text-xs sm:text-sm">
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

  // Statistics functions
  const getStatisticByTitle = (title) => {
    return statistics.find((stat) =>
      stat.title.toLowerCase().includes(title.toLowerCase())
    );
  };

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

  // Real Differentiators
  const differentiators = [
    {
      icon: "⏰",
      title: "24-48 Hour Delivery",
      description:
        "While others take 5-7 days, we deliver professional edits in 1-2 days without rushing or compromising quality.",
      metric: "Fastest",
      color: "from-green-500 to-teal-500",
      borderColor: "border-green-200",
      bgColor: "bg-gradient-to-br from-green-50 to-teal-50",
    },
    {
      icon: "💬",
      title: "Real-Time Collaboration",
      description:
        "Work directly with your editor via live chat and screen sharing. No more waiting days for email responses.",
      metric: "Live Editing",
      color: "from-blue-500 to-cyan-500",
      borderColor: "border-blue-200",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
    },
    {
      icon: "🔄",
      title: "Unlimited Revisions",
      description:
        "Most editors charge extra for revisions. We include unlimited revisions until you're 100% satisfied.",
      metric: "No Extra Cost",
      color: "from-purple-500 to-indigo-500",
      borderColor: "border-purple-200",
      bgColor: "bg-gradient-to-br from-purple-50 to-indigo-50",
    },
    {
      icon: "🎵",
      title: "Copyright-Free Music",
      description:
        "We provide access to premium, copyright-free music libraries so your videos never get taken down.",
      metric: "Safe Music",
      color: "from-orange-500 to-amber-500",
      borderColor: "border-orange-200",
      bgColor: "bg-gradient-to-br from-orange-50 to-amber-50",
    },
  ];

  // Real Comparison
  const comparisonData = [
    {
      aspect: "Delivery Time",
      you: "24-48 hours",
      others: "5-7 days",
      advantage: "3x Faster",
    },
    {
      aspect: "Communication",
      you: "Live chat & calls",
      others: "Email only",
      advantage: "Instant",
    },
    {
      aspect: "Revisions",
      you: "Unlimited & free",
      others: "2-3 max, extra $",
      advantage: "Better Value",
    },
    {
      aspect: "Music Rights",
      you: "Copyright-free library",
      others: "You provide music",
      advantage: "Worry-Free",
    },
  ];

  // Process reviews data for display
  const processedReviews = reviews.map((review, index) => ({
    id: review._id || review.id || index,
    text: review.content || review.text,
    author: review.userName || review.author,
    role: review.user?.name || review.role || "Client",
    initials: (review.userName || review.author)
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2),
    screenshot: review.screenshot,
    rating: review.rating || 5,
    isBest: review.isBest || false,
    createdAt: review.createdAt,
  }));

  // Updated Testimonials Marquee Section with synchronized columns
  const TestimonialsMarqueeSection = () => {
    if (testimonialsLoading && testimonials.length === 0) {
      return (
        <div className="mb-12 sm:mb-20 text-center py-8 sm:py-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-2 sm:gap-3"
          >
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-teal-500 rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
            <span className="text-gray-600 font-mono text-xs sm:text-sm">
              Loading testimonials...
            </span>
          </motion.div>
        </div>
      );
    }

    if (!testimonialsLoading && testimonials.length === 0) {
      return null;
    }

    // Double the testimonials for seamless looping
    const doubledTestimonials = [...testimonials, ...testimonials];

    return (
      <motion.div
        className="mb-12 sm:mb-20 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-lg px-4">
            Discover why industry leaders trust us to transform their content
          </p>
        </div>

        {/* Responsive Marquee Layout */}
        {isMobile ? (
          // Single column for mobile
          <div className="px-4">
            <MarqueeColumn
              testimonials={doubledTestimonials}
              direction="down"
              speed={15}
            />
          </div>
        ) : (
          // Three columns for desktop
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
            <MarqueeColumn
              testimonials={doubledTestimonials}
              direction="up"
              speed={15}
            />
            <MarqueeColumn
              testimonials={doubledTestimonials}
              direction="down"
              speed={15}
            />
            <MarqueeColumn
              testimonials={doubledTestimonials}
              direction="up"
              speed={15}
            />
          </div>
        )}

        {/* Floating Stats - Hidden on mobile */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute top-6 left-6 bg-white/90 backdrop-blur-xl rounded-xl p-4 border border-white/20 shadow-lg"
              initial={{ x: -50, opacity: 0, scale: 0.9 }}
              animate={{
                x: 0,
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 0.6,
                  delay: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
            >
              <div className="text-center">
                <div className="text-xl font-bold text-teal-600 mb-1">
                  {testimonialsCount}+
                </div>
                <div className="text-gray-600 text-xs font-mono">
                  Happy Clients
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-xl rounded-xl p-4 border border-white/20 shadow-lg"
              initial={{ x: 50, opacity: 0, scale: 0.9 }}
              animate={{
                x: 0,
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 0.6,
                  delay: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
            >
              <div className="text-center">
                <div className="text-xl font-bold text-emerald-600 mb-1">
                  {testimonials.length > 0
                    ? (
                        testimonials.reduce(
                          (acc, curr) => acc + curr.rating,
                          0
                        ) / testimonials.length
                      ).toFixed(1)
                    : "5.0"}
                </div>
                <div className="text-gray-600 text-xs font-mono">
                  Avg Rating
                </div>
              </div>
            </motion.div>
          </>
        )}
      </motion.div>
    );
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-50 via-white to-teal-50/80 flex flex-col items-center justify-center py-12 sm:py-20">
      {/* Floating App Logos */}
      <FloatingAppLogos />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-4">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <SectionHeader
            subtitle="Why We're Different"
            title="Video Editing That "
            highlight="Actually Delivers"
            description="While other editors make promises, we deliver results. Faster turnaround, better communication, and features that actually matter to content creators."
            center={true}
            titleSize={isMobile ? "xl" : "2xl"}
            descriptionSize={isMobile ? "base" : "lg"}
            lineSpacing="tight"
            highlightColor="teal-500"
            dotColor="teal-500"
            highlightOnNewLine={false}
          />

          {/* Differentiator Cards - Responsive grid */}
          <div
            className={`grid grid-cols-1 ${
              isMobile ? "gap-4" : "md:grid-cols-2 lg:grid-cols-4 gap-6"
            } mb-12 sm:mb-16`}
          >
            {differentiators.map((item, index) => (
              <AnimatedLogoCard key={index} item={item} index={index} />
            ))}
          </div>

          {/* Comparison Section */}
          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg sm:shadow-xl p-4 sm:p-8 mb-12 sm:mb-16 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-2 relative z-10">
              The Real Difference
            </h2>
            <p className="text-gray-600 text-center mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base relative z-10 px-2">
              See how we solve the biggest frustrations content creators face
              with other editors
            </p>

            <div
              className={`grid grid-cols-1 ${
                isMobile ? "gap-4" : "md:grid-cols-2 lg:grid-cols-4 gap-6"
              } relative z-10`}
            >
              {comparisonData.map((item, index) => (
                <AnimatedComparisonCard key={index} item={item} index={index} />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Updated Video Reviews Section with API Integration */}
        <VideoReviewSection />

        {/* Updated Testimonials Marquee Section with API Integration */}
        <TestimonialsMarqueeSection />

        {/* Statistics Section */}
        {!statsLoading && (
          <motion.div
            className={`grid grid-cols-1 ${
              isMobile ? "gap-4" : "md:grid-cols-3 gap-8"
            } mb-12 sm:mb-20`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {/* Stat 1 - Videos Delivered */}
            <motion.div
              className="text-center p-6 sm:p-8 bg-white rounded-xl sm:rounded-2xl border border-teal-100 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              whileHover={{
                y: isMobile ? -2 : -5,
                borderColor: "rgba(20, 184, 166, 0.3)",
                transition: { duration: 0.3 },
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-4xl sm:text-5xl font-bold text-teal-600 mb-2">
                  {getVideosValue()}
                </div>
                <div className="text-gray-600 font-light tracking-wide text-sm sm:text-base">
                  Videos Delivered
                </div>
              </div>
            </motion.div>

            {/* Stat 2 - Trusted Brands */}
            <motion.div
              className="text-center p-6 sm:p-8 bg-white rounded-xl sm:rounded-2xl border border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              whileHover={{
                y: isMobile ? -2 : -5,
                borderColor: "rgba(16, 185, 129, 0.3)",
                transition: { duration: 0.3 },
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-4xl sm:text-5xl font-bold text-emerald-600 mb-2">
                  {getBrandsValue()}
                </div>
                <div className="text-gray-600 font-light tracking-wide text-sm sm:text-base">
                  Trusted Brands
                </div>
              </div>
            </motion.div>

            {/* Stat 3 - Years Experience */}
            <motion.div
              className="text-center p-6 sm:p-8 bg-white rounded-xl sm:rounded-2xl border border-green-100 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              whileHover={{
                y: isMobile ? -2 : -5,
                borderColor: "rgba(34, 197, 94, 0.3)",
                transition: { duration: 0.3 },
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-4xl sm:text-5xl font-bold text-green-600 mb-2">
                  {getYearsValue()}
                </div>
                <div className="text-gray-600 font-light tracking-wide text-sm sm:text-base">
                  Years Experience
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          className="text-center bg-white/90 backdrop-blur-sm p-6 sm:p-10 rounded-xl sm:rounded-2xl border border-teal-200 shadow-lg sm:shadow-xl relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 relative z-10">
            Tired of Slow Editors?
          </h2>
          <p className="text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto font-medium text-sm sm:text-base relative z-10">
            Experience video editing that actually respects your time and
            delivers professional results when you need them.
          </p>

          <motion.button
            className="px-6 py-3 sm:px-8 sm:py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white font-medium rounded-full shadow-lg relative z-10 text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Your Edit in 24 Hours
          </motion.button>
        </motion.div>
      </div>

      {/* Scrolling text effect at bottom - Hidden on mobile */}
      {!isMobile && (
        <div className="absolute bottom-10 left-0 right-0 mx-auto w-full max-w-5xl px-4 overflow-hidden">
          <div className="text-gray-400 text-xs md:text-sm font-mono whitespace-nowrap">
            • FAST TURNAROUND • UNLIMITED REVISIONS • LIVE COLLABORATION •
            COPYRIGHT-FREE MUSIC • • 24/7 SUPPORT • PROFESSIONAL QUALITY • QUICK
            DELIVERY • PREMIUM EDITING •
          </div>
        </div>
      )}
    </div>
  );
};

export default WhyChooseUs;
