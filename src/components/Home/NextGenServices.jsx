import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const NextGenServices = () => {
  const [activeService, setActiveService] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);

  // Services data with enhanced descriptions
  const services = [
    {
      id: 1,
      icon: "🎬",
      title: "YouTube / Social",
      description: "Edits that maximize retention and engagement",
      detailedDescription:
        "Our specialized editing techniques are engineered to boost viewer retention rates by an average of 40%. We analyze audience behavior patterns and implement strategic cuts, hooks, and pacing that align with platform algorithms to maximize your content's reach and impact.",
      features: [
        "Algorithm-optimized cuts designed for maximum retention",
        "Attention retention analysis with heat mapping",
        "Platform-specific formatting for YouTube, TikTok, Instagram, and more",
        "A/B testing for thumbnail and content optimization",
        "Audience engagement pattern analysis",
      ],
      stats: "Avg. 40% increase in viewer retention",
      price: "Starting at $299/video",
    },
    {
      id: 2,
      icon: "🎥",
      title: "Ads & Commercials",
      description: "Cinematic storytelling for brands",
      detailedDescription:
        "Transform your brand message into compelling visual narratives that convert. Our commercial editing combines cinematic techniques with psychological triggers that drive action, whether for TV spots, social media ads, or digital campaigns.",
      features: [
        "Brand narrative development and storyboarding",
        "High-impact visual sequences optimized for conversion",
        "Psychological trigger implementation",
        "Multi-format delivery for various platforms",
        "Performance analytics and optimization recommendations",
      ],
      stats: "Avg. 32% higher conversion rates",
      price: "Starting at $799/project",
    },
    {
      id: 3,
      icon: "🏢",
      title: "Corporate",
      description: "Professional videos with clean branding",
      detailedDescription:
        "Elevate your corporate communications with professionally edited videos that maintain brand integrity while effectively delivering your message. From executive presentations to training materials, we ensure your content reflects your company's standards.",
      features: [
        "Executive messaging with professional pacing",
        "Brand consistency across all visual elements",
        "Subtle animation for emphasis without distraction",
        "Multi-camera editing for events and presentations",
        "Closed captioning and accessibility features",
      ],
      stats: "Used by 50+ Fortune 500 companies",
      price: "Custom pricing based on needs",
    },
    {
      id: 4,
      icon: "✨",
      title: "Motion Graphics",
      description: "Custom titles and animations",
      detailedDescription:
        "Bring data and concepts to life with custom motion graphics that enhance understanding and retention. Our animations are tailored to your brand identity and designed to simplify complex information through visual storytelling.",
      features: [
        "Dynamic typography and kinetic text animations",
        "3D elements and depth-enhanced visuals",
        "Seamless integration with live-action footage",
        "Data visualization and infographic animation",
        "Custom illustration and character animation",
      ],
      stats: "60% higher information retention",
      price: "Starting at $499/project",
    },
    {
      id: 5,
      icon: "📊",
      title: "Documentary",
      description: "Authentic stories with emotional impact",
      detailedDescription:
        "Capture the essence of real stories with editing that honors the narrative while maximizing emotional resonance. We specialize in structuring raw footage into compelling documentaries that engage audiences from start to finish.",
      features: [
        "Narrative structure development from raw footage",
        "Emotional pacing and rhythm analysis",
        "Archival footage integration and restoration",
        "Interview sequencing for maximum impact",
        "Sound design tailored to emotional cues",
      ],
      stats: "Festival selections increased by 45%",
      price: "Starting at $1,200/project",
    },
    {
      id: 6,
      icon: "🎵",
      title: "Music Videos",
      description: "Rhythmic editing that complements audio",
      detailedDescription:
        "Create visual experiences that amplify your music through rhythmically synchronized editing. We work closely with artists to develop concepts that visually represent their sound and brand identity.",
      features: [
        "Precise beat synchronization and visual rhythm",
        "Color grading tailored to music genre and mood",
        "Artist representation and brand alignment",
        "Special effects that complement musical elements",
        "Multi-platform optimization for music platforms",
      ],
      stats: "Avg. 25% more streams on platforms",
      price: "Starting at $899/video",
    },
  ];

  // 3D tilt effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      setIsHovering(true);
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      container.style.transform = `
        perspective(1000px)
        rotateX(${y * -5}deg)
        rotateY(${x * 5}deg)
        scale3d(1.02, 1.02, 1.02)
      `;
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      container.style.transform = `
        perspective(1000px)
        rotateX(0deg)
        rotateY(0deg)
        scale3d(1, 1, 1)
      `;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-950 to-black overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="holographic-grid"></div>
      </div>

      {/* Holographic particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full holographic-particle"
            style={{
              width: `${3 + Math.random() * 5}px`,
              height: `${3 + Math.random() * 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${
                Math.random() > 0.5
                  ? "rgba(0, 245, 255, 0.7)"
                  : "rgba(147, 51, 234, 0.7)"
              }, transparent)`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block relative">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                HOLO SERVICES
              </span>
              <div className="absolute -inset-6 bg-cyan-500/10 blur-2xl -z-10 rounded-full"></div>
            </h2>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></div>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mt-6">
            Next-generation video solutions with holographic interface
            technology, powered by AI-assisted editing algorithms and real-time
            collaboration features
          </p>
        </motion.div>

        {/* Holographic Services Interface */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Main holographic display */}
          <div
            ref={containerRef}
            className="bg-gray-900/20 backdrop-blur-xl rounded-3xl border border-cyan-500/30 p-8 holographic-display transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Service selector panel */}
              <div className="lg:col-span-1">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  Service Modules
                  <span className="ml-2 text-xs px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full">
                    {services.length} available
                  </span>
                </h3>
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {services.map((service, index) => (
                    <motion.button
                      key={service.id}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                        activeService === index
                          ? "bg-cyan-500/20 border border-cyan-500/50 shadow-lg shadow-cyan-500/20"
                          : "bg-gray-800/30 border border-gray-700/30 hover:bg-cyan-500/10"
                      }`}
                      onClick={() => setActiveService(index)}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{service.icon}</span>
                        <div className="flex-1">
                          <span className="font-medium text-white block">
                            {service.title}
                          </span>
                          <span className="text-sm text-cyan-300 block mt-1">
                            {service.description}
                          </span>
                        </div>
                        {activeService === index && (
                          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Service details panel */}
              <div className="lg:col-span-2">
                <motion.div
                  key={activeService}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-900/40 backdrop-blur-md rounded-2xl p-6 border border-purple-500/30 h-full"
                >
                  <div className="flex items-start mb-6">
                    <div className="text-4xl mr-4 bg-gradient-to-br from-cyan-400 to-purple-500 p-3 rounded-xl">
                      {services[activeService].icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white">
                        {services[activeService].title}
                      </h3>
                      <p className="text-cyan-300">
                        {services[activeService].description}
                      </p>

                      {/* Stats and pricing */}
                      <div className="flex flex-wrap gap-4 mt-4">
                        <div className="flex items-center text-sm bg-cyan-900/30 px-3 py-1 rounded-full">
                          <svg
                            className="w-4 h-4 mr-1 text-cyan-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {services[activeService].stats}
                        </div>
                        <div className="flex items-center text-sm bg-purple-900/30 px-3 py-1 rounded-full text-purple-300">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                          {services[activeService].price}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                      Detailed Overview
                      <div className="ml-2 w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                    </h4>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {services[activeService].detailedDescription}
                    </p>

                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                      Key Features
                      <span className="ml-2 text-xs px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full">
                        {services[activeService].features.length} features
                      </span>
                    </h4>
                    <ul className="space-y-3">
                      {services[activeService].features.map(
                        (feature, index) => (
                          <motion.li
                            key={index}
                            className="flex items-start text-gray-300"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <svg
                              className="w-5 h-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span>{feature}</span>
                          </motion.li>
                        )
                      )}
                    </ul>
                  </div>

                  <div className="flex space-x-4 pt-4 border-t border-gray-700/50">
                    <button className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white rounded-lg transition-all duration-300 flex items-center shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      View Demo
                    </button>
                    <button className="px-5 py-2.5 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-all duration-300 flex items-center">
                      Contact
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Holographic effect lines */}
          <div className="absolute -inset-4 rounded-3xl border border-cyan-500/20 pointer-events-none"></div>
          <div className="absolute -inset-6 rounded-3xl border border-purple-500/10 pointer-events-none"></div>
        </motion.div>

        {/* Tech specs footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
        >
          <div className="bg-gray-900/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30 text-center hover:border-cyan-500/30 transition-colors duration-300">
            <div className="text-cyan-400 text-2xl font-bold">8K</div>
            <div className="text-gray-300 text-sm">Resolution Support</div>
            <div className="text-xs text-cyan-300 mt-2">Ultra HD quality</div>
          </div>
          <div className="bg-gray-900/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30 text-center hover:border-cyan-500/30 transition-colors duration-300">
            <div className="text-cyan-400 text-2xl font-bold">120fps</div>
            <div className="text-gray-300 text-sm">High Frame Rate</div>
            <div className="text-xs text-cyan-300 mt-2">Smooth motion</div>
          </div>
          <div className="bg-gray-900/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30 text-center hover:border-cyan-500/30 transition-colors duration-300">
            <div className="text-cyan-400 text-2xl font-bold">HDR</div>
            <div className="text-gray-300 text-sm">Dynamic Range</div>
            <div className="text-xs text-cyan-300 mt-2">Enhanced contrast</div>
          </div>
          <div className="bg-gray-900/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30 text-center hover:border-cyan-500/30 transition-colors duration-300">
            <div className="text-cyan-400 text-2xl font-bold">
              Color Grading
            </div>
            <div className="text-gray-300 text-sm">Color Correction</div>
            <div className="text-xs text-cyan-300 mt-2">Realistic colors</div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Ready to elevate your content with our next-generation editing
            services? Schedule a free consultation to discuss your project needs
            and receive a customized quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full font-semibold text-lg hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25">
              Book Call
            </button>
            <button className="px-8 py-4 bg-transparent border border-cyan-500/50 text-cyan-300 rounded-full font-semibold text-lg hover:bg-cyan-500/10 transition-all duration-300">
              View Portfolio
            </button>
          </div>
        </motion.div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        .holographic-grid {
          background-image: linear-gradient(
              rgba(0, 245, 255, 0.1) 1px,
              transparent 1px
            ),
            linear-gradient(90deg, rgba(0, 245, 255, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          background-position: center center;
          width: 100%;
          height: 100%;
          animation: grid-move 20s linear infinite;
        }
        .holographic-particle {
          animation: holographic-float 15s ease-in-out infinite;
        }
        .holographic-display {
          box-shadow: 0 0 80px rgba(0, 245, 255, 0.15),
            inset 0 0 20px rgba(0, 245, 255, 0.1);
          transition: transform 0.1s ease-out;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 245, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 245, 255, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 245, 255, 0.3);
        }
        @keyframes holographic-float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(120deg);
          }
          66% {
            transform: translateY(20px) rotate(240deg);
          }
        }
        @keyframes grid-move {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 50px 50px;
          }
        }
      `}</style>
    </section>
  );
};

export default NextGenServices;
