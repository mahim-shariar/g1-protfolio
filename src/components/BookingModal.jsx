import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BookingModal = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [bookingCompleted, setBookingCompleted] = useState(false);

  // Listen for booking completion
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.event === "calendly.event_scheduled") {
        setBookingCompleted(true);
        console.log("Booking completed!", event.data);

        // Auto-close modal after successful booking (optional)
        setTimeout(() => {
          onClose();
        }, 3000);
      }
    };

    if (isOpen) {
      window.addEventListener("message", handleMessage);
    }

    return () => window.removeEventListener("message", handleMessage);
  }, [isOpen, onClose]);

  // Reset states when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setBookingCompleted(false);
    }
  }, [isOpen]);

  // Close modal on escape key and prevent background scrolling
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Light Background Overlay */}
          <motion.div
            className="absolute inset-0 bg-white/80 backdrop-blur-sm"
            variants={overlayVariants}
            onClick={onClose}
          />

          {/* Gradient overlays for soft effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50/60 to-white/80"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100/40 to-blue-50/40"></div>

          {/* Modal Content - Centered */}
          <motion.div
            className="relative bg-white border border-gray-200 rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden mx-auto"
            variants={modalVariants}
            style={{
              // Ensure modal stays centered
              margin: "auto",
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white hover:bg-gray-50 border border-gray-300 flex items-center justify-center transition-all duration-200 group shadow-sm"
              aria-label="Close modal"
            >
              <svg
                className="w-4 h-4 text-gray-600 group-hover:text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-br from-white via-gray-50 to-blue-50/30 py-8 px-6 sm:px-8 border-b border-gray-200">
                <div className="max-w-6xl mx-auto">
                  {/* Header Section */}
                  <div className="text-center mb-8">
                    <motion.h2
                      className="text-gray-600 font-mono uppercase tracking-widest text-sm md:text-base mb-4"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Book Your Creative Session
                    </motion.h2>

                    <motion.h1
                      className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      Schedule Your{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900">
                        1-Hour Consultation
                      </span>
                    </motion.h1>

                    <motion.p
                      className="text-lg text-gray-600 max-w-3xl mx-auto"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      Let's discuss your project and create something
                      extraordinary together.
                    </motion.p>

                    {/* Success Message */}
                    {bookingCompleted && (
                      <motion.div
                        className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto backdrop-blur-sm"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                      >
                        <div className="flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-green-600 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-green-700 font-medium">
                            Booking confirmed! Check your email for details.
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Main Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar - Info & Features */}
                    <div className="lg:col-span-1 space-y-4">
                      {/* Quick Info Card */}
                      <motion.div
                        className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <h3 className="font-semibold text-gray-700 mb-3 font-mono">
                          SESSION DETAILS
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center text-sm">
                            <svg
                              className="w-4 h-4 text-gray-600 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span className="text-gray-600">60 minutes</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <svg
                              className="w-4 h-4 text-gray-600 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                            <span className="text-gray-600">
                              1-on-1 creative session
                            </span>
                          </div>
                          <div className="flex items-center text-sm">
                            <svg
                              className="w-4 h-4 text-gray-600 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                              />
                            </svg>
                            <span className="text-gray-600">Video call</span>
                          </div>
                        </div>
                      </motion.div>

                      {/* Features Card */}
                      <motion.div
                        className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        <h3 className="font-semibold text-gray-700 mb-3 font-mono">
                          WHAT WE'LL COVER
                        </h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-gray-600 rounded-full mr-3"></div>
                            <span className="text-gray-600">
                              Project analysis & strategy
                            </span>
                          </li>
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-gray-600 rounded-full mr-3"></div>
                            <span className="text-gray-600">
                              Creative direction & vision
                            </span>
                          </li>
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-gray-600 rounded-full mr-3"></div>
                            <span className="text-gray-600">
                              Technical requirements
                            </span>
                          </li>
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-gray-600 rounded-full mr-3"></div>
                            <span className="text-gray-600">
                              Timeline & deliverables
                            </span>
                          </li>
                        </ul>
                      </motion.div>

                      {/* Support Card */}
                      <motion.div
                        className="bg-gray-50 rounded-xl border border-gray-200 p-4 shadow-sm"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                      >
                        <h3 className="font-semibold text-gray-700 mb-2 font-mono">
                          NEED HELP?
                        </h3>
                        <p className="text-gray-600 text-xs mb-3">
                          Technical issues or questions? We're here to assist!
                        </p>
                        <a
                          href="mailto:support@yourdomain.com"
                          className="text-gray-700 hover:text-gray-900 text-xs font-medium inline-flex items-center group"
                        >
                          Contact support
                          <svg
                            className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </a>
                      </motion.div>
                    </div>

                    {/* Calendar Section */}
                    <div className="lg:col-span-3">
                      <motion.div
                        className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        {/* Loading State */}
                        {isLoading && (
                          <div className="flex items-center justify-center py-16">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-600"></div>
                            <span className="ml-3 text-gray-600 font-mono">
                              Loading calendar...
                            </span>
                          </div>
                        )}

                        {/* Calendly Iframe */}
                        <iframe
                          src={`${import.meta.env.VITE_TIDYCAL_URL}`}
                          width="100%"
                          height="600"
                          frameBorder="0"
                          title="Schedule Your Creative Session"
                          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                          className={`w-full ${isLoading ? "hidden" : "block"}`}
                          onLoad={() => setIsLoading(false)}
                        />
                      </motion.div>

                      {/* Booking Steps */}
                      <motion.div
                        className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-center"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                          <div className="text-xl font-bold text-gray-700 mb-1 font-mono">
                            01
                          </div>
                          <p className="text-xs text-gray-600">
                            Select your time
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                          <div className="text-xl font-bold text-gray-700 mb-1 font-mono">
                            02
                          </div>
                          <p className="text-xs text-gray-600">Enter details</p>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                          <div className="text-xl font-bold text-gray-700 mb-1 font-mono">
                            03
                          </div>
                          <p className="text-xs text-gray-600">
                            Get confirmation
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-4 left-4 flex gap-2 z-10">
              <span className="w-2 h-2 rounded-full bg-gray-400 shadow-sm"></span>
              <span className="w-2 h-2 rounded-full bg-gray-500 shadow-sm"></span>
              <span className="w-2 h-2 rounded-full bg-gray-600 shadow-sm"></span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
