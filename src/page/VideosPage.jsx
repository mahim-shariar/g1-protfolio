import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getVideoReels,
  createVideoReel,
  updateVideoReel,
  deleteVideoReel,
  getCategories,
  uploadFile,
} from "../services/api";
import VideoList from "../components/VideoList";
import VideoModal from "../components/VideoModal";

const VideosPage = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOnlyBest, setShowOnlyBest] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [uploading, setUploading] = useState({
    video: false,
    thumbnail: false,
  });
  const [submitting, setSubmitting] = useState(false);

  const [videoForm, setVideoForm] = useState({
    title: "",
    description: "",
    videoUrl: "",
    videoCloudId: "",
    thumbnailUrl: "",
    thumbnailCloudId: "",
    category: "",
    tags: "",
    isBest: false,
  });

  useEffect(() => {
    fetchCategories();
    fetchVideos(showOnlyBest);
  }, [showOnlyBest]);

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data.categories);
    } catch (err) {
      toast.error("Failed to fetch categories");
    }
  };

  const fetchVideos = async (filterBest = false) => {
    try {
      setLoading(true);
      let query = "";
      if (filterBest) {
        query = { isBest: true };
      }
      const res = await getVideoReels(query);
      setVideos(res.data.videoReels);
    } catch (err) {
      toast.error("Failed to fetch videos");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading({ ...uploading, [type]: true });
      const toastId = toast.loading(`Uploading ${type}...`);
      const res = await uploadFile(file);

      if (type === "video") {
        setVideoForm((prev) => ({
          ...prev,
          videoUrl: res.url,
          videoCloudId: res.public_id,
        }));
      } else if (type === "thumbnail") {
        setVideoForm((prev) => ({
          ...prev,
          thumbnailUrl: res.url,
          thumbnailCloudId: res.public_id,
        }));
      }

      toast.update(toastId, {
        render: `${type.charAt(0).toUpperCase() + type.slice(1)} uploaded!`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (err) {
      toast.error(`Failed to upload ${type}`);
    } finally {
      setUploading({ ...uploading, [type]: false });
    }
  };

  const handleVideoChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVideoForm({
      ...videoForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const submitVideoForm = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const toastId = toast.loading(
        editingVideo ? "Updating video..." : "Adding video..."
      );

      const tags = videoForm.tags.split(",").map((tag) => tag.trim());
      const payload = { ...videoForm, tags };

      if (editingVideo) {
        await updateVideoReel(editingVideo._id, payload);
        toast.update(toastId, {
          render: "Video updated!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        await createVideoReel(payload);
        toast.update(toastId, {
          render: "Video added!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      }

      setShowVideoModal(false);
      setVideoForm({
        title: "",
        description: "",
        videoUrl: "",
        videoCloudId: "",
        thumbnailUrl: "",
        thumbnailCloudId: "",
        category: "",
        tags: "",
        isBest: false,
      });
      setEditingVideo(null);
      await fetchVideos(showOnlyBest);
    } catch (err) {
      toast.error(err.message || "Failed to save video");
    } finally {
      setSubmitting(false);
    }
  };

  const editVideo = (video) => {
    setEditingVideo(video);
    setVideoForm({
      title: video.title,
      description: video.description,
      videoUrl: video.videoUrl,
      thumbnailUrl: video.thumbnailUrl,
      videoCloudId: video.videoCloudId,
      thumbnailCloudId: video.thumbnailCloudId,
      category: video.category || "",
      tags: video.tags?.join(", ") || "",
      isBest: video.isBest || false,
    });
    setShowVideoModal(true);
  };

  const deleteVideo = async (id) => {
    if (!window.confirm("Delete this video?")) return;
    try {
      await deleteVideoReel(id);
      toast.success("Video deleted");
      setVideos((prev) => prev.filter((video) => video._id !== id));
    } catch (err) {
      toast.error("Failed to delete video");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8 flex items-center">
          <motion.button
            onClick={() => navigate("/dashboard")}
            className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ←
          </motion.button>
          <h1 className="text-2xl font-bold text-gray-800">Video Reels</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex justify-end mb-6">
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowOnlyBest(!showOnlyBest)}
              className={`inline-flex items-center px-4 py-2 border text-sm font-medium rounded-lg shadow-sm ${
                showOnlyBest
                  ? "bg-red-100 text-red-700 border-red-300"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {showOnlyBest ? "Show All Videos" : "Show Featured Only"}
              {showOnlyBest && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {videos.filter((video) => video.isBest).length}
                </span>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setEditingVideo(null);
                setVideoForm({
                  title: "",
                  description: "",
                  videoUrl: "",
                  videoCloudId: "",
                  thumbnailUrl: "",
                  thumbnailCloudId: "",
                  category: "",
                  tags: "",
                  isBest: false,
                });
                setShowVideoModal(true);
              }}
              className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
            >
              + Add New Video
            </motion.button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"
            />
          </div>
        ) : (
          <VideoList
            videos={videos}
            onEdit={editVideo}
            onDelete={deleteVideo}
            showOnlyBest={showOnlyBest}
          />
        )}
      </main>

      {showVideoModal && (
        <VideoModal
          show={showVideoModal}
          onClose={() => setShowVideoModal(false)}
          videoForm={videoForm}
          setVideoForm={setVideoForm}
          submitting={submitting}
          uploading={uploading}
          handleVideoChange={handleVideoChange}
          handleFileUpload={handleFileUpload}
          submitVideoForm={submitVideoForm}
          editingVideo={editingVideo}
          categories={categories}
        />
      )}
    </div>
  );
};

export default VideosPage;
