import { useState, useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

const TestimonialSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.4 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.9]
  );

  // Testimonial data
  const testimonials = [
    {
      id: 1,
      quote: "They turned our raw footage into an ad that tripled conversions.",
      author: "Brand X",
      role: "Marketing Director",
      stats: "3x higher conversions",
    },
    {
      id: 2,
      quote:
        "The AI-powered editing cut our production time by 70% while improving quality.",
      author: "TechCorp",
      role: "Creative Lead",
      stats: "70% faster production",
    },
    {
      id: 3,
      quote:
        "Our engagement increased by 240% after implementing their edited content.",
      author: "StartUp Y",
      role: "CEO",
      stats: "240% more engagement",
    },
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isInView, testimonials.length]);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-950"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
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
          className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"
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
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 245, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 245, 255, 0.1) 1px, transparent 1px)
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
              className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30"
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
        <motion.div className="text-center mb-16" style={{ opacity, scale }}>
          <motion.span
            className="inline-block mb-4 text-sm tracking-widest text-cyan-400 uppercase font-mono"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Client Success Stories
          </motion.span>

          <motion.h2
            className="mb-6 text-4xl font-bold text-white md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            Proven{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Results
            </span>
          </motion.h2>
        </motion.div>

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
                      className="relative mb-10 text-cyan-400 mx-auto w-16 h-16"
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
                        className="absolute inset-0 rounded-full bg-cyan-400/20 -z-10"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      ></motion.div>
                    </motion.div>

                    {/* Quote text with typewriter effect */}
                    <motion.blockquote
                      className="px-4 text-2xl font-bold text-white md:text-4xl md:leading-tight mb-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                    >
                      <span className="quote-mark text-cyan-400">"</span>
                      {testimonial.quote}
                      <span className="quote-mark text-cyan-400">"</span>
                    </motion.blockquote>

                    {/* Author info */}
                    <motion.div
                      className="mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      <div className="text-xl font-semibold text-cyan-400">
                        {testimonial.author}
                      </div>
                      <div className="text-gray-400">{testimonial.role}</div>
                    </motion.div>

                    {/* Animated stat bar */}
                    <motion.div
                      className="relative h-2 bg-gray-800 rounded-full overflow-hidden max-w-md mx-auto mb-10"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 1.2, duration: 1 }}
                    >
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{
                          delay: 1.5,
                          duration: 1.5,
                          ease: "easeOut",
                        }}
                      />
                      <motion.div
                        className="absolute top-0 left-0 w-10 h-full bg-white/30"
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
                      className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.8 }}
                    >
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-cyan-300 text-sm font-mono">
                        {testimonial.stats}
                      </span>
                    </motion.div>
                  </motion.div>
                )
            )}
          </AnimatePresence>

          {/* Navigation dots */}
          <div className="flex justify-center mt-16 space-x-3">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`relative w-3 h-3 rounded-full transition-all ${
                  activeTestimonial === index
                    ? "bg-cyan-400"
                    : "bg-gray-600 hover:bg-gray-400"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {activeTestimonial === index && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-cyan-400/30 -z-10"
                    animate={{ scale: [1, 2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Floating tech elements */}
        <motion.div
          className="absolute top-1/4 left-8 bg-cyan-500/10 backdrop-blur-md rounded-xl p-3 border border-cyan-500/30 shadow-lg"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center">
            <div className="w-2 h-2 mr-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-cyan-300 font-mono">
              98% Satisfaction
            </span>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 right-8 bg-purple-500/10 backdrop-blur-md rounded-xl p-3 border border-purple-500/30 shadow-lg"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center">
            <span className="text-sm text-purple-300 font-mono mr-2">
              250+ Projects
            </span>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          </div>
        </motion.div>
      </div>

      {/* Animated connection lines */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,50 Q25,10 50,50 T100,50"
            stroke="rgba(0, 245, 255, 0.2)"
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
            stroke="rgba(192, 132, 252, 0.2)"
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
