import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const FeaturedPortfolio = () => {
  const [activeVideo, setActiveVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const containerRef = useRef(null);

  // Sample video data
  const videos = [
    {
      id: 1,
      title: "Neural Nexus",
      description: "AI-generated narrative with adaptive storytelling",
      category: "Experimental",
      thumbnail:
        "https://images.unsplash.com/photo-1643330683233-ff2ac89b002c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      preview:
        "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4",
      videoUrl: "#",
    },
    {
      id: 2,
      title: "Quantum Dreams",
      description: "Surreal visuals exploring quantum reality",
      category: "Art Film",
      thumbnail:
        "https://images.unsplash.com/photo-1677442135135-416f8aa26a5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      preview:
        "https://assets.mixkit.co/videos/preview/mixkit-a-girl-blowing-a-bubble-gum-at-an-amusement-park-1226-large.mp4",
      videoUrl: "#",
    },
    {
      id: 3,
      title: "Holographic Memories",
      description: "AR-enhanced personal narrative experience",
      category: "Documentary",
      thumbnail:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      preview:
        "https://assets.mixkit.co/videos/preview/mixkit-young-woman-talking-on-video-call-397-large.mp4",
      videoUrl: "#",
    },
    {
      id: 4,
      title: "Data Stream",
      description: "Visualizing the flow of information in digital age",
      category: "Motion Graphics",
      thumbnail:
        "https://images.unsplash.com/photo-1677442135335-7d5f5f32e8b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      preview:
        "https://assets.mixkit.co/videos/preview/mixkit-winter-fashion-cold-looking-woman-concept-670-large.mp4",
      videoUrl: "#",
    },
    {
      id: 5,
      title: "Synthetic Nature",
      description: "Digital ecosystems and AI-generated environments",
      category: "CGI",
      thumbnail:
        "https://images.unsplash.com/photo-1677442135343-9b64d4c05015?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      preview:
        "https://assets.mixkit.co/videos/preview/mixkit-young-woman-talking-on-video-call-397-large.mp4",
      videoUrl: "#",
    },
  ];

  // Handle video play
  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  // Handle video pause
  const handlePauseVideo = () => {
    setIsPlaying(false);
  };

  // Swipe handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setActiveVideo((prev) => (prev + 1) % videos.length);
    } else if (isRightSwipe) {
      setActiveVideo((prev) => (prev - 1 + videos.length) % videos.length);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Auto-rotate active video
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPlaying) {
        setActiveVideo((prev) => (prev + 1) % videos.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [videos.length, isPlaying]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="relative py-20 bg-gradient-to-b from-gray-950 to-black overflow-hidden"
      ref={containerRef}
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="holographic-grid"></div>
      </div>

      {/* Big bubble background effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            width: "500px",
            height: "500px",
            left: "10%",
            top: "20%",
            opacity: "0.15",
            background:
              "radial-gradient(circle at 30% 30%, rgba(0, 245, 255, 0.4), transparent)",
            filter: "blur(40px)",
          }}
        ></div>
        <div
          className="absolute rounded-full"
          style={{
            width: "600px",
            height: "600px",
            right: "5%",
            bottom: "15%",
            opacity: "0.15",
            background:
              "radial-gradient(circle at 70% 70%, rgba(147, 51, 234, 0.4), transparent)",
            filter: "blur(50px)",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block relative">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                HOLO GALLERY
              </span>
              <div className="absolute -inset-6 bg-cyan-500/10 blur-2xl -z-10 rounded-full"></div>
            </h2>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></div>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mt-6">
            Immersive 3D video experience with holographic technology
          </p>
        </motion.div>

        {/* 3D Video Gallery */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative h-[500px] md:h-[600px] mb-20 perspective-1000"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative w-full h-full transform-style-3d">
            {videos.map((video, index) => {
              const totalVideos = videos.length;
              const angle =
                (index * 360) / totalVideos - (activeVideo * 360) / totalVideos;
              const radius = 400; // px
              const active = index === activeVideo;

              // Calculate position based on angle
              const x = Math.sin((angle * Math.PI) / 180) * radius;
              const z = Math.cos((angle * Math.PI) / 180) * radius - radius;

              return (
                <motion.div
                  key={video.id}
                  className={`absolute top-1/2 left-1/2 w-72 md:w-96 h-44 md:h-60 transition-all duration-700 transform-style-3d ${
                    active
                      ? "z-50 scale-110 opacity-100"
                      : "opacity-70 scale-90"
                  }`}
                  style={{
                    transform: `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) rotateY(${-angle}deg)`,
                  }}
                  onClick={() => setActiveVideo(index)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative w-full h-full rounded-xl overflow-hidden transform transition-transform duration-500 hover:scale-105 cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Holographic effect */}
                    <div className="absolute inset-0 border border-cyan-400/30 rounded-xl holographic-effect"></div>

                    {/* Video info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                      <div className="flex items-center mb-2">
                        <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium">
                          {video.category}
                        </span>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-white truncate">
                        {video.title}
                      </h3>
                    </div>

                    {/* Active indicator */}
                    {active && (
                      <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-cyan-400 animate-ping"></div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation arrows */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-cyan-500/30 transition-colors"
            onClick={() =>
              setActiveVideo((activeVideo - 1 + videos.length) % videos.length)
            }
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
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-cyan-500/30 transition-colors"
            onClick={() => setActiveVideo((activeVideo + 1) % videos.length)}
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
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Swipe instructions for mobile */}
          <div className="md:hidden absolute bottom-2 left-0 right-0 flex justify-center items-center space-x-4 text-cyan-300/70">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="text-sm">Swipe to navigate</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </motion.div>

        {/* Active Video Detail */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-gray-700/30 mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-2">
              <div className="relative rounded-xl overflow-hidden">
                {isPlaying ? (
                  <video
                    src={videos[activeVideo].preview}
                    className="w-full h-auto aspect-video object-cover"
                    controls
                    onPause={handlePauseVideo}
                    autoPlay
                  />
                ) : (
                  <>
                    <img
                      src={videos[activeVideo].thumbnail}
                      alt={videos[activeVideo].title}
                      className="w-full h-auto aspect-video object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={handlePlayVideo}
                        className="bg-white/20 backdrop-blur-sm rounded-full p-4 border border-white/30 hover:scale-110 transition-transform duration-300"
                      >
                        <svg
                          className="w-12 h-12 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="mb-4">
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium">
                  {videos[activeVideo].category}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {videos[activeVideo].title}
              </h3>
              <p className="text-gray-300 mb-6">
                {videos[activeVideo].description}
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-white rounded-full transition-colors">
                  View Project
                </button>
                <button className="px-6 py-3 bg-transparent border border-cyan-500 text-cyan-300 hover:bg-cyan-500/10 rounded-full transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tech badges */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12"
        >
          <div className="px-4 py-2 md:px-5 md:py-3 bg-cyan-500/10 rounded-xl border border-cyan-500/30 flex items-center gap-2 md:gap-3">
            <div className="w-2 h-2 md:w-3 md:h-3 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-cyan-300 text-sm md:text-base">
              Holographic Display
            </span>
          </div>
          <div className="px-4 py-2 md:px-5 md:py-3 bg-purple-500/10 rounded-xl border border-purple-500/30 flex items-center gap-2 md:gap-3">
            <div className="w-2 h-2 md:w-3 md:h-3 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-purple-300 text-sm md:text-base">
              3D Spatial Audio
            </span>
          </div>
          <div className="px-4 py-2 md:px-5 md:py-3 bg-cyan-500/10 rounded-xl border border-cyan-500/30 flex items-center gap-2 md:gap-3">
            <div className="w-2 h-2 md:w-3 md:h-3 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-cyan-300 text-sm md:text-base">
              Neural Rendering
            </span>
          </div>
          <div className="px-4 py-2 md:px-5 md:py-3 bg-purple-500/10 rounded-xl border border-purple-500/30 flex items-center gap-2 md:gap-3">
            <div className="w-2 h-2 md:w-3 md:h-3 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-purple-300 text-sm md:text-base">
              Quantum Compression
            </span>
          </div>
        </motion.div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full font-semibold text-lg hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25">
            View All Projects
          </button>
        </motion.div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
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
        }
        .holographic-effect {
          box-shadow: 0 0 15px rgba(0, 245, 255, 0.5),
            inset 0 0 15px rgba(0, 245, 255, 0.3);
        }
      `}</style>
    </motion.section>
  );
};

export default FeaturedPortfolio;
