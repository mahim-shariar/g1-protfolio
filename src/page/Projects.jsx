import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlay, FiX, FiGrid, FiBox, FiFilm } from "react-icons/fi";

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalVideoPlaying, setModalVideoPlaying] = useState(true);
  const [activeLayout, setActiveLayout] = useState("grid");
  const videoRefs = useRef({});
  const hoverVideoRefs = useRef({});
  const modalVideoRef = useRef(null);
  const containerRef = useRef(null);

  // Project data
  const projects = [
    {
      id: 1,
      title: "Cinematic Wedding Film",
      category: "wedding",
      description:
        "A beautifully crafted wedding film with cinematic color grading and emotional storytelling",
      videoUrl: "https://assets.codepen.io/3364143/sample.mp4",
      thumbnail:
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      technologies: ["Premiere Pro", "After Effects", "Color Grading"],
      year: "2023",
      duration: "3:45",
      color: "#06b6d4", // cyan-500
    },
    {
      id: 2,
      title: "Corporate Brand Video",
      category: "commercial",
      description:
        "A dynamic brand video showcasing company culture and values with sleek motion graphics",
      videoUrl: "https://assets.codepen.io/3364143/sample.mp4",
      thumbnail:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1639&q=80",
      technologies: ["Motion Graphics", "DaVinci Resolve", "Sound Design"],
      year: "2023",
      duration: "2:15",
      color: "#3b82f6", // blue-500
    },
    {
      id: 3,
      title: "Music Video Production",
      category: "music",
      description:
        "A high-energy music video with creative transitions and visual effects",
      videoUrl: "https://assets.codepen.io/3364143/sample.mp4",
      thumbnail:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      technologies: ["Visual Effects", "Color Theory", "Rhythmic Editing"],
      year: "2022",
      duration: "4:20",
      color: "#8b5cf6", // violet-500
    },
    {
      id: 4,
      title: "Documentary Short",
      category: "documentary",
      description:
        "An impactful documentary short focusing on environmental conservation",
      videoUrl: "https://assets.codepen.io/3364143/sample.mp4",
      thumbnail:
        "https://images.unsplash.com/photo-1616469829476-8953c5655574?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      technologies: [
        "Interview Editing",
        "B-roll Sequencing",
        "Documentary Style",
      ],
      year: "2022",
      duration: "12:30",
      color: "#10b981", // emerald-500
    },
    {
      id: 5,
      title: "Travel Vlog Series",
      category: "travel",
      description:
        "A vibrant travel vlog series capturing the essence of different cultures",
      videoUrl: "https://assets.codepen.io/3364143/sample.mp4",
      thumbnail:
        "https://images.unsplash.com/photo-1464822759849-deb748f1034a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      technologies: ["Fast-paced Editing", "Drone Footage", "Travel Vlogging"],
      year: "2023",
      duration: "8:15",
      color: "#ec4899", // pink-500
    },
    {
      id: 6,
      title: "Product Launch Video",
      category: "commercial",
      description:
        "A sleek product launch video with 3D integration and dynamic transitions",
      videoUrl: "https://assets.codepen.io/3364143/sample.mp4",
      thumbnail:
        "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1455&q=80",
      technologies: ["3D Integration", "Product Showcase", "Brand Consistency"],
      year: "2023",
      duration: "1:45",
      color: "#f59e0b", // amber-500
    },
  ];

  const categories = [
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

  const gridCardVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.98 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    hover: {
      y: -8,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const stackCardVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
    hover: {
      x: 20,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const fluidCardVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // Handle video hover
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

  // Handle project selection for modal
  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setModalVideoPlaying(true);
  };

  // Handle modal video play/pause
  const handleModalVideoToggle = () => {
    if (modalVideoRef.current) {
      if (modalVideoRef.current.paused) {
        modalVideoRef.current.play();
        setModalVideoPlaying(true);
      } else {
        modalVideoRef.current.pause();
        setModalVideoPlaying(false);
      }
    }
  };

  // Close modal
  const closeModal = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
    setSelectedProject(null);
    setModalVideoPlaying(false);
  };

  // Grid animation
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

      // Draw grid lines
      ctx.strokeStyle = "rgba(66, 153, 225, 0.1)";
      ctx.lineWidth = 1;

      const cellSize = 50;
      const offsetX = (time * 0.01) % cellSize;
      const offsetY = (time * 0.01) % cellSize;

      // Vertical lines
      for (let x = offsetX; x < canvas.width; x += cellSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = offsetY; y < canvas.height; y += cellSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw pulsing gradient overlay
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
        `rgba(100, 50, 255, ${0.03 + pulseIntensity * 0.03})`
      );
      gradient.addColorStop(
        0.5,
        `rgba(0, 0, 80, ${0.05 + pulseIntensity * 0.03})`
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

  // Format category name for display
  const formatCategoryName = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    return category
      ? category.name
      : categoryId
          .split(/(?=[A-Z])/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
  };

  // Render projects based on active layout
  const renderProjects = () => {
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
              onHoverStart={() => handleProjectHover(project)}
              onHoverEnd={() => handleProjectLeave(project)}
              onClick={() => handleProjectSelect(project)}
            >
              <div className="flex h-48 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl overflow-hidden border border-white/5 backdrop-blur-sm">
                <div className="thumbnail-container relative w-1/3 overflow-hidden">
                  {/* Thumbnail fallback */}
                  <div
                    className="thumbnail w-full h-full bg-cover bg-center absolute inset-0"
                    style={{
                      backgroundImage: `url(${project.thumbnail})`,
                      opacity: hoveredProject === project.id ? 0 : 1,
                      transition: "opacity 0.3s ease",
                    }}
                  />

                  {/* Hover video */}
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

                  {/* Play overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <FiPlay className="text-3xl text-white" />
                  </div>
                </div>

                <div className="project-info p-5 flex-1 flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-white">
                      {project.title}
                    </h3>
                    <span
                      className="text-xs uppercase tracking-wider font-medium px-2 py-1 rounded-full bg-black/30 border border-white/10"
                      style={{
                        color: project.color,
                        backgroundColor: `${project.color}20`,
                      }}
                    >
                      {formatCategoryName(project.category)}
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
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
                          className="text-[9px] px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-sm border border-white/5"
                          style={{ color: project.color }}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 2 && (
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-black/70 text-gray-400">
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
    } else if (activeLayout === "fluid") {
      return (
        <motion.div
          className="projects-fluid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              className="project-card group relative rounded-xl overflow-hidden cursor-pointer"
              variants={fluidCardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              onHoverStart={() => handleProjectHover(project)}
              onHoverEnd={() => handleProjectLeave(project)}
              onClick={() => handleProjectSelect(project)}
            >
              <div className="aspect-square rounded-xl overflow-hidden border border-white/5 bg-gradient-to-br from-gray-900 to-gray-800 backdrop-blur-sm">
                <div className="thumbnail-container relative w-full h-full overflow-hidden">
                  {/* Thumbnail fallback */}
                  <div
                    className="thumbnail w-full h-full bg-cover bg-center absolute inset-0"
                    style={{
                      backgroundImage: `url(${project.thumbnail})`,
                      opacity: hoveredProject === project.id ? 0 : 1,
                      transition: "opacity 0.3s ease",
                    }}
                  />

                  {/* Hover video */}
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

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />

                  {/* Category badge - positioned at top left */}
                  <div
                    className="absolute top-3 left-3 px-2 py-1 rounded-md text-xs font-medium backdrop-blur-sm border border-white/10"
                    style={{
                      color: project.color,
                      backgroundColor: `${project.color}20`,
                    }}
                  >
                    {formatCategoryName(project.category)}
                  </div>

                  <div className="absolute top-3 right-3 bg-cyan-500 w-9 h-9 rounded-full flex items-center justify-center shadow-lg">
                    <FiPlay className="text-sm text-white ml-0.5" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
                    <h3 className="text-sm font-bold text-white truncate">
                      {project.title}
                    </h3>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-400">
                        {project.year}
                      </span>
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
            variants={gridCardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            custom={i}
            onHoverStart={() => handleProjectHover(project)}
            onHoverEnd={() => handleProjectLeave(project)}
            onClick={() => handleProjectSelect(project)}
          >
            <motion.div
              className="relative h-full w-full rounded-xl overflow-hidden border border-white/5 bg-gray-900/30 backdrop-blur-sm"
              initial={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }}
              whileHover={{
                boxShadow: `0 8px 32px ${project.color}20`,
                backgroundColor: "rgba(30, 30, 30, 0.5)",
                transition: { duration: 0.6 },
              }}
            >
              <div className="thumbnail-container relative h-72 overflow-hidden">
                {/* Thumbnail fallback */}
                <div
                  className="thumbnail w-full h-full bg-cover bg-center absolute inset-0"
                  style={{
                    backgroundImage: `url(${project.thumbnail})`,
                    opacity: hoveredProject === project.id ? 0 : 1,
                    transition: "opacity 0.3s ease",
                  }}
                />

                {/* Hover video */}
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

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Category badge - positioned at top left */}
                <div
                  className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium border border-white/10 z-10"
                  style={{
                    color: project.color,
                    backgroundColor: `${project.color}20`,
                  }}
                >
                  {formatCategoryName(project.category)}
                </div>

                <div
                  className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-mono border border-white/5"
                  style={{ color: project.color }}
                >
                  {project.year}
                </div>

                <div className="absolute inset-0 m-auto bg-cyan-500 w-14 h-14 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <FiPlay className="text-xl text-white ml-1" />
                </div>
              </div>

              <motion.div
                className="project-info p-5 bg-gradient-to-b from-gray-900/70 to-gray-900/50"
                initial={{ y: 0 }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex justify-start items-start mb-2">
                  <h3 className="text-lg font-medium text-white">
                    {project.title}
                  </h3>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">{project.year}</span>

                  <div className="flex gap-1.5">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="text-[9px] px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-sm border border-white/5"
                        style={{ color: project.color }}
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
                  style={{ color: project.color }}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
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
      className="relative min-h-screen w-full overflow-hidden bg-black py-20 px-4"
    >
      {/* Animated background canvas */}
      <canvas ref={containerRef} className="absolute inset-0 w-full h-full" />

      {/* Gradient overlays for cinematic effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-black/80"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/5 to-cyan-900/5"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h2
            className="text-cyan-400 font-mono uppercase tracking-widest text-sm md:text-base mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Portfolio Showcase
          </motion.h2>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Visual Projects
            </span>
          </motion.h1>

          <motion.p
            className="text-lg text-gray-300 max-w-3xl mx-auto"
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
            className={`p-2 rounded-lg ${
              activeLayout === "grid"
                ? "bg-cyan-500/10 text-cyan-400"
                : "bg-gray-800/50 text-gray-400"
            }`}
          >
            <FiGrid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveLayout("stack")}
            className={`p-2 rounded-lg ${
              activeLayout === "stack"
                ? "bg-cyan-500/10 text-cyan-400"
                : "bg-gray-800/50 text-gray-400"
            }`}
          >
            <FiBox className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveLayout("fluid")}
            className={`p-2 rounded-lg ${
              activeLayout === "fluid"
                ? "bg-cyan-500/10 text-cyan-400"
                : "bg-gray-800/50 text-gray-400"
            }`}
          >
            <FiFilm className="w-5 h-5" />
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
                  ? "bg-gradient-to-r from-cyan-500/90 to-cyan-600/90 text-white shadow-lg shadow-cyan-500/30 border border-cyan-400/30"
                  : "bg-gray-800/30 text-white/80 hover:bg-gray-700/40 backdrop-blur-sm border border-white/10 hover:border-cyan-500/30 hover:shadow-md hover:shadow-cyan-500/10"
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

        {/* Projects Grid */}
        {renderProjects()}

        {/* Decorative elements */}
        <motion.div
          className="absolute top-40 left-10 w-3 h-3 rounded-full bg-cyan-400"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-40 right-10 w-2 h-2 rounded-full bg-purple-500"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative w-full max-w-4xl bg-gray-900 rounded-xl overflow-hidden border border-cyan-500/30"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 bg-gray-900 border-b border-cyan-500/20">
                <div className="flex items-center">
                  <div className="flex gap-1 mr-4">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  </div>
                  <h3 className="text-cyan-300 font-mono text-sm">
                    {selectedProject.title.toUpperCase().replace(/\s+/g, "_")}
                    .MP4
                  </h3>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              {/* Video player */}
              <div className="relative">
                <video
                  ref={modalVideoRef}
                  autoPlay
                  muted={false}
                  controls
                  className="w-full h-auto max-h-[70vh]"
                  poster={selectedProject.thumbnail}
                >
                  <source src={selectedProject.videoUrl} type="video/mp4" />
                </video>

                {/* Custom play button overlay */}
                {!modalVideoPlaying && (
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
                    onClick={handleModalVideoToggle}
                  >
                    <div className="w-20 h-20 bg-cyan-500/80 rounded-full flex items-center justify-center">
                      <FiPlay className="w-10 h-10 text-white" />
                    </div>
                  </div>
                )}
              </div>

              {/* Project details */}
              <div className="p-6 bg-gray-900">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {selectedProject.title}
                    </h2>
                    <div className="flex items-center gap-4">
                      <p className="text-cyan-300 font-mono">
                        {selectedProject.year}
                      </p>
                      <p className="text-gray-400">
                        {selectedProject.duration}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-cyan-900/50 text-cyan-300 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-300">{selectedProject.description}</p>
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
