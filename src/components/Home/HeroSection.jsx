import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getVideoReelsByCategory } from "../../services/api";
import BookingModal from "../BookingModal";
import davinchi from "../../assets/davenchi.png";
import premier from "../../assets/premier.png";
import cap_cut from "../../assets/cap-cut.png";
import after_effect from "../../assets/after-effect.png";
import blender from "../../assets/blender.png";
import final_cut from "../../assets/final-cut.png";
import bg from "/ICON.png";

// Background Logo Only Animation
const BackgroundLogoAnimation = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main Background Logo */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-0"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{
          scale: [1, 1.03, 1],
          opacity: [0.08, 0.12, 0.08],
          rotate: [0, 1, 0, -1, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <img
          src={bg}
          alt="Background Logo"
          className="w-[85%] max-w-[1100px] h-auto"
          style={{
            filter: `
              brightness(1.2)
              contrast(1.1)
              drop-shadow(0 0 150px rgba(13, 148, 136, 0.15))
            `,
          }}
        />
      </motion.div>

      {/* Secondary Larger Logo for Depth */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-0"
        animate={{
          scale: [1.05, 1.12, 1.05],
          opacity: [0.05, 0.08, 0.05],
          rotate: [0, -2, 0, 2, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: [0.4, 0, 0.2, 1],
          delay: 2,
        }}
      >
        <img
          src={bg}
          alt="Background Logo Glow"
          className="w-[90%] max-w-[1300px] h-auto opacity-60"
          style={{
            filter: "blur(40px) brightness(1.3)",
            mixBlendMode: "soft-light",
          }}
        />
      </motion.div>

      {/* Subtle Floating Particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1.5 h-1.5 bg-gradient-to-r from-teal-400/50 to-teal-300/30 rounded-full z-5"
          style={{
            left: `${8 + i * 8}%`,
            top: `${12 + i * 8}%`,
          }}
          animate={{
            y: [0, -20, 0, -12, 0],
            x: [0, 6, -4, 5, 0],
            scale: [1, 1.3, 0.8, 1.2, 1],
            opacity: [0.2, 0.4, 0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 8 + i * 1.5,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Glow Effect Behind Background Logo */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-0"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <div className="w-[800px] h-[800px] bg-teal-400/12 rounded-full blur-3xl" />
      </motion.div>
    </div>
  );
};

// Floating App Logos Component
const FloatingAppLogos = ({ videoTools }) => {
  // Generate random positions for floating logos
  const getRandomPosition = (index) => {
    const positions = [
      { top: "15%", left: "8%", scale: 0.7 },
      { top: "22%", right: "12%", scale: 0.9 },
      { top: "65%", left: "6%", scale: 0.8 },
      { bottom: "20%", right: "8%", scale: 1.1 },
      { top: "42%", right: "5%", scale: 0.6 },
      { bottom: "32%", left: "20%", scale: 1.0 },
      { top: "12%", right: "25%", scale: 1.2 },
      { bottom: "16%", right: "32%", scale: 0.5 },
    ];
    return positions[index % positions.length];
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-25">
      {/* Floating App Logos in Random Positions */}
      {videoTools.map((tool, index) => {
        const position = getRandomPosition(index);

        return (
          <motion.div
            key={`floating-${tool.name}`}
            className="absolute z-30"
            style={position}
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{
              opacity: [0.4, 0.9, 0.4],
              scale: [
                position.scale * 0.8,
                position.scale * 1.3,
                position.scale * 0.8,
              ],
              y: [0, -40, 0, -25, 0],
              x: [0, 10, -15, 8, 0],
              rotate: [0, 5, -3, 2, 0],
            }}
            transition={{
              duration: 14 + Math.random() * 8,
              repeat: Infinity,
              delay: index * 1.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <motion.div
              className="relative bg-gradient-to-br from-white/30 to-white/12 backdrop-blur-2xl rounded-2xl p-4 border border-white/40 shadow-2xl"
              whileHover={{
                scale: 1.5,
                rotateY: 180,
                transition: {
                  duration: 0.8,
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                },
              }}
            >
              <motion.img
                src={tool.logo}
                alt={tool.name}
                className="w-18 h-18 object-contain"
                animate={{
                  filter: [
                    "brightness(1.1) drop-shadow(0 0 15px rgba(13, 148, 136, 0.5))",
                    "brightness(1.4) drop-shadow(0 0 25px rgba(20, 184, 166, 0.8))",
                    "brightness(1.1) drop-shadow(0 0 15px rgba(13, 148, 136, 0.5))",
                  ],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  delay: index * 0.8,
                  ease: "easeInOut",
                }}
              />

              {/* Tool Name Tooltip */}
              <motion.div
                className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-teal-800/95 text-white text-sm px-4 py-2 rounded-lg whitespace-nowrap opacity-0 border border-teal-600/30 backdrop-blur-sm shadow-lg"
                whileHover={{
                  opacity: 1,
                  y: -3,
                  transition: { duration: 0.4, ease: "easeOut" },
                }}
              >
                {tool.name}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 bg-teal-800/95 rotate-45" />
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Subtle Floating Particles */}
      {Array.from({ length: 8 }).map((_, i) => {
        const positions = [
          { top: "30%", left: "16%" },
          { top: "45%", right: "22%" },
          { top: "70%", left: "11%" },
          { bottom: "32%", right: "16%" },
          { top: "55%", right: "9%" },
          { bottom: "42%", left: "26%" },
          { top: "25%", right: "18%" },
          { bottom: "28%", left: "14%" },
        ];

        const position = positions[i];

        return (
          <motion.div
            key={`floating-particle-${i}`}
            className="absolute w-1.5 h-1.5 bg-gradient-to-r from-teal-400/50 to-teal-300/30 rounded-full opacity-60 z-20"
            style={position}
            animate={{
              y: [0, -25, 0, -15, 0],
              x: [0, 8, -10, 6, 0],
              scale: [1, 1.4, 0.9, 1.3, 1],
              opacity: [0.3, 0.6, 0.3, 0.5, 0.3],
              rotate: [0, 45, 90, 135, 180],
            }}
            transition={{
              duration: 10 + Math.random() * 6,
              delay: Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}

      {/* Subtle Glow Spots */}
      {Array.from({ length: 4 }).map((_, i) => {
        const positions = [
          { top: "35%", left: "30%" },
          { top: "50%", right: "35%" },
          { bottom: "40%", left: "25%" },
          { top: "60%", left: "45%" },
        ];

        const position = positions[i];

        return (
          <motion.div
            key={`floating-glow-${i}`}
            className="absolute w-48 h-48 rounded-full z-15"
            style={position}
            animate={{
              scale: [1, 2, 1],
              opacity: [0, 0.08, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              delay: i * 4,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <div className="w-full h-full bg-teal-400/20 rounded-full blur-3xl" />
          </motion.div>
        );
      })}
    </div>
  );
};

const HeroSection = () => {
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);
  const volumeBarRef = useRef(null);

  const [videoPlaying, setVideoPlaying] = useState(false);
  const [loadingVideo, setLoadingVideo] = useState(false);
  const [introductionVideo, setIntroductionVideo] = useState(null);
  const [loadingIntroduction, setLoadingIntroduction] = useState(true);

  // Video player states
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showCentralButton, setShowCentralButton] = useState(true);
  const [videoEnded, setVideoEnded] = useState(false);
  const [controlsTimeout, setControlsTimeout] = useState(null);

  // Booking modal state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Video editing tools data
  const videoTools = [
    { name: "DaVinci Resolve", logo: davinchi },
    { name: "Premier Pro", logo: premier },
    { name: "Final Cut Pro", logo: final_cut },
    { name: "CapCut", logo: cap_cut },
    { name: "After Effects", logo: after_effect },
    { name: "Blender", logo: blender },
  ];

  // Marquee content
  const marqueeItems = [
    "4K RESOLUTION",
    "COLOR GRADING",
    "MOTION GRAPHICS",
    "VISUAL EFFECTS",
    "SOUND DESIGN",
    "AI ENHANCEMENT",
    "DRONE FOOTAGE",
    "CINEMATIC EDITING",
    "3D ANIMATION",
    "VR CONTENT",
  ];

  // Fetch introduction video
  useEffect(() => {
    const fetchIntroductionVideo = async () => {
      try {
        setLoadingIntroduction(true);
        const response = await getVideoReelsByCategory("introduction");

        if (
          response.status === "success" &&
          response.data.videoReels.length > 0
        ) {
          const introVideo = response.data.videoReels[0];
          setIntroductionVideo(introVideo);
        } else {
          console.warn("No introduction videos found");
        }
      } catch (error) {
        console.error("Error fetching introduction video:", error);
      } finally {
        setLoadingIntroduction(false);
      }
    };

    fetchIntroductionVideo();
  }, []);

  // Video event handlers and controls
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const handleWaiting = () => setLoadingVideo(true);
    const handlePlaying = () => setLoadingVideo(false);

    const handleEnded = () => {
      setVideoPlaying(false);
      setVideoEnded(true);
      setShowCentralButton(true);
    };

    const handlePlay = () => {
      setVideoPlaying(true);
      setVideoEnded(false);
      setShowCentralButton(false);
    };

    const handlePause = () => {
      setVideoPlaying(false);
      if (!videoEnded) {
        setShowCentralButton(true);
      }
    };

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);
    video.addEventListener("canplay", updateDuration);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    video.volume = volume;
    video.muted = isMuted;
    video.pause();

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
      video.removeEventListener("canplay", updateDuration);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, [introductionVideo, volume, isMuted, videoEnded]);

  // Controls auto-hide
  useEffect(() => {
    if (showControls && videoPlaying) {
      const timeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      setControlsTimeout(timeout);
      return () => clearTimeout(timeout);
    }
  }, [showControls, videoPlaying]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused || videoRef.current.ended) {
        videoRef.current.play();
        setShowCentralButton(false);
        setVideoEnded(false);
      } else {
        videoRef.current.pause();
        setShowCentralButton(true);
      }
    }
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setShowCentralButton(false);
      setVideoEnded(false);
    }
  };

  const handleSeek = (e) => {
    if (!videoRef.current) return;
    const progressBar = progressBarRef.current;
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    if (!videoRef.current) return;
    const volumeBar = volumeBarRef.current;
    const rect = volumeBar.getBoundingClientRect();
    let newVolume = (e.clientX - rect.left) / rect.width;
    newVolume = Math.max(0, Math.min(1, newVolume));
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const changePlaybackRate = () => {
    const rates = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % rates.length;
    const newRate = rates[nextIndex];
    setPlaybackRate(newRate);
    if (videoRef.current) {
      videoRef.current.playbackRate = newRate;
    }
  };

  const toggleFullscreen = () => {
    const videoContainer = videoRef.current?.parentElement;
    if (!videoContainer) return;
    if (!isFullscreen) {
      if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
      } else if (videoContainer.webkitRequestFullscreen) {
        videoContainer.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeout) {
      clearTimeout(controlsTimeout);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Modal handlers
  const openBookingModal = () => setIsBookingModalOpen(true);
  const closeBookingModal = () => setIsBookingModalOpen(false);
  const navigateToProjects = () => {
    window.location.href = "/projects";
  };

  // Text animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.9,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  // Determine video source and poster
  const videoSource =
    introductionVideo?.videoUrl ||
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  const videoPoster =
    introductionVideo?.thumbnailUrl ||
    "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";
  const videoTitle = introductionVideo?.title
    ? `${introductionVideo.title}.MP4`
    : "INTRODUCTION_2025.MP4";

  return (
    <motion.div
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-50 via-white to-teal-50/80 flex flex-col items-center justify-start pt-10 pb-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Background Logo Only Animation */}
      <BackgroundLogoAnimation />

      {/* Floating App Logos in Random Positions */}
      <FloatingAppLogos videoTools={videoTools} />

      {/* Content Section - Reduced text size */}
      <motion.div
        className="relative z-30 text-center px-4 md:px-8 max-w-4xl mx-auto mb-4 mt-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated badge */}
        <motion.div
          className="inline-flex items-center space-x-2 mb-4 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md text-teal-700 text-sm font-medium border border-teal-200 shadow-lg"
          variants={itemVariants}
        >
          <motion.span
            className="w-2 h-2 bg-teal-500 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <span className="text-teal-800">Next Generation Video Editing</span>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 max-w-4xl mx-auto leading-tight"
          variants={itemVariants}
          style={{
            textShadow: "0 4px 20px rgba(0, 0, 0, 0.12)",
            background:
              "linear-gradient(135deg, #1f2937 0%, #374151 50%, #0d9488 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          <span className="block">Visual Stories</span>
          <span className="block text-transparent bg-gradient-to-r from-teal-600 via-teal-500 to-teal-400 bg-clip-text">
            Reimagined
          </span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-800 max-w-2xl mx-auto mb-5 leading-relaxed font-medium"
          variants={itemVariants}
          style={{
            textShadow: "0 2px 12px rgba(255, 255, 255, 0.9)",
          }}
        >
          Transform your vision into captivating visual experiences with our
          AI-powered editing platform.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6"
          variants={itemVariants}
        >
          <motion.button
            className="bg-teal-600 text-white px-8 py-4 rounded-xl hover:bg-teal-700 transition-all duration-500 font-semibold text-base shadow-xl hover:shadow-2xl flex items-center justify-center group relative overflow-hidden"
            whileHover={{
              scale: 1.03,
              y: -2,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            whileTap={{ scale: 0.98 }}
            onClick={navigateToProjects}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-500 group-hover:from-teal-700 group-hover:to-teal-600 transition-all duration-500" />
            <span className="relative z-10 flex items-center gap-2">
              Explore Portfolio
              <motion.svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </motion.svg>
            </span>
          </motion.button>

          <motion.button
            className="border-2 border-teal-400 text-teal-800 px-8 py-4 rounded-xl hover:border-teal-500 hover:bg-white/80 transition-all duration-500 font-semibold text-base flex items-center justify-center group relative overflow-hidden backdrop-blur-md shadow-lg"
            whileHover={{
              scale: 1.03,
              y: -2,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            whileTap={{ scale: 0.98 }}
            onClick={openBookingModal}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-white/30 group-hover:from-white/70 group-hover:to-white/50 transition-all duration-500" />
            <span className="relative z-10 flex items-center gap-2 font-semibold">
              Start Your Project
              <motion.svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </motion.svg>
            </span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Video Player Section - Adjusted spacing */}
      <motion.div
        className="relative z-30 w-full max-w-5xl px-4 mb-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-md rounded-xl px-6 py-3 shadow-lg border border-gray-200">
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-red-500 rounded-full shadow-md"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-md"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full shadow-md"></div>
            </div>
            <p className="text-gray-800 font-semibold text-base">
              Experience Our Creative Process
            </p>
          </div>
        </motion.div>

        <motion.div
          className="w-full h-[450px] lg:h-[550px] relative overflow-hidden rounded-2xl border-4 border-white/95 shadow-2xl bg-white"
          onMouseMove={handleMouseMove}
          whileHover={{
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)",
            transition: { duration: 0.3 },
          }}
        >
          {/* ... video player content remains the same but with reduced sizes ... */}
          {loadingIntroduction ? (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl flex items-center justify-center z-30">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
                </div>
                <p className="text-blue-600 font-medium text-sm mt-3">
                  Loading creative showcase...
                </p>
              </div>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                muted={isMuted}
                loop={false}
                playsInline
                className="w-full h-full object-cover"
                poster={videoPoster}
                onClick={handlePlayPause}
              >
                <source src={videoSource} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl text-sm font-semibold z-20 shadow-lg border border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-md"></div>
                  <span className="text-gray-800">▶ {videoTitle}</span>
                </div>
              </div>

              {loadingVideo && (
                <div className="absolute inset-0 flex items-center justify-center z-15 bg-white/40 backdrop-blur-sm">
                  <div className="bg-white/95 rounded-xl px-6 py-4 shadow-lg border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                      <span className="text-gray-800 font-medium text-sm">
                        Buffering...
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {(showCentralButton || !videoPlaying) && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <motion.div
                    className="relative w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-2xl backdrop-blur-md border-2 border-gray-300 hover:border-blue-500"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.3 }}
                    onClick={videoEnded ? handleReplay : handlePlayPause}
                  >
                    {videoEnded ? (
                      <svg
                        className="w-8 h-8 text-gray-800"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-8 h-8 text-gray-800"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </motion.div>
                </motion.div>
              )}

              <motion.div
                className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/95 via-white/85 to-transparent p-5 z-20 ${
                  showControls ? "opacity-100" : "opacity-0"
                }`}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div
                  ref={progressBarRef}
                  className="w-full h-2 bg-gray-300 rounded-full mb-4 cursor-pointer group"
                  onClick={handleSeek}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-200 group-hover:h-3 shadow-md"
                    style={{
                      width: `${
                        duration ? (currentTime / duration) * 100 : 0
                      }%`,
                    }}
                    layout
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <motion.button
                      onClick={handlePlayPause}
                      className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg border border-gray-300 hover:border-blue-500"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      {videoPlaying ? (
                        <svg
                          className="w-5 h-5 text-gray-800"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5 text-gray-800"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </motion.button>

                    <div className="flex items-center space-x-2">
                      <motion.button
                        onClick={toggleMute}
                        className="w-8 h-8 flex items-center justify-center text-gray-700 hover:text-blue-600"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        {isMuted || volume === 0 ? (
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </motion.button>

                      <div
                        ref={volumeBarRef}
                        className="w-16 h-1 bg-gray-400 rounded-full cursor-pointer group"
                        onClick={handleVolumeChange}
                      >
                        <motion.div
                          className="h-full bg-blue-500 rounded-full transition-all duration-200 group-hover:h-2 shadow-md"
                          style={{ width: `${isMuted ? 0 : volume * 100}%` }}
                          layout
                        />
                      </div>
                    </div>

                    <div className="text-gray-700 text-xs font-medium bg-white/90 px-2 py-1 rounded-lg backdrop-blur-sm border border-gray-300">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <motion.button
                      onClick={changePlaybackRate}
                      className="px-3 py-1 text-gray-700 hover:text-blue-600 text-xs font-medium bg-white rounded-lg border border-gray-300 hover:border-blue-500"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {playbackRate}x
                    </motion.button>

                    <motion.button
                      onClick={toggleFullscreen}
                      className="w-8 h-8 flex items-center justify-center text-gray-700 hover:text-blue-600"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isFullscreen ? (
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 10a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 11.414V14a1 1 0 01-2 0v-4zm9-1a1 1 0 110 2h-4a1 1 0 110-2h4zm2 6a1 1 0 01-1 1h-4a1 1 0 110-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L13 12.586V10a1 1 0 112 0v4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 3a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V9a1 1 0 01-2 0V3zm9 0a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 11-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12a1 1 0 01-1-1zm-9 9a1 1 0 012 0v2.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H9a1 1 0 110 2H3a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 110-2h2.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V11a1 1 0 011-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </motion.div>
      </motion.div>

      {/* Scrolling Marquee - Reduced size */}
      <motion.div
        className="relative w-full max-w-5xl px-4 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-lg border border-gray-200 overflow-hidden">
          <motion.div
            className="flex gap-10 items-center"
            animate={{ x: [0, -1000] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 35,
                ease: "linear",
              },
            }}
          >
            {[...marqueeItems, ...marqueeItems].map((tech, index) => (
              <div key={index} className="flex items-center gap-10 shrink-0">
                <motion.span
                  className="text-gray-800 font-bold text-sm whitespace-nowrap"
                  whileHover={{
                    color: "#0d9488",
                    scale: 1.03,
                    textShadow: "0 0 15px rgba(13, 148, 136, 0.3)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {tech}
                </motion.span>
                <motion.div
                  className="w-1 h-1 bg-teal-500 rounded-full shadow-md"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: "easeInOut",
                  }}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingModalOpen} onClose={closeBookingModal} />
    </motion.div>
  );
};

export default HeroSection;
