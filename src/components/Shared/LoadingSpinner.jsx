import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const LoadingSpinner = () => {
  const canvasRef = useRef(null);
  const [progress, setProgress] = useState(0);

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Canvas animation for background
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

    const draw = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle moving particles
      const particleCount = 50;
      for (let i = 0; i < particleCount; i++) {
        const x =
          Math.sin(time * 0.0005 + i * 0.2) * canvas.width * 0.2 +
          canvas.width / 2;
        const y =
          Math.cos(time * 0.0005 + i * 0.2) * canvas.height * 0.2 +
          canvas.height / 2;
        const size = Math.sin(time * 0.002 + i) * 2 + 1;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${
          0.3 + Math.sin(time * 0.005 + i) * 0.2
        })`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-black flex items-center justify-center z-50 overflow-hidden">
      {/* Animated background canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Gradient overlays for cinematic effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-black/80"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/5 to-cyan-900/5"></div>

      {/* Main centered content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Outer container with glow effect */}
        <motion.div
          className="relative w-80 h-80 flex items-center justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Glow effect behind the spinner */}
          <motion.div
            className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Main spinner ring */}
          <motion.div
            className="absolute w-full h-full rounded-full border-4 border-transparent"
            style={{
              backgroundImage:
                "linear-gradient(black, black), linear-gradient(to right, #06b6d4, #8b5cf6, #06b6d4)",
              backgroundOrigin: "border-box",
              backgroundClip: "content-box, border-box",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />

          {/* Inner ring with reverse rotation */}
          <motion.div
            className="absolute w-64 h-64 rounded-full border-4 border-transparent"
            style={{
              backgroundImage:
                "linear-gradient(black, black), linear-gradient(to left, #06b6d4, #8b5cf6, #06b6d4)",
              backgroundOrigin: "border-box",
              backgroundClip: "content-box, border-box",
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />

          {/* Video play icon in center */}
          <motion.div
            className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-600/20 backdrop-blur-md flex items-center justify-center shadow-lg"
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 0px rgba(59, 130, 246, 0.3)",
                "0 0 30px rgba(59, 130, 246, 0.6)",
                "0 0 0px rgba(59, 130, 246, 0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg
                className="w-16 h-16 text-cyan-400 drop-shadow-lg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Loading text and progress */}
        <motion.div
          className="mt-12 text-center w-96"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.p
            className="text-cyan-300 font-mono text-sm mb-4 tracking-wider uppercase"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Preparing Your Visual Experience
          </motion.p>

          {/* Progress bar with gradient */}
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mb-2">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Progress percentage and timecode */}
          <div className="flex justify-between items-center">
            <motion.span
              className="text-cyan-400 font-mono text-xs"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {progress}%
            </motion.span>

            <motion.span
              className="text-cyan-400 font-mono text-xs"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
            >
              {`00:00:${progress < 10 ? "0" + progress : progress}:24`}
            </motion.span>
          </div>
        </motion.div>

        {/* Video editing terms floating in background */}
        <div className="absolute -z-10 inset-0 overflow-hidden opacity-30">
          {[
            "COLOR GRADING",
            "MOTION GRAPHICS",
            "VISUAL EFFECTS",
            "4K EDITING",
            "CINEMATIC",
            "SOUND DESIGN",
          ].map((term, i) => (
            <motion.div
              key={i}
              className="absolute text-cyan-400/30 font-mono text-xs uppercase tracking-widest"
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + i * 10}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                delay: i * 0.7,
              }}
            >
              {term}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Subtle audio visualization at bottom */}
      <div className="absolute bottom-10 left-0 right-0 mx-auto w-80 h-6 flex items-center justify-center">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1 h-4 mx-0.5 bg-gradient-to-t from-cyan-400 to-purple-500 rounded-t-sm"
            animate={{
              height: [8, 24, 8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.05,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;
