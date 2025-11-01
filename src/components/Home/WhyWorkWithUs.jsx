import { useState, useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { getActiveStatistics } from "../../services/api";

const WhyWorkWithUs = () => {
  const [activePoint, setActivePoint] = useState(0);
  const [statistics, setStatistics] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);

  // Cyberpunk color palette
  const colors = {
    neonBlue: "#00f3ff",
    electricPurple: "#b967ff",
    matrixGreen: "#00ff88",
    cyberPink: "#ff2a6d",
    darkBg: "#0a0a0f",
    cardBg: "rgba(20, 20, 30, 0.8)",
    glowBlue: "rgba(0, 243, 255, 0.3)",
    glowPurple: "rgba(185, 103, 255, 0.3)",
  };

  // Enhanced points with cyberpunk themes
  const points = [
    {
      id: 1,
      title: "QUANTUM PROCESSING ENGINE",
      description:
        "Our neural network processors analyze footage 200x faster than real-time, identifying optimal edit points and transitions automatically.",
      icon: "⚡",
      color: colors.neonBlue,
      features: ["200x Processing", "AI Analysis", "Auto-Optimization"],
      tech: "Neural Core v3.2",
    },
    {
      id: 2,
      title: "HOLOGRAPHIC COLLABORATION MATRIX",
      description:
        "Immerse in our virtual editing suite with real-time 3D previews, spatial audio, and multi-user holographic interfaces.",
      icon: "🔮",
      color: colors.electricPurple,
      features: ["3D Preview", "Spatial Audio", "Multi-User VR"],
      tech: "HoloMatrix OS",
    },
    {
      id: 3,
      title: "NEURAL STYLE TRANSFER PROTOCOL",
      description:
        "Advanced AI learns your brand's visual DNA and applies it consistently across all content while generating unique variations.",
      icon: "🧠",
      color: colors.matrixGreen,
      features: ["Style Learning", "Brand DNA", "AI Variations"],
      tech: "StyleNet AI",
    },
  ];

  // Cyberpunk-themed images
  const images = [
    "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
  ];

  // Canvas animation for cyberpunk grid
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

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw cyberpunk grid
      ctx.strokeStyle = colors.neonBlue;
      ctx.lineWidth = 0.5;
      ctx.globalAlpha = 0.1;

      const gridSize = 40;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Animated nodes
      ctx.globalAlpha = 0.3;
      const time = Date.now() * 0.001;
      for (let i = 0; i < 20; i++) {
        const x = (Math.sin(time * 0.5 + i) * 0.5 + 0.5) * canvas.width;
        const y = (Math.cos(time * 0.3 + i) * 0.5 + 0.5) * canvas.height;

        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = colors.neonBlue;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(drawGrid);
    };

    drawGrid();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // Auto-rotate points
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setActivePoint((prev) => (prev + 1) % points.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isInView, points.length]);

  // Stats data
  const statsData = [
    {
      number: "97%",
      label: "CLIENT SATISFACTION",
      color: colors.neonBlue,
      suffix: "",
    },
    {
      number: "24",
      label: "HOUR TURNAROUND",
      color: colors.electricPurple,
      suffix: "h",
    },
    {
      number: "∞",
      label: "AI REVISIONS",
      color: colors.matrixGreen,
      suffix: "",
    },
  ];

  const BinaryParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute font-mono text-xs opacity-20"
          style={{
            color: [colors.neonBlue, colors.electricPurple, colors.matrixGreen][
              i % 3
            ],
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          {Math.random() > 0.5 ? "1" : "0"}
        </motion.div>
      ))}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-20 overflow-hidden"
      style={{ background: colors.darkBg }}
    >
      {/* Animated Canvas Grid */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Binary Rain Effect */}
      <BinaryParticles />

      {/* Glowing Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full blur-3xl"
        style={{ background: colors.glowBlue }}
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full blur-3xl"
        style={{ background: colors.glowPurple }}
        animate={{
          x: [0, -40, 0],
          y: [0, 50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div className="text-center mb-20" style={{ y, scale }}>
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border backdrop-blur-sm mb-8"
            style={{
              background: "rgba(0, 243, 255, 0.05)",
              borderColor: colors.neonBlue,
              boxShadow: `0 0 20px ${colors.neonBlue}40`,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="w-2 h-2 rounded-full"
              style={{ background: colors.neonBlue }}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span
              className="text-sm font-mono uppercase tracking-widest font-bold"
              style={{ color: colors.neonBlue }}
            >
              CYBER EDITING SUITE v2.0
            </span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 font-mono"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span style={{ color: "#fff" }}>WHY</span>
            <motion.span
              className="block mt-4"
              style={{
                color: colors.neonBlue,
                textShadow: `0 0 30px ${colors.neonBlue}`,
              }}
              animate={{
                textShadow: [
                  `0 0 30px ${colors.neonBlue}`,
                  `0 0 50px ${colors.neonBlue}`,
                  `0 0 30px ${colors.neonBlue}`,
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              CYBER_EDIT?
            </motion.span>
          </motion.h2>

          <motion.p
            className="text-xl max-w-3xl mx-auto leading-relaxed font-light"
            style={{ color: "#8892b0" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Enter the next dimension of video editing. Where artificial
            intelligence meets creative genius in a symphony of digital
            perfection.
          </motion.p>
        </motion.div>

        {/* Main Content - Cyberpunk Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-20">
          {/* Left Panel - Navigation Matrix */}
          <div className="xl:col-span-1">
            <div
              className="p-6 rounded-2xl border backdrop-blur-sm h-full"
              style={{
                background: colors.cardBg,
                borderColor: `${colors.neonBlue}40`,
                boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3)`,
              }}
            >
              <h3
                className="text-2xl font-bold font-mono mb-6"
                style={{ color: colors.neonBlue }}
              >
                SYSTEM_MODULES
              </h3>

              <div className="space-y-4">
                {points.map((point, index) => (
                  <motion.button
                    key={point.id}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 font-mono ${
                      activePoint === index ? "scale-105" : "hover:scale-102"
                    }`}
                    style={{
                      background:
                        activePoint === index
                          ? `${point.color}15`
                          : "rgba(255, 255, 255, 0.02)",
                      borderColor:
                        activePoint === index
                          ? point.color
                          : "rgba(255, 255, 255, 0.1)",
                      boxShadow:
                        activePoint === index
                          ? `0 0 20px ${point.color}40`
                          : "none",
                    }}
                    onClick={() => setActivePoint(index)}
                    whileHover={{
                      borderColor: point.color,
                      background: `${point.color}10`,
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="text-lg font-bold"
                        style={{
                          color:
                            activePoint === index ? point.color : "#8892b0",
                        }}
                      >
                        {point.tech}
                      </span>
                      {activePoint === index && (
                        <motion.div
                          className="w-2 h-2 rounded-full"
                          style={{ background: point.color }}
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                    </div>
                    <div
                      className="text-sm mt-1 opacity-80"
                      style={{ color: "#8892b0" }}
                    >
                      {point.title.split(" ").slice(0, 2).join(" ")}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Center Panel - Main Display */}
          <div className="xl:col-span-2">
            <motion.div
              key={activePoint}
              className="relative rounded-2xl overflow-hidden border backdrop-blur-sm"
              style={{
                background: colors.cardBg,
                borderColor: `${points[activePoint].color}60`,
                boxShadow: `0 0 40px ${points[activePoint].color}30`,
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Main Image with Cyberpunk Overlay */}
              <div className="relative aspect-video overflow-hidden">
                <motion.img
                  src={images[activePoint]}
                  alt={points[activePoint].title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1 }}
                />

                {/* Cyberpunk Scan Lines */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: `repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 2px,
                      ${points[activePoint].color}20 2px,
                      ${points[activePoint].color}20 4px
                    )`,
                  }}
                />

                {/* HUD Overlay */}
                <div className="absolute inset-0 p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3
                        className="text-3xl font-black font-mono mb-2"
                        style={{ color: points[activePoint].color }}
                      >
                        {points[activePoint].title}
                      </h3>
                      <p
                        className="text-lg max-w-2xl leading-relaxed"
                        style={{ color: "#ccd6f6" }}
                      >
                        {points[activePoint].description}
                      </p>
                    </div>

                    <motion.div
                      className="text-4xl"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {points[activePoint].icon}
                    </motion.div>
                  </div>

                  {/* Feature Matrix */}
                  <div className="flex flex-wrap gap-3 mt-6">
                    {points[activePoint].features.map((feature, index) => (
                      <motion.span
                        key={index}
                        className="px-4 py-2 rounded-full border font-mono text-sm font-bold"
                        style={{
                          background: `${points[activePoint].color}15`,
                          borderColor: points[activePoint].color,
                          color: points[activePoint].color,
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {feature}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Corner Accents */}
                <div
                  className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2"
                  style={{ borderColor: points[activePoint].color }}
                />
                <div
                  className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2"
                  style={{ borderColor: points[activePoint].color }}
                />
                <div
                  className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2"
                  style={{ borderColor: points[activePoint].color }}
                />
                <div
                  className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2"
                  style={{ borderColor: points[activePoint].color }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats Matrix */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-8 rounded-2xl border backdrop-blur-sm"
              style={{
                background: colors.cardBg,
                borderColor: `${stat.color}40`,
                boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3)`,
              }}
              whileHover={{
                y: -5,
                borderColor: stat.color,
                boxShadow: `0 12px 40px ${stat.color}30`,
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                className="text-6xl font-black font-mono mb-2"
                style={{
                  color: stat.color,
                  textShadow: `0 0 20px ${stat.color}`,
                }}
              >
                {stat.number}
                <span className="text-3xl">{stat.suffix}</span>
              </div>
              <div
                className="text-lg font-bold font-mono uppercase tracking-widest"
                style={{ color: "#ccd6f6" }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Terminal */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div
            className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl border backdrop-blur-sm cursor-pointer group"
            style={{
              background: "rgba(0, 243, 255, 0.05)",
              borderColor: colors.neonBlue,
              boxShadow: `0 0 30px ${colors.neonBlue}30`,
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: `0 0 50px ${colors.neonBlue}50`,
            }}
          >
            <span
              className="text-lg font-mono font-bold"
              style={{ color: colors.neonBlue }}
            >
              INITIATE_PROJECT
            </span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span style={{ color: colors.neonBlue }}>▶</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyWorkWithUs;
