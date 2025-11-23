import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { login, verifyToken, getCurrentUser } from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isAlreadyLoggedIn, setIsAlreadyLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    checkAuthenticationStatus();
  }, []);

  const checkAuthenticationStatus = async () => {
    try {
      // Check if token exists in localStorage or cookies
      const token = localStorage.getItem("token") || Cookies.get("jwt");
      console.log("Token:", token);

      if (!token) {
        setCheckingAuth(false);
        return;
      }

      // Verify the token is still valid
      const tokenResponse = await verifyToken(token);
      console.log("Token response:", tokenResponse);

      if (tokenResponse.isValid) {
        // Get user profile to check role
        const userProfile = await getCurrentUser();

        console.log("User profile:", userProfile);

        // Check if user has appropriate role (admin in this case)
        if (userProfile?.data?.user?.role === "admin") {
          setIsAlreadyLoggedIn(true);
          setMessage("You are already logged in. Redirecting to dashboard...");

          // Redirect after a short delay
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        } else {
          // If user doesn't have the right role, clear tokens
          localStorage.removeItem("token");
          Cookies.remove("jwt");
        }
      }
    } catch (error) {
      // Token is invalid or expired, clear it
      localStorage.removeItem("token");
      Cookies.remove("jwt");
      console.error("Authentication check failed:", error);
    } finally {
      setCheckingAuth(false);
    }
  };

  const clearErrors = () => {
    setError("");
    setFieldErrors({});
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    clearErrors();

    // Client-side validation
    if (!email || !password) {
      setError("Please provide both email and password");
      setLoading(false);
      return;
    }

    try {
      const response = await login({ email, password });

      // Handle successful login based on your backend response structure
      if (response.status === "success") {
        setMessage("Login successful! Redirecting...");

        // Store token if it's returned in the response
        if (response.token) {
          localStorage.setItem("token", response.token);
          // Also store in cookie with 1 day expiration
        }

        // Redirect to dashboard after a delay
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 2000);
      } else {
        setError(response.message || "Login failed. Please try again.");
      }
    } catch (err) {
      // Handle different error response formats from your backend
      if (err.response?.data) {
        const errorData = err.response.data;

        // Handle field-specific errors
        if (errorData.errors) {
          setFieldErrors(errorData.errors);
        }

        // Handle general error message
        if (errorData.message) {
          setError(errorData.message);
        } else if (errorData.status === "fail") {
          setError("Invalid email or password");
        } else {
          setError("Login failed. Please try again.");
        }
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    clearErrors();

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const response = await forgotPassword(email);

      // Handle response based on your backend structure
      if (response.status === "success") {
        setMessage("Password reset instructions have been sent to your email.");
      } else {
        setError(response.message || "Failed to send reset instructions.");
      }
    } catch (err) {
      // Handle different error response formats
      if (err.response?.data) {
        const errorData = err.response.data;

        if (errorData.message) {
          setError(errorData.message);
        } else if (errorData.status === "fail") {
          setError("No user found with that email address");
        } else {
          setError("Failed to send reset instructions. Please try again.");
        }
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Failed to send reset instructions. Please try again.");
      }
    } finally {
      setLoading(false);
    }
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const glowVariants = {
    pulse: {
      boxShadow: [
        "0 0 5px rgba(13, 148, 136, 0.5), 0 0 10px rgba(13, 148, 136, 0.3), 0 0 15px rgba(13, 148, 136, 0.2)",
        "0 0 10px rgba(13, 148, 136, 0.8), 0 0 20px rgba(13, 148, 136, 0.5), 0 0 30px rgba(13, 148, 136, 0.3)",
        "0 0 5px rgba(13, 148, 136, 0.5), 0 0 10px rgba(13, 148, 136, 0.3), 0 0 15px rgba(13, 148, 136, 0.2)",
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Show loading state while checking authentication
  if (checkingAuth) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-teal-50/80 flex items-center justify-center">
        <div className="text-teal-600 text-lg">
          Checking authentication status...
        </div>
      </div>
    );
  }

  // Show different UI if already logged in
  if (isAlreadyLoggedIn) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-teal-50/80 flex items-center justify-center p-4">
        <div className="relative z-10 w-full max-w-md">
          <motion.div
            className="bg-white/95 backdrop-blur-md border border-teal-500/30 rounded-xl p-8 shadow-2xl shadow-teal-500/10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-teal-600 font-mono uppercase tracking-widest text-sm mb-4">
              Already Authenticated
            </h2>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Welcome Back!
            </h1>
            <p className="text-gray-600 text-sm mb-6">
              You are already logged in. Redirecting to your dashboard...
            </p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
            </div>
            <div className="mt-6">
              <button
                onClick={() => (window.location.href = "/dashboard")}
                className="text-teal-600 hover:text-teal-700 text-sm underline"
              >
                Click here if you are not redirected automatically
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-50 via-white to-teal-50/80 flex items-center justify-center p-4">
      {/* Background gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal-900/10 to-white/80"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-teal-900/5 to-teal-900/5"></div>

      <motion.div
        className="relative z-10 w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="bg-white/95 backdrop-blur-md border border-teal-500/30 rounded-xl p-8 shadow-2xl shadow-teal-500/10"
          variants={itemVariants}
        >
          <div className="text-center mb-8">
            <motion.h2
              className="text-teal-600 font-mono uppercase tracking-widest text-sm mb-2"
              variants={itemVariants}
            >
              {showForgotPassword ? "Password Recovery" : "Access Portal"}
            </motion.h2>
            <motion.h1
              className="text-2xl font-bold text-gray-800"
              variants={itemVariants}
            >
              {showForgotPassword ? "Reset Your Password" : "Welcome Back"}
            </motion.h1>
            <motion.p
              className="text-gray-600 text-sm mt-2"
              variants={itemVariants}
            >
              {showForgotPassword
                ? "Enter your email to receive reset instructions"
                : "Sign in to your account to continue"}
            </motion.p>
          </div>

          {/* Message and Error Display */}
          {message && (
            <motion.div
              className="mb-4 p-3 bg-teal-500/20 border border-teal-500/30 rounded-lg text-teal-700 text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {message}
            </motion.div>
          )}

          {error && (
            <motion.div
              className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-700 text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          <form
            onSubmit={showForgotPassword ? handleForgotPassword : handleLogin}
          >
            <motion.div className="mb-5" variants={itemVariants}>
              <label
                htmlFor="email"
                className="block text-teal-700 text-sm font-medium mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearErrors();
                }}
                className={`w-full px-4 py-3 bg-white/80 border rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all ${
                  fieldErrors.email
                    ? "border-red-500/50"
                    : "border-teal-500/30 focus:border-teal-500/50"
                }`}
                placeholder="your.email@example.com"
                required
              />
              {fieldErrors.email && (
                <p className="text-red-600 text-xs mt-1">{fieldErrors.email}</p>
              )}
            </motion.div>

            {!showForgotPassword && (
              <motion.div className="mb-6" variants={itemVariants}>
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="password"
                    className="block text-teal-700 text-sm font-medium"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(true);
                      clearErrors();
                    }}
                    className="text-xs text-teal-600 hover:text-teal-700 transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    clearErrors();
                  }}
                  className={`w-full px-4 py-3 bg-white/80 border rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all ${
                    fieldErrors.password
                      ? "border-red-500/50"
                      : "border-teal-500/30 focus:border-teal-500/50"
                  }`}
                  placeholder="••••••••"
                  required
                />
                {fieldErrors.password && (
                  <p className="text-red-600 text-xs mt-1">
                    {fieldErrors.password}
                  </p>
                )}
              </motion.div>
            )}

            <motion.button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
              variants={glowVariants}
              animate="pulse"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {showForgotPassword ? "Sending..." : "Signing in..."}
                </div>
              ) : (
                <span className="relative z-10">
                  {showForgotPassword ? "Send Reset Instructions" : "Sign In"}
                </span>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </form>

          {showForgotPassword && (
            <motion.div
              className="mt-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <button
                type="button"
                onClick={() => {
                  setShowForgotPassword(false);
                  clearErrors();
                }}
                className="text-teal-600 hover:text-teal-700 text-sm"
              >
                ← Back to Login
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="absolute -top-4 -left-4 w-3 h-3 rounded-full bg-teal-500"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -bottom-4 -right-4 w-2 h-2 rounded-full bg-teal-400"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </motion.div>
    </div>
  );
};

export default Login;
