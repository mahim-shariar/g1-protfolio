import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiYoutube,
  FiSave,
  FiEdit,
  FiTrash2,
  FiPlus,
  FiX,
  FiSettings,
  FiUser,
  FiShield,
  FiGlobe,
} from "react-icons/fi";
import {
  getContactInfo,
  createOrUpdateContact,
  updateContact,
  deleteContact,
  getAllContactEntries,
} from "../services/api"; // Update the path to your API file

const Settings = () => {
  const [activeTab, setActiveTab] = useState("contact");
  const [contactData, setContactData] = useState({
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
    },
    socialLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
      youtube: "",
    },
    isActive: true,
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [editMode, setEditMode] = useState(false);

  // Fetch contact data on component mount
  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    try {
      setLoading(true);
      const response = await getContactInfo();
      if (response.data?.contact) {
        setContactData(response.data.contact);
      }
    } catch (error) {
      console.error("Error fetching contact data:", error);
      setMessage({ type: "error", text: "Failed to load contact information" });
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text, duration = 3000) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), duration);
  };

  const handleInputChange = (path, value) => {
    setContactData((prevData) => {
      const keys = path.split(".");
      const newData = { ...prevData };
      let current = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]] = { ...current[keys[i]] };
      }

      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const handleSaveContact = async () => {
    try {
      setSaving(true);

      // Basic validation
      if (!contactData.email || !contactData.phone) {
        showMessage("error", "Email and phone are required");
        return;
      }

      if (
        !contactData.address.street ||
        !contactData.address.city ||
        !contactData.address.state
      ) {
        showMessage("error", "Complete address information is required");
        return;
      }

      const response = await createOrUpdateContact(contactData);

      showMessage("success", "Contact information saved successfully");
      setEditMode(false);

      // Refresh data
      fetchContactData();
    } catch (error) {
      console.error("Error saving contact data:", error);
      showMessage("error", "Failed to save contact information");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteContact = async () => {
    if (
      window.confirm("Are you sure you want to delete all contact information?")
    ) {
      try {
        setSaving(true);
        await deleteContact();
        setContactData({
          email: "",
          phone: "",
          address: {
            street: "",
            city: "",
            state: "",
            zipCode: "",
            country: "United States",
          },
          socialLinks: {
            facebook: "",
            twitter: "",
            instagram: "",
            linkedin: "",
            youtube: "",
          },
          isActive: true,
        });
        showMessage("success", "Contact information deleted successfully");
      } catch (error) {
        console.error("Error deleting contact data:", error);
        showMessage("error", "Failed to delete contact information");
      } finally {
        setSaving(false);
      }
    }
  };

  const socialMediaIcons = {
    facebook: FiFacebook,
    twitter: FiTwitter,
    instagram: FiInstagram,
    linkedin: FiLinkedin,
    youtube: FiYoutube,
  };

  const socialMediaPlaceholders = {
    facebook: "https://facebook.com/yourpage",
    twitter: "https://twitter.com/yourhandle",
    instagram: "https://instagram.com/yourprofile",
    linkedin: "https://linkedin.com/company/yourcompany",
    youtube: "https://youtube.com/yourchannel",
  };

  if (loading) {
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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">
            Manage your contact information and preferences
          </p>
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <nav className="space-y-2">
                {[
                  { id: "contact", icon: FiUser, label: "Contact Info" },
                  { id: "profile", icon: FiSettings, label: "Profile" },
                  { id: "security", icon: FiShield, label: "Security" },
                  { id: "preferences", icon: FiGlobe, label: "Preferences" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                      activeTab === tab.id
                        ? "bg-purple-50 text-purple-700 border border-purple-200"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "contact" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white/20 rounded-lg">
                        <FiUser className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">
                          Contact Information
                        </h2>
                        <p className="text-white/80 text-sm">
                          Manage how clients and visitors can reach you
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {!editMode ? (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setEditMode(true)}
                          className="flex items-center space-x-2 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                        >
                          <FiEdit className="w-4 h-4" />
                          <span>Edit</span>
                        </motion.button>
                      ) : (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setEditMode(false)}
                            className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                          >
                            Cancel
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleSaveContact}
                            disabled={saving}
                            className="flex items-center space-x-2 px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-white/90 disabled:opacity-50 transition-colors"
                          >
                            {saving ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                                className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full"
                              />
                            ) : (
                              <FiSave className="w-4 h-4" />
                            )}
                            <span>{saving ? "Saving..." : "Save"}</span>
                          </motion.button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="p-6 space-y-6">
                  {/* Email and Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                        <FiMail className="w-4 h-4 mr-2 text-purple-500" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={contactData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        disabled={!editMode}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                        placeholder="contact@example.com"
                      />
                    </div>
                    <div>
                      <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                        <FiPhone className="w-4 h-4 mr-2 text-blue-500" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={contactData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        disabled={!editMode}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                        placeholder="+1-555-0123"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                      <FiMapPin className="w-4 h-4 mr-2 text-green-500" />
                      Address *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={contactData.address.street}
                        onChange={(e) =>
                          handleInputChange("address.street", e.target.value)
                        }
                        disabled={!editMode}
                        className="col-span-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                        placeholder="Street Address"
                      />
                      <input
                        type="text"
                        value={contactData.address.city}
                        onChange={(e) =>
                          handleInputChange("address.city", e.target.value)
                        }
                        disabled={!editMode}
                        className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                        placeholder="City"
                      />
                      <input
                        type="text"
                        value={contactData.address.state}
                        onChange={(e) =>
                          handleInputChange("address.state", e.target.value)
                        }
                        disabled={!editMode}
                        className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                        placeholder="State"
                      />
                      <input
                        type="text"
                        value={contactData.address.zipCode}
                        onChange={(e) =>
                          handleInputChange("address.zipCode", e.target.value)
                        }
                        disabled={!editMode}
                        className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                        placeholder="ZIP Code"
                      />
                      <input
                        type="text"
                        value={contactData.address.country}
                        onChange={(e) =>
                          handleInputChange("address.country", e.target.value)
                        }
                        disabled={!editMode}
                        className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                        placeholder="Country"
                      />
                    </div>
                  </div>

                  {/* Social Links */}
                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                      <FiGlobe className="w-4 h-4 mr-2 text-orange-500" />
                      Social Media Links
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(contactData.socialLinks).map(
                        ([platform, url]) => {
                          const IconComponent = socialMediaIcons[platform];
                          return (
                            <div
                              key={platform}
                              className="flex items-center space-x-3"
                            >
                              <div className="p-2 bg-gray-100 rounded-lg">
                                <IconComponent className="w-4 h-4 text-gray-600" />
                              </div>
                              <input
                                type="url"
                                value={url}
                                onChange={(e) =>
                                  handleInputChange(
                                    `socialLinks.${platform}`,
                                    e.target.value
                                  )
                                }
                                disabled={!editMode}
                                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                                placeholder={socialMediaPlaceholders[platform]}
                              />
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>

                  {/* Status Toggle */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <label className="text-sm font-semibold text-gray-700">
                        Contact Information Status
                      </label>
                      <p className="text-sm text-gray-500">
                        {contactData.isActive
                          ? "Visible to public"
                          : "Hidden from public"}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={contactData.isActive}
                        onChange={(e) =>
                          handleInputChange("isActive", e.target.checked)
                        }
                        disabled={!editMode}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </div>

                  {/* Danger Zone */}
                  {editMode && (
                    <div className="border border-red-200 rounded-xl p-4 bg-red-50">
                      <h3 className="text-sm font-semibold text-red-800 mb-2">
                        Danger Zone
                      </h3>
                      <p className="text-sm text-red-600 mb-3">
                        Deleting contact information will remove it permanently.
                      </p>
                      <button
                        onClick={handleDeleteContact}
                        disabled={saving}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
                      >
                        <FiTrash2 className="w-4 h-4" />
                        <span>Delete Contact Information</span>
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Other tabs can be implemented similarly */}
            {activeTab !== "contact" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center"
              >
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiSettings className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}{" "}
                    Settings
                  </h3>
                  <p className="text-gray-600">
                    This section is under development. Check back later for more
                    settings options.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
