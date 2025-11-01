import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiShield,
  FiKey,
  FiLock,
  FiEye,
  FiEyeOff,
  FiHelpCircle,
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
} from "react-icons/fi";
import {
  updatePassword,
  setSecurityQuestion,
  getCurrentUser,
} from "../services/api";

const SecurityTab = ({ showMessage }) => {
  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [securityQuestionData, setSecurityQuestionData] = useState({
    question: "",
    answer: "",
    currentPassword: "",
  });
  const [securityLoading, setSecurityLoading] = useState(false);
  const [securityQuestionLoading, setSecurityQuestionLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [hasSecurityQuestion, setHasSecurityQuestion] = useState(false);
  const [showSecurityAnswer, setShowSecurityAnswer] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    checkSecurityQuestionStatus();
  }, []);

  useEffect(() => {
    checkPasswordStrength(securityData.newPassword);
  }, [securityData.newPassword]);

  const checkPasswordStrength = (password) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    setPasswordRequirements(requirements);
    const strength = Object.values(requirements).filter(Boolean).length;
    setPasswordStrength((strength / 5) * 100);
  };

  const checkSecurityQuestionStatus = async () => {
    try {
      const response = await getCurrentUser();
      const user = response.data.user;
      const hasQuestion =
        user.securityQuestion && user.securityQuestion.question;
      setHasSecurityQuestion(hasQuestion);
      setUserEmail(user.email || "");

      if (hasQuestion && user.securityQuestion.question) {
        setSecurityQuestionData((prev) => ({
          ...prev,
          question: user.securityQuestion.question,
        }));
      }
    } catch (error) {
      console.error("Error checking security question status:", error);
    }
  };

  const handleSecurityInputChange = (field, value) => {
    setSecurityData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSecurityQuestionInputChange = (field, value) => {
    setSecurityQuestionData((prev) => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleUpdatePassword = async () => {
    try {
      if (!securityData.currentPassword) {
        showMessage("error", "Current password is required");
        return;
      }

      if (securityData.newPassword !== securityData.confirmPassword) {
        showMessage("error", "New passwords do not match");
        return;
      }

      if (passwordStrength < 80) {
        showMessage("error", "Please choose a stronger password");
        return;
      }

      setSecurityLoading(true);
      await updatePassword({
        currentPassword: securityData.currentPassword,
        newPassword: securityData.newPassword,
      });

      showMessage("success", "Password updated successfully");
      setSecurityData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error updating password:", error);
      showMessage("error", error.message || "Failed to update password");
    } finally {
      setSecurityLoading(false);
    }
  };

  const handleSetSecurityQuestion = async () => {
    try {
      if (!securityQuestionData.question || !securityQuestionData.answer) {
        showMessage("error", "Please provide both question and answer");
        return;
      }

      // ALWAYS require current password for security
      if (!securityQuestionData.currentPassword) {
        showMessage(
          "error",
          "Current password is required to update security question"
        );
        return;
      }

      setSecurityQuestionLoading(true);
      const dataToSend = {
        question: securityQuestionData.question,
        answer: securityQuestionData.answer,
        currentPassword: securityQuestionData.currentPassword, // Always include password
      };

      const response = await setSecurityQuestion(dataToSend);

      if (response.token) {
        localStorage.setItem("token", response.token);
      }

      showMessage(
        "success",
        hasSecurityQuestion
          ? "Security question updated successfully"
          : "Security question set successfully"
      );

      // Reset form but keep the question if updating
      setSecurityQuestionData({
        question: hasSecurityQuestion ? securityQuestionData.question : "",
        answer: "",
        currentPassword: "",
      });

      checkSecurityQuestionStatus();
    } catch (error) {
      console.error("Error setting security question:", error);
      if (error.response?.status === 401) {
        showMessage("error", "Session expired. Please log in again.");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        showMessage(
          "error",
          error.message || "Failed to set security question"
        );
      }
    } finally {
      setSecurityQuestionLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 40) return "bg-red-500";
    if (passwordStrength < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 40) return "Weak";
    if (passwordStrength < 70) return "Medium";
    return "Strong";
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
    >
      {/* Security Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <FiShield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Security Settings
              </h2>
              <p className="text-white/80 text-sm">
                Manage your password and account security
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Content */}
      <div className="p-6 space-y-8">
        {/* Change Password Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <FiKey className="w-5 h-5 mr-2 text-red-500" />
            Change Password
          </h3>

          <div className="space-y-6">
            {/* Current Password */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Current Password *
              </label>
              <div className="relative">
                <input
                  type={showPasswords.current ? "text" : "password"}
                  value={securityData.currentPassword}
                  onChange={(e) =>
                    handleSecurityInputChange("currentPassword", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent pr-12"
                  placeholder="Enter your current password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("current")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.current ? (
                    <FiEyeOff className="w-5 h-5" />
                  ) : (
                    <FiEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                New Password *
              </label>
              <div className="relative">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  value={securityData.newPassword}
                  onChange={(e) =>
                    handleSecurityInputChange("newPassword", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent pr-12"
                  placeholder="Enter your new password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("new")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.new ? (
                    <FiEyeOff className="w-5 h-5" />
                  ) : (
                    <FiEye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Password Strength Meter */}
              {securityData.newPassword && (
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Password strength
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        passwordStrength < 40
                          ? "text-red-600"
                          : passwordStrength < 70
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                      style={{ width: `${passwordStrength}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Password Requirements */}
              {securityData.newPassword && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    Password Requirements:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    {Object.entries(passwordRequirements).map(([key, met]) => (
                      <div key={key} className="flex items-center space-x-2">
                        {met ? (
                          <FiCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        ) : (
                          <FiAlertCircle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        )}
                        <span
                          className={met ? "text-green-600" : "text-gray-500"}
                        >
                          {key === "length" && "At least 8 characters"}
                          {key === "uppercase" && "One uppercase letter"}
                          {key === "lowercase" && "One lowercase letter"}
                          {key === "number" && "One number"}
                          {key === "special" && "One special character"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Confirm New Password *
              </label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  value={securityData.confirmPassword}
                  onChange={(e) =>
                    handleSecurityInputChange("confirmPassword", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent pr-12"
                  placeholder="Confirm your new password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirm")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.confirm ? (
                    <FiEyeOff className="w-5 h-5" />
                  ) : (
                    <FiEye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {securityData.confirmPassword &&
                securityData.newPassword !== securityData.confirmPassword && (
                  <p className="text-red-500 text-sm mt-2 flex items-center">
                    <FiAlertCircle className="w-4 h-4 mr-1" />
                    Passwords do not match
                  </p>
                )}
              {securityData.confirmPassword &&
                securityData.newPassword === securityData.confirmPassword && (
                  <p className="text-green-500 text-sm mt-2 flex items-center">
                    <FiCheckCircle className="w-4 h-4 mr-1" />
                    Passwords match
                  </p>
                )}
            </div>

            {/* Update Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleUpdatePassword}
              disabled={
                securityLoading ||
                !securityData.currentPassword ||
                !securityData.newPassword ||
                !securityData.confirmPassword ||
                passwordStrength < 80 ||
                securityData.newPassword !== securityData.confirmPassword
              }
              className="w-full px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center space-x-2"
            >
              {securityLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  <span>Updating Password...</span>
                </>
              ) : (
                <>
                  <FiLock className="w-5 h-5" />
                  <span>Update Password</span>
                </>
              )}
            </motion.button>
          </div>
        </div>

        {/* Security Question Section */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
            <FiHelpCircle className="w-5 h-5 mr-2 text-purple-500" />
            Security Question
            {hasSecurityQuestion && (
              <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full flex items-center">
                <FiCheckCircle className="w-3 h-3 mr-1" />
                Active
              </span>
            )}
          </h3>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Security Question *
              </label>
              <input
                type="text"
                value={securityQuestionData.question}
                onChange={(e) =>
                  handleSecurityQuestionInputChange("question", e.target.value)
                }
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., What was the name of your first pet?"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Answer *
              </label>
              <div className="relative">
                <input
                  type={showSecurityAnswer ? "text" : "password"}
                  value={securityQuestionData.answer}
                  onChange={(e) =>
                    handleSecurityQuestionInputChange("answer", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-12"
                  placeholder="Enter your answer"
                />
                <button
                  type="button"
                  onClick={() => setShowSecurityAnswer(!showSecurityAnswer)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showSecurityAnswer ? (
                    <FiEyeOff className="w-5 h-5" />
                  ) : (
                    <FiEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* ALWAYS show current password field for security */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Current Password (Required for verification) *
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={securityQuestionData.currentPassword}
                  onChange={(e) =>
                    handleSecurityQuestionInputChange(
                      "currentPassword",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-12"
                  placeholder="Enter your current password to verify"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1 flex items-center">
                <FiInfo className="w-3 h-3 mr-1" />
                Current password is required for security verification when{" "}
                {hasSecurityQuestion ? "updating" : "setting up"} your security
                question
              </p>
            </div>

            {/* Security information box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                <FiShield className="w-4 h-4 mr-2" />
                Security Verification Required
              </h4>
              <p className="text-blue-700 text-sm">
                For your security, we require your current password to{" "}
                {hasSecurityQuestion ? "update" : "set up"}
                your security question. This prevents unauthorized changes to
                your account recovery settings.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSetSecurityQuestion}
              disabled={
                securityQuestionLoading ||
                !securityQuestionData.question ||
                !securityQuestionData.answer ||
                !securityQuestionData.currentPassword
              }
              className="w-full px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center space-x-2"
            >
              {securityQuestionLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <FiHelpCircle className="w-5 h-5" />
                  <span>
                    {hasSecurityQuestion
                      ? "Update Security Question"
                      : "Set Security Question"}
                  </span>
                </>
              )}
            </motion.button>

            {/* Security Question Info */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <h4 className="font-medium text-green-800 mb-2 flex items-center">
                <FiHelpCircle className="w-4 h-4 mr-2" />
                About Security Questions
              </h4>
              <ul className="text-green-700 text-sm space-y-1">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Used for password recovery if you forget your password
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Choose a question only you can answer
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Your answer is stored securely and encrypted
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Current password is always required for security verification
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Security Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h4 className="font-medium text-blue-800 mb-3 flex items-center">
            <FiShield className="w-4 h-4 mr-2" />
            Security Tips
          </h4>
          <ul className="text-blue-700 text-sm space-y-2">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Use a strong, unique password that you don't use elsewhere
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Always verify your identity with your current password for
              security changes
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Regularly update your password every 3-6 months
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Choose a security question that has a memorable but not easily
              guessable answer
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Be cautious of phishing attempts and suspicious emails
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default SecurityTab;
