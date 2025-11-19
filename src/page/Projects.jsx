import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlay,
  FiX,
  FiGrid,
  FiBox,
  FiFilm,
  FiPause,
  FiVolume2,
  FiVolumeX,
  FiVolume1,
  FiMaximize,
  FiMinimize,
} from "react-icons/fi";
import {
  getVideoReels,
  getVisibleCategories,
  getVideoReelsByCategory,
} from "../services/api";
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

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalVideoPlaying, setModalVideoPlaying] = useState(false);
  const [activeLayout, setActiveLayout] = useState("grid");
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Video player states for modal
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
  const [loadingVideo, setLoadingVideo] = useState(false);

  const videoRefs = useRef({});
  const hoverVideoRefs = useRef({});
  const modalVideoRef = useRef(null);
  const containerRef = useRef(null);
  const progressBarRef = useRef(null);
  const volumeBarRef = useRef(null);
  const videoContainerRef = useRef(null);

  // Fetch projects and categories on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const categoriesResponse = await getVisibleCategories();
        const categoriesData = categoriesResponse.data?.categories || [];

        // Filter out introduction category and format categories
        const filteredCategories = categoriesData.filter(
          (cat) =>
            cat.slug !== "introduction" &&
            cat.name.toLowerCase() !== "introduction"
        );

        const formattedCategories = [
          {
            id: "all",
            name: "All Projects",
            icon: <FiFilm className="inline mr-2" />,
          },
          ...filteredCategories.map((cat) => ({
            id: cat.slug || cat.name.toLowerCase(),
            name: cat.name,
            icon: <FiFilm className="inline mr-2" />,
          })),
        ];

        setCategories(formattedCategories);

        // Fetch all video reels and exclude introduction category
        const projectsResponse = await getVideoReels();
        let projectsData = projectsResponse.data?.videoReels || [];

        // Filter out introduction category videos
        projectsData = projectsData.filter(
          (project) =>
            project.category !== "introduction" &&
            !project.category?.toLowerCase().includes("introduction")
        );

        const formattedProjects = projectsData.map((project) => ({
          id: project._id,
          title: project.title,
          category: project.category,
          description: project.description,
          videoUrl: project.videoUrl,
          thumbnail: project.thumbnailUrl,
          technologies: project.tags || [],
          year: new Date(project.createdAt).getFullYear().toString(),
          duration: "0:00",
          color: getColorByCategory(project.category),
          isBest: project.isBest,
          createdAt: project.createdAt,
        }));

        setProjects(formattedProjects);
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load projects. Please try again later.");
        setCategories(getFallbackCategories());
        setProjects(getFallbackProjects());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch projects by category when activeCategory changes
  useEffect(() => {
    const fetchProjectsByCategory = async () => {
      if (activeCategory === "all") {
        try {
          setLoading(true);
          const response = await getVideoReels();
          let projectsData = response.data?.videoReels || [];

          projectsData = projectsData.filter(
            (project) =>
              project.category !== "introduction" &&
              !project.category?.toLowerCase().includes("introduction")
          );

          const formattedProjects = projectsData.map((project) => ({
            id: project._id,
            title: project.title,
            category: project.category,
            description: project.description,
            videoUrl: project.videoUrl,
            thumbnail: project.thumbnailUrl,
            technologies: project.tags || [],
            year: new Date(project.createdAt).getFullYear().toString(),
            duration: "0:00",
            color: getColorByCategory(project.category),
            isBest: project.isBest,
            createdAt: project.createdAt,
          }));

          setProjects(formattedProjects);
        } catch (err) {
          console.error("Error fetching all projects:", err);
        } finally {
          setLoading(false);
        }
        return;
      }

      try {
        setLoading(true);
        const response = await getVideoReelsByCategory(activeCategory);
        let projectsData = response.data?.videoReels || [];

        projectsData = projectsData.filter(
          (project) =>
            project.category !== "introduction" &&
            !project.category?.toLowerCase().includes("introduction")
        );

        const formattedProjects = projectsData.map((project) => ({
          id: project._id,
          title: project.title,
          category: project.category,
          description: project.description,
          videoUrl: project.videoUrl,
          thumbnail: project.thumbnailUrl,
          technologies: project.tags || [],
          year: new Date(project.createdAt).getFullYear().toString(),
          duration: "0:00",
          color: getColorByCategory(project.category),
          isBest: project.isBest,
          createdAt: project.createdAt,
        }));

        setProjects(formattedProjects);
      } catch (err) {
        console.error("Error fetching projects by category:", err);
        const filteredFromExisting = projects.filter(
          (project) => project.category === activeCategory
        );
        setProjects(filteredFromExisting);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectsByCategory();
  }, [activeCategory]);

  // Video event handlers for modal
  useEffect(() => {
    const video = modalVideoRef.current;
    if (!video || !selectedProject) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const handleWaiting = () => setLoadingVideo(true);
    const handlePlaying = () => setLoadingVideo(false);

    const handleEnded = () => {
      setModalVideoPlaying(false);
      setVideoEnded(true);
      setShowCentralButton(true);
    };

    const handlePlay = () => {
      setModalVideoPlaying(true);
      setVideoEnded(false);
      setShowCentralButton(false);
    };

    const handlePause = () => {
      setModalVideoPlaying(false);
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
  }, [selectedProject, volume, isMuted, videoEnded]);

  // Fullscreen change handler
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.msFullscreenElement
      );
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  // Controls auto-hide for modal
  useEffect(() => {
    if (showControls && modalVideoPlaying) {
      const timeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      setControlsTimeout(timeout);

      return () => clearTimeout(timeout);
    }
  }, [showControls, modalVideoPlaying]);

  // Video player control functions for modal
  const handlePlayPause = () => {
    if (modalVideoRef.current) {
      if (modalVideoRef.current.paused || modalVideoRef.current.ended) {
        modalVideoRef.current.play();
        setShowCentralButton(false);
        setVideoEnded(false);
      } else {
        modalVideoRef.current.pause();
        setShowCentralButton(true);
      }
    }
  };

  const handleReplay = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.currentTime = 0;
      modalVideoRef.current.play();
      setShowCentralButton(false);
      setVideoEnded(false);
    }
  };

  const handleSeek = (e) => {
    if (!modalVideoRef.current) return;

    const progressBar = progressBarRef.current;
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;

    modalVideoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    if (!modalVideoRef.current) return;

    const volumeBar = volumeBarRef.current;
    const rect = volumeBar.getBoundingClientRect();
    let newVolume = (e.clientX - rect.left) / rect.width;
    newVolume = Math.max(0, Math.min(1, newVolume));

    setVolume(newVolume);
    modalVideoRef.current.volume = newVolume;
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const changePlaybackRate = () => {
    const rates = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % rates.length;
    const newRate = rates[nextIndex];

    setPlaybackRate(newRate);
    if (modalVideoRef.current) {
      modalVideoRef.current.playbackRate = newRate;
    }
  };

  const toggleFullscreen = () => {
    const videoContainer = videoContainerRef.current;
    if (!videoContainer) return;

    if (!isFullscreen) {
      if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
      } else if (videoContainer.webkitRequestFullscreen) {
        videoContainer.webkitRequestFullscreen();
      } else if (videoContainer.msRequestFullscreen) {
        videoContainer.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
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

  const handleVideoHover = (isHovering) => {
    if (modalVideoRef.current && isHovering && modalVideoPlaying) {
      modalVideoRef.current.playbackRate = 1.2;
    } else if (modalVideoRef.current) {
      modalVideoRef.current.playbackRate = 1.0;
    }
  };

  // Helper functions
  const getColorByCategory = (category) => {
    const colorMap = {
      wedding: "#0d9488",
      commercial: "#0d9488",
      music: "#0d9488",
      documentary: "#0d9488",
      travel: "#0d9488",
      reel: "#0d9488",
    };
    return colorMap[category] || "#0d9488";
  };

  const getFallbackCategories = () => [
    {
      id: "all",
      name: "All Projects",
      icon: <FiFilm className="inline mr-2" />,
    },
    {
      id: "wedding",
      name: "Wedding Films",
      icon: <FiFilm className="inline mr-2" />,
    },
    {
      id: "commercial",
      name: "Commercial",
      icon: <FiFilm className="inline mr-2" />,
    },
    {
      id: "music",
      name: "Music Videos",
      icon: <FiFilm className="inline mr-2" />,
    },
    {
      id: "documentary",
      name: "Documentary",
      icon: <FiFilm className="inline mr-2" />,
    },
    {
      id: "travel",
      name: "Travel Vlogs",
      icon: <FiFilm className="inline mr-2" />,
    },
    {
      id: "reel",
      name: "Reels",
      icon: <FiFilm className="inline mr-2" />,
    },
  ];

  const getFallbackProjects = () => [
    {
      id: 1,
      title: "Cinematic Wedding Film",
      category: "wedding",
      description:
        "A beautifully crafted wedding film with cinematic color grading and emotional storytelling",
      videoUrl: "https://assets.codepen.io/3364143/sample.mp4",
      thumbnail:
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      technologies: ["Premiere Pro", "After Effects", "Color Grading"],
      year: "2023",
      duration: "3:45",
      color: "#0d9488",
    },
    {
      id: 2,
      title: "Commercial Advertisement",
      category: "commercial",
      description: "Professional commercial video with stunning visual effects",
      videoUrl: "https://assets.codepen.io/3364143/sample.mp4",
      thumbnail:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      technologies: ["After Effects", "Cinema 4D", "Color Grading"],
      year: "2023",
      duration: "2:30",
      color: "#0d9488",
    },
  ];

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const popupCardVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const stackCardVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    }),
    hover: {
      x: 20,
      scale: 1.01,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const fluidCardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
    hover: {
      scale: 1.05,
      y: -4,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // Handle project interactions
  const handleProjectHover = (project) => {
    setHoveredProject(project.id);
    if (hoverVideoRefs.current[project.id]) {
      hoverVideoRefs.current[project.id].currentTime = 0;
      hoverVideoRefs.current[project.id]
        .play()
        .catch((e) => console.log("Autoplay prevented:", e));
    }
  };

  const handleProjectLeave = (project) => {
    setHoveredProject(null);
    if (hoverVideoRefs.current[project.id]) {
      hoverVideoRefs.current[project.id].pause();
    }
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setModalVideoPlaying(false);
    setShowCentralButton(true);
    setVideoEnded(false);
    setCurrentTime(0);
    setVolume(1);
    setIsMuted(false);
    setPlaybackRate(1);
  };

  const closeModal = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
    if (isFullscreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setSelectedProject(null);
    setModalVideoPlaying(false);
    setShowControls(true);
  };

  // Background grid animation with new color palette
  useEffect(() => {
    const canvas = containerRef.current;
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

      ctx.strokeStyle = "rgba(13, 148, 136, 0.1)";
      ctx.lineWidth = 1;

      const cellSize = 50;
      const offsetX = (time * 0.01) % cellSize;
      const offsetY = (time * 0.01) % cellSize;

      for (let x = offsetX; x < canvas.width; x += cellSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = offsetY; y < canvas.height; y += cellSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

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
        `rgba(13, 148, 136, ${0.03 + pulseIntensity * 0.03})`
      );
      gradient.addColorStop(
        0.5,
        `rgba(13, 148, 136, ${0.05 + pulseIntensity * 0.03})`
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

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.keyCode === 27) closeModal();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const formatCategoryName = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    return category
      ? category.name
      : categoryId
          .split(/(?=[A-Z])/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
  };

  // Loading state
  if (loading && projects.length === 0) {
    return (
      <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-50 via-white to-teal-50/80 py-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-700">Loading projects...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error && projects.length === 0) {
    return (
      <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-50 via-white to-teal-50/80 py-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  // Render projects based on active layout
  const renderProjects = () => {
    if (filteredProjects.length === 0) {
      return (
        <div className="text-center py-20">
          <p className="text-gray-600 text-lg">
            No projects found for this category.
          </p>
        </div>
      );
    }

    if (activeLayout === "stack") {
      return (
        <motion.div
          className="projects-stack flex flex-col gap-6 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              className="project-card group relative rounded-xl overflow-hidden cursor-pointer"
              variants={stackCardVariants}
              custom={i}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              onHoverStart={() => handleProjectHover(project)}
              onHoverEnd={() => handleProjectLeave(project)}
              onClick={() => handleProjectSelect(project)}
            >
              <div className="flex h-48 bg-gradient-to-r from-white to-gray-50 rounded-xl overflow-hidden border border-gray-200 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="thumbnail-container relative w-1/3 overflow-hidden">
                  <div
                    className="thumbnail w-full h-full bg-cover bg-center absolute inset-0"
                    style={{
                      backgroundImage: `url(${project.thumbnail})`,
                      opacity: hoveredProject === project.id ? 0 : 1,
                      transition: "opacity 0.3s ease",
                    }}
                  />
                  <video
                    ref={(el) => (hoverVideoRefs.current[project.id] = el)}
                    className="w-full h-full object-cover absolute inset-0"
                    muted
                    loop
                    playsInline
                    preload="auto"
                    style={{
                      opacity: hoveredProject === project.id ? 1 : 0,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    <source src={project.videoUrl} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <motion.div
                      className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiPlay className="text-lg text-white ml-1" />
                    </motion.div>
                  </div>
                </div>
                <div className="project-info p-5 flex-1 flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-800">
                      {project.title}
                    </h3>
                    <span
                      className="text-xs uppercase tracking-wider font-medium px-2 py-1 rounded-full bg-teal-100 border border-teal-200"
                      style={{
                        color: "#0d9488",
                      }}
                    >
                      {formatCategoryName(project.category)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 font-mono">
                      {project.year}
                    </span>
                    <div className="flex gap-1.5">
                      {project.technologies.slice(0, 2).map((tech, index) => (
                        <span
                          key={index}
                          className="text-[9px] px-2 py-0.5 rounded-full bg-white backdrop-blur-sm border border-gray-200"
                          style={{ color: "#0d9488" }}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 2 && (
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-white text-gray-500 border border-gray-200">
                          +{project.technologies.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      );
    }

    // Default grid layout
    return (
      <motion.div
        className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredProjects.map((project, i) => (
          <motion.div
            key={project.id}
            className="project-card group relative rounded-xl overflow-hidden cursor-pointer"
            variants={popupCardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            custom={i}
            onHoverStart={() => handleProjectHover(project)}
            onHoverEnd={() => handleProjectLeave(project)}
            onClick={() => handleProjectSelect(project)}
          >
            <motion.div
              className="relative h-full w-full rounded-xl overflow-hidden border border-gray-200 bg-white/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }}
              whileHover={{
                boxShadow: `0 20px 40px rgba(13, 148, 136, 0.1), 0 8px 32px rgba(0, 0, 0, 0.1)`,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderColor: `#0d9488`,
                transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
              }}
            >
              <div className="thumbnail-container relative h-72 overflow-hidden">
                <div
                  className="thumbnail w-full h-full bg-cover bg-center absolute inset-0"
                  style={{
                    backgroundImage: `url(${project.thumbnail})`,
                    opacity: hoveredProject === project.id ? 0 : 1,
                    transition: "opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
                <video
                  ref={(el) => (hoverVideoRefs.current[project.id] = el)}
                  className="w-full h-full object-cover absolute inset-0"
                  muted
                  loop
                  playsInline
                  preload="auto"
                  style={{
                    opacity: hoveredProject === project.id ? 1 : 0,
                    transition: "opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <source src={project.videoUrl} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
                <motion.div
                  className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium border border-gray-200 z-10"
                  style={{
                    color: "#0d9488",
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  {formatCategoryName(project.category)}
                </motion.div>
                <div
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-mono border border-gray-200"
                  style={{ color: "#0d9488" }}
                >
                  {project.year}
                </div>
                <motion.div
                  className="absolute inset-0 m-auto bg-teal-500 w-14 h-14 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiPlay className="text-xl text-white ml-1" />
                </motion.div>
              </div>
              <motion.div
                className="project-info p-5 bg-gradient-to-b from-white/70 to-white/50"
                initial={{ y: 0 }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex justify-start items-start mb-2">
                  <h3 className="text-lg font-medium text-gray-800">
                    {project.title}
                  </h3>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">{project.year}</span>
                  <div className="flex gap-1.5">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="text-[9px] px-2 py-0.5 rounded-full bg-white backdrop-blur-sm border border-gray-200"
                        style={{ color: "#0d9488" }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
              {hoveredProject === project.id && (
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-current to-transparent"
                  style={{ color: "#0d9488" }}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    );
  };

  return (
    <section
      id="projects"
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-50 via-white to-teal-50/80 py-20 px-4"
    >
      {/* Background Logo Animation */}
      <BackgroundLogoAnimation />

      <canvas ref={containerRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-teal-900/5 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-teal-900/5 to-teal-900/5"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h2
            className="text-teal-600 font-mono uppercase tracking-widest text-sm md:text-base mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Portfolio Showcase
          </motion.h2>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-teal-700">
              Visual Projects
            </span>
          </motion.h1>
          <motion.p
            className="text-lg text-gray-700 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Explore our collection of video editing projects that showcase our
            expertise in storytelling, color grading, and visual effects.
          </motion.p>
        </motion.div>

        {/* Layout switcher */}
        <div className="flex justify-center items-center gap-2 mb-8">
          <button
            onClick={() => setActiveLayout("grid")}
            className={`p-2 rounded-lg transition-all duration-300 ${
              activeLayout === "grid"
                ? "bg-teal-500/10 text-teal-600 shadow-lg shadow-teal-500/20"
                : "bg-white/50 text-gray-600 hover:bg-gray-100/60 border border-gray-200"
            }`}
          >
            <FiGrid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveLayout("stack")}
            className={`p-2 rounded-lg transition-all duration-300 ${
              activeLayout === "stack"
                ? "bg-teal-500/10 text-teal-600 shadow-lg shadow-teal-500/20"
                : "bg-white/50 text-gray-600 hover:bg-gray-100/60 border border-gray-200"
            }`}
          >
            <FiBox className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`px-5 py-3 rounded-xl flex items-center transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-teal-500/90 to-teal-600/90 text-white shadow-lg shadow-teal-500/30 border border-teal-400/30"
                  : "bg-white/50 text-gray-700 hover:bg-gray-100/60 backdrop-blur-sm border border-gray-300 hover:border-teal-500/30 hover:shadow-md hover:shadow-teal-500/10"
              }`}
              onClick={() => setActiveCategory(category.id)}
              variants={containerVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2 text-sm">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Loading indicator for category changes */}
        {loading && projects.length > 0 && (
          <div className="text-center mb-6">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-500 mx-auto"></div>
            <p className="text-gray-600 text-sm mt-2">
              Loading{" "}
              {activeCategory === "all"
                ? "all projects"
                : `${activeCategory} projects`}
              ...
            </p>
          </div>
        )}

        {/* Projects Grid */}
        {renderProjects()}

        {/* Decorative elements */}
        <motion.div
          className="absolute top-40 left-10 w-3 h-3 rounded-full bg-teal-400"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 right-10 w-2 h-2 rounded-full bg-teal-500"
          animate={{ scale: [1, 2, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Enhanced Project Detail Modal with new color palette */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg video-modal-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative w-full max-w-6xl bg-white rounded-xl overflow-hidden border border-teal-500/30 shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 bg-white border-b border-teal-500/20">
                <div className="flex items-center">
                  <div className="flex gap-1 mr-4">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  </div>
                  <h3 className="text-teal-600 font-mono text-sm">
                    {selectedProject.title.toUpperCase().replace(/\s+/g, "_")}
                    .MP4
                  </h3>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              {/* Enhanced Video Player Section */}
              <div
                ref={videoContainerRef}
                className="w-full h-[500px] lg:h-[600px] relative overflow-hidden bg-white group"
                onMouseEnter={() => {
                  handleVideoHover(true);
                  setShowControls(true);
                }}
                onMouseLeave={() => handleVideoHover(false)}
                onMouseMove={handleMouseMove}
              >
                {/* Video element */}
                <video
                  ref={modalVideoRef}
                  muted={isMuted}
                  loop={false}
                  playsInline
                  className="w-full h-full object-contain"
                  poster={selectedProject.thumbnail}
                  onClick={handlePlayPause}
                >
                  <source src={selectedProject.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Gradient overlays for better control visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-10"></div>
                <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black/50 to-transparent pointer-events-none z-10"></div>

                {/* Loading indicator */}
                {loadingVideo && (
                  <div className="absolute inset-0 flex items-center justify-center z-15 bg-black/20">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500"></div>
                  </div>
                )}

                {/* Attractive Central Play/Replay Button */}
                {(showCentralButton || !modalVideoPlaying) && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {/* Outer glowing ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full bg-teal-500/20"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      {/* Main button */}
                      <div
                        className="relative w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm border-2 border-white/20"
                        onClick={videoEnded ? handleReplay : handlePlayPause}
                      >
                        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent"></div>
                        {/* Icon - Always show play button when video is not playing */}
                        {videoEnded ? (
                          <motion.div
                            className="text-white text-2xl"
                            initial={{ rotate: -180 }}
                            animate={{ rotate: 0 }}
                            transition={{ duration: 0.5 }}
                          >
                            <FiPlay className="ml-1" />
                          </motion.div>
                        ) : (
                          <motion.div
                            className="text-white text-2xl"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <FiPlay className="ml-1" />
                          </motion.div>
                        )}
                      </div>
                      {/* Text label */}
                      <motion.div
                        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {videoEnded ? "Replay" : "Play"}
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}

                {/* Enhanced Video Controls */}
                <motion.div
                  className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 z-20 transition-opacity duration-300 ${
                    showControls ? "opacity-100" : "opacity-0"
                  }`}
                  onMouseEnter={() => setShowControls(true)}
                >
                  {/* Progress Bar */}
                  <div
                    ref={progressBarRef}
                    className="w-full h-2 bg-gray-600/50 rounded-full mb-4 cursor-pointer relative group/progress"
                    onClick={handleSeek}
                  >
                    <div
                      className="h-full bg-gradient-to-r from-teal-500 to-teal-600 rounded-full relative"
                      style={{
                        width: `${
                          duration ? (currentTime / duration) * 100 : 0
                        }%`,
                      }}
                    >
                      <div className="absolute right-0 top-1/2 w-3 h-3 bg-white rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover/progress:opacity-100 transition-opacity shadow-lg"></div>
                    </div>
                    <div className="absolute inset-0 bg-gray-400/20 rounded-full group-hover/progress:bg-gray-400/30 transition-colors"></div>
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Play/Pause */}
                      <motion.button
                        onClick={handlePlayPause}
                        className="text-white hover:text-teal-300 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {modalVideoPlaying ? (
                          <FiPause className="w-6 h-6" />
                        ) : (
                          <FiPlay className="w-6 h-6 ml-1" />
                        )}
                      </motion.button>

                      {/* Volume Control */}
                      <div className="flex items-center space-x-2">
                        <motion.button
                          onClick={toggleMute}
                          className="text-white hover:text-teal-300 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {isMuted || volume === 0 ? (
                            <FiVolumeX className="w-5 h-5" />
                          ) : volume > 0.5 ? (
                            <FiVolume2 className="w-5 h-5" />
                          ) : (
                            <FiVolume1 className="w-5 h-5" />
                          )}
                        </motion.button>

                        <div
                          ref={volumeBarRef}
                          className="w-20 h-1 bg-gray-600/50 rounded-full cursor-pointer relative group/volume"
                          onClick={handleVolumeChange}
                        >
                          <div
                            className="h-full bg-teal-500 rounded-full"
                            style={{ width: `${isMuted ? 0 : volume * 100}%` }}
                          >
                            <div className="absolute right-0 top-1/2 w-2 h-2 bg-white rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover/volume:opacity-100 transition-opacity shadow-lg"></div>
                          </div>
                        </div>
                      </div>

                      {/* Time Display */}
                      <div className="text-white text-sm font-mono">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      {/* Playback Speed */}
                      <motion.button
                        onClick={changePlaybackRate}
                        className="text-white hover:text-teal-300 transition-colors text-sm font-mono px-2 py-1 rounded bg-black/30 hover:bg-black/50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {playbackRate}x
                      </motion.button>

                      {/* Fullscreen */}
                      <motion.button
                        onClick={toggleFullscreen}
                        className="text-white hover:text-teal-300 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {isFullscreen ? (
                          <FiMinimize className="w-5 h-5" />
                        ) : (
                          <FiMaximize className="w-5 h-5" />
                        )}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>

                {/* Decorative dots */}
                <div className="absolute top-4 right-4 flex gap-2 z-20">
                  <span className="w-3 h-3 rounded-full bg-teal-500 shadow-lg shadow-teal-900/50"></span>
                  <span className="w-3 h-3 rounded-full bg-teal-400 shadow-lg shadow-teal-800/50"></span>
                  <span className="w-3 h-3 rounded-full bg-teal-300 shadow-lg shadow-teal-700/50"></span>
                </div>
              </div>

              {/* Project details */}
              <div className="p-6 bg-white">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {selectedProject.title}
                    </h2>
                    <div className="flex items-center gap-4">
                      <p className="text-teal-600 font-mono">
                        {selectedProject.year}
                      </p>
                      <p className="text-gray-600">
                        {selectedProject.duration}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-teal-100 text-teal-700 text-sm rounded-full border border-teal-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{selectedProject.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
          • VIDEO EDITING • COLOR GRADING • MOTION GRAPHICS • VISUAL EFFECTS •
          4K EDITING • DRONE FOOTAGE • CINEMATIC SEQUENCES • SOUND DESIGN •
          VIDEO EDITING • COLOR GRADING • MOTION GRAPHICS • VISUAL EFFECTS • 4K
          EDITING • DRONE FOOTAGE • CINEMATIC SEQUENCES • SOUND DESIGN •
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Projects;
