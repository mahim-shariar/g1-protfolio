import { useState, useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const WhyWorkWithUs = () => {
  const [activePoint, setActivePoint] = useState(0);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  const isInView = useInView(sectionRef, { once: false, amount: 0.5 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Points data
  const points = [
    {
      id: 1,
      title: "Fast delivery, zero guesswork.",
      description:
        "Our AI-powered workflow ensures rapid turnaround times with precision editing that hits the mark every time.",
    },
    {
      id: 2,
      title: "Collaborative process with clear revisions.",
      description:
        "Real-time collaboration tools and structured feedback loops ensure your vision is perfectly executed.",
    },
    {
      id: 3,
      title: "Custom edits that fit your style.",
      description:
        "Tailored editing approaches that adapt to your unique brand identity and content requirements.",
    },
  ];

  // Video sources (replace with your actual videos)
  const videos = [
    "/videos/collaboration.mp4",
    "/videos/editing-process.mp4",
    "/videos/final-result.mp4",
  ];

  // Set active point based on scroll
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setActivePoint((prev) => (prev + 1) % points.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isInView, points.length]);

  // Play video when point is active
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
      videoRef.current.play();
    }
  }, [activePoint]);

  // Handle card click to change active point
  const handleCardClick = (index) => {
    setActivePoint(index);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-gradient-to-b from-black to-gray-950 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>

        {/* Grid overlay */}
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
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div className="text-center mb-20" style={{ y, opacity }}>
          <motion.span
            className="text-cyan-400 font-mono text-sm uppercase tracking-widest mb-4 inline-block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            The Next Generation Advantage
          </motion.span>
          <motion.h2
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Why Work With{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Us
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            Experience the future of video editing with our cutting-edge
            approach that combines AI technology with creative excellence.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Points list */}
          <div className="space-y-12">
            {points.map((point, index) => (
              <motion.div
                key={point.id}
                className={`p-6 rounded-2xl border-2 transition-all duration-500 cursor-pointer ${
                  activePoint === index
                    ? "bg-cyan-500/10 border-cyan-500/50 shadow-lg shadow-cyan-500/20"
                    : "bg-gray-900/20 border-gray-700/30 hover:bg-gray-800/30"
                }`}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 + 0.2 }}
                viewport={{ once: true, amount: 0.5 }}
                onClick={() => handleCardClick(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start">
                  <div
                    className={`relative mr-6 flex-shrink-0 ${
                      activePoint === index ? "text-cyan-400" : "text-gray-400"
                    }`}
                  >
                    {/* Animated number indicator */}
                    <div className="text-5xl font-bold opacity-20">
                      {index + 1}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="w-8 h-8"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        {activePoint === index ? (
                          <motion.path
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5 }}
                            d="M5 13l4 4L19 7"
                          />
                        ) : (
                          <circle cx="12" cy="12" r="10" />
                        )}
                      </svg>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {point.title}
                    </h3>
                    <p className="text-gray-300">{point.description}</p>

                    {/* Feature indicators */}
                    {activePoint === index && (
                      <motion.div
                        className="flex gap-3 mt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {index === 0 && (
                          <>
                            <span className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full">
                              AI-Powered
                            </span>
                            <span className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full">
                              48h Delivery
                            </span>
                          </>
                        )}
                        {index === 1 && (
                          <>
                            <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full">
                              Real-Time Updates
                            </span>
                            <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full">
                              Unlimited Revisions
                            </span>
                          </>
                        )}
                        {index === 2 && (
                          <>
                            <span className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full">
                              Style Matching
                            </span>
                            <span className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full">
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

          {/* Right column - Video display */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {/* Video container with futuristic frame */}
            <div className="relative rounded-3xl overflow-hidden border border-cyan-500/30 shadow-2xl shadow-cyan-500/10">
              <video
                ref={videoRef}
                src={videos[activePoint]}
                muted
                autoPlay
                loop
                className="w-full h-auto aspect-video"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

              {/* Holographic effect lines */}
              <div className="absolute inset-0 rounded-3xl border border-cyan-500/20 pointer-events-none"></div>
              <div className="absolute inset-2 rounded-2xl border border-purple-500/10 pointer-events-none"></div>
            </div>

            {/* Floating elements */}
            <motion.div
              className="absolute -top-5 -right-5 bg-cyan-500/10 backdrop-blur-md rounded-xl p-3 border border-cyan-500/30 shadow-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center">
                <div className="w-3 h-3 bg-cyan-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-cyan-300 text-sm font-mono">
                  Live Preview
                </span>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-5 -left-5 bg-purple-500/10 backdrop-blur-md rounded-xl p-3 border border-purple-500/30 shadow-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="flex items-center">
                <span className="text-purple-300 text-sm font-mono mr-2">
                  AI Analysis
                </span>
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
              </div>
            </motion.div>

            {/* Progress indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {points.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActivePoint(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activePoint === index
                      ? "bg-cyan-400 w-8"
                      : "bg-gray-600 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="text-center p-6 bg-gray-900/20 backdrop-blur-sm rounded-2xl border border-cyan-500/20">
            <div className="text-5xl font-bold text-cyan-400 mb-3">97%</div>
            <div className="text-white font-medium mb-2">
              Client Satisfaction
            </div>
            <div className="text-gray-400 text-sm">Based on 250+ projects</div>
          </div>

          <div className="text-center p-6 bg-gray-900/20 backdrop-blur-sm rounded-2xl border border-purple-500/20">
            <div className="text-5xl font-bold text-purple-400 mb-3">48h</div>
            <div className="text-white font-medium mb-2">Average Delivery</div>
            <div className="text-gray-400 text-sm">
              Express options available
            </div>
          </div>

          <div className="text-center p-6 bg-gray-900/20 backdrop-blur-sm rounded-2xl border border-cyan-500/20">
            <div className="text-5xl font-bold text-cyan-400 mb-3">∞</div>
            <div className="text-white font-medium mb-2">
              Revisions Included
            </div>
            <div className="text-gray-400 text-sm">
              Until you're 100% satisfied
            </div>
          </div>
        </motion.div>
      </div>

      {/* Custom styles */}
      <style jsx>{`
        section {
          perspective: 1000px;
        }
        video {
          transform: translateZ(0);
          filter: contrast(1.1) brightness(1.1);
        }
      `}</style>
    </section>
  );
};

export default WhyWorkWithUs;
