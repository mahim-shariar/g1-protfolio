import axios from "axios";

const API_URL =
  import.meta.env.VITE_NODE_ENV === "production"
    ? "https://jayed-talukder-server.vercel.app/api/v1"
    : "http://localhost:5000/api/v1";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for cookies to be sent
});

// Request interceptor for adding token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling global errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized (e.g., redirect to login)
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

// Auth API - Updated based on your backend

export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);

  // Store the token in localStorage if it's returned in the response
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
};

export const logout = async () => {
  try {
    // Try to call the server logout endpoint
    const response = await api.post("/auth/logout");

    // Clear local token regardless of server response
    localStorage.removeItem("token");

    return response.data;
  } catch (error) {
    // Still clear local token even if server request fails
    localStorage.removeItem("token");
    throw error;
  }
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

export const updatePassword = async (data) => {
  const response = await api.patch("/auth/updatePassword", data);
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await api.post("/auth/forgotPassword", { email });
  return response.data;
};

export const resetPassword = async (token, password) => {
  const response = await api.patch(`/auth/resetPassword/${token}`, {
    password,
  });
  return response.data;
};

export const verifyToken = async (token = null) => {
  try {
    // If no token provided, try to get from localStorage
    const tokenToVerify = token || localStorage.getItem("token");

    if (!tokenToVerify) {
      return {
        isValid: false,
        message: "No token provided",
        status: "fail",
      };
    }

    const response = await api.post("/auth/verify-token", {
      token: tokenToVerify,
    });
    return response.data;
  } catch (error) {
    // Handle error specifically for token verification
    if (error.response?.data) {
      return error.response.data;
    }

    return {
      isValid: false,
      message: "Token verification failed",
      status: "error",
      error: error.message,
    };
  }
};

// Add these to your existing API functions

// Security Question API
export const setSecurityQuestion = async (data) => {
  const response = await api.post("/auth/set-security-question", data);
  return response.data;
};

export const verifySecurityQuestion = async (data) => {
  const response = await api.post("/auth/verify-security-answer", data);
  return response.data;
};

export const resetPasswordWithSecurity = async (data) => {
  const response = await api.post("/auth/reset-password-with-security", data);
  return response.data;
};

export const getSecurityQuestionByEmail = async (email) => {
  const response = await api.post("/auth/get-security-question", { email });
  return response.data;
};

// Video Reels API
export const getVideoReels = async (params = {}) => {
  const response = await api.get("/video-reels", { params });
  return response.data;
};

export const getVideoReel = async (id) => {
  const response = await api.get(`/video-reels/${id}`);
  return response.data;
};

export const createVideoReel = async (reelData) => {
  const response = await api.post("/video-reels", reelData);
  return response.data;
};

export const updateVideoReel = async (id, reelData) => {
  const response = await api.patch(`/video-reels/${id}`, reelData);
  return response.data;
};

export const deleteVideoReel = async (id) => {
  const response = await api.delete(`/video-reels/${id}`);
  return response.data;
};

// Enhanced Video Reels API with filtering
export const getVideoReelsByCategory = async (category) => {
  const response = await api.get("/video-reels", { params: { category } });
  return response.data;
};

export const getVideoReelsByTags = async (tags) => {
  const response = await api.get("/video-reels", {
    params: { tags: Array.isArray(tags) ? tags.join(",") : tags },
  });
  return response.data;
};

export const searchVideoReels = async (query) => {
  const response = await api.get("/video-reels", {
    params: { search: query },
  });
  return response.data;
};

// Reviews API
export const getReviews = async (params = {}) => {
  const response = await api.get("/reviews/text", { params });
  return response.data;
};

export const getVideoReviews = async (params = {}) => {
  const response = await api.get(`/reviews/videos`, { params });
  return response.data;
};

export const createReview = async (reviewData) => {
  const response = await api.post("/reviews", reviewData);
  return response.data;
};

export const updateReview = async (id, reviewData) => {
  const response = await api.patch(`/reviews/${id}`, reviewData);
  return response.data;
};

export const deleteReview = async (id) => {
  const response = await api.delete(`/reviews/${id}`);
  return response.data;
};

export const getCategories = async (params = {}) => {
  const response = await api.get("/categories", { params });
  return response.data;
};

export const getCategory = async (slug) => {
  const response = await api.get(`/categories/${slug}`);
  return response.data;
};

export const createCategory = async (categoryData) => {
  const response = await api.post("/categories", categoryData);
  return response.data;
};

export const updateCategory = async (slug, categoryData) => {
  const response = await api.patch(`/categories/${slug}`, categoryData);
  return response.data;
};

export const deleteCategory = async (slug) => {
  const response = await api.delete(`/categories/${slug}`);
  return response.data;
};

// Enhanced Category API
export const getVisibleCategories = async () => {
  const response = await api.get("/categories", {
    params: { isShownInCategory: true },
  });
  return response.data;
};

export const searchCategories = async (query) => {
  const response = await api.get("/categories", {
    params: { search: query },
  });
  return response.data;
};

export const getServices = async (query = {}) => {
  const response = await api.get("/services", { params: query });
  return response.data;
};

// Create a new service
export const createService = async (serviceData) => {
  const response = await api.post("/services", serviceData);
  return response.data;
};

// Update a service
export const updateService = async (id, serviceData) => {
  const response = await api.patch(`/services/${id}`, serviceData);
  return response.data;
};

// Delete a service
export const deleteService = async (id) => {
  const response = await api.delete(`/services/${id}`);
  return response.data;
};

// Contact API
export const getContactInfo = async () => {
  const response = await api.get("/contact");
  return response.data;
};

export const getAllContactEntries = async () => {
  const response = await api.get("/contact/all");
  return response.data;
};

export const createOrUpdateContact = async (contactData) => {
  const response = await api.post("/contact", contactData);
  return response.data;
};

export const updateContact = async (contactData) => {
  const response = await api.patch("/contact", contactData);
  return response.data;
};

export const deleteContact = async () => {
  const response = await api.delete("/contact");
  return response.data;
};

// FAQ API
export const getFAQs = async (params = {}) => {
  const response = await api.get("/faqs", { params });
  return response.data;
};

export const getFAQ = async (slug) => {
  const response = await api.get(`/faqs/${slug}`);
  return response.data;
};

export const createFAQ = async (faqData) => {
  const response = await api.post("/faqs", faqData);
  return response.data;
};

export const updateFAQ = async (slug, faqData) => {
  const response = await api.patch(`/faqs/${slug}`, faqData);
  return response.data;
};

export const deleteFAQ = async (slug) => {
  const response = await api.delete(`/faqs/${slug}`);
  return response.data;
};

export const getFAQsByCategory = async (category) => {
  const response = await api.get(`/faqs/category/${category}`);
  return response.data;
};

export const getPopularFAQs = async (limit = 10) => {
  const response = await api.get("/faqs/popular", { params: { limit } });
  return response.data;
};

export const markFAQHelpful = async (slug) => {
  const response = await api.post(`/faqs/${slug}/helpful`);
  return response.data;
};

export const markFAQNotHelpful = async (slug) => {
  const response = await api.post(`/faqs/${slug}/not-helpful`);
  return response.data;
};

// Enhanced FAQ API with search and filtering
export const searchFAQs = async (query) => {
  const response = await api.get("/faqs", { params: { search: query } });
  return response.data;
};

export const getFAQsWithFilters = async (filters = {}) => {
  const response = await api.get("/faqs", { params: filters });
  return response.data;
};

// Statistics API
export const getStatistics = async (params = {}) => {
  const response = await api.get("/statistics", { params });
  return response.data;
};

export const getActiveStatistics = async () => {
  const response = await api.get("/statistics/active");
  return response.data;
};

export const getStatistic = async (slug) => {
  const response = await api.get(`/statistics/${slug}`);
  return response.data;
};

export const createStatistic = async (statisticData) => {
  const response = await api.post("/statistics", statisticData);
  return response.data;
};

export const updateStatistic = async (slug, statisticData) => {
  const response = await api.patch(`/statistics/${slug}`, statisticData);
  return response.data;
};

export const deleteStatistic = async (slug) => {
  const response = await api.delete(`/statistics/${slug}`);
  return response.data;
};

export const toggleStatistic = async (slug) => {
  const response = await api.patch(`/statistics/${slug}/toggle`);
  return response.data;
};

// Enhanced Statistics API with filtering
export const getStatisticsByType = async (type) => {
  const response = await api.get("/statistics", { params: { type } });
  return response.data;
};

export const searchStatistics = async (query) => {
  const response = await api.get("/statistics", {
    params: { search: query },
  });
  return response.data;
};
// File Upload API
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ml_default"); // Create this in Cloudinary settings

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    }/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) throw new Error("Upload failed");

  const data = await response.json();
  return {
    url: data.secure_url,
    public_id: data.public_id,
  };
};

export default api;
