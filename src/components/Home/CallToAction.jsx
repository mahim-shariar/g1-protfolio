import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeader from "../Shared/SectionHeader";

const CallToAction = () => {
  const ctaRef = useRef(null);
  const isInView = useInView(ctaRef, { once: true, amount: 0.5 });
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Interactive particle effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles = [];
    const particleCount = 30;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "absolute rounded-full cta-particle";
      particle.style.width = `${2 + Math.random() * 3}px`;
      particle.style.height = particle.style.width;
      particle.style.background = `radial-gradient(circle, ${
        Math.random() > 0.5
          ? "rgba(255, 255, 255, 0.8)"
          : "rgba(20, 184, 166, 0.8)"
      }, transparent)`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      container.appendChild(particle);
      particles.push(particle);
    }

    // Animate particles on hover
    const handleMouseEnter = () => {
      setIsHovered(true);
      particles.forEach((particle) => {
        const x = (Math.random() - 0.5) * 100;
        const y = (Math.random() - 0.5) * 100;
        particle.style.transform = `translate(${x}px, ${y}px)`;
        particle.style.opacity = "1";
      });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      particles.forEach((particle) => {
        particle.style.transform = "translate(0, 0)";
        particle.style.opacity = "0.3";
      });
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      particles.forEach((particle) => container.removeChild(particle));
    };
  }, []);

  return (
    <section
      ref={ctaRef}
      className="relative py-32 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
    >
      {/* Animated circuit board background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="circuit-board"></div>
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-teal-100 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-emerald-100 rounded-full blur-3xl animate-pulse"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeader
            title="Your footage deserves "
            highlight="an unforgettable edit"
            description="Transform your raw footage into captivating visual stories that engage your audience and elevate your brand."
            center={true}
            titleSize="2xl"
            titleWeight="semibold"
            highlightWeight="semibold"
            descriptionSize="lg"
            lineSpacing="tight"
            highlightColor="teal-500"
            dotColor="teal-500"
          />

          {/* Teal CTA Button */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative inline-block group"
          >
            {/* Outer glow */}
            <div
              className={`absolute -inset-4 rounded-2xl blur-xl transition-all duration-500 ${
                isHovered ? "bg-teal-500/30" : "bg-teal-500/20"
              }`}
            ></div>

            {/* Teal button */}
            <Link
              to="/contact"
              className="relative px-12 py-6 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-2xl font-bold text-2xl border border-teal-500 hover:from-teal-600 hover:to-teal-700 transition-all duration-500 transform group-hover:scale-105 shadow-2xl shadow-teal-500/20 group-hover:shadow-teal-500/40 flex items-center justify-center overflow-hidden"
            >
              {/* Animated background */}
              <div className="absolute inset-0 opacity-20">
                <div className="modern-pattern"></div>
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shine"></div>

              <span>Start a Project</span>
              <motion.svg
                className="w-6 h-6 ml-3 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </motion.svg>
            </Link>

            {/* Binary code rain effect */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl opacity-10">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-white font-mono text-xs opacity-70 binary-rain"
                  style={{
                    left: `${5 + Math.random() * 90}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${5 + Math.random() * 5}s`,
                  }}
                >
                  {Math.random() > 0.5 ? "1" : "0"}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Feature indicators with animated bars */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-teal-100 hover:border-teal-200 transition-colors duration-300 shadow-sm">
              <div className="flex items-center justify-center mb-2">
                <svg
                  className="w-8 h-8 text-teal-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-gray-700 font-medium">
                Replies within 24 hours
              </p>
              <div className="h-1 mt-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-teal-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={isInView ? { width: "95%" } : {}}
                  transition={{ duration: 1, delay: 0.6 }}
                ></motion.div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-emerald-100 hover:border-emerald-200 transition-colors duration-300 shadow-sm">
              <div className="flex items-center justify-center mb-2">
                <svg
                  className="w-8 h-8 text-emerald-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <p className="text-gray-700 font-medium">Simple pricing</p>
              <div className="h-1 mt-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-emerald-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={isInView ? { width: "100%" } : {}}
                  transition={{ duration: 1, delay: 0.8 }}
                ></motion.div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-teal-100 hover:border-teal-200 transition-colors duration-300 shadow-sm">
              <div className="flex items-center justify-center mb-2">
                <svg
                  className="w-8 h-8 text-teal-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <p className="text-gray-700 font-medium">Fast delivery</p>
              <div className="h-1 mt-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-teal-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={isInView ? { width: "90%" } : {}}
                  transition={{ duration: 1, delay: 1 }}
                ></motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        .circuit-board {
          background-image: radial-gradient(
              circle at 1px 1px,
              rgba(20, 184, 166, 0.1) 1px,
              transparent 0
            ),
            radial-gradient(
              circle at 1px 1px,
              rgba(16, 185, 129, 0.1) 1px,
              transparent 0
            );
          background-size: 30px 30px;
          background-position: 0 0, 15px 15px;
        }

        .modern-pattern {
          background-image: linear-gradient(
              45deg,
              rgba(255, 255, 255, 0.1) 25%,
              transparent 25%,
              transparent 75%,
              rgba(255, 255, 255, 0.1) 75%,
              rgba(255, 255, 255, 0.1)
            ),
            linear-gradient(
              45deg,
              rgba(255, 255, 255, 0.1) 25%,
              transparent 25%,
              transparent 75%,
              rgba(255, 255, 255, 0.1) 75%,
              rgba(255, 255, 255, 0.1)
            );
          background-size: 60px 60px;
          background-position: 0 0, 30px 30px;
        }

        .cta-particle {
          opacity: 0.3;
          transition: all 0.5s ease-out;
        }

        .binary-rain {
          animation: binaryFall linear infinite;
        }

        @keyframes binaryFall {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(1000%);
            opacity: 0;
          }
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }

        .animate-shine {
          animation: shine 3s infinite;
        }
      `}</style>
    </section>
  );
};

export default CallToAction;
