import { motion, AnimatePresence } from "framer-motion";
import {
  FiEdit,
  FiLoader,
  FiUpload,
  FiCheckCircle,
  FiStar,
  FiX,
  FiVideo,
  FiImage,
  FiTag,
  FiGrid,
  FiAlertCircle,
  FiFileText,
  FiSettings,
  FiList,
} from "react-icons/fi";
import { useState, useEffect } from "react";

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

export default function VideoModal({
  show,
  onClose,
  videoForm,
  setVideoForm,
  submitting,
  uploading,
  handleVideoChange,
  handleFileUpload,
  submitVideoForm,
  editingVideo,
  categories,
}) {
  const [activeTab, setActiveTab] = useState("basic");
  const [tags, setTags] = useState(
    videoForm.tags.split(", ").filter((tag) => tag.length > 0)
  );
  const [tagInput, setTagInput] = useState(""); // Separate state for tag input
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
      // Only reset to basic tab when first opening the modal, not on re-renders
      setActiveTab("basic");
      // Initialize tags from videoForm
      setTags(videoForm.tags.split(", ").filter((tag) => tag.length > 0));
      setTagInput(""); // Reset tag input when modal opens
      setFormErrors({}); // Clear errors when modal opens
    } else {
      document.body.style.overflow = "unset";
    }
    return () => (document.body.style.overflow = "unset");
  }, [show]); // Only depend on 'show' prop, not videoForm.tags

  // Validate form before submission
  const validateForm = () => {
    const errors = {};

    if (!videoForm.title.trim()) {
      errors.title = "Title is required";
    } else if (videoForm.title.length > 100) {
      errors.title = "Title must be less than 100 characters";
    }

    if (!videoForm.videoUrl.trim()) {
      errors.videoUrl = "Video URL is required";
    }

    if (!videoForm.category.trim()) {
      errors.category = "Category is required";
    }

    if (videoForm.description.length > 500) {
      errors.description = "Description must be less than 500 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      submitVideoForm(e);
    } else {
      // If there are errors, jump to the first tab with errors
      if (formErrors.title || formErrors.description) {
        setActiveTab("basic");
      } else if (formErrors.videoUrl) {
        setActiveTab("media");
      } else if (formErrors.category) {
        setActiveTab("details");
      }
    }
  };

  // Handle immediate submission from any tab
  const handleImmediateSubmit = () => {
    if (validateForm()) {
      submitVideoForm({ preventDefault: () => {} });
    } else {
      // Jump to the first tab with errors
      if (formErrors.title || formErrors.description) {
        setActiveTab("basic");
      } else if (formErrors.videoUrl) {
        setActiveTab("media");
      } else if (formErrors.category) {
        setActiveTab("details");
      }
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setVideoForm({
      ...videoForm,
      [name]: checked,
    });
  };

  const addTag = (tag) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < 10) {
      const newTags = [...tags, trimmedTag];
      setTags(newTags);
      setVideoForm({
        ...videoForm,
        tags: newTags.join(", "),
      });
      setTagInput(""); // Clear input after adding tag
    }
  };

  const removeTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    setVideoForm({
      ...videoForm,
      tags: newTags.join(", "),
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (tagInput.trim()) {
        addTag(tagInput);
      }
    }
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  // Quick tag suggestions
  const tagSuggestions = [
    "Editing",
    "Cinematic",
    "Professional",
    "4K",
    "Color Grading",
    "Motion Graphics",
    "Sound Design",
    "Short Film",
    "Commercial",
    "Social Media",
  ];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          variants={overlayVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="bg-gradient-to-br from-white to-gray-50/80 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden border border-white/20"
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Enhanced Header */}
            <div className="relative bg-gradient-to-r from-purple-600 to-red-500 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <FiVideo className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {editingVideo ? "Edit Video Reel" : "Add New Video Reel"}
                    </h2>
                    <p className="text-white/80 text-sm mt-1">
                      {editingVideo
                        ? "Update your video details"
                        : "Upload and share your video content"}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200"
                >
                  <FiX className="h-5 w-5 text-white" />
                </motion.button>
              </div>

              {/* Progress Tabs */}
              <div className="flex space-x-1 mt-6">
                {[
                  { id: "basic", icon: FiFileText, label: "Basic Info" },
                  { id: "media", icon: FiVideo, label: "Media" },
                  { id: "details", icon: FiSettings, label: "Details" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                      activeTab === tab.id
                        ? "bg-white text-gray-900 shadow-lg"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <tab.icon size={14} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="max-h-[calc(95vh-140px)] overflow-y-auto"
            >
              <div className="p-8 space-y-8">
                {/* Basic Info Tab */}
                {activeTab === "basic" && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    {/* Title */}
                    <div>
                      <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                        <FiEdit className="h-4 w-4 mr-2 text-purple-500" />
                        Title *
                        <span className="ml-auto text-xs text-gray-500">
                          {videoForm.title.length}/100
                        </span>
                      </label>
                      <input
                        type="text"
                        name="title"
                        required
                        maxLength={100}
                        value={videoForm.title}
                        onChange={handleVideoChange}
                        className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                          formErrors.title
                            ? "border-red-500 ring-2 ring-red-200"
                            : ""
                        }`}
                        placeholder="Enter an engaging video title..."
                      />
                      {formErrors.title && (
                        <p className="text-red-500 text-xs mt-1">
                          {formErrors.title}
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    <div>
                      <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                        <FiEdit className="h-4 w-4 mr-2 text-blue-500" />
                        Description
                        <span className="ml-auto text-xs text-gray-500">
                          {videoForm.description.length}/500
                        </span>
                      </label>
                      <textarea
                        name="description"
                        rows={4}
                        maxLength={500}
                        value={videoForm.description}
                        onChange={handleVideoChange}
                        className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 ${
                          formErrors.description
                            ? "border-red-500 ring-2 ring-red-200"
                            : ""
                        }`}
                        placeholder="Describe your video content..."
                      />
                      {formErrors.description && (
                        <p className="text-red-500 text-xs mt-1">
                          {formErrors.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Media Tab */}
                {activeTab === "media" && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    {/* Video Upload Card */}
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-dashed border-gray-300 p-6 hover:border-purple-400 transition-all duration-200">
                      <label className="flex items-center text-sm font-semibold text-gray-700 mb-4">
                        <FiVideo className="h-4 w-4 mr-2 text-purple-500" />
                        Video URL *
                      </label>
                      <div className="space-y-4">
                        <input
                          type="text"
                          name="videoUrl"
                          required
                          value={videoForm.videoUrl}
                          onChange={handleVideoChange}
                          className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            formErrors.videoUrl
                              ? "border-red-500 ring-2 ring-red-200"
                              : ""
                          }`}
                          placeholder="Paste video URL or upload file"
                        />
                        {formErrors.videoUrl && (
                          <p className="text-red-500 text-xs mt-1">
                            {formErrors.videoUrl}
                          </p>
                        )}
                        <label className="flex items-center justify-center space-x-3 w-full px-4 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group">
                          {uploading.video ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            >
                              <FiLoader className="h-5 w-5 text-purple-500" />
                            </motion.div>
                          ) : videoForm.videoUrl ? (
                            <FiCheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <FiUpload className="h-5 w-5 text-gray-400 group-hover:text-purple-500" />
                          )}
                          <span className="text-sm font-medium text-gray-600 group-hover:text-purple-600">
                            {uploading.video
                              ? "Uploading..."
                              : "Upload Video File"}
                          </span>
                          <input
                            type="file"
                            accept="video/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, "video")}
                            disabled={uploading.video}
                          />
                        </label>
                      </div>
                    </div>

                    {/* Thumbnail Upload Card */}
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-dashed border-gray-300 p-6 hover:border-blue-400 transition-all duration-200">
                      <label className="flex items-center text-sm font-semibold text-gray-700 mb-4">
                        <FiImage className="h-4 w-4 mr-2 text-blue-500" />
                        Thumbnail URL
                      </label>
                      <div className="space-y-4">
                        <input
                          type="text"
                          name="thumbnailUrl"
                          value={videoForm.thumbnailUrl}
                          onChange={handleVideoChange}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Paste thumbnail URL or upload image"
                        />
                        <label className="flex items-center justify-center space-x-3 w-full px-4 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group">
                          {uploading.thumbnail ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            >
                              <FiLoader className="h-5 w-5 text-blue-500" />
                            </motion.div>
                          ) : videoForm.thumbnailUrl ? (
                            <FiCheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <FiUpload className="h-5 w-5 text-gray-400 group-hover:text-blue-500" />
                          )}
                          <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600">
                            {uploading.thumbnail
                              ? "Uploading..."
                              : "Upload Thumbnail"}
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, "thumbnail")}
                            disabled={uploading.thumbnail}
                          />
                        </label>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Details Tab */}
                {activeTab === "details" && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    {/* Category & Tags Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Category Select */}
                      <div>
                        <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                          <FiGrid className="h-4 w-4 mr-2 text-green-500" />
                          Category *
                        </label>
                        <div className="relative">
                          <select
                            name="category"
                            required
                            value={videoForm.category}
                            onChange={handleVideoChange}
                            className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none pr-10 ${
                              formErrors.category
                                ? "border-red-500 ring-2 ring-red-200"
                                : ""
                            }`}
                          >
                            <option value="">Choose a category</option>
                            {categories.map((category) => (
                              <option key={category._id} value={category.slug}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <FiGrid className="h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                        {formErrors.category && (
                          <p className="text-red-500 text-xs mt-1">
                            {formErrors.category}
                          </p>
                        )}
                      </div>

                      {/* Tags Input */}
                      <div>
                        <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                          <FiTag className="h-4 w-4 mr-2 text-orange-500" />
                          Tags
                          <span className="ml-auto text-xs text-gray-500">
                            {tags.length}/10
                          </span>
                        </label>
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={tagInput}
                            onKeyPress={handleKeyPress}
                            onChange={handleTagInputChange}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="Type tag and press Enter or comma..."
                          />

                          {/* Tag Suggestions */}
                          <div className="flex flex-wrap gap-2">
                            {tagSuggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                type="button"
                                onClick={() => addTag(suggestion)}
                                disabled={
                                  tags.length >= 10 || tags.includes(suggestion)
                                }
                                className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                + {suggestion}
                              </button>
                            ))}
                          </div>

                          {/* Selected Tags */}
                          {tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {tags.map((tag, index) => (
                                <div
                                  key={index}
                                  className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-orange-50 to-amber-50 text-orange-700 rounded-full text-sm"
                                >
                                  <span>{tag}</span>
                                  <button
                                    type="button"
                                    onClick={() => removeTag(index)}
                                    className="hover:text-orange-900 transition-colors"
                                  >
                                    <FiX size={12} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Featured Video Toggle */}
                    <div className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-200">
                      <label className="flex items-center cursor-pointer">
                        <div className="relative">
                          <input
                            type="checkbox"
                            name="isBest"
                            checked={videoForm.isBest}
                            onChange={handleCheckboxChange}
                            className="sr-only"
                          />
                          <div
                            className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                              videoForm.isBest ? "bg-yellow-500" : "bg-gray-300"
                            }`}
                          />
                          <div
                            className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${
                              videoForm.isBest ? "transform translate-x-6" : ""
                            }`}
                          />
                        </div>
                        <div className="ml-3 flex items-center">
                          <FiStar
                            className={`h-5 w-5 mr-2 transition-colors ${
                              videoForm.isBest
                                ? "text-yellow-400 animate-pulse"
                                : "text-gray-400"
                            }`}
                          />
                          <span className="text-sm font-semibold text-gray-700">
                            Feature this video
                          </span>
                          {videoForm.isBest && (
                            <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                              Featured
                            </span>
                          )}
                        </div>
                      </label>
                      <p className="text-xs text-gray-500 mt-2 ml-16 flex items-center">
                        <FiAlertCircle className="h-3 w-3 mr-1" />
                        Featured videos appear prominently and can be filtered
                        in the dashboard.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 bg-gray-50/50 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-3">
                    {activeTab !== "basic" && (
                      <button
                        type="button"
                        onClick={() =>
                          setActiveTab(
                            activeTab === "details" ? "media" : "basic"
                          )
                        }
                        className="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
                      >
                        Previous
                      </button>
                    )}
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
                    >
                      Cancel
                    </button>

                    {/* Always show submit button, but change behavior based on current tab */}
                    {activeTab === "details" && (
                      <button
                        type="button"
                        onClick={handleImmediateSubmit}
                        disabled={submitting}
                        className="px-8 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 transition-all duration-200 font-medium flex items-center space-x-2"
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
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                            />
                            <span>
                              {editingVideo ? "Updating..." : "Adding..."}
                            </span>
                          </>
                        ) : (
                          <>
                            <FiStar size={16} />
                            <span>
                              {editingVideo ? "Update Video" : "Add Video"}
                            </span>
                          </>
                        )}
                      </button>
                    )}

                    {activeTab !== "details" && (
                      <button
                        type="button"
                        onClick={() =>
                          setActiveTab(
                            activeTab === "basic" ? "media" : "details"
                          )
                        }
                        className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-red-500 text-white rounded-xl hover:from-purple-600 hover:to-red-600 transition-all duration-200 font-medium flex items-center space-x-2"
                      >
                        <span>Next</span>
                        <FiList size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
