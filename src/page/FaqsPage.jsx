import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiChevronDown,
  FiStar,
  FiHelpCircle,
  FiFilter,
  FiX,
  FiMessageSquare,
  FiTrendingUp,
  FiZap,
  FiAward,
  FiUsers,
  FiVideo,
  FiEdit3,
  FiGlobe,
  FiClock,
  FiMessageCircle,
} from "react-icons/fi";
import { getFAQs } from "../services/api";
import SectionHeader from "../components/Shared/SectionHeader";
import bg from "/ICON.png"; // Import your logo

// Background Logo Only Animation (Same as Projects)
// Background Logo Only Animation (More Visible)
const BackgroundLogoAnimation = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main Background Logo - Increased Opacity */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-0"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.15, 0.25, 0.15],
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
              brightness(1.3)
              contrast(1.2)
              drop-shadow(0 0 200px rgba(13, 148, 136, 0.25))
            `,
          }}
        />
      </motion.div>

      {/* Secondary Larger Logo for Depth - Increased Visibility */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-0"
        animate={{
          scale: [1.05, 1.15, 1.05],
          opacity: [0.08, 0.15, 0.08],
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
          className="w-[90%] max-w-[1300px] h-auto opacity-70"
          style={{
            filter: "blur(30px) brightness(1.4)",
            mixBlendMode: "soft-light",
          }}
        />
      </motion.div>

      {/* Enhanced Floating Particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 bg-gradient-to-r from-teal-400/70 to-teal-300/50 rounded-full z-5"
          style={{
            left: `${8 + i * 6}%`,
            top: `${12 + i * 6}%`,
          }}
          animate={{
            y: [0, -25, 0, -15, 0],
            x: [0, 8, -6, 7, 0],
            scale: [1, 1.4, 0.9, 1.3, 1],
            opacity: [0.3, 0.6, 0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8 + i * 1.2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Enhanced Glow Effect Behind Background Logo */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-0"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.12, 0.2, 0.12],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <div className="w-[800px] h-[800px] bg-teal-400/20 rounded-full blur-3xl" />
      </motion.div>

      {/* Additional Glow Layers for More Visibility */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-0"
        animate={{
          scale: [1.1, 1.2, 1.1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <div className="w-[900px] h-[900px] bg-teal-300/15 rounded-full blur-2xl" />
      </motion.div>
    </div>
  );
};

const FaqsPage = () => {
  const canvasRef = useRef(null);
  const [faqs, setFaqs] = useState([]);
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    categories: {},
    highPriority: 0,
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Enhanced FAQ categories with teal/blue color palette
  const categories = [
    {
      id: "all",
      name: "All Questions",
      color: "from-teal-400 to-teal-500",
      icon: FiHelpCircle,
      description: "Browse all frequently asked questions",
    },
    {
      id: "general",
      name: "General",
      color: "from-teal-400 to-blue-400",
      icon: FiGlobe,
      description: "General information about our services",
    },
    {
      id: "turnaround",
      name: "Turnaround Time",
      color: "from-emerald-400 to-teal-400",
      icon: FiClock,
      description: "Project timelines and delivery",
    },
    {
      id: "pricing",
      name: "Pricing & Packages",
      color: "from-cyan-400 to-teal-400",
      icon: FiTrendingUp,
      description: "Costs and service packages",
    },
    {
      id: "revisions",
      name: "Revisions & Changes",
      color: "from-blue-400 to-cyan-400",
      icon: FiEdit3,
      description: "Modification policies and limits",
    },
    {
      id: "file-formats",
      name: "File Formats",
      color: "from-teal-500 to-blue-500",
      icon: FiVideo,
      description: "Supported formats and specifications",
    },
    {
      id: "process",
      name: "Editing Process",
      color: "from-cyan-400 to-teal-500",
      icon: FiZap,
      description: "Our workflow and collaboration",
    },
    {
      id: "quality",
      name: "Quality & Standards",
      color: "from-teal-500 to-emerald-400",
      icon: FiAward,
      description: "Quality assurance and standards",
    },
    {
      id: "emergency",
      name: "Emergency Services",
      color: "from-blue-500 to-cyan-500",
      icon: FiZap,
      description: "Rush and emergency editing",
    },
    {
      id: "collaboration",
      name: "Collaboration",
      color: "from-teal-400 to-cyan-400",
      icon: FiUsers,
      description: "Client collaboration tools",
    },
  ];

  // Enhanced background animation with teal/blue particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    const particles = [];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.3;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        this.color =
          Math.random() > 0.5
            ? "rgba(20, 184, 166, 0.15)" // teal-400
            : "rgba(6, 182, 212, 0.15)"; // cyan-400
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      for (let i = 0; i < 40; i++) {
        particles.push(new Particle());
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.body.scrollHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    initParticles();

    const drawGrid = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle animated grid
      ctx.strokeStyle = "rgba(20, 184, 166, 0.03)"; // teal-400
      ctx.lineWidth = 0.5;

      const cellSize = 80;
      const offsetX = (time * 0.005) % cellSize;
      const offsetY = (time * 0.005) % cellSize;

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

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Subtle gradient overlay
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) * 0.6
      );

      const pulseIntensity = (Math.sin(time * 0.0005) + 1) * 0.1;
      gradient.addColorStop(
        0,
        `rgba(240, 253, 250, ${0.1 + pulseIntensity * 0.05})` // teal-50
      );
      gradient.addColorStop(
        0.4,
        `rgba(236, 254, 255, ${0.05 + pulseIntensity * 0.03})` // cyan-50
      );
      gradient.addColorStop(
        0.8,
        `rgba(255, 255, 255, ${0.02 + pulseIntensity * 0.02})`
      );
      gradient.addColorStop(1, "rgba(255, 255, 255, 0.9)");

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

  // Fetch FAQs
  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      const response = await getFAQs({ isActive: true });
      const faqsData = response.data?.faqs || [];
      setFaqs(faqsData);
      setFilteredFaqs(faqsData);

      // Calculate enhanced stats based on priority
      const categoryCounts = {};
      let highPriority = 0;

      faqsData.forEach((faq) => {
        categoryCounts[faq.category] = (categoryCounts[faq.category] || 0) + 1;
        if (faq.priority >= 7) {
          highPriority += 1;
        }
      });

      setStats({
        total: faqsData.length,
        categories: categoryCounts,
        highPriority,
      });
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter FAQs based on search and category
  useEffect(() => {
    let filtered = faqs;

    if (searchTerm) {
      filtered = filtered.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((faq) => faq.category === selectedCategory);
    }

    setFilteredFaqs(filtered);
  }, [searchTerm, selectedCategory, faqs]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setActiveFAQ(null);
    setMobileFiltersOpen(false);
  };

  const toggleFAQ = (faqId) => {
    setActiveFAQ(activeFAQ === faqId ? null : faqId);
  };

  const getCategoryColor = (category) => {
    const categoryObj = categories.find((cat) => cat.id === category);
    return categoryObj ? categoryObj.color : "from-teal-400 to-teal-500";
  };

  const getCategoryIcon = (category) => {
    const categoryObj = categories.find((cat) => cat.id === category);
    return categoryObj ? categoryObj.icon : FiHelpCircle;
  };

  const getPriorityStars = (priority) => {
    const stars = [];
    const starCount = Math.min(Math.floor(priority / 2), 5); // Convert 0-10 to 0-5 stars
    for (let i = 0; i < starCount; i++) {
      stars.push(
        <FiStar key={i} className="w-3 h-3 text-yellow-500 fill-current" />
      );
    }
    return stars;
  };

  const getPriorityLabel = (priority) => {
    if (priority >= 9) return "Critical";
    if (priority >= 7) return "High";
    if (priority >= 5) return "Medium";
    if (priority >= 3) return "Low";
    return "Normal";
  };

  const getPriorityColor = (priority) => {
    if (priority >= 9) return "text-red-500";
    if (priority >= 7) return "text-orange-500";
    if (priority >= 5) return "text-yellow-500";
    if (priority >= 3) return "text-blue-500";
    return "text-teal-500";
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-teal-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1.5, repeat: Infinity },
            }}
            className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-teal-600 font-mono"
          >
            Loading Knowledge Base...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-white via-teal-50 to-blue-50">
      {/* Background Logo Animation */}
      <BackgroundLogoAnimation />

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Multi-layer Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-100/20 via-white/60 to-blue-100/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-white/40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-200/10 via-transparent to-blue-200/10" />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-teal-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        {/* Enhanced Header Section */}
        <motion.div
          className="text-center mb-12 lg:mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <SectionHeader
            subtitle="VIDEO EDITING SUPPORT"
            title="Expert Answers"
            highlight="For Creators"
            description="Get instant answers about video editing, pricing, turnaround times, and professional workflow. Powered by industry expertise."
            center={true}
            titleSize="3xl"
            descriptionSize="lg"
            lineSpacing="tight"
            highlightColor="teal-500"
            dotColor="teal-500"
          />

          {/* Enhanced Search Bar */}
          <motion.div
            className="relative max-w-2xl mx-auto"
            variants={itemVariants}
          >
            <div className="relative group">
              <FiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-teal-500 w-5 h-5 z-10" />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Ask about video editing, pricing, timelines..."
                className="w-full pl-12 pr-24 py-5 bg-white/80 backdrop-blur-sm border-2 border-teal-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 shadow-lg text-lg transition-all duration-300 group-hover:border-teal-300"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <kbd className="px-2 py-1 text-xs border border-teal-300 rounded text-teal-600 bg-teal-100">
                  ⌘K
                </kbd>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Stats */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-2xl mx-auto mt-8"
            variants={staggerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              {
                label: "Total Questions",
                value: stats.total,
                icon: FiHelpCircle,
                color: "text-teal-600",
              },
              {
                label: "High Priority",
                value: stats.highPriority,
                icon: FiStar,
                color: "text-yellow-600",
              },
              {
                label: "Categories",
                value: Object.keys(stats.categories).length,
                icon: FiFilter,
                color: "text-blue-600",
              },
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="text-center p-4 bg-white/80 backdrop-blur-sm border border-teal-100 rounded-xl shadow-lg"
                >
                  <IconComponent
                    className={`w-6 h-6 mx-auto mb-2 ${stat.color}`}
                  />
                  <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Mobile Filter Toggle */}
        <motion.div className="lg:hidden mb-6" variants={itemVariants}>
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-white/80 backdrop-blur-sm border border-teal-200 rounded-xl text-teal-600 shadow-lg"
          >
            <FiFilter className="w-4 h-4" />
            <span>Filter Categories</span>
            <motion.div
              animate={{ rotate: mobileFiltersOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FiChevronDown className="w-4 h-4" />
            </motion.div>
          </button>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Enhanced Category Sidebar */}
          <motion.div
            className={`lg:w-80 flex-shrink-0 ${
              mobileFiltersOpen ? "block" : "hidden lg:block"
            }`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="bg-white/80 backdrop-blur-sm border border-teal-100 rounded-2xl p-6 shadow-xl sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Categories
                </h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="lg:hidden text-teal-600"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-2">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <motion.button
                      key={category.id}
                      onClick={() => handleCategorySelect(category.id)}
                      variants={itemVariants}
                      className={`w-full text-left p-3 rounded-xl transition-all duration-300 group ${
                        selectedCategory === category.id
                          ? `bg-gradient-to-r ${category.color} text-white shadow-lg transform scale-105`
                          : "bg-white/60 text-gray-700 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200"
                      } border border-transparent`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-3">
                        <IconComponent className="w-4 h-4 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">
                            {category.name}
                          </div>
                          <div className="text-xs opacity-70 truncate">
                            {category.description}
                          </div>
                        </div>
                        {stats.categories[category.id] && (
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              selectedCategory === category.id
                                ? "bg-white/20"
                                : "bg-teal-100 text-teal-700"
                            }`}
                          >
                            {stats.categories[category.id]}
                          </span>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Enhanced FAQ List */}
          <motion.div
            className="flex-1"
            variants={staggerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Results Header */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between mb-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCategory === "all"
                    ? "All Questions"
                    : categories.find((c) => c.id === selectedCategory)?.name}
                </h2>
                <p className="text-gray-600">
                  {filteredFaqs.length} of {stats.total} questions
                </p>
              </div>
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
                <FiTrendingUp className="w-4 h-4" />
                <span>Sorted by priority</span>
              </div>
            </motion.div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {filteredFaqs.length === 0 ? (
                <motion.div
                  variants={itemVariants}
                  className="text-center py-16 bg-white/80 backdrop-blur-sm border border-teal-100 rounded-2xl shadow-lg"
                >
                  <FiHelpCircle className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-2xl text-gray-600 mb-2">
                    No questions found
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    {searchTerm
                      ? `No results for "${searchTerm}". Try different keywords.`
                      : "No questions available in this category yet."}
                  </p>
                </motion.div>
              ) : (
                filteredFaqs
                  .sort((a, b) => b.priority - a.priority)
                  .map((faq, index) => {
                    const CategoryIcon = getCategoryIcon(faq.category);

                    return (
                      <motion.div
                        key={faq._id}
                        variants={itemVariants}
                        custom={index}
                        className="group relative"
                      >
                        {/* Background Glow Effect */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${getCategoryColor(
                            faq.category
                          )} rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300`}
                        />

                        <div className="relative bg-white/80 backdrop-blur-sm border-2 border-teal-100 rounded-2xl overflow-hidden shadow-lg hover:border-teal-200 transition-all duration-300 group-hover:scale-[1.02]">
                          <button
                            onClick={() => toggleFAQ(faq._id)}
                            className="w-full px-6 py-6 text-left flex items-start justify-between"
                          >
                            <div className="flex items-start space-x-4 flex-1">
                              <div className="flex-shrink-0">
                                <div
                                  className={`p-3 rounded-xl bg-gradient-to-r ${getCategoryColor(
                                    faq.category
                                  )}`}
                                >
                                  <CategoryIcon className="w-5 h-5 text-white" />
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-3">
                                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-teal-700 transition-colors line-clamp-2">
                                    {faq.question}
                                  </h3>
                                  <div className="flex items-center space-x-2">
                                    <div className="flex items-center space-x-1">
                                      {getPriorityStars(faq.priority)}
                                    </div>
                                    <span
                                      className={`px-2 py-1 text-xs rounded-full bg-gradient-to-r ${getCategoryColor(
                                        faq.category
                                      )} text-white`}
                                    >
                                      {faq.category}
                                    </span>
                                  </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                  <span
                                    className={`flex items-center space-x-1 ${getPriorityColor(
                                      faq.priority
                                    )}`}
                                  >
                                    <FiStar className="w-3 h-3" />
                                    <span>
                                      {getPriorityLabel(faq.priority)} Priority
                                    </span>
                                  </span>
                                  <span className="flex items-center space-x-1 text-gray-500">
                                    <FiClock className="w-3 h-3" />
                                    <span>Updated recently</span>
                                  </span>
                                </div>
                              </div>
                            </div>

                            <motion.div
                              animate={{
                                rotate: activeFAQ === faq._id ? 180 : 0,
                              }}
                              transition={{ duration: 0.3 }}
                              className="flex-shrink-0 ml-4 p-2 text-teal-500 group-hover:text-teal-600 group-hover:bg-teal-50 rounded-lg transition-colors"
                            >
                              <FiChevronDown className="w-5 h-5" />
                            </motion.div>
                          </button>

                          <AnimatePresence>
                            {activeFAQ === faq._id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                  duration: 0.4,
                                  ease: "easeInOut",
                                }}
                                className="border-t border-teal-100"
                              >
                                <div className="p-6">
                                  <div className="pl-2 border-l-2 border-teal-300">
                                    <p className="text-gray-700 text-lg leading-relaxed">
                                      {faq.answer}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    );
                  })
              )}
            </div>

            {/* High Priority FAQs Section */}
            {filteredFaqs.length > 0 && (
              <motion.div
                className="mt-16"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  variants={itemVariants}
                  className="text-center mb-8"
                >
                  <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-200 rounded-full px-4 py-2">
                    <FiStar className="w-4 h-4 text-yellow-600" />
                    <span className="text-yellow-700 font-medium">
                      High Priority Questions
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mt-4">
                    Critical Information
                  </h3>
                </motion.div>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {faqs
                    .filter((faq) => faq.priority >= 7)
                    .sort((a, b) => b.priority - a.priority)
                    .slice(0, 6)
                    .map((faq, index) => {
                      const CategoryIcon = getCategoryIcon(faq.category);
                      return (
                        <motion.div
                          key={faq._id}
                          variants={itemVariants}
                          custom={index}
                          className="bg-white/80 backdrop-blur-sm border border-yellow-200 rounded-xl p-6 hover:border-yellow-300 transition-all duration-300 cursor-pointer group shadow-lg"
                          onClick={() => toggleFAQ(faq._id)}
                          whileHover={{
                            scale: 1.02,
                            y: -5,
                          }}
                        >
                          <div className="flex items-center space-x-3 mb-3">
                            <div
                              className={`p-2 rounded-lg bg-gradient-to-r ${getCategoryColor(
                                faq.category
                              )}`}
                            >
                              <CategoryIcon className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                              {faq.category}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="flex items-center space-x-1">
                              {getPriorityStars(faq.priority)}
                            </div>
                            <span
                              className={`text-sm font-medium ${getPriorityColor(
                                faq.priority
                              )}`}
                            >
                              {getPriorityLabel(faq.priority)}
                            </span>
                          </div>
                          <h4 className="text-gray-900 font-semibold line-clamp-3 group-hover:text-teal-700 transition-colors">
                            {faq.question}
                          </h4>
                        </motion.div>
                      );
                    })}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
        {/* Can't Find Your Answer? CTA Section */}
        <motion.div
          className="mt-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="text-center bg-white/80 backdrop-blur-sm p-10 rounded-2xl border border-teal-200 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center space-x-2 bg-teal-100 border border-teal-200 rounded-full px-4 py-2 mb-4">
              <FiMessageCircle className="w-4 h-4 text-teal-600" />
              <span className="text-teal-700 font-medium text-sm">
                Can't Find Your Answer?
              </span>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              We're Here to Help You
            </h2>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
              Didn't find what you were looking for? Contact our support team
              directly and get personalized assistance for your specific video
              editing needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                href="/contact"
                className="px-8 py-3 bg-teal-500 text-white font-medium rounded-full hover:bg-teal-600 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Contact Support</span>
              </motion.a>
            </div>

            <p className="text-gray-600 text-sm mt-4">
              Typically respond within 24 hours • Professional support
              guaranteed
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Scrolling Marquee */}
      <motion.div
        className="relative z-20 mt-16 bg-gradient-to-r from-teal-100 to-blue-100 border-y border-teal-200 py-4 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="flex space-x-8"
          animate={{ x: [0, -1000] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
        >
          {[...Array(3)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-teal-700 font-mono text-sm whitespace-nowrap">
                • VIDEO EDITING • COLOR GRADING • MOTION GRAPHICS • 4K QUALITY •
                FAST TURNAROUND • PROFESSIONAL WORKFLOW • CINEMATIC RESULTS •
              </span>
            </React.Fragment>
          ))}
        </motion.div>
      </motion.div>

      {/* Floating Action Button for Mobile */}
      <motion.button
        className="fixed bottom-6 right-6 lg:hidden z-30 w-14 h-14 bg-teal-500 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-teal-600 transition-colors duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setMobileFiltersOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <FiFilter className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

export default FaqsPage;
