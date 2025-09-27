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

  // Enhanced FAQ categories for video editing business
  const categories = [
    {
      id: "all",
      name: "All Questions",
      color: "from-gray-400 to-gray-600",
      icon: FiHelpCircle,
      description: "Browse all frequently asked questions",
    },
    {
      id: "general",
      name: "General",
      color: "from-blue-400 to-blue-600",
      icon: FiGlobe,
      description: "General information about our services",
    },
    {
      id: "turnaround",
      name: "Turnaround Time",
      color: "from-green-400 to-green-600",
      icon: FiClock,
      description: "Project timelines and delivery",
    },
    {
      id: "pricing",
      name: "Pricing & Packages",
      color: "from-purple-400 to-purple-600",
      icon: FiTrendingUp,
      description: "Costs and service packages",
    },
    {
      id: "revisions",
      name: "Revisions & Changes",
      color: "from-orange-400 to-orange-600",
      icon: FiEdit3,
      description: "Modification policies and limits",
    },
    {
      id: "file-formats",
      name: "File Formats",
      color: "from-red-400 to-red-600",
      icon: FiVideo,
      description: "Supported formats and specifications",
    },
    {
      id: "process",
      name: "Editing Process",
      color: "from-indigo-400 to-indigo-600",
      icon: FiZap,
      description: "Our workflow and collaboration",
    },
    {
      id: "quality",
      name: "Quality & Standards",
      color: "from-teal-400 to-teal-600",
      icon: FiAward,
      description: "Quality assurance and standards",
    },
    {
      id: "emergency",
      name: "Emergency Services",
      color: "from-pink-400 to-pink-600",
      icon: FiZap,
      description: "Rush and emergency editing",
    },
    {
      id: "collaboration",
      name: "Collaboration",
      color: "from-cyan-400 to-cyan-600",
      icon: FiUsers,
      description: "Client collaboration tools",
    },
  ];

  // Enhanced background animation with particles
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
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color =
          Math.random() > 0.5
            ? "rgba(6, 182, 212, 0.3)"
            : "rgba(139, 92, 246, 0.3)";
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
      for (let i = 0; i < 50; i++) {
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

      // Draw animated grid
      ctx.strokeStyle = "rgba(6, 182, 212, 0.08)";
      ctx.lineWidth = 1;

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

      // Enhanced gradient overlay
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) * 0.8
      );

      const pulseIntensity = (Math.sin(time * 0.0005) + 1) * 0.2;
      gradient.addColorStop(
        0,
        `rgba(6, 182, 212, ${0.02 + pulseIntensity * 0.01})`
      );
      gradient.addColorStop(
        0.3,
        `rgba(139, 92, 246, ${0.03 + pulseIntensity * 0.02})`
      );
      gradient.addColorStop(
        0.6,
        `rgba(236, 72, 153, ${0.02 + pulseIntensity * 0.01})`
      );
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.9)");

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
    return categoryObj ? categoryObj.color : "from-gray-400 to-gray-600";
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
        <FiStar key={i} className="w-3 h-3 text-yellow-400 fill-current" />
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
    if (priority >= 9) return "text-red-400";
    if (priority >= 7) return "text-orange-400";
    if (priority >= 5) return "text-yellow-400";
    if (priority >= 3) return "text-blue-400";
    return "text-gray-400";
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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1.5, repeat: Infinity },
            }}
            className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-cyan-400 font-mono"
          >
            Loading Knowledge Base...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Enhanced Animated Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Multi-layer Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-black/60 to-purple-900/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/5 via-transparent to-purple-500/5" />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
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
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center space-x-2 bg-black/50 border border-cyan-400/30 rounded-full px-4 py-2 mb-6"
          >
            <FiMessageSquare className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 font-mono text-sm uppercase tracking-widest">
              Video Editing Support
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            variants={itemVariants}
          >
            <span className="block">Expert Answers</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-gradient-x">
              For Creators
            </span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Get instant answers about video editing, pricing, turnaround times,
            and professional workflow. Powered by industry expertise.
          </motion.p>

          {/* Enhanced Search Bar */}
          <motion.div
            className="relative max-w-2xl mx-auto"
            variants={itemVariants}
          >
            <div className="relative group">
              <FiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5 z-10" />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Ask about video editing, pricing, timelines..."
                className="w-full pl-12 pr-24 py-5 bg-black/60 border-2 border-cyan-400/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 backdrop-blur-xl text-lg transition-all duration-300 group-hover:border-cyan-400/50"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <kbd className="px-2 py-1 text-xs border border-cyan-400/30 rounded text-cyan-300 bg-cyan-400/10">
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
                color: "text-cyan-400",
              },
              {
                label: "High Priority",
                value: stats.highPriority,
                icon: FiStar,
                color: "text-yellow-400",
              },
              {
                label: "Categories",
                value: Object.keys(stats.categories).length,
                icon: FiFilter,
                color: "text-pink-400",
              },
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="text-center p-4 bg-black/40 border border-cyan-400/20 rounded-xl backdrop-blur-sm"
                >
                  <IconComponent
                    className={`w-6 h-6 mx-auto mb-2 ${stat.color}`}
                  />
                  <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Mobile Filter Toggle */}
        <motion.div className="lg:hidden mb-6" variants={itemVariants}>
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-black/60 border border-cyan-400/30 rounded-xl text-cyan-400"
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
            <div className="bg-black/40 border border-cyan-400/20 rounded-2xl p-6 backdrop-blur-xl sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Categories</h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="lg:hidden text-cyan-400"
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
                          : "bg-black/30 text-gray-300 hover:bg-cyan-400/10 hover:text-cyan-300 hover:border-cyan-400/30"
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
                                : "bg-cyan-400/10 text-cyan-400"
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
                <h2 className="text-2xl font-bold text-white">
                  {selectedCategory === "all"
                    ? "All Questions"
                    : categories.find((c) => c.id === selectedCategory)?.name}
                </h2>
                <p className="text-gray-400">
                  {filteredFaqs.length} of {stats.total} questions
                </p>
              </div>
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-400">
                <FiTrendingUp className="w-4 h-4" />
                <span>Sorted by priority</span>
              </div>
            </motion.div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {filteredFaqs.length === 0 ? (
                <motion.div
                  variants={itemVariants}
                  className="text-center py-16 bg-black/40 border border-cyan-400/20 rounded-2xl backdrop-blur-xl"
                >
                  <FiHelpCircle className="w-20 h-20 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-2xl text-gray-400 mb-2">
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

                        <div className="relative bg-black/40 border-2 border-cyan-400/20 rounded-2xl overflow-hidden backdrop-blur-xl hover:border-cyan-400/40 transition-all duration-300 group-hover:scale-[1.02]">
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
                                  <h3 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
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

                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
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
                                  <span className="flex items-center space-x-1 text-gray-400">
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
                              className="flex-shrink-0 ml-4 p-2 text-cyan-400 group-hover:text-cyan-300 group-hover:bg-cyan-400/10 rounded-lg transition-colors"
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
                                className="border-t border-cyan-400/10"
                              >
                                <div className="p-6">
                                  <div className="pl-2 border-l-2 border-cyan-400/50">
                                    <p className="text-gray-300 text-lg leading-relaxed">
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
                  <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-400/30 rounded-full px-4 py-2">
                    <FiStar className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 font-medium">
                      High Priority Questions
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mt-4">
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
                          className="bg-black/40 border border-yellow-400/20 rounded-xl p-6 hover:border-yellow-400/40 transition-all duration-300 cursor-pointer group"
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
                            <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
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
                          <h4 className="text-white font-semibold line-clamp-3 group-hover:text-cyan-300 transition-colors">
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
            className="text-center bg-black/30 backdrop-blur-sm p-10 rounded-2xl border border-cyan-500/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            animate="pulse"
          >
            <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-400/30 rounded-full px-4 py-2 mb-4">
              <FiMessageCircle className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 font-medium text-sm">
                Can't Find Your Answer?
              </span>
            </div>

            <h2 className="text-3xl font-bold text-white mb-4">
              We're Here to Help You
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Didn't find what you were looking for? Contact our support team
              directly and get personalized assistance for your specific video
              editing needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                href="/contact"
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-full relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Contact Support</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.a>
            </div>

            <p className="text-gray-400 text-sm mt-4">
              Typically respond within 24 hours • Professional support
              guaranteed
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Scrolling Marquee */}
      <motion.div
        className="relative z-20 mt-16 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-y border-cyan-400/20 py-4 overflow-hidden"
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
              <span className="text-cyan-400 font-mono text-sm whitespace-nowrap">
                • VIDEO EDITING • COLOR GRADING • MOTION GRAPHICS • 4K QUALITY •
                FAST TURNAROUND • PROFESSIONAL WORKFLOW • CINEMATIC RESULTS •
              </span>
            </React.Fragment>
          ))}
        </motion.div>
      </motion.div>

      {/* Floating Action Button for Mobile */}
      <motion.button
        className="fixed bottom-6 right-6 lg:hidden z-30 w-14 h-14 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full shadow-lg flex items-center justify-center text-white"
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
