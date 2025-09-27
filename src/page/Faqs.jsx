import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiSave,
  FiX,
  FiSearch,
  FiFilter,
  FiEye,
  FiThumbsUp,
  FiThumbsDown,
  FiArrowLeft,
  FiHelpCircle,
  FiTag,
  FiStar,
  FiBarChart2,
  FiVideo,
  FiFilm,
  FiScissors,
  FiClock,
  FiDollarSign,
  FiFileText,
} from "react-icons/fi";
import {
  getFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ,
  getFAQsByCategory,
  getPopularFAQs,
} from "../services/api"; // Update path to your API file

const Faqs = ({ onBack }) => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [editMode, setEditMode] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Video editing agency specific categories
  const categories = [
    "general",
    "pricing",
    "turnaround",
    "revisions",
    "file-formats",
    "process",
    "quality",
    "rights-usage",
    "emergency",
    "collaboration",
  ];

  const categoryLabels = {
    general: "General",
    pricing: "Pricing & Packages",
    turnaround: "Turnaround Time",
    revisions: "Revisions & Changes",
    "file-formats": "File Formats",
    process: "Editing Process",
    quality: "Quality & Standards",
    "rights-usage": "Rights & Usage",
    emergency: "Emergency Services",
    collaboration: "Collaboration",
  };

  const categoryIcons = {
    general: <FiHelpCircle className="w-4 h-4" />,
    pricing: <FiDollarSign className="w-4 h-4" />,
    turnaround: <FiClock className="w-4 h-4" />,
    revisions: <FiScissors className="w-4 h-4" />,
    "file-formats": <FiFileText className="w-4 h-4" />,
    process: <FiFilm className="w-4 h-4" />,
    quality: <FiStar className="w-4 h-4" />,
    "rights-usage": <FiFileText className="w-4 h-4" />,
    emergency: <FiClock className="w-4 h-4" />,
    collaboration: <FiVideo className="w-4 h-4" />,
  };

  // Form state
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "general",
    priority: 0,
    isActive: true,
  });

  // Fetch FAQs on component mount
  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async (filters = {}) => {
    try {
      setLoading(true);
      const response = await getFAQs(filters);
      setFaqs(response.data?.faqs || []);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      showMessage("error", "Failed to load FAQs");
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text, duration = 3000) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), duration);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      question: "",
      answer: "",
      category: "general",
      priority: 0,
      isActive: true,
    });
    setSelectedFAQ(null);
    setEditMode(false);
  };

  const handleCreateFAQ = async () => {
    try {
      setSaving(true);

      if (!formData.question || !formData.answer) {
        showMessage("error", "Question and answer are required");
        return;
      }

      await createFAQ(formData);
      showMessage("success", "FAQ created successfully");
      resetForm();
      fetchFAQs();
    } catch (error) {
      console.error("Error creating FAQ:", error);
      showMessage("error", "Failed to create FAQ");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateFAQ = async () => {
    try {
      setSaving(true);

      if (!formData.question || !formData.answer) {
        showMessage("error", "Question and answer are required");
        return;
      }

      await updateFAQ(selectedFAQ.slug, formData);
      showMessage("success", "FAQ updated successfully");
      resetForm();
      fetchFAQs();
    } catch (error) {
      console.error("Error updating FAQ:", error);
      showMessage("error", "Failed to update FAQ");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteFAQ = async (faq) => {
    if (window.confirm(`Are you sure you want to delete "${faq.question}"?`)) {
      try {
        setSaving(true);
        await deleteFAQ(faq.slug);
        showMessage("success", "FAQ deleted successfully");
        fetchFAQs();
      } catch (error) {
        console.error("Error deleting FAQ:", error);
        showMessage("error", "Failed to delete FAQ");
      } finally {
        setSaving(false);
      }
    }
  };

  const handleEditFAQ = (faq) => {
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      priority: faq.priority,
      isActive: faq.isActive,
    });
    setSelectedFAQ(faq);
    setEditMode(true);
  };

  const handleSearch = () => {
    const filters = {};
    if (searchTerm) filters.search = searchTerm;
    if (filterCategory !== "all") filters.category = filterCategory;
    if (filterStatus !== "all") filters.isActive = filterStatus === "active";

    fetchFAQs(filters);
  };

  const getCategoryColor = (category) => {
    const colors = {
      general: "bg-blue-100 text-blue-800",
      pricing: "bg-green-100 text-green-800",
      turnaround: "bg-orange-100 text-orange-800",
      revisions: "bg-purple-100 text-purple-800",
      "file-formats": "bg-indigo-100 text-indigo-800",
      process: "bg-teal-100 text-teal-800",
      quality: "bg-amber-100 text-amber-800",
      "rights-usage": "bg-red-100 text-red-800",
      emergency: "bg-pink-100 text-pink-800",
      collaboration: "bg-cyan-100 text-cyan-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const getPriorityBadge = (priority) => {
    if (priority >= 8) return "bg-red-100 text-red-800";
    if (priority >= 5) return "bg-orange-100 text-orange-800";
    if (priority >= 3) return "bg-yellow-100 text-yellow-800";
    return "bg-gray-100 text-gray-800";
  };

  // Sample FAQ data for video editing agency
  const sampleQuestions = {
    pricing: [
      {
        question: "What are your pricing packages for video editing?",
        answer:
          "We offer three main packages: Basic ($199) includes 5-minute video with color correction; Standard ($399) includes 10-minute video with motion graphics; Premium ($699) includes 15-minute video with advanced effects and sound design.",
      },
    ],
    turnaround: [
      {
        question: "What is your typical turnaround time for a 5-minute video?",
        answer:
          "Our standard turnaround time is 3-5 business days for a 5-minute video. Rush services are available for 24-48 hour delivery at an additional 50% fee.",
      },
    ],
    revisions: [
      {
        question: "How many revisions are included in your packages?",
        answer:
          "All packages include 2 rounds of revisions. Additional revisions are available at $50 per round. We ensure complete satisfaction with your final video.",
      },
    ],
  };

  const addSampleQuestion = (category) => {
    const samples = sampleQuestions[category];
    if (samples && samples.length > 0) {
      const sample = samples[0];
      setFormData((prev) => ({
        ...prev,
        question: sample.question,
        answer: sample.answer,
        category: category,
      }));
    }
  };

  if (loading && faqs.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 mb-4 transition-colors"
              >
                <FiArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Video Editing FAQ Management
              </h1>
              <p className="text-gray-600">
                Manage frequently asked questions for your video editing agency
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={resetForm}
              className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
            >
              <FiPlus className="w-4 h-4" />
              <span>Add New FAQ</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Message Alert */}
        <AnimatePresence>
          {message.text && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`p-4 rounded-lg mb-6 ${
                message.type === "success"
                  ? "bg-green-50 border border-green-200 text-green-800"
                  : "bg-red-50 border border-red-200 text-red-800"
              }`}
            >
              {message.text}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* FAQ Form */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* Form Header */}
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <FiVideo className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {editMode ? "Edit FAQ" : "Create New FAQ"}
                    </h2>
                    <p className="text-white/80 text-sm">
                      {editMode
                        ? "Update the FAQ details"
                        : "Add a new video editing question"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Question *
                  </label>
                  <textarea
                    value={formData.question}
                    onChange={(e) =>
                      handleInputChange("question", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    placeholder="e.g., What is your turnaround time for video editing?"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Answer *
                  </label>
                  <textarea
                    value={formData.answer}
                    onChange={(e) =>
                      handleInputChange("answer", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="e.g., Our standard turnaround time is 3-5 business days..."
                    rows={5}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      handleInputChange("category", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {categoryLabels[cat]}
                      </option>
                    ))}
                  </select>

                  {/* Quick Sample Buttons */}
                  <div className="mt-2 flex flex-wrap gap-2">
                    {Object.keys(sampleQuestions).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => addSampleQuestion(cat)}
                        className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-700"
                      >
                        Sample {categoryLabels[cat]}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Priority (0-10)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={formData.priority}
                    onChange={(e) =>
                      handleInputChange("priority", parseInt(e.target.value))
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    0 = Low priority, 10 = High priority (appears first)
                  </p>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      Status
                    </label>
                    <p className="text-sm text-gray-500">
                      {formData.isActive
                        ? "Active (Visible to clients)"
                        : "Inactive (Hidden)"}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) =>
                        handleInputChange("isActive", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>

                <div className="flex space-x-3 pt-4">
                  {(editMode || formData.question) && (
                    <button
                      onClick={resetForm}
                      className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    onClick={editMode ? handleUpdateFAQ : handleCreateFAQ}
                    disabled={saving || !formData.question || !formData.answer}
                    className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {saving ? (
                      <div className="flex items-center justify-center space-x-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        />
                        <span>Saving...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <FiSave className="w-4 h-4" />
                        <span>{editMode ? "Update FAQ" : "Create FAQ"}</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* FAQ List */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* List Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Video Editing FAQs ({faqs.length})
                  </h3>

                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                    <div className="relative">
                      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search video editing FAQs..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Categories</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {categoryLabels[cat]}
                        </option>
                      ))}
                    </select>

                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>

                    <button
                      onClick={handleSearch}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <FiFilter className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* FAQ List */}
              <div className="max-h-96 overflow-y-auto">
                {faqs.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <FiVideo className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>
                      No FAQs found. Create your first video editing FAQ to get
                      started.
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {faqs.map((faq, index) => (
                      <motion.div
                        key={faq._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="font-semibold text-gray-900 line-clamp-2">
                                {faq.question}
                              </h4>
                              <span
                                className={`px-2 py-1 text-xs rounded-full flex items-center space-x-1 ${getCategoryColor(
                                  faq.category
                                )}`}
                              >
                                {categoryIcons[faq.category]}
                                <span>{categoryLabels[faq.category]}</span>
                              </span>
                              {faq.priority > 0 && (
                                <span
                                  className={`px-2 py-1 text-xs rounded-full ${getPriorityBadge(
                                    faq.priority
                                  )}`}
                                >
                                  <FiStar className="w-3 h-3 inline mr-1" />
                                  {faq.priority}
                                </span>
                              )}
                            </div>

                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                              {faq.answer}
                            </p>

                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <div className="flex items-center space-x-1">
                                <FiEye className="w-3 h-3" />
                                <span>{faq.views} views</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <FiThumbsUp className="w-3 h-3" />
                                <span>{faq.helpfulCount}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <FiThumbsDown className="w-3 h-3" />
                                <span>{faq.notHelpfulCount}</span>
                              </div>
                              <span
                                className={
                                  faq.isActive
                                    ? "text-green-600"
                                    : "text-red-600"
                                }
                              >
                                {faq.isActive ? "Active" : "Inactive"}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 ml-4">
                            <button
                              onClick={() => handleEditFAQ(faq)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit FAQ"
                            >
                              <FiEdit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteFAQ(faq)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete FAQ"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
