import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { getVideoReels } from "../../services/api";

const FeaturedPortfolio = () => {
  const [activeVideo, setActiveVideo] = useState(0);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const interactionTimeoutRef = useRef(null);

  // Fetch videos from API
  useEffect(() => {
    const fetchBestVideos = async () => {
      try {
        setLoading(true);
        const response = await getVideoReels({ isBest: true });

        if (response.status === "success" && response.data.videoReels) {
          const transformedVideos = response.data.videoReels.map((video) => ({
            id: video._id,
            title: video.title,
            description: video.description,
            category: video.category,
            thumbnail: video.thumbnailUrl,
            videoUrl: video.videoUrl,
            tags: video.tags || [],
            createdAt: video.createdAt,
            user: video.user,
          }));
          setVideos(transformedVideos);
        }
      } catch (err) {
        console.error("Error fetching videos:", err);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBestVideos();
  }, []);

  // User interaction handlers
  const handleUserInteraction = () => {
    setIsUserInteracting(true);

    // Clear any existing timeout
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }

    // Set timeout to reset interaction state after 3 seconds of inactivity
    interactionTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 3000);
  };

  // Video navigation
  const handleForward = () => {
    const nextIndex = (activeVideo + 1) % videos.length;
    switchVideo(nextIndex);
    handleUserInteraction(); // Mark as user interaction
  };

  const handleBackward = () => {
    const prevIndex = (activeVideo - 1 + videos.length) % videos.length;
    switchVideo(prevIndex);
    handleUserInteraction(); // Mark as user interaction
  };

  const switchVideo = (newIndex) => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setActiveVideo(newIndex);
  };

  // Card interaction handlers
  const handleCardHoverStart = (index) => {
    setHoveredIndex(index);
    handleUserInteraction(); // Mark as user interaction
  };

  const handleCardHoverEnd = () => {
    setHoveredIndex(null);
  };

  const handleCardClick = (index) => {
    setActiveVideo(index);
    handleUserInteraction(); // Mark as user interaction
  };

  // Video player interaction handlers
  const handleVideoInteraction = () => {
    handleUserInteraction(); // Mark as user interaction
  };

  // Swipe handlers
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    handleUserInteraction(); // Mark as user interaction
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || videos.length === 0) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleForward();
    } else if (isRightSwipe) {
      handleBackward();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Auto-rotate active video only when user is not interacting
  useEffect(() => {
    if (videos.length === 0 || isUserInteracting) return;

    const interval = setInterval(() => {
      handleForward();
    }, 5000);

    return () => clearInterval(interval);
  }, [videos.length, activeVideo, isUserInteracting]);

  // Reset video when active video changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.volume = 0.8;
    }
  }, [activeVideo]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
    };
  }, []);

  // Calculate card positions
  const getCardTransform = (index) => {
    const totalVideos = videos.length;
    if (totalVideos === 0)
      return { transform: "translate(-50%, -50%)", opacity: 0, zIndex: 0 };

    const angle =
      (index * 360) / totalVideos - (activeVideo * 360) / totalVideos;
    const radius = 400;
    const active = index === activeVideo;

    const x = Math.sin((angle * Math.PI) / 180) * radius;
    const z = Math.cos((angle * Math.PI) / 180) * radius - radius;

    const scale = active || index === hoveredIndex ? 1.1 : 0.9;
    const opacity = active ? 1 : index === hoveredIndex ? 0.9 : 0.7;

    return {
      transform: `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) rotateY(${-angle}deg) scale(${scale})`,
      opacity,
      zIndex: active
        ? 50
        : index === hoveredIndex
        ? 40
        : 30 - Math.abs(index - activeVideo),
    };
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative py-20 bg-gradient-to-b from-gray-950 to-black overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                HOLO GALLERY
              </span>
            </h2>
            <p className="text-xl text-gray-300">Loading featured videos...</p>
          </div>
        </div>
      </motion.section>
    );
  }

  if (videos.length === 0) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative py-20 bg-gradient-to-b from-gray-950 to-black overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                HOLO GALLERY
              </span>
            </h2>
            <p className="text-xl text-gray-300">
              No featured videos available at the moment.
            </p>
          </div>
        </div>
      </motion.section>
    );
  }

  const currentVideo = videos[activeVideo];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="relative py-20 bg-gradient-to-b from-gray-950 to-black overflow-hidden"
      ref={containerRef}
      onMouseMove={handleUserInteraction} // Track mouse movement in the entire section
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
          onMouseEnter={handleUserInteraction} // Track when mouse enters gallery
        >
          <div className="relative w-full h-full transform-style-3d">
            {videos.map((video, index) => {
              const active = index === activeVideo;
              const transformStyle = getCardTransform(index);

              return (
                <motion.div
                  key={video.id}
                  className={`absolute top-1/2 left-1/2 w-72 md:w-96 h-44 md:h-60 transition-all duration-700 transform-style-3d cursor-pointer`}
                  style={transformStyle}
                  onClick={() => handleCardClick(index)}
                  onHoverStart={() => handleCardHoverStart(index)}
                  onHoverEnd={handleCardHoverEnd}
                  whileHover={{
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      scale: { duration: 0.3 },
                    },
                  }}
                >
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
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
            onClick={handleBackward}
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
            onClick={handleForward}
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

        {/* Active Video Detail Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-gray-700/30 mb-12"
          onMouseEnter={handleUserInteraction} // Track when mouse enters video section
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-2">
              <div
                className="relative rounded-xl overflow-hidden bg-black"
                onMouseEnter={handleUserInteraction} // Track video player interaction
              >
                {/* Standard HTML5 Video Player */}
                <video
                  ref={videoRef}
                  src={currentVideo.videoUrl}
                  className="w-full h-auto aspect-video"
                  poster={currentVideo.thumbnail}
                  controls
                  controlsList="nodownload"
                  preload="metadata"
                  onPlay={handleVideoInteraction}
                  onPause={handleVideoInteraction}
                  onSeeking={handleVideoInteraction}
                  onVolumeChange={handleVideoInteraction}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* Video Info Section */}
            <div
              className="flex flex-col justify-center"
              onMouseEnter={handleUserInteraction} // Track info section interaction
            >
              <div className="mb-4">
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium">
                  {currentVideo.category}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {currentVideo.title}
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {currentVideo.description || "No description available."}
              </p>

              {/* Tags */}
              {currentVideo.tags && currentVideo.tags.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-cyan-300 mb-2">
                    Tags:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentVideo.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Video Details */}
              <div className="space-y-3 text-sm text-gray-400 mb-6">
                <div className="flex justify-between items-center py-2 border-b border-gray-700/30">
                  <span className="font-medium">Upload date:</span>
                  <span className="text-cyan-300">
                    {formatDate(currentVideo.createdAt)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700/30">
                  <span className="font-medium">Category:</span>
                  <span className="text-cyan-300 capitalize">
                    {currentVideo.category}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-4">
                <button
                  className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-white rounded-full transition-all duration-300 flex items-center space-x-2"
                  onClick={() => {
                    handleVideoInteraction(); // Mark as interaction
                    if (videoRef.current) {
                      videoRef.current.paused
                        ? videoRef.current.play()
                        : videoRef.current.pause();
                    }
                  }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span>Play/Pause</span>
                </button>

                <button
                  className="px-6 py-3 bg-transparent border border-cyan-500 text-cyan-300 hover:bg-cyan-500/10 rounded-full transition-all duration-300 flex items-center space-x-2"
                  onClick={() => {
                    handleVideoInteraction(); // Mark as interaction
                    if (videoRef.current) {
                      videoRef.current.currentTime = 0;
                      videoRef.current.play();
                    }
                  }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04.32.07.64.07.97 0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2c4.32 0 8 2.75 9.43 6.97z" />
                  </svg>
                  <span>Replay</span>
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
          <button
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full font-semibold text-lg hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
            onClick={handleUserInteraction} // Mark button click as interaction
          >
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
