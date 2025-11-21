import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { getReviews } from "../../services/api";
import SectionHeader from "../Shared/SectionHeader";

const TestimonialSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [hasAnimated, setHasAnimated] = useState(false);

  // State for testimonials data
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);

  // Set hasAnimated when section comes into view
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getReviews({ isBest: true });

        if (response.status === "success" && response.data?.reviews) {
          setCount(response.results);
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
        setCount(fallbackTestimonials.length);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Calculate marquee content height for proper looping (increased for larger cards)
  const marqueeContentHeight = testimonials.length * 220; // Increased from 180 to 220

  // Optimized Marquee Testimonial Component with larger dimensions
  const MarqueeTestimonial = ({ testimonial, index }) => {
    return (
      <motion.div
        className="relative group cursor-default mb-5" // Increased margin bottom
        whileHover={{
          scale: 1.03, // Slightly increased hover scale
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
        animate={
          hasAnimated
            ? {
                opacity: 1,
                y: 0,
                scale: 1,
              }
            : {}
        }
        transition={{
          delay: testimonial.delay,
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {/* Enhanced glow effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-emerald-400/20 rounded-2xl blur-xl"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        {/* Main card with increased padding and larger layout */}
        <motion.div
          className="relative bg-white/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6 group-hover:shadow-2xl group-hover:border-teal-200/50 h-[190px] flex flex-col" // Increased height, padding, and shadow
          whileHover={{
            borderColor: "rgba(94, 234, 212, 0.5)",
            transition: { duration: 0.3 },
          }}
        >
          {/* Smoother gradient border */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-400/10 via-emerald-400/10 to-teal-400/10"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          />

          {/* Floating elements - slightly larger */}
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full flex items-center justify-center">
            <motion.div
              className="w-1.5 h-1.5 bg-white rounded-full"
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

          {/* Larger rating stars */}
          <div className="flex mb-3">
            {[...Array(5)].map((_, i) => (
              <motion.svg
                key={i}
                className={`w-4 h-4 ${
                  // Increased from w-3 h-3
                  i < testimonial.rating ? "text-amber-400" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
                initial={{ scale: 0, opacity: 0 }}
                animate={
                  hasAnimated
                    ? {
                        scale: 1,
                        opacity: 1,
                        transition: {
                          delay: testimonial.delay + i * 0.08,
                          duration: 0.5,
                          ease: "backOut",
                        },
                      }
                    : {}
                }
                whileHover={{
                  scale: 1.2,
                  transition: { duration: 0.2 },
                }}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </motion.svg>
            ))}
          </div>

          {/* Larger quote with bigger text */}
          <motion.p
            className="text-gray-700 text-sm leading-relaxed mb-4 font-light relative z-10 line-clamp-3 flex-1" // Increased text size
            initial={{ opacity: 0, y: 10 }}
            animate={
              hasAnimated
                ? {
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: testimonial.delay + 0.2,
                      duration: 0.5,
                      ease: "easeOut",
                    },
                  }
                : {}
            }
          >
            <motion.span
              className="text-2xl text-teal-400 font-serif leading-none mr-1"
              initial={{ scale: 0 }}
              animate={
                hasAnimated
                  ? {
                      scale: 1,
                      transition: {
                        delay: testimonial.delay + 0.15,
                        type: "spring",
                        stiffness: 200,
                      },
                    }
                  : {}
              }
            >
              "
            </motion.span>
            {testimonial.quote}
            <motion.span
              className="text-2xl text-teal-400 font-serif leading-none ml-1"
              initial={{ scale: 0 }}
              animate={
                hasAnimated
                  ? {
                      scale: 1,
                      transition: {
                        delay: testimonial.delay + 0.25,
                        type: "spring",
                        stiffness: 200,
                      },
                    }
                  : {}
              }
            >
              "
            </motion.span>
          </motion.p>

          {/* Larger author info */}
          <div className="relative pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <motion.div
                  className="font-bold text-gray-800 text-sm mb-1 truncate" // Increased text size
                  initial={{ opacity: 0, x: -10 }}
                  animate={
                    hasAnimated
                      ? {
                          opacity: 1,
                          x: 0,
                          transition: {
                            delay: testimonial.delay + 0.3,
                            duration: 0.4,
                          },
                        }
                      : {}
                  }
                >
                  {testimonial.author}
                </motion.div>
                <motion.div
                  className="text-gray-600 text-xs truncate"
                  initial={{ opacity: 0, x: -10 }}
                  animate={
                    hasAnimated
                      ? {
                          opacity: 1,
                          x: 0,
                          transition: {
                            delay: testimonial.delay + 0.35,
                            duration: 0.4,
                          },
                        }
                      : {}
                  }
                >
                  {testimonial.role}
                </motion.div>
              </div>

              {/* Larger stats badge */}
              <motion.div
                className="px-3 py-1.5 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full shadow-lg flex-shrink-0 ml-2" // Increased padding
                initial={{ scale: 0, opacity: 0 }}
                animate={
                  hasAnimated
                    ? {
                        scale: 1,
                        opacity: 1,
                        transition: {
                          delay: testimonial.delay + 0.4,
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                        },
                      }
                    : {}
                }
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
              >
                <span className="text-white text-sm font-bold font-mono whitespace-nowrap">
                  {" "}
                  {/* Increased text size */}
                  {testimonial.stats}
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  if (loading && testimonials.length === 0) {
    return (
      <section
        ref={sectionRef}
        className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-teal-50/50"
      >
        <div className="container relative z-10 px-4 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-3"
          >
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-teal-500 rounded-full"
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
            <span className="text-gray-600 font-mono text-sm">
              Loading testimonials...
            </span>
          </motion.div>
        </div>
      </section>
    );
  }

  if (!loading && testimonials.length === 0) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-teal-50/50"
    >
      {/* Optimized background effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-teal-200/30 to-emerald-200/20 rounded-full blur-2xl"
          animate={
            hasAnimated
              ? {
                  x: [0, 30, 0],
                  y: [0, -20, 0],
                  scale: [1, 1.1, 1],
                }
              : {}
          }
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-emerald-200/20 to-teal-200/30 rounded-full blur-2xl"
          animate={
            hasAnimated
              ? {
                  x: [0, -30, 0],
                  y: [0, 20, 0],
                  scale: [1.1, 1, 1.1],
                }
              : {}
          }
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1.5,
            ease: "easeInOut",
          }}
        />

        {/* Floating grid */}
        <motion.div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(20, 184, 166, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(20, 184, 166, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
          animate={
            hasAnimated
              ? {
                  backgroundPosition: ["0px 0px", "60px 60px"],
                }
              : {}
          }
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <SectionHeader
        subtitle="TRUSTED BY INDUSTRY LEADERS"
        title="Our"
        highlight="Client Voices"
        description="Discover why industry leaders trust us to transform their content"
        center={true}
        titleSize="2xl"
        titleWeight="normal"
        descriptionSize="lg"
        lineSpacing="tight"
        highlightColor="teal-500"
        dotColor="teal-500"
        highlightOnNewLine={false}
      />

      {/* Synchronized Three Column Marquee Container with increased height */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {" "}
        {/* Increased max-width */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {" "}
          {/* Increased gap */}
          {/* Left Column - Top to Bottom (Starts at top) */}
          <div className="relative h-[550px] overflow-hidden rounded-2xl backdrop-blur-sm">
            {" "}
            {/* Increased height */}
            <motion.div
              className="flex flex-col"
              animate={
                hasAnimated ? { y: [0, -marqueeContentHeight] } : { y: 0 }
              }
              transition={{
                duration: 35, // Slightly increased duration for larger cards
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div key={`left-${index}`} className="px-4 pb-5">
                  {" "}
                  {/* Increased padding */}
                  <MarqueeTestimonial testimonial={testimonial} index={index} />
                </div>
              ))}
            </motion.div>
            {/* Gradient fades */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
          </div>
          {/* Middle Column - Bottom to Top (Starts at visible position) */}
          <div className="relative h-[550px] overflow-hidden rounded-2xl backdrop-blur-sm">
            {" "}
            {/* Increased height */}
            <motion.div
              className="flex flex-col"
              animate={
                hasAnimated
                  ? { y: [-marqueeContentHeight, 0] }
                  : { y: -marqueeContentHeight }
              }
              transition={{
                duration: 35, // Slightly increased duration for larger cards
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div key={`middle-${index}`} className="px-4 pb-5">
                  {" "}
                  {/* Increased padding */}
                  <MarqueeTestimonial testimonial={testimonial} index={index} />
                </div>
              ))}
            </motion.div>
            {/* Gradient fades */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
          </div>
          {/* Right Column - Top to Bottom (Starts at top) */}
          <div className="relative h-[550px] overflow-hidden rounded-2xl backdrop-blur-sm">
            {" "}
            {/* Increased height */}
            <motion.div
              className="flex flex-col"
              animate={
                hasAnimated ? { y: [0, -marqueeContentHeight] } : { y: 0 }
              }
              transition={{
                duration: 35, // Slightly increased duration for larger cards
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div key={`right-${index}`} className="px-4 pb-5">
                  {" "}
                  {/* Increased padding */}
                  <MarqueeTestimonial testimonial={testimonial} index={index} />
                </div>
              ))}
            </motion.div>
            {/* Gradient fades */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Floating Stats */}
      <motion.div
        className="absolute top-6 left-6 bg-white/90 backdrop-blur-xl rounded-xl p-4 border border-white/20 shadow-lg"
        initial={{ x: -50, opacity: 0, scale: 0.9 }}
        animate={
          hasAnimated
            ? {
                x: 0,
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 0.6,
                  delay: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              }
            : {}
        }
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.3 },
        }}
      >
        <div className="text-center">
          <div className="text-xl font-bold text-teal-600 mb-1">{count}+</div>
          <div className="text-gray-600 text-xs font-mono">Happy Clients</div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-xl rounded-xl p-4 border border-white/20 shadow-lg"
        initial={{ x: 50, opacity: 0, scale: 0.9 }}
        animate={
          hasAnimated
            ? {
                x: 0,
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 0.6,
                  delay: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              }
            : {}
        }
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.3 },
        }}
      >
        <div className="text-center">
          <div className="text-xl font-bold text-emerald-600 mb-1">
            {testimonials.length > 0
              ? (
                  testimonials.reduce((acc, curr) => acc + curr.rating, 0) /
                  testimonials.length
                ).toFixed(1)
              : "5.0"}
          </div>
          <div className="text-gray-600 text-xs font-mono">Avg Rating</div>
        </div>
      </motion.div>
    </section>
  );
};

export default TestimonialSection;
