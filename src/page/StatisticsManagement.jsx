import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiBarChart2,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiToggleLeft,
  FiToggleRight,
  FiArrowLeft,
  FiCheckCircle,
  FiX,
  FiLoader,
  FiTrendingUp,
  FiPercent,
  FiType,
  FiStar,
  FiAlertCircle,
} from "react-icons/fi";
import {
  getStatistics,
  createStatistic,
  updateStatistic,
  deleteStatistic,
  toggleStatistic,
} from "../services/api";

const modalVariants = {
  initial: {
    y: 50,
    opacity: 0,
    scale: 0.95,
  },
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
      duration: 0.3,
    },
  },
  exit: {
    y: 50,
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
};

const overlayVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const StatisticsManagement = () => {
  const [statistics, setStatistics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingStatistic, setEditingStatistic] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [formErrors, setFormErrors] = useState({});

  const [formData, setFormData] = useState({
    title: "",
    value: "",
    description: "",
    icon: "",
    type: "number",
    displayOrder: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    setLoading(true);
    try {
      const response = await getStatistics();
      setStatistics(response.data.statistics || []);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.title.trim()) {
      errors.title = "Title is required";
    } else if (formData.title.length > 50) {
      errors.title = "Title must be less than 50 characters";
    }

    if (!formData.value.trim()) {
      errors.value = "Value is required";
    }

    if (formData.description.length > 200) {
      errors.description = "Description must be less than 200 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!validateForm()) {
      setSubmitting(false);
      return;
    }

    try {
      if (editingStatistic) {
        await updateStatistic(editingStatistic.slug, formData);
      } else {
        await createStatistic(formData);
      }
      setShowForm(false);
      setEditingStatistic(null);
      setFormData({
        title: "",
        value: "",
        description: "",
        icon: "",
        type: "number",
        displayOrder: 0,
        isActive: true,
      });
      fetchStatistics();
    } catch (error) {
      console.error("Error saving statistic:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (statistic) => {
    setEditingStatistic(statistic);
    setFormData({
      title: statistic.title,
      value: statistic.value,
      description: statistic.description || "",
      icon: statistic.icon || "",
      type: statistic.type,
      displayOrder: statistic.displayOrder,
      isActive: statistic.isActive,
    });
    setShowForm(true);
    setActiveTab("basic");
  };

  const handleDelete = async (slug) => {
    if (window.confirm("Are you sure you want to delete this statistic?")) {
      try {
        await deleteStatistic(slug);
        fetchStatistics();
      } catch (error) {
        console.error("Error deleting statistic:", error);
      }
    }
  };

  const handleToggle = async (statistic) => {
    try {
      await toggleStatistic(statistic.slug);
      fetchStatistics();
    } catch (error) {
      console.error("Error toggling statistic:", error);
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingStatistic(null);
    setFormData({
      title: "",
      value: "",
      description: "",
      icon: "",
      type: "number",
      displayOrder: 0,
      isActive: true,
    });
    setFormErrors({});
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "number":
        return <FiTrendingUp className="h-4 w-4" />;
      case "percentage":
        return <FiPercent className="h-4 w-4" />;
      case "text":
        return <FiType className="h-4 w-4" />;
      case "rating":
        return <FiStar className="h-4 w-4" />;
      default:
        return <FiBarChart2 className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "number":
        return "from-blue-500 to-cyan-500";
      case "percentage":
        return "from-green-500 to-emerald-500";
      case "text":
        return "from-purple-500 to-pink-500";
      case "rating":
        return "from-yellow-500 to-orange-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center mb-4 sm:mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.history.back()}
              className="mr-3 sm:mr-4 p-2 sm:p-3 bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <FiArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
            </motion.button>
            <div className="p-2 sm:p-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl sm:rounded-2xl shadow-lg">
              <FiBarChart2 className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <div className="ml-3 sm:ml-4">
              <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Statistics
              </h1>
              <p className="text-gray-600 text-sm sm:text-lg mt-1">
                Manage your metrics
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        {!loading && statistics.length === 0 && !showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8 sm:py-16"
          >
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 max-w-md mx-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-teal-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiBarChart2 className="h-8 w-8 sm:h-10 sm:w-10 text-teal-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                No Statistics Yet
              </h3>
              <p className="text-gray-600 text-sm sm:text-base mb-6">
                Start by creating your first statistic to showcase your
                achievements.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base"
              >
                <FiPlus className="h-4 w-4 sm:h-5 sm:w-5 inline mr-2" />
                Add First Statistic
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-6">
          {statistics.map((statistic, index) => (
            <motion.div
              key={statistic._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                statistic.isActive ? "ring-2 ring-teal-500/20" : "opacity-60"
              }`}
            >
              {/* Header */}
              <div
                className={`bg-gradient-to-r ${getTypeColor(
                  statistic.type
                )} p-3 sm:p-4`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="p-1 sm:p-2 bg-white/20 rounded-lg">
                      {statistic.icon ? (
                        <span className="text-white text-sm sm:text-lg">
                          {statistic.icon}
                        </span>
                      ) : (
                        getTypeIcon(statistic.type)
                      )}
                    </div>
                    <span className="text-white font-semibold text-xs sm:text-sm capitalize">
                      {statistic.type}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleToggle(statistic)}
                    className={`p-1 rounded-lg transition-colors ${
                      statistic.isActive ? "bg-white/20" : "bg-white/10"
                    }`}
                  >
                    {statistic.isActive ? (
                      <FiToggleRight className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    ) : (
                      <FiToggleLeft className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <div className="p-3 sm:p-5">
                <h3 className="font-bold text-gray-800 text-base sm:text-lg mb-2 line-clamp-1">
                  {statistic.title}
                </h3>
                <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
                  {statistic.value}
                </p>
                {statistic.description && (
                  <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-2">
                    {statistic.description}
                  </p>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-500 font-medium">
                    Order: {statistic.displayOrder}
                  </span>
                  <div className="flex space-x-1 sm:space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEdit(statistic)}
                      className="p-1 sm:p-2 bg-blue-50 text-blue-600 rounded-lg sm:rounded-xl hover:bg-blue-100 transition-colors"
                    >
                      <FiEdit className="h-3 w-3 sm:h-4 sm:w-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(statistic.slug)}
                      className="p-1 sm:p-2 bg-red-50 text-red-600 rounded-lg sm:rounded-xl hover:bg-red-100 transition-colors"
                    >
                      <FiTrash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full"
            />
          </div>
        )}

        {/* Add New Button */}
        {!showForm && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowForm(true)}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-200 z-40"
          >
            <FiPlus className="h-5 w-5 sm:h-6 sm:w-6" />
          </motion.button>
        )}

        {/* Add/Edit Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
              variants={overlayVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              onClick={resetForm}
            >
              <motion.div
                className="bg-gradient-to-br from-white to-gray-50/80 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-2xl max-h-[95dvh] overflow-hidden border border-white/20 flex flex-col"
                variants={modalVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Enhanced Header */}
                <div className="relative bg-gradient-to-r from-teal-600 to-cyan-500 p-4 sm:p-6 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="p-1 sm:p-2 bg-white/20 rounded-lg sm:rounded-xl">
                        <FiBarChart2 className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-lg sm:text-2xl font-bold text-white">
                          {editingStatistic
                            ? "Edit Statistic"
                            : "Add New Statistic"}
                        </h2>
                        <p className="text-white/80 text-xs sm:text-sm mt-1">
                          {editingStatistic
                            ? "Update your statistic details"
                            : "Create a new statistic to showcase your achievements"}
                        </p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={resetForm}
                      className="p-1 sm:p-2 hover:bg-white/10 rounded-lg sm:rounded-xl transition-all duration-200"
                    >
                      <FiX className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </motion.button>
                  </div>

                  {/* Progress Tabs */}
                  <div className="flex space-x-1 mt-4 sm:mt-6">
                    {["basic", "details"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1 sm:space-x-2 ${
                          activeTab === tab
                            ? "bg-white text-gray-900 shadow-lg"
                            : "text-white/70 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        <span className="truncate">
                          {tab === "basic" ? "Basic Info" : "Details"}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scrollable Form Content */}
                <div className="flex-1 overflow-y-auto">
                  <form onSubmit={handleSubmit}>
                    <div className="p-4 sm:p-6 sm:pb-20 space-y-6">
                      {/* Basic Info Tab */}
                      {activeTab === "basic" && (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="space-y-4 sm:space-y-6"
                        >
                          <div className="grid grid-cols-1 gap-4 sm:gap-6">
                            {/* Title */}
                            <div>
                              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                                <FiEdit className="h-4 w-4 mr-2 text-teal-500" />
                                Title *
                                <span className="ml-auto text-xs text-gray-500">
                                  {formData.title.length}/50
                                </span>
                              </label>
                              <input
                                type="text"
                                required
                                maxLength={50}
                                value={formData.title}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    title: e.target.value,
                                  })
                                }
                                className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 ${
                                  formErrors.title
                                    ? "border-red-500 ring-2 ring-red-200"
                                    : ""
                                }`}
                                placeholder="e.g., Projects Completed"
                              />
                              {formErrors.title && (
                                <p className="text-red-500 text-xs mt-1">
                                  {formErrors.title}
                                </p>
                              )}
                            </div>

                            {/* Value */}
                            <div>
                              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                                <FiTrendingUp className="h-4 w-4 mr-2 text-blue-500" />
                                Value *
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.value}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    value: e.target.value,
                                  })
                                }
                                className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                                  formErrors.value
                                    ? "border-red-500 ring-2 ring-red-200"
                                    : ""
                                }`}
                                placeholder="e.g., 150+"
                              />
                              {formErrors.value && (
                                <p className="text-red-500 text-xs mt-1">
                                  {formErrors.value}
                                </p>
                              )}
                            </div>

                            {/* Description */}
                            <div>
                              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                                <FiEdit className="h-4 w-4 mr-2 text-purple-500" />
                                Description
                                <span className="ml-auto text-xs text-gray-500">
                                  {formData.description.length}/200
                                </span>
                              </label>
                              <textarea
                                rows={3}
                                maxLength={200}
                                value={formData.description}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    description: e.target.value,
                                  })
                                }
                                className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all duration-200 ${
                                  formErrors.description
                                    ? "border-red-500 ring-2 ring-red-200"
                                    : ""
                                }`}
                                placeholder="e.g., Successful projects delivered to satisfied clients"
                              />
                              {formErrors.description && (
                                <p className="text-red-500 text-xs mt-1">
                                  {formErrors.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Details Tab */}
                      {activeTab === "details" && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="space-y-4 sm:space-y-6"
                        >
                          <div className="grid grid-cols-1 gap-4 sm:gap-6">
                            {/* Type */}
                            <div>
                              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                                <FiType className="h-4 w-4 mr-2 text-green-500" />
                                Type
                              </label>
                              <select
                                value={formData.type}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    type: e.target.value,
                                  })
                                }
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
                              >
                                <option value="number">Number</option>
                                <option value="percentage">Percentage</option>
                                <option value="text">Text</option>
                                <option value="rating">Rating</option>
                              </select>
                            </div>

                            {/* Display Order */}
                            <div>
                              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                                <FiBarChart2 className="h-4 w-4 mr-2 text-orange-500" />
                                Display Order
                              </label>
                              <input
                                type="number"
                                value={formData.displayOrder}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    displayOrder: parseInt(e.target.value) || 0,
                                  })
                                }
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                              />
                            </div>

                            {/* Icon */}
                            <div>
                              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                                <FiStar className="h-4 w-4 mr-2 text-yellow-500" />
                                Icon (Emoji or Icon Name)
                              </label>
                              <input
                                type="text"
                                value={formData.icon}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    icon: e.target.value,
                                  })
                                }
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                placeholder="e.g., 📊 or FiBarChart2"
                              />
                            </div>

                            {/* Active Toggle */}
                            <div>
                              <div className="p-3 sm:p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg sm:rounded-xl border border-teal-200">
                                <label className="flex items-center cursor-pointer">
                                  <div className="relative">
                                    <input
                                      type="checkbox"
                                      checked={formData.isActive}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          isActive: e.target.checked,
                                        })
                                      }
                                      className="sr-only"
                                    />
                                    <div
                                      className={`w-10 h-5 sm:w-12 sm:h-6 rounded-full transition-colors duration-200 ${
                                        formData.isActive
                                          ? "bg-teal-500"
                                          : "bg-gray-300"
                                      }`}
                                    />
                                    <div
                                      className={`absolute left-0.5 top-0.5 sm:left-1 sm:top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${
                                        formData.isActive
                                          ? "transform translate-x-5 sm:translate-x-6"
                                          : ""
                                      }`}
                                    />
                                  </div>
                                  <div className="ml-3 flex items-center">
                                    <FiCheckCircle
                                      className={`h-4 w-4 sm:h-5 sm:w-5 mr-2 transition-colors ${
                                        formData.isActive
                                          ? "text-teal-500"
                                          : "text-gray-400"
                                      }`}
                                    />
                                    <span className="text-sm font-semibold text-gray-700">
                                      Active
                                    </span>
                                    {formData.isActive && (
                                      <span className="ml-2 bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full font-medium">
                                        Visible
                                      </span>
                                    )}
                                  </div>
                                </label>
                                <p className="text-xs text-gray-500 mt-2 ml-12 sm:ml-16 flex items-center">
                                  <FiAlertCircle className="h-3 w-3 mr-1" />
                                  Active statistics are visible on your website.
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </form>
                </div>

                {/* Sticky Footer */}
                <div className="border-t border-gray-200 bg-gray-50/80 p-4 sm:p-6 sticky bottom-0 backdrop-blur-sm flex-shrink-0">
                  <div className="flex items-center justify-between gap-2 sm:gap-3">
                    <div className="flex space-x-2 sm:space-x-3">
                      {activeTab !== "basic" && (
                        <button
                          type="button"
                          onClick={() => setActiveTab("basic")}
                          className="px-4 sm:px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium text-sm sm:text-base flex-1"
                        >
                          Previous
                        </button>
                      )}
                    </div>

                    <div className="flex space-x-2 sm:space-x-3">
                      <button
                        type="button"
                        onClick={resetForm}
                        className="px-4 sm:px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium text-sm sm:text-base"
                      >
                        Cancel
                      </button>

                      {activeTab === "details" ? (
                        <button
                          type="submit"
                          onClick={handleSubmit}
                          disabled={submitting}
                          className="px-4 sm:px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg sm:rounded-xl hover:from-teal-600 hover:to-cyan-600 disabled:opacity-50 transition-all duration-200 font-medium text-sm sm:text-base flex items-center space-x-2 min-w-[100px]"
                        >
                          {submitting ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                                className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full"
                              />
                              <span className="text-xs sm:text-sm">
                                {editingStatistic
                                  ? "Updating..."
                                  : "Creating..."}
                              </span>
                            </>
                          ) : (
                            <>
                              <FiCheckCircle size={14} />
                              <span className="text-xs sm:text-sm">
                                {editingStatistic ? "Update" : "Create"}
                              </span>
                            </>
                          )}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setActiveTab("details")}
                          className="px-4 sm:px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg sm:rounded-xl hover:from-teal-600 hover:to-cyan-600 transition-all duration-200 font-medium text-sm sm:text-base flex items-center space-x-2"
                        >
                          <span>Next</span>
                          <FiBarChart2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StatisticsManagement;
