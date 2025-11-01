import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { getStatistics, getActiveStatistics } from "../../services/api";

const MotionCredibilityStrip = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const canvasRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const [statistics, setStatistics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        <motion.div
          className="text-center mb-16"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                ease: "easeOut",
              },
            },
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Trusted by Creators Worldwide
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-light">
            Delivering exceptional video editing results that transform content
            and drive engagement
          </p>
        </motion.div>

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
