import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import {
  login,
  verifyToken,
  getCurrentUser,
  forgotPassword,
  getSecurityQuestionByEmail,
  verifySecurityQuestion,
  resetPasswordWithSecurity,
} from "../services/api";

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

  // Forgot password states
  const [forgotPasswordStep, setForgotPasswordStep] = useState(1); // 1: email, 2: security question, 3: new password
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetToken, setResetToken] = useState("");

  useEffect(() => {
    checkAuthenticationStatus();
  }, []);

  const checkAuthenticationStatus = async () => {
    try {
      const token = localStorage.getItem("token") || Cookies.get("jwt");
      console.log("Token:", token);

      if (!token) {
        setCheckingAuth(false);
        return;
      }

      const tokenResponse = await verifyToken(token);
      console.log("Token response:", tokenResponse);

      if (tokenResponse.isValid) {
        const userProfile = await getCurrentUser();
        console.log("User profile:", userProfile);

        if (userProfile?.data?.user?.role === "admin") {
          setIsAlreadyLoggedIn(true);
          setMessage("You are already logged in. Redirecting to dashboard...");

          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        } else {
          localStorage.removeItem("token");
          Cookies.remove("jwt");
        }
      }
    } catch (error) {
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

  const resetForgotPasswordFlow = () => {
    setShowForgotPassword(false);
    setForgotPasswordStep(1);
    setSecurityQuestion("");
    setSecurityAnswer("");
    setNewPassword("");
    setConfirmPassword("");
    setResetToken("");
    clearErrors();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    clearErrors();

    if (!email || !password) {
      setError("Please provide both email and password");
      setLoading(false);
      return;
    }

    try {
      const response = await login({ email, password });

      if (response.status === "success") {
        setMessage("Login successful! Redirecting...");

        if (response.token) {
          localStorage.setItem("token", response.token);
        }

        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 2000);
      } else {
        setError(response.message || "Login failed. Please try again.");
      }
    } catch (err) {
      if (err.response?.data) {
        const errorData = err.response.data;

        if (errorData.errors) {
          setFieldErrors(errorData.errors);
        }

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

  const handleForgotPasswordStep1 = async (e) => {
    e.preventDefault();
    clearErrors();

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      // Get the security question for this email
      const securityResponse = await getSecurityQuestionByEmail(email);
      console.log("Security question response:", securityResponse);

      if (
        securityResponse.status === "success" &&
        securityResponse.data?.securityQuestion
      ) {
        setSecurityQuestion(securityResponse.data.securityQuestion);
        setForgotPasswordStep(2);
        setMessage("Please answer your security question");
      } else {
        setError(
          securityResponse.message ||
            "No security question found for this email"
        );
      }
    } catch (err) {
      console.error("Security question error:", err);
      if (err.response?.data) {
        const errorData = err.response.data;
        setError(errorData.message || "Failed to retrieve security question");
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Failed to process your request. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordStep2 = async (e) => {
    e.preventDefault();
    clearErrors();

    if (!securityAnswer) {
      setError("Please provide your security answer");
      return;
    }

    setLoading(true);

    try {
      const verifyResponse = await verifySecurityQuestion({
        email,
        answer: securityAnswer,
      });

      console.log("Verify response:", verifyResponse);

      if (verifyResponse.status === "success") {
        // Store the reset token from response
        setResetToken(verifyResponse.resetToken);
        setForgotPasswordStep(3);
        setMessage("Security question verified. Please set your new password.");
      } else {
        setError(verifyResponse.message || "Incorrect security answer");
      }
    } catch (err) {
      console.error("Verify security error:", err);
      if (err.response?.data) {
        const errorData = err.response.data;
        setError(errorData.message || "Verification failed");
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Verification failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordStep3 = async (e) => {
    e.preventDefault();
    clearErrors();

    if (!newPassword || !confirmPassword) {
      setError("Please fill in all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      const resetResponse = await resetPasswordWithSecurity({
        token: resetToken,
        newPassword,
        answer: securityAnswer, // Include security answer in the reset request
      });

      console.log("Reset password response:", resetResponse);

      if (resetResponse.status === "success") {
        setMessage(
          "Password reset successfully! You can now login with your new password."
        );

        // Reset the flow and go back to login
        setTimeout(() => {
          resetForgotPasswordFlow();
        }, 3000);
      } else {
        setError(resetResponse.message || "Password reset failed");
      }
    } catch (err) {
      console.error("Reset password error:", err);
      if (err.response?.data) {
        const errorData = err.response.data;
        setError(errorData.message || "Password reset failed");
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Password reset failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    switch (forgotPasswordStep) {
      case 1:
        await handleForgotPasswordStep1(e);
        break;
      case 2:
        await handleForgotPasswordStep2(e);
        break;
      case 3:
        await handleForgotPasswordStep3(e);
        break;
      default:
        break;
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

  const getForgotPasswordTitle = () => {
    switch (forgotPasswordStep) {
      case 1:
        return "Password Recovery";
      case 2:
        return "Security Verification";
      case 3:
        return "Set New Password";
      default:
        return "Password Recovery";
    }
  };

  const getForgotPasswordSubtitle = () => {
    switch (forgotPasswordStep) {
      case 1:
        return "Enter your email to start password recovery";
      case 2:
        return "Answer your security question to verify your identity";
      case 3:
        return "Create a new password for your account";
      default:
        return "Enter your email to receive reset instructions";
    }
  };

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
              {showForgotPassword ? getForgotPasswordTitle() : "Access Portal"}
            </motion.h2>
            <motion.h1
              className="text-2xl font-bold text-gray-800"
              variants={itemVariants}
            >
              {showForgotPassword
                ? forgotPasswordStep === 1
                  ? "Reset Your Password"
                  : forgotPasswordStep === 2
                  ? "Verify Your Identity"
                  : "Create New Password"
                : "Welcome Back"}
            </motion.h1>
            <motion.p
              className="text-gray-600 text-sm mt-2"
              variants={itemVariants}
            >
              {showForgotPassword
                ? getForgotPasswordSubtitle()
                : "Sign in to your account to continue"}
            </motion.p>

            {/* Progress indicator for forgot password */}
            {showForgotPassword && (
              <div className="mt-4 flex justify-center space-x-2">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      step === forgotPasswordStep
                        ? "bg-teal-600"
                        : step < forgotPasswordStep
                        ? "bg-teal-400"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            )}
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
            {/* Email Field - Always visible */}
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

            {/* Password Field - Only for login */}
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

            {/* Security Question Field - Step 2 */}
            {showForgotPassword && forgotPasswordStep === 2 && (
              <motion.div
                className="mb-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label
                  htmlFor="securityQuestion"
                  className="block text-teal-700 text-sm font-medium mb-2"
                >
                  Security Question
                </label>
                <div className="w-full px-4 py-3 bg-white/50 border border-teal-500/30 rounded-lg text-gray-700 text-sm mb-4">
                  {securityQuestion || "Loading security question..."}
                </div>
                <label
                  htmlFor="securityAnswer"
                  className="block text-teal-700 text-sm font-medium mb-2"
                >
                  Your Answer
                </label>
                <input
                  type="text"
                  id="securityAnswer"
                  value={securityAnswer}
                  onChange={(e) => {
                    setSecurityAnswer(e.target.value);
                    clearErrors();
                  }}
                  className="w-full px-4 py-3 bg-white/80 border border-teal-500/30 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
                  placeholder="Enter your answer"
                  required
                />
              </motion.div>
            )}

            {/* New Password Fields - Step 3 */}
            {showForgotPassword && forgotPasswordStep === 3 && (
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-teal-700 text-sm font-medium mb-2"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      clearErrors();
                    }}
                    className="w-full px-4 py-3 bg-white/80 border border-teal-500/30 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
                    placeholder="Enter new password (min. 6 characters)"
                    required
                    minLength={6}
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-teal-700 text-sm font-medium mb-2"
                  >
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      clearErrors();
                    }}
                    className="w-full px-4 py-3 bg-white/80 border border-teal-500/30 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
                    placeholder="Confirm new password"
                    required
                    minLength={6}
                  />
                </div>
              </motion.div>
            )}

            <motion.button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed mt-4"
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
                  {showForgotPassword
                    ? forgotPasswordStep === 1
                      ? "Checking..."
                      : forgotPasswordStep === 2
                      ? "Verifying..."
                      : "Resetting..."
                    : "Signing in..."}
                </div>
              ) : (
                <span className="relative z-10">
                  {showForgotPassword
                    ? forgotPasswordStep === 1
                      ? "Continue"
                      : forgotPasswordStep === 2
                      ? "Verify Answer"
                      : "Reset Password"
                    : "Sign In"}
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
                  if (forgotPasswordStep === 1) {
                    resetForgotPasswordFlow();
                  } else {
                    setForgotPasswordStep(forgotPasswordStep - 1);
                  }
                  clearErrors();
                }}
                className="text-teal-600 hover:text-teal-700 text-sm"
              >
                ← Back{" "}
                {forgotPasswordStep === 1 ? "to Login" : "to Previous Step"}
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
