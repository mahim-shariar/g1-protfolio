import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getVideoReels } from "../../services/api";
import SectionHeader from "../Shared/SectionHeader";

const FeaturedPortfolio = () => {
  const [activeVideo, setActiveVideo] = useState(0);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [direction, setDirection] = useState(0);
  const [showTitle, setShowTitle] = useState(true);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const videoRef = useRef(null);

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

  const navigateVideos = (newIndex) => {
    setDirection(newIndex > activeVideo ? 1 : -1);
    setActiveVideo(newIndex);
    setShowTitle(true);
    setShowPlayButton(true);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleForward = () => {
    const nextIndex = (activeVideo + 1) % videos.length;
    navigateVideos(nextIndex);
  };

  const handleBackward = () => {
    const prevIndex = (activeVideo - 1 + videos.length) % videos.length;
    navigateVideos(prevIndex);
  };

  const handleVideoPlay = () => {
    setShowTitle(false);
    setShowPlayButton(false);
  };

  const handleVideoPause = () => {
    setShowTitle(true);
    setShowPlayButton(true);
  };

  const handleVideoEnd = () => {
    setShowTitle(true);
    setShowPlayButton(true);
  };

  const handlePlayButtonClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setShowPlayButton(false);
      setShowTitle(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100"></div>
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 border-3 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-light text-gray-800">
            Loading Creativity
          </h2>
        </div>
      </section>
    );
  }

  if (videos.length === 0) {
    return (
      <section className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-light text-gray-800 mb-3">
            No Content Available
          </h2>
          <p className="text-gray-600 text-sm">
            Check back later for featured videos.
          </p>
        </div>
      </section>
    );
  }

  const currentVideo = videos[activeVideo];

  return (
    <section className="min-h-screen bg-white relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-float-slow"></div>
      </div>

      {/* Main Grid Layout */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Minimal Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
            <div className="text-xs uppercase tracking-widest text-gray-500">
              Featured Work
            </div>
            <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
          </div>
          <h1 className="text-4xl md:text-6xl  text-gray-800 mb-4">
            Visual
            <br />
            <span className="text-teal-600">Stories</span>
          </h1>
          <p className="text-gray-600  max-w-md mx-auto">
            A curated collection of our most innovative visual narratives
          </p>
        </motion.div>

        <SectionHeader
          title="Visual"
          subtitle="Featured Work"
          highlight="Stories"
          description="A curated collection of our most innovative visual narratives"
          titleSize="2xl"
          lineSpacing="tight"
        />

        {/* Asymmetric Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column - Video Player */}
          <div className="lg:col-span-8">
            <motion.div
              layout
              className={`relative bg-gray-900 rounded-2xl overflow-hidden ${
                isExpanded ? "aspect-square" : "aspect-video"
              } transition-all duration-700 shadow-xl`}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentVideo.id}
                  className="relative w-full h-full"
                >
                  {/* Default HTML5 Video Player */}
                  <motion.video
                    ref={videoRef}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -100 }}
                    transition={{ duration: 0.5 }}
                    src={currentVideo.videoUrl}
                    className="w-full h-full object-cover"
                    poster={currentVideo.thumbnail}
                    controls
                    controlsList="nodownload"
                    playsInline
                    preload="metadata"
                    onPlay={handleVideoPlay}
                    onPause={handleVideoPause}
                    onEnded={handleVideoEnd}
                  />

                  {/* Play Button Overlay */}
                  <AnimatePresence>
                    {showPlayButton && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        onClick={handlePlayButtonClick}
                        className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/30 backdrop-blur-sm transition-all duration-300 hover:bg-black/40"
                      >
                        <div className="w-16 h-16 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110">
                          <svg
                            className="w-8 h-8 text-gray-900 ml-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                          </svg>
                        </div>
                      </motion.button>
                    )}
                  </AnimatePresence>
                </motion.div>
              </AnimatePresence>

              {/* Floating Info Card - Hidden when playing */}
              <AnimatePresence>
                {showTitle && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-light text-gray-800 mb-1">
                          {currentVideo.title}
                        </h3>
                        <p className="text-gray-600 text-xs leading-relaxed">
                          {currentVideo.description}
                        </p>
                      </div>
                      <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex-shrink-0 w-10 h-10 bg-teal-500 hover:bg-teal-600 rounded-full flex items-center justify-center text-white transition-all duration-300 ml-3"
                      >
                        {isExpanded ? (
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right Column - Navigation and Details */}
          <div className="lg:col-span-4 space-y-6">
            {/* Video Navigation */}
            <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-medium text-gray-800">
                  Browse Collection
                </h3>
                <div className="text-xs text-gray-500">
                  {activeVideo + 1} / {videos.length}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBackward}
                  className="p-3 bg-gray-100 hover:bg-teal-500 hover:text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-gray-600 text-sm"
                >
                  <svg
                    className="w-4 h-4"
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
                  Previous
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleForward}
                  className="p-3 bg-gray-100 hover:bg-teal-500 hover:text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-gray-600 text-sm"
                >
                  Next
                  <svg
                    className="w-4 h-4"
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
                </motion.button>
              </div>

              {/* Video Thumbnails Scroll */}
              <div className="overflow-x-auto">
                <div className="flex gap-2 pb-3">
                  {videos.map((video, index) => (
                    <motion.button
                      key={video.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigateVideos(index)}
                      className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden relative transition-all duration-300 ${
                        index === activeVideo
                          ? "ring-2 ring-teal-500 scale-105"
                          : "opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors"></div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Video Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100"
            >
              <div className="space-y-4">
                {/* Meta Information */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="text-gray-500 mb-1">Category</div>
                    <div className="text-gray-800 font-medium capitalize">
                      {currentVideo.category}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 mb-1">Published</div>
                    <div className="text-gray-800 font-medium">
                      {formatDate(currentVideo.createdAt)}
                    </div>
                  </div>
                </div>

                {/* Tags */}
                {currentVideo.tags && currentVideo.tags.length > 0 && (
                  <div>
                    <div className="text-gray-500 text-xs mb-2">Tags</div>
                    <div className="flex flex-wrap gap-1.5">
                      {currentVideo.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Creator Info */}
                {currentVideo.user && (
                  <div>
                    <div className="text-gray-500 text-xs mb-2">Creator</div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-emerald-400 rounded-full flex items-center justify-center text-white font-medium text-sm">
                        {currentVideo.user.name?.[0] || "U"}
                      </div>
                      <div>
                        <div className="text-gray-800 font-medium text-sm">
                          {currentVideo.user.name || "Unknown Creator"}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {currentVideo.user.role || "Content Creator"}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl p-5 text-white shadow-lg"
            >
              <h3 className="text-base font-medium mb-3">Ready to Create?</h3>
              <p className="text-teal-100 text-xs mb-4">
                Start your own visual story with our creative team
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white text-teal-600 py-2.5 rounded-xl font-medium transition-colors hover:bg-gray-100 text-sm"
              >
                Start Project
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {[
            { number: "50+", label: "Projects Completed" },
            { number: "15+", label: "Creative Awards" },
            { number: "98%", label: "Client Satisfaction" },
            { number: "24/7", label: "Creative Support" },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-light text-gray-800 mb-1">
                {stat.number}
              </div>
              <div className="text-gray-600 text-xs">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(180deg);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(90deg);
          }
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-8px) scale(1.05);
          }
        }
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 20s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 25s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default FeaturedPortfolio;
