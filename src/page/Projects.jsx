import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlay,
  FiX,
  FiGrid,
  FiBox,
  FiFilm,
  FiClock,
  FiCalendar,
} from "react-icons/fi";
import {
  getVideoReels,
  getVisibleCategories,
  getVideoReelsByCategory,
} from "../services/api";
import bg from "/ICON.png";
import SectionHeader from "../components/Shared/SectionHeader";

// Import app icons
import davinchi from "../assets/davenchi.png";
import premier from "../assets/premier.png";
import cap_cut from "../assets/cap-cut.png";
import after_effect from "../assets/after-effect.png";
import final_cut from "../assets/final-cut.png";

// Background Logo Only Animation (Original)
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

// Glass Morphism Video Card (New Design)
const GlassVideoCard = ({
  project,
  isHovered,
  onHoverStart,
  onHoverEnd,
  onClick,
  showPlayButton,
}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.currentTime = 0;
        videoRef.current
          .play()
          .catch((e) => console.log("Autoplay prevented:", e));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isHovered]);

  return (
    <motion.div
      className="group relative rounded-3xl overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onClick={onClick}
    >
      {/* Glass Background */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl" />

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-400/10 to-emerald-400/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content Container */}
      <div className="relative z-10 p-6">
        {/* Video Container */}
        <div className="relative rounded-2xl overflow-hidden mb-4 aspect-video bg-gradient-to-br from-gray-900 to-gray-800">
          {/* Thumbnail */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${project.thumbnail})`,
              opacity: isHovered ? 0 : 1,
              transition: "opacity 0.4s ease",
            }}
          />

          {/* Video */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
            preload="metadata"
            poster={project.thumbnail}
            style={{
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
          >
            <source src={project.videoUrl} type="video/mp4" />
          </video>

          {/* Play Button */}
          <AnimatePresence>
            {showPlayButton && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
              >
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-teal-500/30"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiPlay className="w-6 h-6 text-white ml-1" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/20">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-800 line-clamp-2 leading-tight">
            {project.title}
          </h3>

          {/* Meta Information */}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1.5">
              <FiCalendar className="w-4 h-4" />
              <span>{project.year}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FiClock className="w-4 h-4" />
              <span>{project.duration}</span>
            </div>
          </div>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 3).map((tech, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="px-3 py-1.5 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 text-teal-700 text-xs font-medium rounded-full border border-teal-200/50 backdrop-blur-sm"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-teal-400/0 via-teal-400/20 to-emerald-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeLayout, setActiveLayout] = useState("grid");
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const modalVideoRef = useRef(null);
  const containerRef = useRef(null);

  // Video editing tools data
  const videoTools = [
    { name: "DaVinci Resolve", logo: davinchi },
    { name: "Premier Pro", logo: premier },
    { name: "Final Cut Pro", logo: final_cut },
    { name: "CapCut", logo: cap_cut },
    { name: "After Effects", logo: after_effect },
  ];

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

  // Handle project interactions
  const handleProjectHover = (projectId) => {
    setHoveredProject(projectId);
  };

  const handleProjectLeave = () => {
    setHoveredProject(null);
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
    setSelectedProject(null);
  };

  // Background grid animation
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
          className="projects-stack flex flex-col gap-8 max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
        >
          {filteredProjects.map((project, i) => (
            <GlassVideoCard
              key={project.id}
              project={project}
              isHovered={hoveredProject === project.id}
              onHoverStart={() => handleProjectHover(project.id)}
              onHoverEnd={handleProjectLeave}
              onClick={() => handleProjectSelect(project)}
              showPlayButton={hoveredProject !== project.id}
            />
          ))}
        </motion.div>
      );
    }

    // Default grid layout
    return (
      <motion.div
        className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        animate="visible"
      >
        {filteredProjects.map((project) => (
          <GlassVideoCard
            key={project.id}
            project={project}
            isHovered={hoveredProject === project.id}
            onHoverStart={() => handleProjectHover(project.id)}
            onHoverEnd={handleProjectLeave}
            onClick={() => handleProjectSelect(project)}
            showPlayButton={hoveredProject !== project.id}
          />
        ))}
      </motion.div>
    );
  };

  return (
    <section
      id="projects"
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-50 via-white to-teal-50/80 py-20 px-4"
    >
      {/* Background Logo Animation (Original) */}
      <BackgroundLogoAnimation />

      {/* Floating App Logos */}
      <FloatingAppLogos videoTools={videoTools} />

      <canvas ref={containerRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-teal-900/5 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-teal-900/5 to-teal-900/5"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Original Section Header */}
        <SectionHeader
          subtitle="Portfolio Showcase"
          title="Our"
          highlight="Visual Projects"
          description="Explore our collection of video editing projects that showcase our expertise in storytelling, color grading, and visual effects."
          center={true}
          titleSize="2xl"
          titleWeight="normal"
          descriptionSize="lg"
          lineSpacing="tight"
          highlightColor="teal-500"
          dotColor="teal-500"
          highlightOnNewLine={false}
        />

        {/* Layout switcher (Original) */}
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

        {/* Category Filters (Original) */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
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

        {/* Projects Grid with New Glass Cards */}
        {renderProjects()}

        {/* Decorative elements (Original) */}
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

      {/* Simplified Modal Video Player (Original) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative w-full max-w-6xl bg-black rounded-xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-20 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2"
              >
                <FiX className="w-6 h-6" />
              </button>

              {/* Video Player */}
              <div className="w-full h-auto max-h-[80vh]">
                <video
                  ref={modalVideoRef}
                  controls
                  autoPlay
                  className="w-full h-full"
                  poster={selectedProject.thumbnail}
                >
                  <source src={selectedProject.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Project Info */}
              <div className="p-6 bg-white">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {selectedProject.title}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {selectedProject.description}
                    </p>
                  </div>
                  {selectedProject.technologies &&
                    selectedProject.technologies.length > 0 && (
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
                    )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scrolling text effect at bottom (Original) */}
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
