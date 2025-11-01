import { useState, useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { getReviews } from "../../services/api";

const TestimonialSection = () => {
  const sectionRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const isInView = useInView(sectionRef, { once: false, amount: 0.4 });

  // Initialize scroll effects only after component is mounted
  const { scrollYProgress } = useScroll({
    target: isMounted ? sectionRef : null,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.9]
  );

  // State for testimonials data
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedTestimonials, setExpandedTestimonials] = useState({});
  const [count, setCount] = useState(0);

  // Set mounted state after initial render
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Toggle read more/less for a specific testimonial
  const toggleReadMore = (testimonialId) => {
    setExpandedTestimonials((prev) => ({
      ...prev,
      [testimonialId]: !prev[testimonialId],
    }));
  };

  // Function to truncate text if it's too long
  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch only best reviews (isBest: true)
        const response = await getReviews({ isBest: true });

        if (response.status === "success" && response.data?.reviews) {
          setCount(response.results);
          // Transform API data to match component structure
          const transformedTestimonials = response.data.reviews.map(
            (review, index) => ({
              id: review._id || index,
              quote: review.content,
              author: review.userName,
              role: review.user?.name || "Client",
              stats: `${review.rating}/5 Rating`,
              rating: review.rating,
              screenshot: review.screenshot,
              isBest: review.isBest,
              createdAt: review.createdAt,
              // Add a flag to indicate if text needs truncation
              needsTruncation: review.content.length > 150,
            })
          );

          setTestimonials(transformedTestimonials);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError("Failed to load testimonials");

        // Fallback to default testimonials if API fails
        setTestimonials([
          {
            id: 1,
            quote:
              "They turned our raw footage into an ad that tripled conversions. This was an amazing experience working with their team. The quality and professionalism exceeded our expectations.",
            author: "Brand X",
            role: "Marketing Director",
            stats: "3x higher conversions",
            rating: 5,
            needsTruncation: true,
          },
          {
            id: 2,
            quote:
              "The AI-powered editing cut our production time by 70% while improving quality.",
            author: "TechCorp",
            role: "Creative Lead",
            stats: "70% faster production",
            rating: 5,
            needsTruncation: false,
          },
          {
            id: 3,
            quote:
              "Our engagement increased by 240% after implementing their edited content. The results were phenomenal and the team was incredibly responsive throughout the entire process.",
            author: "StartUp Y",
            role: "CEO",
            stats: "240% more engagement",
            rating: 5,
            needsTruncation: true,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Auto-rotate testimonials only if there are testimonials and component is in view
  useEffect(() => {
    if (!isInView || testimonials.length === 0) return;

    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isInView, testimonials.length]);

  // Don't render if loading and no testimonials
  if (loading && testimonials.length === 0) {
    return (
      <section
        ref={sectionRef}
        className="relative py-32 overflow-hidden bg-gradient-to-br from-white via-gray-50 to-teal-50/30"
      >
        <div className="container relative z-10 px-4 mx-auto text-center">
          <div className="text-gray-600">Loading testimonials...</div>
        </div>
      </section>
    );
  }

  // Don't render if no testimonials available
  if (!loading && testimonials.length === 0) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-gradient-to-br from-white via-gray-50 to-teal-50/30"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-100 rounded-full blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        ></motion.div>
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-emerald-100 rounded-full blur-3xl"
          animate={{
            x: [0, -15, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1,
          }}
        ></motion.div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(20, 184, 166, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(20, 184, 166, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            maskImage:
              "radial-gradient(circle at center, black, transparent 80%)",
          }}
        ></div>

        {/* Moving particles - Fixed positioning */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-teal-400 rounded-full opacity-20"
              initial={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              transition={{
                duration: Math.random() * 20 + 20,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        {/* Use motion.div only when mounted to prevent hydration issues */}
        {isMounted ? (
          <motion.div className="text-center mb-16" style={{ opacity, scale }}>
            <motion.span
              className="inline-block mb-4 text-sm tracking-widest text-teal-600 uppercase font-mono"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              Client Success Stories
            </motion.span>

            <motion.h2
              className="mb-6 text-4xl font-bold text-gray-800 md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              Proven{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500">
                Results
              </span>
            </motion.h2>
          </motion.div>
        ) : (
          // Static fallback while mounting
          <div className="text-center mb-16">
            <span className="inline-block mb-4 text-sm tracking-widest text-teal-600 uppercase font-mono">
              Client Success Stories
            </span>
            <h2 className="mb-6 text-4xl font-bold text-gray-800 md:text-5xl">
              Proven{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500">
                Results
              </span>
            </h2>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="max-w-4xl mx-auto mb-8 text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 border border-red-200">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-red-600 text-sm font-mono">{error}</span>
            </div>
          </div>
        )}

        {/* Main testimonial content */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {testimonials.map(
              (testimonial, index) =>
                activeTestimonial === index && (
                  <motion.div
                    key={testimonial.id}
                    className="text-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.7 }}
                  >
                    {/* Quote icon with halo effect */}
                    <motion.div
                      className="relative mb-10 text-teal-500 mx-auto w-16 h-16"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3, type: "spring" }}
                    >
                      <svg
                        className="w-full h-full"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                      </svg>
                      <motion.div
                        className="absolute inset-0 rounded-full bg-teal-400/20 -z-10"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      ></motion.div>
                    </motion.div>

                    {/* Quote text with consistent height */}
                    <motion.div
                      className="px-4 mb-8 min-h-[120px] flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                    >
                      <blockquote className="text-2xl font-bold text-gray-800 md:text-4xl md:leading-tight">
                        <span className="quote-mark text-teal-500">"</span>
                        {testimonial.needsTruncation &&
                        !expandedTestimonials[testimonial.id] ? (
                          <>
                            {truncateText(testimonial.quote)}
                            <button
                              onClick={() => toggleReadMore(testimonial.id)}
                              className="ml-2 text-teal-600 hover:text-teal-500 text-lg font-medium underline"
                            >
                              Read more
                            </button>
                          </>
                        ) : (
                          <>
                            {testimonial.quote}
                            {testimonial.needsTruncation && (
                              <button
                                onClick={() => toggleReadMore(testimonial.id)}
                                className="ml-2 text-teal-600 hover:text-teal-500 text-lg font-medium underline"
                              >
                                Read less
                              </button>
                            )}
                          </>
                        )}
                        <span className="quote-mark text-teal-500">"</span>
                      </blockquote>
                    </motion.div>

                    {/* Author info */}
                    <motion.div
                      className="mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      <div className="text-xl font-semibold text-teal-600">
                        {testimonial.author}
                      </div>
                      <div className="text-gray-600">{testimonial.role}</div>
                    </motion.div>

                    {/* Animated stat bar */}
                    <motion.div
                      className="relative h-2 bg-gray-200 rounded-full overflow-hidden max-w-md mx-auto mb-10"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 1.2, duration: 1 }}
                    >
                      <motion.div
                        className="h-full bg-gradient-to-r from-teal-400 to-emerald-500"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{
                          delay: 1.5,
                          duration: 1.5,
                          ease: "easeOut",
                        }}
                      />
                      <motion.div
                        className="absolute top-0 left-0 w-10 h-full bg-white/50"
                        initial={{ x: "-100%" }}
                        animate={{ x: "300%" }}
                        transition={{
                          delay: 1.8,
                          duration: 1.5,
                          repeat: Infinity,
                          repeatDelay: 2,
                        }}
                      />
                    </motion.div>

                    {/* Stats indicator */}
                    <motion.div
                      className="inline-flex items-center px-4 py-2 rounded-full bg-teal-50 border border-teal-200"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.8 }}
                    >
                      <div className="w-2 h-2 bg-teal-500 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-teal-700 text-sm font-mono">
                        {testimonial.stats}
                      </span>
                    </motion.div>
                  </motion.div>
                )
            )}
          </AnimatePresence>

          {/* Navigation dots - Only show if there are multiple testimonials */}
          {testimonials.length > 1 && (
            <div className="flex justify-center mt-16 space-x-3">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`relative w-3 h-3 rounded-full transition-all ${
                    activeTestimonial === index
                      ? "bg-teal-500"
                      : "bg-gray-400 hover:bg-gray-600"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {activeTestimonial === index && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-teal-400/30 -z-10"
                      animate={{ scale: [1, 2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          )}
        </div>

        {/* Floating tech elements */}
        <motion.div
          className="absolute top-1/4 left-8 bg-teal-50 backdrop-blur-md rounded-xl p-3 border border-teal-200 shadow-lg"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center">
            <div className="w-2 h-2 mr-2 bg-teal-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-teal-700 font-mono">
              {count}+ Satisfied Clients
            </span>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 right-8 bg-emerald-50 backdrop-blur-md rounded-xl p-3 border border-emerald-200 shadow-lg"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center">
            <span className="text-sm text-emerald-700 font-mono mr-2">
              {(
                testimonials.reduce((acc, curr) => acc + curr.rating, 0) /
                testimonials.length
              ).toFixed(1)}
              /5 Avg Rating
            </span>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          </div>
        </motion.div>
      </div>

      {/* Animated connection lines */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,50 Q25,10 50,50 T100,50"
            stroke="rgba(20, 184, 166, 0.2)"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.path
            d="M0,30 Q25,70 50,30 T100,30"
            stroke="rgba(16, 185, 129, 0.2)"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.5,
            }}
          />
        </svg>
      </div>
    </section>
  );
};

export default TestimonialSection;
