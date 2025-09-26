import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { getVideoReels } from "../../services/api";

const FeaturedPortfolio = () => {
  const [activeVideo, setActiveVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoBuffer, setVideoBuffer] = useState(0);
  const [videoVolume, setVideoVolume] = useState(1);
  const [showControls, setShowControls] = useState(false);
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

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
            preview: video.videoUrl,
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

  // Video event handlers
  const handlePlayVideo = async () => {
    if (videoRef.current) {
      try {
        setIsPlaying(true);
        await videoRef.current.play();
        showControlsTemporarily();
      } catch (error) {
        console.error("Error playing video:", error);
        setIsPlaying(false);
      }
    }
  };

  const handlePauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
      showControlsTemporarily();
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setVideoProgress(100);
    showControlsTemporarily();
  };

  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      const progress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setVideoProgress(progress || 0);
    }
  };

  const handleVideoProgress = () => {
    if (videoRef.current) {
      const buffer = videoRef.current.buffered;
      if (buffer.length > 0) {
        const bufferedEnd = buffer.end(buffer.length - 1);
        const duration = videoRef.current.duration;
        if (duration > 0) {
          setVideoBuffer((bufferedEnd / duration) * 100);
        }
      }
    }
  };

  const handleVideoWaiting = () => {
    setVideoLoading(true);
  };

  const handleVideoCanPlay = () => {
    setVideoLoading(false);
  };

  const handleVideoError = () => {
    setVideoLoading(false);
    setIsPlaying(false);
    console.error("Video playback error");
  };

  const handleVolumeChange = (volume) => {
    const newVolume = Math.max(0, Math.min(1, volume));
    setVideoVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  // Controls visibility
  const showControlsTemporarily = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  // Video navigation
  const handleForward = () => {
    const nextIndex = (activeVideo + 1) % videos.length;
    switchVideo(nextIndex);
  };

  const handleBackward = () => {
    const prevIndex = (activeVideo - 1 + videos.length) % videos.length;
    switchVideo(prevIndex);
  };

  const switchVideo = (newIndex) => {
    setVideoLoading(true);
    setVideoProgress(0);
    setVideoBuffer(0);
    setIsPlaying(false);
    setShowControls(true);

    // Small delay for smoother transition
    setTimeout(() => {
      setActiveVideo(newIndex);
    }, 150);
  };

  // Seek video
  const handleSeek = (e) => {
    if (videoRef.current && videoRef.current.duration) {
      const rect = videoContainerRef.current.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const newTime = percent * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      setVideoProgress(percent * 100);
    }
  };

  // Toggle fullscreen
  const toggleFullscreen = async () => {
    if (!videoContainerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await videoContainerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  };

  // Swipe handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
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

  // Auto-rotate active video
  useEffect(() => {
    if (videos.length === 0) return;

    const interval = setInterval(() => {
      if (!isPlaying) {
        handleForward();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [videos.length, isPlaying]);

  // Reset video when active video changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.volume = videoVolume;
      if (isPlaying) {
        videoRef.current.play().catch(console.error);
      }
    }
  }, [activeVideo]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
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

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
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
              const active = index === activeVideo;
              const transformStyle = getCardTransform(index);

              return (
                <motion.div
                  key={video.id}
                  className={`absolute top-1/2 left-1/2 w-72 md:w-96 h-44 md:h-60 transition-all duration-700 transform-style-3d cursor-pointer`}
                  style={transformStyle}
                  onClick={() => setActiveVideo(index)}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
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

        {/* Improved Active Video Detail Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-gray-700/30 mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-2">
              <div
                className="relative rounded-xl overflow-hidden bg-black group/video-container"
                ref={videoContainerRef}
                onMouseEnter={showControlsTemporarily}
                onMouseMove={showControlsTemporarily}
                onMouseLeave={() => {
                  if (isPlaying) {
                    setTimeout(() => setShowControls(false), 1000);
                  }
                }}
              >
                {/* Custom Video Player */}
                <div className="relative">
                  <video
                    ref={videoRef}
                    src={currentVideo.videoUrl}
                    className="w-full h-auto aspect-video object-cover transition-opacity duration-300"
                    poster={currentVideo.thumbnail}
                    preload="metadata"
                    onTimeUpdate={handleVideoTimeUpdate}
                    onProgress={handleVideoProgress}
                    onWaiting={handleVideoWaiting}
                    onCanPlay={handleVideoCanPlay}
                    onError={handleVideoError}
                    onEnded={handleVideoEnded}
                    onClick={isPlaying ? handlePauseVideo : handlePlayVideo}
                  />

                  {/* Loading Overlay */}
                  {videoLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                        <span className="text-white text-sm font-medium">
                          Loading video...
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Custom Play Button */}
                  {!isPlaying && !videoLoading && (
                    <div
                      className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300 ${
                        showControls ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <button
                        onClick={handlePlayVideo}
                        className="bg-white/20 backdrop-blur-sm rounded-full p-5 border border-white/30 hover:scale-110 transition-transform duration-300 group/play"
                      >
                        <svg
                          className="w-16 h-16 text-white group-hover/play:scale-105 transition-transform"
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
                  )}

                  {/* Custom Controls Overlay */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
                      showControls ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {/* Progress Bar */}
                    <div
                      className="relative h-2 bg-gray-600/50 rounded-full mb-3 cursor-pointer group/progress"
                      onClick={handleSeek}
                    >
                      {/* Buffered Progress */}
                      <div
                        className="absolute top-0 left-0 h-full bg-gray-500/30 rounded-full transition-all duration-200"
                        style={{ width: `${videoBuffer}%` }}
                      />

                      {/* Played Progress */}
                      <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-200"
                        style={{ width: `${videoProgress}%` }}
                      />

                      {/* Progress Thumb */}
                      <div
                        className="absolute top-1/2 w-4 h-4 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity duration-200 transform -translate-y-1/2 -translate-x-1/2 shadow-lg border-2 border-cyan-400"
                        style={{ left: `${videoProgress}%` }}
                      />
                    </div>

                    {/* Control Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {/* Play/Pause */}
                        <button
                          onClick={
                            isPlaying ? handlePauseVideo : handlePlayVideo
                          }
                          className="text-white hover:text-cyan-300 transition-colors"
                        >
                          {isPlaying ? (
                            <svg
                              className="w-6 h-6"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                            </svg>
                          ) : (
                            <svg
                              className="w-6 h-6"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          )}
                        </button>

                        {/* Volume Control */}
                        <div className="flex items-center space-x-2 group/volume">
                          <button className="text-white hover:text-cyan-300 transition-colors">
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                            </svg>
                          </button>
                          <div className="w-20 h-1 bg-gray-600 rounded-full relative group-hover/volume:opacity-100 opacity-0 transition-opacity">
                            <div
                              className="absolute top-0 left-0 h-full bg-cyan-500 rounded-full"
                              style={{ width: `${videoVolume * 100}%` }}
                            />
                            <input
                              type="range"
                              min="0"
                              max="1"
                              step="0.1"
                              value={videoVolume}
                              onChange={(e) =>
                                handleVolumeChange(parseFloat(e.target.value))
                              }
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                          </div>
                        </div>

                        {/* Time Display */}
                        <span className="text-white text-sm font-mono">
                          {formatTime(videoRef.current?.currentTime || 0)} /{" "}
                          {formatTime(videoRef.current?.duration || 0)}
                        </span>
                      </div>

                      <div className="flex items-center space-x-3">
                        {/* Fullscreen */}
                        <button
                          onClick={toggleFullscreen}
                          className="text-white hover:text-cyan-300 transition-colors"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Play/Pause overlay button */}
                  {isPlaying && (
                    <button
                      onClick={handlePauseVideo}
                      className={`absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-3 text-white transition-opacity duration-300 ${
                        showControls ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Video Info Section */}
            <div className="flex flex-col justify-center">
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
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 space-y-3 text-sm text-gray-400"
                >
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
                </motion.div>
              )}

              <div className="flex flex-wrap gap-4 mt-4">
                <button
                  className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-white rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  onClick={isPlaying ? handlePauseVideo : handlePlayVideo}
                  disabled={videoLoading}
                >
                  {videoLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Loading...</span>
                    </>
                  ) : isPlaying ? (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                      <span>Pause Video</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <span>Play Video</span>
                    </>
                  )}
                </button>

                <button
                  className="px-6 py-3 bg-transparent border border-cyan-500 text-cyan-300 hover:bg-cyan-500/10 rounded-full transition-all duration-300 flex items-center space-x-2"
                  onClick={() => setShowDetails(!showDetails)}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04.32.07.64.07.97 0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2c4.32 0 8 2.75 9.43 6.97z" />
                  </svg>
                  <span>{showDetails ? "Hide Details" : "View Details"}</span>
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
