import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiStar,
  FiLoader,
  FiUpload,
  FiCheckCircle,
  FiAward,
  FiX,
  FiMessageSquare,
  FiFileText,
  FiImage,
  FiThumbsUp,
  FiVideo,
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

const starVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 300 },
  },
  hover: { scale: 1.2, transition: { duration: 0.2 } },
  tap: { scale: 0.9 },
};

export default function ReviewModal({
  show,
  onClose,
  reviewForm,
  setReviewForm,
  submitting,
  uploading,
  handleReviewChange,
  handleFileUpload,
  submitReviewForm,
  editingReview,
}) {
  const [activeTab, setActiveTab] = useState("basic");
  const [hoveredRating, setHoveredRating] = useState(0);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
      setActiveTab("basic");
    } else {
      document.body.style.overflow = "unset";
    }
    return () => (document.body.style.overflow = "unset");
  }, [show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitReviewForm(e);
  };

  const handleRatingClick = (rating) => {
    setReviewForm({
      ...reviewForm,
      rating: rating,
    });
  };

  const handleRatingHover = (rating) => {
    setHoveredRating(rating);
  };

  const handleRatingLeave = () => {
    setHoveredRating(0);
  };

  const validateForm = () => {
    const errors = {};

    if (!reviewForm.userName.trim()) {
      errors.userName = "User name is required";
    }

    if (!reviewForm.content.trim()) {
      errors.content = "Review content is required";
    }

    if (!reviewForm.rating) {
      errors.rating = "Rating is required";
    }

    return Object.keys(errors).length === 0;
  };

  const handleImmediateSubmit = () => {
    if (validateForm()) {
      submitReviewForm({ preventDefault: () => {} });
    }
  };

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
            className="bg-gradient-to-br from-white to-gray-50/80 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-hidden border border-white/20"
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Enhanced Header */}
            <div className="relative bg-gradient-to-r from-red-500 to-orange-500 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <FiMessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {editingReview ? "Edit Review" : "Add New Review"}
                    </h2>
                    <p className="text-white/80 text-sm mt-1">
                      {editingReview
                        ? "Update your review details"
                        : "Share your feedback and experience"}
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
                  { id: "media", icon: FiVideo, label: "Video" },
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
                    {/* User Name */}
                    <div>
                      <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                        <FiUser className="h-4 w-4 mr-2 text-red-500" />
                        User/Brand Name *
                      </label>
                      <input
                        type="text"
                        name="userName"
                        required
                        value={reviewForm.userName}
                        onChange={handleReviewChange}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter user or brand name"
                      />
                    </div>

                    {/* Content */}
                    <div>
                      <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                        <FiMessageSquare className="h-4 w-4 mr-2 text-blue-500" />
                        Review Content *
                        <span className="ml-auto text-xs text-gray-500">
                          {reviewForm.content.length}/500
                        </span>
                      </label>
                      <textarea
                        name="content"
                        required
                        rows={4}
                        maxLength={500}
                        value={reviewForm.content}
                        onChange={handleReviewChange}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
                        placeholder="Share your experience and feedback..."
                      />
                    </div>

                    {/* Rating */}
                    <div>
                      <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                        <FiStar className="h-4 w-4 mr-2 text-yellow-500" />
                        Rating *
                      </label>
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <motion.button
                              key={star}
                              type="button"
                              variants={starVariants}
                              initial="initial"
                              animate="animate"
                              whileHover="hover"
                              whileTap="tap"
                              onClick={() => handleRatingClick(star)}
                              onMouseEnter={() => handleRatingHover(star)}
                              onMouseLeave={handleRatingLeave}
                              className={`text-2xl transition-all duration-200 ${
                                star <= (hoveredRating || reviewForm.rating)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            >
                              ★
                            </motion.button>
                          ))}
                        </div>
                        <span className="text-sm font-medium text-gray-600 ml-2">
                          {reviewForm.rating || 0}/5 stars
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Video Tab */}
                {activeTab === "media" && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    {/* Video Upload Card */}
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-dashed border-gray-300 p-6 hover:border-red-400 transition-all duration-200">
                      <label className="flex items-center text-sm font-semibold text-gray-700 mb-4">
                        <FiVideo className="h-4 w-4 mr-2 text-red-500" />
                        Review Video (Optional)
                      </label>
                      <div className="space-y-4">
                        <input
                          type="text"
                          name="video"
                          value={reviewForm.video || ""}
                          onChange={handleReviewChange}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Paste video URL or upload video file"
                        />
                        <label className="flex items-center justify-center space-x-3 w-full px-4 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group">
                          {uploading?.video ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            >
                              <FiLoader className="h-5 w-5 text-red-500" />
                            </motion.div>
                          ) : reviewForm.video ? (
                            <FiCheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <FiUpload className="h-5 w-5 text-gray-400 group-hover:text-red-500" />
                          )}
                          <span className="text-sm font-medium text-gray-600 group-hover:text-red-600">
                            {uploading?.video
                              ? "Uploading Video..."
                              : "Upload Video"}
                          </span>
                          <input
                            type="file"
                            accept="video/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, "video")}
                            disabled={uploading?.video}
                          />
                        </label>
                        {reviewForm.video && (
                          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-sm text-green-700 flex items-center">
                              <FiCheckCircle className="h-4 w-4 mr-2" />
                              Video uploaded successfully!
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Featured Review Toggle */}
                    <div className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-200">
                      <label className="flex items-center cursor-pointer">
                        <div className="relative">
                          <input
                            type="checkbox"
                            name="isBest"
                            checked={reviewForm.isBest}
                            onChange={handleReviewChange}
                            className="sr-only"
                          />
                          <div
                            className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                              reviewForm.isBest
                                ? "bg-yellow-500"
                                : "bg-gray-300"
                            }`}
                          />
                          <div
                            className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${
                              reviewForm.isBest ? "transform translate-x-6" : ""
                            }`}
                          />
                        </div>
                        <div className="ml-3 flex items-center">
                          <FiAward
                            className={`h-5 w-5 mr-2 transition-colors ${
                              reviewForm.isBest
                                ? "text-yellow-400 animate-pulse"
                                : "text-gray-400"
                            }`}
                          />
                          <span className="text-sm font-semibold text-gray-700">
                            Feature this review
                          </span>
                          {reviewForm.isBest && (
                            <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                              Featured
                            </span>
                          )}
                        </div>
                      </label>
                      <p className="text-xs text-gray-500 mt-2 ml-16 flex items-center">
                        <FiThumbsUp className="h-3 w-3 mr-1" />
                        Featured reviews appear prominently on your portfolio.
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
                        onClick={() => setActiveTab("basic")}
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

                    {/* Always show submit button */}
                    <button
                      type="button"
                      onClick={handleImmediateSubmit}
                      disabled={submitting}
                      className="px-8 py-2.5 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl hover:from-red-600 hover:to-orange-600 disabled:opacity-50 transition-all duration-200 font-medium flex items-center space-x-2"
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
                            {editingReview ? "Updating..." : "Adding..."}
                          </span>
                        </>
                      ) : (
                        <>
                          <FiAward size={16} />
                          <span>
                            {editingReview ? "Update Review" : "Add Review"}
                          </span>
                        </>
                      )}
                    </button>

                    {activeTab !== "media" && (
                      <button
                        type="button"
                        onClick={() => setActiveTab("media")}
                        className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl hover:from-red-600 hover:to-orange-600 transition-all duration-200 font-medium flex items-center space-x-2"
                      >
                        <span>Next</span>
                        <FiVideo size={16} />
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
