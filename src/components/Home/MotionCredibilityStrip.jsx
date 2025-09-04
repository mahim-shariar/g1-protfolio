import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const MotionCredibilityStrip = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const canvasRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

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
        opacity: Math.random() * 0.5 + 0.1,
        direction: Math.random() * Math.PI * 2,
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connecting lines
      ctx.strokeStyle = "rgba(34, 211, 238, 0.05)";
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
        ctx.fillStyle = `rgba(34, 211, 238, ${particle.opacity})`;
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
      className="relative py-16 md:py-24 overflow-hidden bg-gray-950"
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
        className="absolute inset-0 w-full h-full opacity-70"
      />

      {/* Glowing orbs with more depth */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div
        className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute top-2/3 left-1/3 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "4s" }}
      ></div>

      {/* Subtle vignette effect */}
      <div className="absolute inset-0 shadow-[inset_0_0_100px_20px_rgba(0,0,0,0.9)]"></div>

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
          <h2 className="text-3xl md:text-4xl font-bold text-cyan-50 mb-4">
            Trusted by Creators Worldwide
          </h2>
          <p className="text-cyan-200/80 max-w-2xl mx-auto font-light">
            Delivering exceptional video editing results that transform content
            and drive engagement
          </p>
        </motion.div>

        {/* Scrolling Credibility Strip */}
        <div className="relative overflow-hidden py-8 border-y border-cyan-500/20 bg-gradient-to-r from-cyan-900/10 to-cyan-800/10 backdrop-blur-sm">
          {/* Glowing edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-950 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-950 to-transparent z-10"></div>

          {/* Subtle pulse effect on the strip */}
          <div className="absolute inset-0 bg-cyan-500/5 opacity-0 hover:opacity-100 transition-opacity duration-1000"></div>

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
              <div className="mx-10 flex items-center">
                <div className="w-3 h-3 rounded-full bg-cyan-500 mr-4 shadow-lg shadow-cyan-500/30"></div>
                <span className="text-cyan-100 text-lg md:text-xl font-medium tracking-wide">
                  <span className="text-cyan-400 font-bold">500+</span> videos
                  delivered
                </span>
              </div>

              <div className="mx-10 flex items-center">
                <div className="w-3 h-3 rounded-full bg-cyan-400 mr-4 shadow-lg shadow-cyan-400/30"></div>
                <span className="text-cyan-100 text-lg md:text-xl font-medium tracking-wide">
                  Trusted by{" "}
                  <span className="text-cyan-400 font-bold">40+</span> brands
                </span>
              </div>

              <div className="mx-10 flex items-center">
                <div className="w-3 h-3 rounded-full bg-cyan-300 mr-4 shadow-lg shadow-cyan-300/30"></div>
                <span className="text-cyan-100 text-lg md:text-xl font-medium tracking-wide">
                  <span className="text-cyan-400 font-bold">3+</span> years
                  experience
                </span>
              </div>
            </div>

            {/* Duplicate set for seamless looping */}
            <div className="flex items-center">
              <div className="mx-10 flex items-center">
                <div className="w-3 h-3 rounded-full bg-cyan-500 mr-4 shadow-lg shadow-cyan-500/30"></div>
                <span className="text-cyan-100 text-lg md:text-xl font-medium tracking-wide">
                  <span className="text-cyan-400 font-bold">500+</span> videos
                  delivered
                </span>
              </div>

              <div className="mx-10 flex items-center">
                <div className="w-3 h-3 rounded-full bg-cyan-400 mr-4 shadow-lg shadow-cyan-400/30"></div>
                <span className="text-cyan-100 text-lg md:text-xl font-medium tracking-wide">
                  Trusted by{" "}
                  <span className="text-cyan-400 font-bold">40+</span> brands
                </span>
              </div>

              <div className="mx-10 flex items-center">
                <div className="w-3 h-3 rounded-full bg-cyan-300 mr-4 shadow-lg shadow-cyan-300/30"></div>
                <span className="text-cyan-100 text-lg md:text-xl font-medium tracking-wide">
                  <span className="text-cyan-400 font-bold">3+</span> years
                  experience
                </span>
              </div>
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
          {/* Stat 1 */}
          <motion.div
            className="text-center p-8 bg-gradient-to-b from-cyan-900/10 to-cyan-900/5 rounded-2xl border border-cyan-500/10 backdrop-blur-md relative overflow-hidden"
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
              borderColor: "rgba(34, 211, 238, 0.3)",
              transition: { duration: 0.3 },
            }}
          >
            <div className="absolute inset-0 bg-cyan-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="text-5xl font-bold text-cyan-400 mb-2 drop-shadow-lg">
                500+
              </div>
              <div className="text-cyan-200/90 font-light tracking-wide">
                Videos Delivered
              </div>
            </div>
          </motion.div>

          {/* Stat 2 */}
          <motion.div
            className="text-center p-8 bg-gradient-to-b from-cyan-900/10 to-cyan-900/5 rounded-2xl border border-cyan-500/10 backdrop-blur-md relative overflow-hidden"
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
              borderColor: "rgba(34, 211, 238, 0.3)",
              transition: { duration: 0.3 },
            }}
          >
            <div className="absolute inset-0 bg-cyan-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="text-5xl font-bold text-cyan-400 mb-2 drop-shadow-lg">
                40+
              </div>
              <div className="text-cyan-200/90 font-light tracking-wide">
                Trusted Brands
              </div>
            </div>
          </motion.div>

          {/* Stat 3 */}
          <motion.div
            className="text-center p-8 bg-gradient-to-b from-cyan-900/10 to-cyan-900/5 rounded-2xl border border-cyan-500/10 backdrop-blur-md relative overflow-hidden"
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
              borderColor: "rgba(34, 211, 238, 0.3)",
              transition: { duration: 0.3 },
            }}
          >
            <div className="absolute inset-0 bg-cyan-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="text-5xl font-bold text-cyan-400 mb-2 drop-shadow-lg">
                3+
              </div>
              <div className="text-cyan-200/90 font-light tracking-wide">
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
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
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
