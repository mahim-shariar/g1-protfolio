import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Services = () => {
  const canvasRef = useRef(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  // Background grid animation
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

    const drawGrid = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines
      ctx.strokeStyle = "rgba(66, 153, 225, 0.1)";
      ctx.lineWidth = 1;

      const cellSize = 50;
      const offsetX = (time * 0.01) % cellSize;
      const offsetY = (time * 0.01) % cellSize;

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
        `rgba(100, 50, 255, ${0.03 + pulseIntensity * 0.03})`
      );
      gradient.addColorStop(
        0.5,
        `rgba(0, 0, 80, ${0.05 + pulseIntensity * 0.03})`
      );
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.6)");

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

  // Animation variants
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

  // Handle Learn More click
  const handleLearnMore = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedService(null), 300);
  };

  // Services data
  const services = [
    {
      id: 1,
      title: "Cinematic Editing",
      description:
        "Transform your footage into cinematic masterpieces with our expert editing techniques, color grading, and seamless transitions.",
      features: [
        "4K/8K Editing",
        "Color Grading",
        "Seamless Transitions",
        "Multi-camera Sync",
      ],
      icon: "🎬",
      details:
        "Our cinematic editing service transforms raw footage into compelling visual stories. Using industry-standard software and techniques, we create seamless narratives with perfect pacing, emotional impact, and visual coherence. Whether you need a short film, documentary, or commercial, we'll make your content stand out.",
      deliveryTime: "3-7 days",
      revisions: "3 included",
      examples: ["Short Films", "Documentaries", "Commercials", "Music Videos"],
    },
    {
      id: 2,
      title: "Motion Graphics",
      description:
        "Elevate your videos with stunning motion graphics, animated titles, and visual effects that captivate your audience.",
      features: [
        "Animated Titles",
        "2D/3D Animation",
        "Visual Effects",
        "Logo Animation",
      ],
      icon: "✨",
      details:
        "Bring your brand to life with our motion graphics services. We create captivating animations, dynamic titles, and engaging visual elements that enhance your message and keep viewers engaged. From explainer videos to animated logos, we'll make your content move.",
      deliveryTime: "5-10 days",
      revisions: "2 included",
      examples: [
        "Explainer Videos",
        "Animated Logos",
        "Title Sequences",
        "Infographic Animations",
      ],
    },
    {
      id: 3,
      title: "Visual Effects",
      description:
        "Add wow-factor to your projects with professional VFX that blend seamlessly with your footage for a truly immersive experience.",
      features: [
        "Green Screen",
        "CGI Integration",
        "Particle Effects",
        "Compositing",
      ],
      icon: "🔥",
      details:
        "Our VFX artists can transform ordinary footage into extraordinary visual experiences. From green screen compositing to complex CGI integration, we create believable effects that serve your story and enhance production value without distracting from your message.",
      deliveryTime: "7-14 days",
      revisions: "2 included",
      examples: [
        "Green Screen Removal",
        "CGI Elements",
        "Environmental Effects",
        "Simulations",
      ],
    },
    {
      id: 4,
      title: "Sound Design",
      description:
        "Complete your visual experience with immersive audio design, custom soundscapes, and professional mixing.",
      features: [
        "Soundscapes",
        "Audio Mixing",
        "Foley Art",
        "Voiceover Integration",
      ],
      icon: "🎧",
      details:
        "Great video needs great audio. Our sound design service provides professional audio mixing, custom sound effects, foley artistry, and voiceover integration. We'll balance dialogue, music, and effects to create an immersive auditory experience that complements your visuals.",
      deliveryTime: "2-5 days",
      revisions: "3 included",
      examples: [
        "Audio Mixing",
        "Sound Effects",
        "Voiceover Editing",
        "Ambient Soundscapes",
      ],
    },
    {
      id: 5,
      title: "Color Grading",
      description:
        "Give your footage a professional look with our advanced color grading services that set the perfect mood and tone.",
      features: [
        "Mood Setting",
        "Style Consistency",
        "Skin Tone Correction",
        "Film Emulation",
      ],
      icon: "🎨",
      details:
        "Color sets the mood and tone of your visual story. Our color grading service enhances your footage with professional color correction, stylistic looks, and consistency across shots. We'll make your visuals pop with carefully crafted color palettes that support your narrative.",
      deliveryTime: "2-4 days",
      revisions: "3 included",
      examples: [
        "Color Correction",
        "Stylistic Looks",
        "Shot Matching",
        "Film Emulation",
      ],
    },
    {
      id: 6,
      title: "Full Production",
      description:
        "End-to-end video production services from concept development to final delivery for your most ambitious projects.",
      features: [
        "Concept Development",
        "Script Writing",
        "Full Production",
        "Post-Production",
      ],
      icon: "🚀",
      details:
        "From idea to execution, our full production service handles every aspect of your project. We develop concepts, write scripts, coordinate production, and handle all post-production needs. This comprehensive solution ensures a consistent vision and high-quality result from start to finish.",
      deliveryTime: "Varies by project",
      revisions: "Custom",
      examples: [
        "Commercial Productions",
        "Corporate Videos",
        "Online Content Series",
        "Event Coverage",
      ],
    },
  ];

  // Workflow steps
  const workflowSteps = [
    {
      title: "Concept & Strategy",
      description:
        "We begin by understanding your vision and developing a creative strategy that aligns with your goals.",
      icon: "💡",
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "Production Planning",
      description:
        "Our team creates a detailed plan including timelines, resource allocation, and technical requirements.",
      icon: "📋",
      color: "from-purple-500 to-pink-600",
    },
    {
      title: "Creative Execution",
      description:
        "We bring your vision to life with precision editing, effects, and technical expertise.",
      icon: "🎥",
      color: "from-amber-500 to-orange-600",
    },
    {
      title: "Refinement & Delivery",
      description:
        "We refine the project based on your feedback and deliver the final product in your preferred format.",
      icon: "✨",
      color: "from-emerald-500 to-green-600",
    },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black flex flex-col items-center justify-center pt-20 pb-10">
      {/* Animated background canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Gradient overlays for cinematic effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-black/80"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/5 to-cyan-900/5"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-cyan-400 font-mono uppercase tracking-widest text-sm md:text-base mb-4"
            variants={itemVariants}
          >
            Our Creative Services
          </motion.h2>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            variants={itemVariants}
          >
            Visual Storytelling{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Excellence
            </span>
          </motion.h1>

          <motion.p
            className="text-lg text-gray-300 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            We transform your vision into captivating visual stories with
            cutting-edge technology and creative expertise.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="bg-gray-900 backdrop-blur-md rounded-xl border border-white/10 p-6 group hover:border-cyan-500/30 transition-all duration-500 overflow-hidden flex flex-col h-full relative"
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="flex-grow">
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-300 mb-4">{service.description}</p>

                <ul className="mb-5">
                  {service.features.map((feature, i) => (
                    <li
                      key={i}
                      className="text-cyan-300 text-sm flex items-center mb-2"
                    >
                      <span className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-4">
                <motion.button
                  className="w-full py-2 bg-cyan-500/10 text-cyan-300 rounded-lg text-sm group-hover:bg-cyan-500/20 transition-colors flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleLearnMore(service)}
                >
                  Explore Service
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </motion.button>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Workflow Process Section */}
        <motion.div
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-3xl font-bold text-white mb-4">
              Our Collaborative Process
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We work closely with you through every step to ensure your vision
              is perfectly realized.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={index}
                className="bg-gray-900/50 backdrop-blur-md rounded-xl border border-white/10 p-6 text-center group hover:border-cyan-500/30 transition-all duration-500 h-full"
                variants={itemVariants}
                whileHover={{ y: -5 }}
                onMouseEnter={() => setActiveStep(index)}
              >
                <div
                  className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-2xl mb-4 transition-transform duration-300 group-hover:scale-110`}
                >
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-300 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Client Collaboration Section */}
        <motion.div
          className="mb-20 bg-gray-900/30 backdrop-blur-md rounded-3xl border border-cyan-500/20 p-8 md:p-12 relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Fixed grid pattern - only applied to this section */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(66, 153, 225, 0.1) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(66, 153, 225, 0.1) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          ></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Collaborative{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                  Partnership
                </span>
              </h2>
              <p className="text-gray-300 mb-6">
                We believe the best results come from true collaboration. That's
                why we work closely with you throughout the entire process,
                ensuring your vision is realized exactly as you imagined.
              </p>

              <div className="space-y-4">
                {[
                  "Regular progress updates and reviews",
                  "Direct communication with your dedicated editor",
                  "Flexible revision process",
                  "Multiple delivery formats for any platform",
                ].map((item, i) => (
                  <div key={i} className="flex items-start">
                    <div className="bg-cyan-500/10 p-2 rounded-lg mr-3">
                      <svg
                        className="w-5 h-5 text-cyan-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div className="relative" variants={itemVariants}>
              {/* Collaboration visual */}
              <div className="bg-gray-800 rounded-2xl overflow-hidden p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                      C
                    </div>
                    <div className="ml-3">
                      <div className="text-white font-medium">Client</div>
                      <div className="text-cyan-400 text-sm">You</div>
                    </div>
                  </div>
                  <div className="text-gray-400 animate-pulse">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      E
                    </div>
                    <div className="ml-3">
                      <div className="text-white font-medium">Editor</div>
                      <div className="text-purple-400 text-sm">Our Team</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4 mb-3">
                  <div className="text-cyan-300 text-sm mb-1">
                    Client Feedback
                  </div>
                  <div className="text-white">
                    "Can we make the intro more dynamic?"
                  </div>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="text-purple-300 text-sm mb-1">
                    Editor Response
                  </div>
                  <div className="text-white">
                    "Sure! I'll add some motion graphics to enhance it."
                  </div>
                </div>
              </div>

              {/* Floating elements around visual */}
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-cyan-400 rounded-full opacity-60"></div>
              <div className="absolute -bottom-3 -left-3 w-5 h-5 bg-purple-500 rounded-full opacity-60"></div>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border border-cyan-500/20 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Fixed grid pattern - only applied to this section */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(66, 153, 225, 0.1) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(66, 153, 225, 0.1) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
              opacity: 0.1,
            }}
          ></div>

          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            variants={itemVariants}
          >
            Ready to Elevate Your Content?
          </motion.h2>

          <motion.p
            className="text-gray-300 max-w-2xl mx-auto mb-8"
            variants={itemVariants}
          >
            Let's discuss your project and create something extraordinary
            together.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-full relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Start a Project</span>
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
              <span className="relative z-10">Book a Consultation</span>
              <div className="absolute inset-0 border border-cyan-400/50 rounded-full group-hover:border-cyan-400/80 transition-all duration-300"></div>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {isModalOpen && selectedService && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-gray-900/95 backdrop-blur-lg rounded-2xl border border-cyan-500/30 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="text-4xl mb-2">{selectedService.icon}</div>
                    <h2 className="text-2xl font-bold text-white">
                      {selectedService.title}
                    </h2>
                  </div>
                  <button
                    className="text-gray-400 hover:text-white transition-colors"
                    onClick={closeModal}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Service Overview
                  </h3>
                  <p className="text-gray-300">{selectedService.details}</p>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Features
                    </h3>
                    <ul className="space-y-2">
                      {selectedService.features.map((feature, i) => (
                        <li
                          key={i}
                          className="text-cyan-300 text-sm flex items-center"
                        >
                          <span className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Project Examples
                    </h3>
                    <ul className="space-y-2">
                      {selectedService.examples.map((example, i) => (
                        <li
                          key={i}
                          className="text-gray-300 text-sm flex items-center"
                        >
                          <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Typical Delivery Time
                    </h3>
                    <p className="text-gray-300">
                      {selectedService.deliveryTime}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Revisions Included
                    </h3>
                    <p className="text-gray-300">{selectedService.revisions}</p>
                  </div>
                </div>

                <motion.button
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Discuss This Service
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
          • CINEMATIC EDITING • MOTION GRAPHICS • VISUAL EFFECTS • 4K EDITING •
          COLOR GRADING • SOUND DESIGN • DRONE FOOTAGE • CINEMATIC SEQUENCES •
          ANIMATED TITLES • VISUAL EFFECTS • CINEMATIC SEQUENCES • SOUND DESIGN
          •
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Services;
