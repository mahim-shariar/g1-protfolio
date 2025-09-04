import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [loadingVideo, setLoadingVideo] = useState(false);

  // Background grid animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const drawGrid = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines
      ctx.strokeStyle = "rgba(66, 153, 225, 0.1)";
      ctx.lineWidth = 1;

      const cellSize = 50;
      const offsetX = (time * 0.02) % cellSize;
      const offsetY = (time * 0.02) % cellSize;

      // Vertical lines
      for (let x = offsetX; x < canvas.width; x += cellSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = offsetY; y < canvas.height; y += cellSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw pulsing gradient overlay
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) * 0.8
      );

      const pulseIntensity = (Math.sin(time * 0.002) + 1) * 0.2;
      gradient.addColorStop(
        0,
        `rgba(100, 50, 255, ${0.05 + pulseIntensity * 0.05})`
      );
      gradient.addColorStop(
        0.5,
        `rgba(0, 0, 80, ${0.1 + pulseIntensity * 0.05})`
      );
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.8)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(drawGrid);
    };

    animationFrameId = requestAnimationFrame(drawGrid);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // Handle video events
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("play", () => setVideoPlaying(true));
      videoRef.current.addEventListener("pause", () => setVideoPlaying(false));
      videoRef.current.addEventListener("waiting", () => setLoadingVideo(true));
      videoRef.current.addEventListener("playing", () =>
        setLoadingVideo(false)
      );
    }
  }, []);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setVideoPlaying(true);
      } else {
        videoRef.current.pause();
        setVideoPlaying(false);
      }
    }
  };

  const handleVideoHover = (isHovering) => {
    if (videoRef.current && isHovering && videoPlaying) {
      videoRef.current.playbackRate = 1.2;
    } else if (videoRef.current) {
      videoRef.current.playbackRate = 1.0;
    }
  };

  // Text animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const glowVariants = {
    pulse: {
      boxShadow: [
        "0 0 5px rgba(59, 130, 246, 0.5), 0 0 10px rgba(59, 130, 246, 0.3), 0 0 15px rgba(59, 130, 246, 0.2)",
        "0 0 10px rgba(59, 130, 246, 0.8), 0 0 20px rgba(59, 130, 246, 0.5), 0 0 30px rgba(59, 130, 246, 0.3)",
        "0 0 5px rgba(59, 130, 246, 0.5), 0 0 10px rgba(59, 130, 246, 0.3), 0 0 15px rgba(59, 130, 246, 0.2)",
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black flex flex-col items-center justify-center pt-20 pb-10">
      {/* Animated background canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Gradient overlays for cinematic effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-black/80"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/5 to-cyan-900/5"></div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 md:px-8 max-w-6xl mx-auto mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="text-cyan-400 font-mono uppercase tracking-widest text-sm md:text-base mb-4"
          variants={itemVariants}
        >
          Video Editor & Visual Storyteller
        </motion.h2>

        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          variants={itemVariants}
        >
          Transforming Ideas Into{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            Visual Masterpieces
          </span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8"
          variants={itemVariants}
        >
          Crafting compelling visual narratives through expert editing, motion
          graphics, and color grading that elevates every project to cinematic
          excellence.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          variants={itemVariants}
        >
          <motion.button
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-full relative overflow-hidden group"
            variants={glowVariants}
            animate="pulse"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">View Our Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.button>

          <motion.button
            className="px-8 py-3 border border-cyan-400/30 text-cyan-300 font-medium rounded-full relative overflow-hidden group"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(6, 182, 212, 0.1)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Book a Call</span>
            <div className="absolute inset-0 border border-cyan-400/50 rounded-full group-hover:border-cyan-400/80 transition-all duration-300"></div>
            <div className="absolute inset-0 rounded-full shadow-lg shadow-cyan-500/10 group-hover:shadow-cyan-500/20 transition-all duration-300"></div>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Introduction Video Section - Following your design pattern */}
      <motion.div
        className="relative z-10 w-full max-w-4xl px-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.7 }}
      >
        <div className="text-center mb-6">
          <p className="text-gray-400 text-sm font-light">
            Experience Our work in motion
          </p>
        </div>

        <div
          className="w-full h-[400px] lg:h-[500px] relative overflow-hidden rounded-lg border border-white/10 shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 group"
          onMouseEnter={() => handleVideoHover(true)}
          onMouseLeave={() => handleVideoHover(false)}
        >
          {loadingVideo ? (
            <div className="absolute inset-0 bg-gray-800 rounded-sm animate-pulse flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none"></div>
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                poster="data:image/gif,base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
              >
                <source
                  src="https://assets.codepen.io/3364143/sample.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>

              {/* Play button overlay - shows when video isn't playing */}
              {!videoPlaying && (
                <div
                  className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer"
                  onClick={handlePlayVideo}
                >
                  <div className="w-16 h-16 bg-cyan-500/80 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              )}

              <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 rounded text-sm font-mono z-20 backdrop-blur-sm text-cyan-300">
                ▶︎ INTRODUCTION_2025.MP4
              </div>

              <div className="absolute top-4 right-4 flex gap-2 z-20">
                <span className="w-3 h-3 rounded-full bg-cyan-500 shadow-lg shadow-cyan-900/50"></span>
                <span className="w-3 h-3 rounded-full bg-cyan-400 shadow-lg shadow-cyan-800/50"></span>
                <span className="w-3 h-3 rounded-full bg-cyan-300 shadow-lg shadow-cyan-700/50"></span>
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* Animated decorative elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-cyan-400"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/3 w-2 h-2 rounded-full bg-purple-500"
        animate={{
          scale: [1, 2, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Scrolling text effect at bottom */}
      <motion.div
        className="absolute bottom-10 left-0 right-0 mx-auto w-full max-w-5xl px-4 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          className="text-gray-500 text-xs md:text-sm font-mono whitespace-nowrap"
          animate={{ x: [0, -1000] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          • COLOR GRADING • MOTION GRAPHICS • VISUAL EFFECTS • 4K EDITING •
          DRONE FOOTAGE • CINEMATIC SEQUENCES • SOUND DESIGN • COLOR GRADING •
          MOTION GRAPHICS • VISUAL EFFECTS • 4K EDITING • DRONE FOOTAGE •
          CINEMATIC SEQUENCES • SOUND DESIGN •
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
