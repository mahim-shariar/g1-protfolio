// components/ServiceList.js
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Star,
  Clock,
  RefreshCw,
  Edit,
  Trash2,
} from "lucide-react";
import { useState } from "react";

const ServiceList = ({ services, onEdit, onDelete, showOnlyBest = false }) => {
  const [expandedService, setExpandedService] = useState(null);
  const filteredServices = showOnlyBest
    ? services.filter((service) => service.isBest)
    : services;

  const toggleExpand = (id) => {
    setExpandedService(expandedService === id ? null : id);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const expandVariants = {
    collapsed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    expanded: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  if (filteredServices.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 max-w-md mx-auto">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No services found
          </h3>
          <p className="text-gray-500">
            {showOnlyBest
              ? "No featured services available"
              : "Add your first service to get started"}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-6 lg:gap-8"
    >
      {filteredServices.map((service, index) => (
        <motion.div
          key={service._id}
          variants={itemVariants}
          layout
          className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
        >
          {/* Header Section */}
          <div className="p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
              {/* Content */}
              <div className="flex items-start space-x-4 flex-1">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
                    {service.icon}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-lg lg:text-xl font-bold text-gray-800 truncate">
                      {service.title}
                    </h3>
                    {service.isBest && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-medium shadow-sm">
                        <Star size={12} className="mr-1" />
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 line-clamp-2 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between lg:justify-end space-x-2 lg:space-x-3">
                <div className="flex items-center space-x-1 lg:space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onEdit(service)}
                    className="p-2 lg:p-2.5 text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                    title="Edit service"
                  >
                    <Edit size={18} />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onDelete(service._id)}
                    className="p-2 lg:p-2.5 text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-200"
                    title="Delete service"
                  >
                    <Trash2 size={18} />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleExpand(service._id)}
                    className="p-2 lg:p-2.5 text-gray-600 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                    title={
                      expandedService === service._id ? "Collapse" : "Expand"
                    }
                  >
                    {expandedService === service._id ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Delivery Info - Always visible */}
            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center text-sm text-gray-600">
                <Clock size={16} className="mr-2 text-blue-500" />
                <span>Delivery: {service.deliveryTime}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <RefreshCw size={16} className="mr-2 text-green-500" />
                <span>Revisions: {service.revisions}</span>
              </div>
            </div>
          </div>

          {/* Expandable Content */}
          <AnimatePresence>
            {expandedService === service._id && (
              <motion.div
                variants={expandVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                className="border-t border-gray-100 bg-gray-50/50"
              >
                <div className="p-6 lg:p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          Service Details
                        </h4>
                        <p className="text-gray-700 leading-relaxed bg-white p-4 rounded-lg border border-gray-200">
                          {service.details}
                        </p>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      {/* Features */}
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          What's Included
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {service.features?.map((feature, index) => (
                            <motion.span
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                              className="inline-flex items-center px-3 py-2 bg-white border border-gray-200 text-gray-700 text-sm rounded-lg shadow-sm hover:shadow transition-shadow"
                            >
                              ✓ {feature}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Examples */}
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                          Project Examples
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {service.examples?.map((example, index) => (
                            <motion.span
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 + 0.2 }}
                              className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 text-blue-700 text-sm rounded-lg shadow-sm"
                            >
                              🚀 {example}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ServiceList;
