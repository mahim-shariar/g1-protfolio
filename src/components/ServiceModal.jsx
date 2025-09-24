// components/ServiceModal.js
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Smile,
  Plus,
  Trash2,
  Star,
  Clock,
  RefreshCw,
  Zap,
  Palette,
  Video,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";

const ServiceModal = ({
  show,
  onClose,
  serviceForm,
  setServiceForm,
  submitting,
  uploading,
  handleServiceChange,
  handleFileUpload,
  submitServiceForm,
  editingService,
}) => {
  const [features, setFeatures] = useState(serviceForm.features || []);
  const [examples, setExamples] = useState(serviceForm.examples || []);
  const [newFeature, setNewFeature] = useState("");
  const [newExample, setNewExample] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const emojiPickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => (document.body.style.overflow = "unset");
  }, [show]);

  const addFeature = () => {
    if (newFeature.trim()) {
      const updatedFeatures = [...features, newFeature.trim()];
      setFeatures(updatedFeatures);
      setServiceForm({ ...serviceForm, features: updatedFeatures });
      setNewFeature("");
    }
  };

  const removeFeature = (index) => {
    const updatedFeatures = features.filter((_, i) => i !== index);
    setFeatures(updatedFeatures);
    setServiceForm({ ...serviceForm, features: updatedFeatures });
  };

  const addExample = () => {
    if (newExample.trim()) {
      const updatedExamples = [...examples, newExample.trim()];
      setExamples(updatedExamples);
      setServiceForm({ ...serviceForm, examples: updatedExamples });
      setNewExample("");
    }
  };

  const removeExample = (index) => {
    const updatedExamples = examples.filter((_, i) => i !== index);
    setExamples(updatedExamples);
    setServiceForm({ ...serviceForm, examples: updatedExamples });
  };

  const handleEmojiClick = (emojiData) => {
    setServiceForm({ ...serviceForm, icon: emojiData.emoji });
    setShowEmojiPicker(false);
  };

  const iconCategories = {
    "Video Editing": [
      "🎬",
      "📹",
      "🎥",
      "🎞️",
      "✨",
      "🌟",
      "💫",
      "🔥",
      "💎",
      "🎭",
      "📺",
      "🎪",
      "🎨",
      "🖌️",
      "🎵",
      "🎶",
      "🔊",
      "🎚️",
      "🎛️",
      "⏱️",
    ],
    Professional: [
      "⭐",
      "🏆",
      "🎯",
      "💼",
      "🔧",
      "⚙️",
      "🛠️",
      "📐",
      "📏",
      "🔍",
      "💡",
      "🔦",
      "📋",
      "📝",
      "✏️",
      "🖊️",
      "📎",
      "📌",
      "📍",
      "🏅",
    ],
    Creative: [
      "🎨",
      "✨",
      "🌟",
      "💫",
      "🌈",
      "🔥",
      "💡",
      "🎯",
      "⚡",
      "💎",
      "👑",
      "🎪",
      "🎭",
      "🎮",
      "🕹️",
      "📱",
      "💻",
      "🖥️",
      "📊",
      "🔄",
    ],
  };

  const quickIconSelect = (icon) => {
    setServiceForm({ ...serviceForm, icon });
  };

  const handleKeyPress = (e, type) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (type === "feature") addFeature();
      if (type === "example") addExample();
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-gradient-to-br from-white to-gray-50/80 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {editingService ? "Edit Service" : "Create New Service"}
                  </h2>
                  <p className="text-gray-300 text-sm mt-1">
                    {editingService
                      ? "Update your service details"
                      : "Add a new service to your portfolio"}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200 group"
                >
                  <X
                    size={24}
                    className="text-white group-hover:scale-110 transition-transform"
                  />
                </button>
              </div>

              {/* Progress Tabs */}
              <div className="flex space-x-1 mt-6">
                {["basic", "details", "features"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeTab === tab
                        ? "bg-white text-gray-900 shadow-lg"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {tab === "basic" && "Basic Info"}
                    {tab === "details" && "Details"}
                    {tab === "features" && "Features"}
                  </button>
                ))}
              </div>
            </div>

            <form
              onSubmit={submitServiceForm}
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="flex items-center text-sm font-semibold text-gray-700">
                          <Video size={16} className="mr-2" />
                          Service Title
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={serviceForm.title}
                          onChange={handleServiceChange}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter service title..."
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center text-sm font-semibold text-gray-700">
                          <Palette size={16} className="mr-2" />
                          Service Icon
                        </label>
                        <div className="relative">
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              value={serviceForm.icon}
                              onChange={(e) =>
                                setServiceForm({
                                  ...serviceForm,
                                  icon: e.target.value,
                                })
                              }
                              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Select an icon..."
                              required
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowEmojiPicker(!showEmojiPicker)
                              }
                              className="px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center"
                            >
                              <Smile size={18} />
                            </button>
                          </div>

                          {showEmojiPicker && (
                            <div
                              ref={emojiPickerRef}
                              className="absolute top-full left-0 z-20 mt-2 shadow-2xl rounded-xl overflow-hidden"
                            >
                              <EmojiPicker
                                onEmojiClick={handleEmojiClick}
                                searchDisabled={false}
                                skinTonesDisabled={true}
                                height={350}
                                width={300}
                              />
                            </div>
                          )}
                        </div>

                        {/* Quick Icon Grid */}
                        <div className="mt-4 space-y-3">
                          {Object.entries(iconCategories).map(
                            ([category, icons]) => (
                              <div key={category}>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                                  {category}
                                </label>
                                <div className="grid grid-cols-10 gap-1">
                                  {icons.map((icon, index) => (
                                    <button
                                      key={index}
                                      type="button"
                                      onClick={() => quickIconSelect(icon)}
                                      className={`aspect-square rounded-lg text-lg transition-all duration-200 hover:scale-110 hover:shadow-md ${
                                        serviceForm.icon === icon
                                          ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg scale-110"
                                          : "bg-white border border-gray-200 hover:border-blue-300"
                                      }`}
                                    >
                                      {icon}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-semibold text-gray-700">
                        <Zap size={16} className="mr-2" />
                        Short Description
                      </label>
                      <textarea
                        name="description"
                        value={serviceForm.description}
                        onChange={handleServiceChange}
                        rows={2}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
                        placeholder="Brief description of your service..."
                        required
                      />
                    </div>
                  </motion.div>
                )}

                {/* Details Tab */}
                {activeTab === "details" && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-semibold text-gray-700">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        Detailed Description
                      </label>
                      <textarea
                        name="details"
                        value={serviceForm.details}
                        onChange={handleServiceChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
                        placeholder="Comprehensive description of what clients can expect..."
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="flex items-center text-sm font-semibold text-gray-700">
                          <Clock size={16} className="mr-2" />
                          Delivery Time
                        </label>
                        <input
                          type="text"
                          name="deliveryTime"
                          value={serviceForm.deliveryTime}
                          onChange={handleServiceChange}
                          placeholder="3-7 business days"
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center text-sm font-semibold text-gray-700">
                          <RefreshCw size={16} className="mr-2" />
                          Revisions Included
                        </label>
                        <input
                          type="text"
                          name="revisions"
                          value={serviceForm.revisions}
                          onChange={handleServiceChange}
                          placeholder="3 revisions included"
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          required
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Features Tab */}
                {activeTab === "features" && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <label className="flex items-center text-sm font-semibold text-gray-700">
                        <Star size={16} className="mr-2" />
                        Key Features
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={newFeature}
                          onChange={(e) => setNewFeature(e.target.value)}
                          onKeyPress={(e) => handleKeyPress(e, "feature")}
                          placeholder="Add a key feature..."
                          className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={addFeature}
                          className="px-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 flex items-center space-x-2"
                        >
                          <Plus size={18} />
                          <span>Add</span>
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border border-blue-100"
                          >
                            <span className="text-sm font-medium text-gray-700">
                              {feature}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeFeature(index)}
                              className="p-1 hover:bg-red-100 rounded-lg transition-colors duration-200 group"
                            >
                              <Trash2
                                size={14}
                                className="text-red-400 group-hover:text-red-600"
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="flex items-center text-sm font-semibold text-gray-700">
                        <Zap size={16} className="mr-2" />
                        Service Examples
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={newExample}
                          onChange={(e) => setNewExample(e.target.value)}
                          onKeyPress={(e) => handleKeyPress(e, "example")}
                          placeholder="Add an example..."
                          className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={addExample}
                          className="px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center space-x-2"
                        >
                          <Plus size={18} />
                          <span>Add</span>
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {examples.map((example, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg border border-purple-100"
                          >
                            <span className="text-sm font-medium text-gray-700">
                              {example}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeExample(index)}
                              className="p-1 hover:bg-red-100 rounded-lg transition-colors duration-200 group"
                            >
                              <Trash2
                                size={14}
                                className="text-red-400 group-hover:text-red-600"
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-100">
                      <Star className="text-amber-500" size={20} />
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 cursor-pointer">
                          Mark as Featured Service
                        </label>
                        <p className="text-xs text-gray-500">
                          This service will be highlighted on your portfolio
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        name="isBest"
                        checked={serviceForm.isBest}
                        onChange={handleServiceChange}
                        className="ml-auto h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                      />
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
                            activeTab === "features" ? "details" : "basic"
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

                    {activeTab !== "features" ? (
                      <button
                        type="button"
                        onClick={() =>
                          setActiveTab(
                            activeTab === "basic" ? "details" : "features"
                          )
                        }
                        className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 font-medium flex items-center space-x-2"
                      >
                        <span>Next</span>
                        <Zap size={16} />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={submitting}
                        className="px-8 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 transition-all duration-200 font-medium flex items-center space-x-2"
                      >
                        {submitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>
                              {editingService ? "Updating..." : "Creating..."}
                            </span>
                          </>
                        ) : (
                          <>
                            <Star size={16} />
                            <span>
                              {editingService
                                ? "Update Service"
                                : "Create Service"}
                            </span>
                          </>
                        )}
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
};

export default ServiceModal;
