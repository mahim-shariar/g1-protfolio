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

export const forceLogoutAllDevices = async () => {
  const response = await api.post("/auth/forceLogoutAllDevices");
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
  const response = await api.get("/reviews", { params });
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
