import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { getServices } from "../../services/api"; // Adjust the import path as needed

const NextGenServices = () => {
  const [activeService, setActiveService] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);

  // Text truncation function
  const truncateText = (text, maxLength = 100) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await getServices();

        if (response.status === "success" && response.data.services) {
          // Transform API data to match component structure
          const transformedServices = response.data.services.map((service) => ({
            id: service._id,
            icon: service.icon || "🎬",
            title: service.title,
            description: service.description, // Short description truncated
            detailedDescription: service.details || service.description,
            features: service.features || [],
            examples: service.examples || [], // Include examples from API
            deliveryTime: service.deliveryTime || "Not specified",
            revisions: service.revisions || "Not specified",
            // Include additional API data if needed
            apiData: service,
          }));

          setServices(transformedServices);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to load services. Please try again later.");
        // Fallback to empty array if API fails
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

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

  // Loading state
  if (loading) {
    return (
      <section className="relative py-20 bg-gradient-to-b from-gray-950 to-black overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="text-white text-2xl">Loading services...</div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="relative py-20 bg-gradient-to-b from-gray-950 to-black overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="text-red-400 text-xl">{error}</div>
        </div>
      </section>
    );
  }

  // No services state
  if (services.length === 0) {
    return (
      <section className="relative py-20 bg-gradient-to-b from-gray-950 to-black overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="text-gray-400 text-xl">
            No services available at the moment.
          </div>
        </div>
      </section>
    );
  }

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
                OUR SERVICES
              </span>
              <div className="absolute -inset-6 bg-cyan-500/10 blur-2xl -z-10 rounded-full"></div>
            </h2>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></div>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mt-6">
            Professional video editing services tailored to your needs
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
                        <div className="flex-1 min-w-0">
                          {" "}
                          {/* Added min-w-0 for truncation */}
                          <span className="font-medium text-white block truncate">
                            {" "}
                            {/* Added truncate */}
                            {service.title}
                          </span>
                          <span className="text-sm text-cyan-300 block mt-1 truncate">
                            {" "}
                            {/* Added truncate */}
                            {service.description}
                          </span>
                        </div>
                        {activeService === index && (
                          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse flex-shrink-0 ml-2" />
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
                    <div className="text-4xl mr-4 bg-gradient-to-br from-cyan-400 to-purple-500 p-3 rounded-xl flex-shrink-0">
                      {services[activeService].icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-2xl font-bold text-white">
                        {" "}
                        {/* Added truncate */}
                        {services[activeService].title}
                      </h3>
                      <p className="text-cyan-300">
                        {" "}
                        {services[activeService].description}
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                      Detailed Overview
                      <div className="ml-2 w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                    </h4>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {services[activeService].detailedDescription}
                      {/* Truncated detailed description */}
                    </p>

                    {/* Service Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-800/30 rounded-lg p-3">
                        <div className="flex items-center text-sm text-cyan-300 mb-1">
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Delivery Time
                        </div>
                        <div className="text-white font-medium">
                          {services[activeService].deliveryTime} days
                        </div>
                      </div>
                      <div className="bg-gray-800/30 rounded-lg p-3">
                        <div className="flex items-center text-sm text-cyan-300 mb-1">
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Revisions
                        </div>
                        <div className="text-white font-medium">
                          {services[activeService].revisions}
                        </div>
                      </div>
                    </div>

                    {services[activeService].features.length > 0 && (
                      <>
                        <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                          Key Features
                          <span className="ml-2 text-xs px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full">
                            {services[activeService].features.length} features
                          </span>
                        </h4>
                        <ul className="space-y-3 mb-6">
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
                                <span className="truncate">{feature}</span>{" "}
                                {/* Added truncate */}
                              </motion.li>
                            )
                          )}
                        </ul>
                      </>
                    )}

                    {services[activeService].examples.length > 0 && (
                      <>
                        <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                          Project Examples
                          <span className="ml-2 text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full">
                            {services[activeService].examples.length} examples
                          </span>
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {services[activeService].examples.map(
                            (example, index) => (
                              <motion.span
                                key={index}
                                className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                {truncateText(example, 20)}{" "}
                                {/* Truncated examples */}
                              </motion.span>
                            )
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Holographic effect lines */}
          <div className="absolute -inset-4 rounded-3xl border border-cyan-500/20 pointer-events-none"></div>
          <div className="absolute -inset-6 rounded-3xl border border-purple-500/10 pointer-events-none"></div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Ready to elevate your content with our professional editing
            services? Schedule a free consultation to discuss your project
            needs.
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
