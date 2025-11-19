import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { getReviews } from "../../services/api";

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
              delay: index * 0.1, // Reduced delay for smoother entry
            })
          );

          setTestimonials(transformedTestimonials);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError("Failed to load testimonials");

        // Enhanced fallback testimonials
        setTestimonials([
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
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Smoother Marquee Testimonial Component
  const MarqueeTestimonial = ({ testimonial, index }) => {
    return (
      <motion.div
        className="relative group cursor-default"
        whileHover={{
          scale: 1.02,
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
          ease: [0.25, 0.46, 0.45, 0.94], // Custom ease for smoother motion
        }}
      >
        {/* Enhanced glow effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-emerald-400/20 rounded-3xl blur-xl"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        {/* Main card with enhanced transitions */}
        <motion.div
          className="relative bg-white/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 group-hover:shadow-3xl group-hover:border-teal-200/50"
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

          {/* Floating elements with smoother animation */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full flex items-center justify-center">
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

          {/* Smoother rating stars animation */}
          <div className="flex mb-4">
            {[...Array(5)].map((_, i) => (
              <motion.svg
                key={i}
                className={`w-5 h-5 ${
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

          {/* Smoother quote animation */}
          <motion.p
            className="text-gray-700 text-lg leading-relaxed mb-6 font-light relative z-10"
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
              className="text-4xl text-teal-400 font-serif leading-none"
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
              className="text-4xl text-teal-400 font-serif leading-none"
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

          {/* Smoother author info animation */}
          <div className="relative pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <motion.div
                  className="font-bold text-gray-800 text-lg mb-1"
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
                  className="text-gray-600 text-sm"
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

              {/* Smoother stats badge animation */}
              <motion.div
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full shadow-lg"
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
                <span className="text-white text-sm font-bold font-mono">
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
        className="relative py-32 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-teal-50/50"
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
            <span className="text-gray-600 font-mono">
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
      className="relative py-32 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-teal-50/50"
    >
      {/* Smoother background effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Smoother gradient orbs */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-teal-200/30 to-emerald-200/20 rounded-full blur-3xl"
          animate={
            hasAnimated
              ? {
                  x: [0, 40, 0],
                  y: [0, -30, 0],
                  scale: [1, 1.15, 1],
                }
              : {}
          }
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-emerald-200/20 to-teal-200/30 rounded-full blur-3xl"
          animate={
            hasAnimated
              ? {
                  x: [0, -40, 0],
                  y: [0, 30, 0],
                  scale: [1.15, 1, 1.15],
                }
              : {}
          }
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1.5,
            ease: "easeInOut",
          }}
        />

        {/* Smoother floating grid */}
        <motion.div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(20, 184, 166, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(20, 184, 166, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
          animate={
            hasAnimated
              ? {
                  backgroundPosition: ["0px 0px", "80px 80px"],
                }
              : {}
          }
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Smoother animated particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-teal-400/20 rounded-full"
            initial={false}
            animate={
              hasAnimated
                ? {
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    scale: [1, 1.4, 1],
                    opacity: [0.3, 0.7, 0.3],
                  }
                : {}
            }
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 10,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Smoother Header Section */}
      <div className="container relative z-10 px-4 mx-auto text-center mb-20">
        <motion.div
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-teal-200 shadow-lg mb-6"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={
            hasAnimated
              ? {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  },
                }
              : {}
          }
        >
          <motion.div
            className="w-2 h-2 bg-teal-500 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <span className="text-teal-700 font-medium text-sm tracking-wide font-mono">
            TRUSTED BY INDUSTRY LEADERS
          </span>
          <motion.div
            className="w-2 h-2 bg-teal-500 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.5,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <motion.h2
          className="text-5xl md:text-7xl font-bold text-gray-800 mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={
            hasAnimated
              ? {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    delay: 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  },
                }
              : {}
          }
        >
          <span className="bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent bg-size-200 animate-gradient">
            Client Voices
          </span>
        </motion.h2>

        <motion.p
          className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={
            hasAnimated
              ? {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.7,
                    delay: 0.2,
                    ease: "easeOut",
                  },
                }
              : {}
          }
        >
          Discover why industry leaders trust us to transform their content into
          extraordinary experiences
        </motion.p>
      </div>

      {/* Three Column Marquee Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Top to Bottom */}
          <div className="relative h-[800px] overflow-hidden rounded-3xl backdrop-blur-sm">
            <motion.div
              className="flex flex-col gap-6 p-6"
              animate={hasAnimated ? { y: [0, -2000] } : { y: 0 }}
              transition={{
                duration: 50,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <MarqueeTestimonial
                  key={`left-${index}`}
                  testimonial={testimonial}
                  index={index}
                />
              ))}
            </motion.div>

            {/* Gradient fades */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
          </div>

          {/* Middle Column - Bottom to Top */}
          <div className="relative h-[800px] overflow-hidden rounded-3xl backdrop-blur-sm">
            <motion.div
              className="flex flex-col gap-6 p-6"
              animate={hasAnimated ? { y: [-2000, 0] } : { y: 0 }}
              transition={{
                duration: 50,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <MarqueeTestimonial
                  key={`middle-${index}`}
                  testimonial={testimonial}
                  index={index}
                />
              ))}
            </motion.div>

            {/* Gradient fades */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
          </div>

          {/* Right Column - Top to Bottom */}
          <div className="relative h-[800px] overflow-hidden rounded-3xl backdrop-blur-sm">
            <motion.div
              className="flex flex-col gap-6 p-6"
              animate={hasAnimated ? { y: [0, -2000] } : { y: 0 }}
              transition={{
                duration: 50,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <MarqueeTestimonial
                  key={`right-${index}`}
                  testimonial={testimonial}
                  index={index}
                />
              ))}
            </motion.div>

            {/* Gradient fades */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Smoother Floating Stats */}
      <motion.div
        className="absolute top-10 left-10 bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl"
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
          <div className="text-3xl font-bold text-teal-600 mb-1">{count}+</div>
          <div className="text-gray-600 text-sm font-mono">Happy Clients</div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 right-10 bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl"
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
          <div className="text-3xl font-bold text-emerald-600 mb-1">
            {testimonials.length > 0
              ? (
                  testimonials.reduce((acc, curr) => acc + curr.rating, 0) /
                  testimonials.length
                ).toFixed(1)
              : "5.0"}
          </div>
          <div className="text-gray-600 text-sm font-mono">Avg Rating</div>
        </div>
      </motion.div>

      {/* Smoother connection lines */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,20 Q25,50 50,20 T100,20"
            stroke="url(#gradient1)"
            strokeWidth="0.3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={hasAnimated ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
          <motion.path
            d="M0,80 Q25,50 50,80 T100,80"
            stroke="url(#gradient2)"
            strokeWidth="0.3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={hasAnimated ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{
              duration: 18,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 2,
              ease: "easeInOut",
            }}
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0d9488" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0d9488" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default TestimonialSection;
