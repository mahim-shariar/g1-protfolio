import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFound = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.3,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  const floatingAnimation = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const pulseAnimation = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Animated Elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-teal-300/30"
        variants={pulseAnimation}
        animate="animate"
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-6 h-6 rounded-full bg-emerald-300/20"
        variants={floatingAnimation}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-8 h-8 rounded-full bg-teal-200/20"
        variants={pulseAnimation}
        animate="animate"
        transition={{ delay: 1 }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-3 h-3 rounded-full bg-emerald-400/30"
        variants={floatingAnimation}
        animate="animate"
        transition={{ delay: 0.5 }}
      />

      {/* Main Content */}
      <motion.div
        className="text-center max-w-2xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 404 Number with Gradient */}
        <motion.div className="mb-8 relative" variants={textVariants}>
          <motion.h1
            className="text-9xl font-bold bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            404
          </motion.h1>
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500 blur-xl opacity-20 -z-10 rounded-full"></div>
        </motion.div>

        {/* Title */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          variants={textVariants}
        >
          Oops! Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-lg text-gray-600 mb-8 max-w-md mx-auto leading-relaxed"
          variants={textVariants}
          transition={{ delay: 0.1 }}
        >
          The page you're looking for seems to have wandered off into the
          digital wilderness. Let's get you back on track.
        </motion.p>

        {/* Illustration/Icon */}
        <motion.div
          className="mb-8 flex justify-center"
          variants={textVariants}
          transition={{ delay: 0.2 }}
        >
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-teal-100 to-emerald-100 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-teal-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <motion.div
              className="absolute -inset-2 bg-teal-200/30 rounded-full blur-sm"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={textVariants}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            className="px-8 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium rounded-full relative overflow-hidden group"
          >
            <span className="relative z-10">Return Home</span>
            <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 rounded-full shadow-lg shadow-teal-500/20 group-hover:shadow-teal-500/30 transition-all duration-300"></div>
          </motion.button>

          <motion.button
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            className="px-8 py-3 border-2 border-teal-200 text-teal-600 font-medium rounded-full hover:bg-teal-50 transition-colors duration-300"
          >
            Go Back
          </motion.button>
        </motion.div>

        {/* Additional Help Text */}
        <motion.div
          className="mt-8 text-sm text-gray-500"
          variants={textVariants}
          transition={{ delay: 0.4 }}
        >
          <p>
            If you believe this is an error, please contact our support team.
          </p>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute -top-10 -right-10 w-20 h-20 bg-teal-200/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-8 -left-8 w-16 h-16 bg-emerald-200/20 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </motion.div>

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-teal-300/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 10 - 5, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

// Enhanced version with router integration
const EnhancedNotFound = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <NotFound>
      {/* You can wrap the NotFound component with additional functionality */}
      <div className="text-center">
        <a href="/">
          <motion.button
            className="px-8 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium rounded-full relative overflow-hidden group mb-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Return Home</span>
            <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.button>
        </a>

        <motion.button
          onClick={handleGoBack}
          className="px-8 py-3 border-2 border-teal-200 text-teal-600 font-medium rounded-full hover:bg-teal-50 transition-colors duration-300 ml-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Go Back
        </motion.button>
      </div>
    </NotFound>
  );
};

export default EnhancedNotFound;
