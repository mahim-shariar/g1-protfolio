import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

const About = () => {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 300 };
  const rotateX = useSpring(
    useTransform(mouseY, [0, 600], [15, -15]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [0, 800], [-15, 15]),
    springConfig
  );

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const processSteps = [
    {
      title: "Concept",
      description: "Ideation & Storyboarding",
      icon: "💡",
      color: "from-cyan-400 to-blue-500",
      gradient: "linear-gradient(135deg, #22d3ee, #3b82f6)",
      details:
        "Transforming abstract ideas into structured visual narratives through detailed storyboarding and strategic planning.",
      tools: ["Adobe Premiere", "Storyboard Pro", "Miro"],
      features: ["Narrative Structure", "Shot Planning", "Visual Strategy"],
    },
    {
      title: "Mood",
      description: "Atmosphere & Tone Setting",
      icon: "🎨",
      color: "from-purple-400 to-cyan-500",
      gradient: "linear-gradient(135deg, #a855f7, #22d3ee)",
      details:
        "Establishing the visual language through color theory, music selection, and stylistic choices that evoke specific emotions.",
      tools: ["DaVinci Resolve", "Adobe Color", "Artlist"],
      features: ["Color Grading", "Music Selection", "Visual Style"],
    },
    {
      title: "Rough Cut",
      description: "Structural Assembly",
      icon: "✂️",
      color: "from-blue-400 to-purple-500",
      gradient: "linear-gradient(135deg, #3b82f6, #a855f7)",
      details:
        "Building the foundational timeline with precise sequencing, pacing, and narrative flow to create a cohesive story.",
      tools: ["Final Cut Pro", "Adobe Premiere", "Frame.io"],
      features: ["Timeline Assembly", "Pacing", "Narrative Flow"],
    },
    {
      title: "Polish",
      description: "Refinement & Enhancement",
      icon: "✨",
      color: "from-cyan-500 to-blue-600",
      gradient: "linear-gradient(135deg, #06b6d4, #1d4ed8)",
      details:
        "Elevating the visual and auditory experience through meticulous color grading, audio mixing, and transition refinement.",
      tools: ["DaVinci Resolve", "After Effects", "Pro Tools"],
      features: ["Color Grading", "Audio Mixing", "Transition Effects"],
    },
    {
      title: "Magic",
      description: "Final Touches & Effects",
      icon: "🔮",
      color: "from-purple-500 to-cyan-600",
      gradient: "linear-gradient(135deg, #7e22ce, #0891b2)",
      details:
        "Adding cinematic enhancements, motion graphics, and visual effects that transform projects into unforgettable experiences.",
      tools: ["After Effects", "Cinema 4D", "Blender"],
      features: ["Motion Graphics", "Visual Effects", "Cinematic Enhancement"],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0, rotateX: -15 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.7,
        ease: [0.17, 0.67, 0.83, 0.67],
      },
    },
  };

  // Particle background effect
  const ParticleBackground = () => {
    return (
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <section
      className="relative py-20 bg-gradient-to-b from-gray-900 to-black overflow-hidden"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 bg-cyan-500 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-1/4 h-1/4 bg-purple-500 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
        <ParticleBackground />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-900/20 border border-cyan-500/30 mb-6">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse mr-2"></div>
            <span className="text-cyan-300 text-sm font-mono">
              CREATIVE WORKFLOW
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            The{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Editor's Mind
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A glimpse into my creative process—transforming raw ideas into
            visual masterpieces
          </p>
        </motion.div>

        {/* Process Timeline - Holographic Style */}
        <div className="relative mb-20">
          {/* Connector line with glow */}
          <div className="absolute left-4 md:left-1/2 top-16 h-2/3 w-1 bg-gradient-to-b from-cyan-500/20 to-purple-500/20 rounded-full transform -translate-x-1/2">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500 to-purple-500 rounded-full opacity-30 animate-pulse"></div>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className="relative flex flex-col items-center group"
                variants={itemVariants}
                style={{
                  rotateX: index === activeStep ? rotateX : 0,
                  rotateY: index === activeStep ? rotateY : 0,
                }}
              >
                {/* Step connector dots with glow */}
                <div className="absolute top-8 w-5 h-5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 z-10 flex items-center justify-center">
                  <div className="w-3 h-3 bg-cyan-300 rounded-full"></div>
                  <div className="absolute inset-0 rounded-full bg-cyan-400 opacity-70 animate-ping"></div>
                </div>

                {/* Step card - Holographic style */}
                <motion.div
                  className={`mt-12 p-6 rounded-2xl bg-gray-800/20 backdrop-blur-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-500 cursor-pointer w-full h-72 flex flex-col relative overflow-hidden ${
                    activeStep === index
                      ? "ring-2 ring-cyan-500/50 shadow-lg shadow-cyan-500/20 glow-effect"
                      : ""
                  }`}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3 },
                  }}
                  onClick={() => setActiveStep(index)}
                  animate={{
                    boxShadow:
                      activeStep === index
                        ? [
                            "0 0 15px rgba(34, 211, 238, 0.3)",
                            "0 0 25px rgba(34, 211, 238, 0.5)",
                            "0 0 15px rgba(34, 211, 238, 0.3)",
                          ]
                        : "0 0 0px rgba(34, 211, 238, 0)",
                  }}
                  transition={{
                    duration: 2,
                    repeat: activeStep === index ? Infinity : 0,
                  }}
                >
                  {/* Holographic grid overlay */}
                  <div className="absolute inset-0 opacity-10 pattern-grid-lg pattern-cyan-500 pattern-size-6 pattern-opacity-100"></div>

                  <div className="text-center mb-4 z-10">
                    <div className="text-4xl mb-3 filter drop-shadow-lg">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {step.title}
                    </h3>
                    <p className="text-cyan-300 text-sm">{step.description}</p>
                  </div>

                  <div className="mt-auto z-10">
                    <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden mb-2">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${step.color}`}
                        initial={{ width: "0%" }}
                        whileInView={{ width: "100%" }}
                        transition={{
                          duration: 1.5,
                          delay: index * 0.2,
                          ease: "easeOut",
                        }}
                        viewport={{ once: true }}
                      />
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">
                        {index + 1}/5
                      </span>
                      <motion.div
                        animate={{
                          scale: activeStep === index ? [1, 1.2, 1] : 1,
                          rotate: activeStep === index ? [0, 10, -10, 0] : 0,
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: activeStep === index ? Infinity : 0,
                        }}
                      >
                        <div className="w-7 h-7 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                          <svg
                            className="w-3 h-3 text-white"
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
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Step Details - Holographic Display */}
        <motion.div
          className="bg-gray-800/20 backdrop-blur-xl rounded-2xl border border-cyan-500/30 p-8 mb-20 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Holographic effect */}
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 rounded-2xl opacity-50 blur-xl"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
            <div>
              <div className="flex items-center mb-6">
                <span className="text-3xl mr-4">
                  {processSteps[activeStep].icon}
                </span>
                <h3 className="text-3xl font-bold text-white">
                  {processSteps[activeStep].title}
                </h3>
              </div>
              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                {processSteps[activeStep].details}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-700/30 p-4 rounded-xl border border-cyan-500/10">
                  <div className="text-cyan-300 text-sm mb-3 font-medium">
                    Tools of Choice
                  </div>
                  <div className="space-y-2">
                    {processSteps[activeStep].tools.map((tool, i) => (
                      <div key={i} className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-cyan-500 mr-3"></div>
                        <div className="text-white text-sm">{tool}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-700/30 p-4 rounded-xl border border-cyan-500/10">
                  <div className="text-cyan-300 text-sm mb-3 font-medium">
                    Focus Areas
                  </div>
                  <div className="space-y-2">
                    {processSteps[activeStep].features.map((feature, i) => (
                      <div key={i} className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-cyan-500 mr-3"></div>
                        <div className="text-white text-sm">{feature}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* 3D Timeline Visualization */}
              <div className="bg-gray-900/80 rounded-2xl p-6 border border-cyan-500/20 shadow-2xl shadow-cyan-500/10">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-cyan-300 text-lg font-medium">
                    Neural Timeline
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                    <div
                      className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-cyan-300 animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Audio waveform */}
                  <div className="h-4 bg-gray-800 rounded-full overflow-hidden relative">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 absolute inset-0"
                      animate={{
                        width: ["0%", "100%", "0%"],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <div className="absolute inset-0 flex">
                      {[...Array(40)].map((_, i) => (
                        <div
                          key={i}
                          className="h-full w-px bg-cyan-500/30"
                          style={{ marginLeft: i % 2 === 0 ? "2px" : "4px" }}
                        ></div>
                      ))}
                    </div>
                  </div>

                  {/* Video tracks with 3D effect */}
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4].map((track) => (
                      <motion.div
                        key={track}
                        className="flex-1 h-3 bg-gray-700 rounded-md overflow-hidden relative"
                        whileHover={{ scale: 1.05 }}
                        style={{ perspective: 1000 }}
                      >
                        <motion.div
                          className="h-full bg-cyan-500 absolute inset-0"
                          animate={{
                            width: ["0%", "100%"],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: track * 0.2,
                            ease: "easeInOut",
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Keyframes with connection lines */}
                  <div className="relative h-6">
                    {[1, 2, 3, 4, 5].map((point) => (
                      <motion.div
                        key={point}
                        className="absolute w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/30"
                        style={{ left: `${point * 16}%` }}
                        animate={{
                          scale: [1, 1.5, 1],
                          boxShadow: [
                            "0 0 0px rgba(34, 211, 238, 0)",
                            "0 0 10px rgba(34, 211, 238, 0.8)",
                            "0 0 0px rgba(34, 211, 238, 0)",
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: point * 0.3,
                        }}
                      />
                    ))}
                    <svg
                      className="absolute inset-0 w-full h-3"
                      viewBox="0 0 100 6"
                    >
                      <path
                        d="M10,3 L90,3"
                        stroke="rgba(34, 211, 238, 0.3)"
                        strokeWidth="1"
                        fill="none"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Before/After Comparison - Holographic Slider */}
        <motion.div
          className="bg-gray-800/20 backdrop-blur-xl rounded-2xl border border-cyan-500/30 p-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Holographic effect */}
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 rounded-2xl opacity-50 blur-xl"></div>

          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-white text-center mb-10">
              Raw <span className="text-cyan-400">vs.</span> Polished
            </h3>

            <div className="relative h-64 md:h-96 bg-gray-900 rounded-2xl overflow-hidden border border-cyan-500/20">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 z-10"></div>

              <div className="absolute inset-0 flex">
                {/* Before side */}
                <div className="w-1/2 h-full bg-gray-800/70 flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="text-cyan-300 text-xl mb-3 font-medium">
                      Raw Footage
                    </div>
                    <div className="text-gray-400 text-sm space-y-1">
                      <p>• Flat colors</p>
                      <p>• Unmixed audio</p>
                      <p>• Uncut sequences</p>
                    </div>
                  </div>
                </div>

                {/* After side */}
                <div className="w-1/2 h-full bg-gradient-to-br from-cyan-900/20 to-purple-900/20 flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="text-cyan-300 text-xl mb-3 font-medium">
                      Finished Magic
                    </div>
                    <div className="text-gray-400 text-sm space-y-1">
                      <p>• Color graded</p>
                      <p>• Mixed audio</p>
                      <p>• Cinematic polish</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slider control with glow */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-full bg-cyan-500">
                <div className="absolute inset-0 bg-cyan-500/50 animate-pulse"></div>
              </div>
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center cursor-grab shadow-lg shadow-cyan-500/30 z-20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95, cursor: "grabbing" }}
                drag="x"
                dragConstraints={{ left: -200, right: 200 }}
                dragElastic={0.1}
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </motion.div>
            </div>

            <div className="flex justify-between items-center mt-6 text-sm text-gray-400">
              <span className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-cyan-500 mr-2 animate-pulse"></div>
                Drag to compare
              </span>
              <span className="flex items-center">
                See the transformation
                <div
                  className="w-2 h-2 rounded-full bg-cyan-500 ml-2 animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                ></div>
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .pattern-grid-lg {
          background-image: linear-gradient(currentColor 1px, transparent 1px),
            linear-gradient(to right, currentColor 1px, transparent 1px);
        }
        .glow-effect {
          box-shadow: 0 0 15px rgba(34, 211, 238, 0.5);
        }
      `}</style>
    </section>
  );
};

export default About;
