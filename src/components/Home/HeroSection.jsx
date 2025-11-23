import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getVideoReelsByCategory } from "../../services/api";
import BookingModal from "../BookingModal";
import davinchi from "../../assets/davenchi.png";
import premier from "../../assets/premier.png";
import cap_cut from "../../assets/cap-cut.png";
import after_effect from "../../assets/after-effect.png";
import blender from "../../assets/blender.png";
import final_cut from "../../assets/final-cut.png";
import bg from "/ICON.png";
import SectionHeader from "../Shared/SectionHeader";

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
          className="w-[80%] max-w-[1000px] h-auto"
          style={{
            filter: `
              brightness(1.2)
              contrast(1.1)
              drop-shadow(0 0 120px rgba(13, 148, 136, 0.15))
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
          className="w-[85%] max-w-[1200px] h-auto opacity-60"
          style={{
            filter: "blur(35px) brightness(1.3)",
            mixBlendMode: "soft-light",
          }}
        />
      </motion.div>

      {/* Subtle Floating Particles */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-gradient-to-r from-teal-400/50 to-teal-300/30 rounded-full z-5"
          style={{
            left: `${8 + i * 8}%`,
            top: `${12 + i * 8}%`,
          }}
          animate={{
            y: [0, -15, 0, -10, 0],
            x: [0, 4, -3, 4, 0],
            scale: [1, 1.2, 0.8, 1.1, 1],
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
        <div className="w-[600px] h-[600px] bg-teal-400/12 rounded-full blur-2xl" />
      </motion.div>
    </div>
  );
};

// Floating App Logos Component
const FloatingAppLogos = ({ videoTools }) => {
  // Generate random positions for floating logos
  const getRandomPosition = (index) => {
    const positions = [
      { top: "15%", left: "8%", scale: 0.6 },
      { top: "22%", right: "12%", scale: 0.8 },
      { top: "65%", left: "6%", scale: 0.7 },
      { bottom: "20%", right: "8%", scale: 1.0 },
      { top: "42%", right: "5%", scale: 0.5 },
      { bottom: "32%", left: "20%", scale: 0.9 },
      { top: "12%", right: "25%", scale: 1.1 },
      { bottom: "16%", right: "32%", scale: 0.4 },
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
                position.scale * 1.2,
                position.scale * 0.8,
              ],
              y: [0, -30, 0, -20, 0],
              x: [0, 8, -12, 6, 0],
              rotate: [0, 4, -2, 2, 0],
            }}
            transition={{
              duration: 14 + Math.random() * 8,
              repeat: Infinity,
              delay: index * 1.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <motion.div
              className="relative bg-gradient-to-br from-white/30 to-white/12 backdrop-blur-xl rounded-xl p-3 border border-white/40 shadow-lg"
              whileHover={{
                scale: 1.4,
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
                className="w-14 h-14 object-contain"
                animate={{
                  filter: [
                    "brightness(1.1) drop-shadow(0 0 12px rgba(13, 148, 136, 0.5))",
                    "brightness(1.4) drop-shadow(0 0 20px rgba(20, 184, 166, 0.8))",
                    "brightness(1.1) drop-shadow(0 0 12px rgba(13, 148, 136, 0.5))",
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
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-teal-800/95 text-white text-xs px-3 py-1.5 rounded-md whitespace-nowrap opacity-0 border border-teal-600/30 backdrop-blur-sm shadow-lg"
                whileHover={{
                  opacity: 1,
                  y: -2,
                  transition: { duration: 0.4, ease: "easeOut" },
                }}
              >
                {tool.name}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-1.5 h-1.5 bg-teal-800/95 rotate-45" />
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Subtle Floating Particles */}
      {Array.from({ length: 6 }).map((_, i) => {
        const positions = [
          { top: "30%", left: "16%" },
          { top: "45%", right: "22%" },
          { top: "70%", left: "11%" },
          { bottom: "32%", right: "16%" },
          { top: "55%", right: "9%" },
          { bottom: "42%", left: "26%" },
        ];

        const position = positions[i];

        return (
          <motion.div
            key={`floating-particle-${i}`}
            className="absolute w-1 h-1 bg-gradient-to-r from-teal-400/50 to-teal-300/30 rounded-full opacity-60 z-20"
            style={position}
            animate={{
              y: [0, -20, 0, -12, 0],
              x: [0, 6, -8, 5, 0],
              scale: [1, 1.3, 0.9, 1.2, 1],
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
      {Array.from({ length: 3 }).map((_, i) => {
        const positions = [
          { top: "35%", left: "30%" },
          { top: "50%", right: "35%" },
          { bottom: "40%", left: "25%" },
        ];

        const position = positions[i];

        return (
          <motion.div
            key={`floating-glow-${i}`}
            className="absolute w-32 h-32 rounded-full z-15"
            style={position}
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0, 0.06, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              delay: i * 4,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <div className="w-full h-full bg-teal-400/20 rounded-full blur-2xl" />
          </motion.div>
        );
      })}
    </div>
  );
};

const HeroSection = () => {
  const videoRef = useRef(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [loadingIntroduction, setLoadingIntroduction] = useState(true);
  const [introductionVideo, setIntroductionVideo] = useState(null);
  const [showPlayButton, setShowPlayButton] = useState(true);

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

  // Video event handlers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      setVideoPlaying(true);
      setShowPlayButton(false);
    };

    const handlePause = () => {
      setVideoPlaying(false);
      setShowPlayButton(true);
    };

    const handleEnded = () => {
      setVideoPlaying(false);
      setShowPlayButton(true);
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused || videoRef.current.ended) {
        videoRef.current.play();
        setShowPlayButton(false);
      } else {
        videoRef.current.pause();
        setShowPlayButton(true);
      }
    }
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
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
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-50 via-white to-teal-50/80 flex flex-col items-center justify-start pt-20 pb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Background Logo Only Animation */}
      <BackgroundLogoAnimation />

      {/* Floating App Logos in Random Positions */}
      <FloatingAppLogos videoTools={videoTools} />

      {/* Content Section */}

      <SectionHeader
        subtitle="Next Generation Video Editing"
        title="Visual Stories"
        highlight="Reimagined"
        description="Transform your vision into captivating visual experiences with our AI-powered editing platform."
        center={true}
        titleSize="2xl"
        titleWeight="medium"
        descriptionSize="lg"
        highlightWeight=""
      />

      {/* Video Player Section - Simplified with default controls */}
      <motion.div
        className="relative z-30 w-full max-w-4xl px-4 mb-4"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.div
          className="text-center mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md rounded-lg px-4 py-2 shadow-md border border-gray-200">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full shadow-sm"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full shadow-sm"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full shadow-sm"></div>
            </div>
            <p className="text-gray-800 font-semibold text-sm">
              Experience Our Creative Process
            </p>
          </div>
        </motion.div>

        <motion.div
          className="w-full h-[380px] lg:h-[480px] relative overflow-hidden rounded-xl border-4 border-white/95 shadow-xl bg-white"
          whileHover={{
            boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.25)",
            transition: { duration: 0.3 },
          }}
        >
          {loadingIntroduction ? (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl flex items-center justify-center z-30">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-12 h-12 border-3 border-blue-200 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-12 h-12 border-3 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
                </div>
                <p className="text-blue-600 font-medium text-xs mt-2">
                  Loading creative showcase...
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Default HTML5 Video Player */}
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                poster={videoPoster}
                controls
                controlsList="nodownload"
                playsInline
                preload="metadata"
              >
                <source src={videoSource} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* File Name Display */}
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-lg text-xs font-semibold z-20 shadow-md border border-gray-200">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-sm"></div>
                  <span className="text-gray-800">▶ {videoTitle}</span>
                </div>
              </div>

              {/* Simple Play Button Overlay */}
              <AnimatePresence>
                {showPlayButton && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer bg-black/20 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={handlePlayPause}
                  >
                    <motion.div
                      className="relative w-20 h-20 bg-white/95 rounded-2xl flex items-center justify-center shadow-2xl backdrop-blur-md border-2 border-white/50"
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "rgba(255, 255, 255, 1)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg
                        className="w-10 h-10 text-gray-800 ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeWidth={0}
                          d="M8 5v14l11-7z"
                        />
                      </svg>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </motion.div>
      </motion.div>

      {/* Scrolling Marquee */}
      <motion.div
        className="relative w-full max-w-4xl px-4 mb-3"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="bg-white/95 backdrop-blur-md rounded-lg p-2 shadow-md border border-gray-200 overflow-hidden">
          <motion.div
            className="flex gap-8 items-center"
            animate={{ x: [0, -800] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {[...marqueeItems, ...marqueeItems].map((tech, index) => (
              <div key={index} className="flex items-center gap-8 shrink-0">
                <motion.span
                  className="text-gray-800 font-bold text-xs whitespace-nowrap"
                  whileHover={{
                    color: "#0d9488",
                    scale: 1.02,
                    textShadow: "0 0 12px rgba(13, 148, 136, 0.3)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {tech}
                </motion.span>
                <motion.div
                  className="w-1 h-1 bg-teal-500 rounded-full shadow-sm"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
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
