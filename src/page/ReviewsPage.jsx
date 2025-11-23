import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
  uploadFile,
} from "../services/api";
import ReviewList from "../components/ReviewList";
import ReviewModal from "../components/ReviewModal";

const ReviewsPage = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOnlyBestReviews, setShowOnlyBestReviews] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [uploading, setUploading] = useState({ video: false });
  const [submitting, setSubmitting] = useState(false);

  const [reviewForm, setReviewForm] = useState({
    content: "",
    rating: 5,
    video: "",
    videoId: "",
    userName: "",
    isBest: false,
  });

  useEffect(() => {
    fetchReviews(showOnlyBestReviews);
  }, [showOnlyBestReviews]);

  const fetchReviews = async (filterBest = false) => {
    try {
      setLoading(true);
      let query = "";
      if (filterBest) {
        query = { isBest: true };
      }
      const res = await getReviews(query);
      setReviews(res.data.reviews);
    } catch (err) {
      toast.error("Failed to fetch reviews");
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
        setReviewForm((prev) => ({
          ...prev,
          video: res.url,
          videoId: res.public_id,
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

  const handleReviewChange = (e) => {
    const { name, value, type, checked } = e.target;
    setReviewForm({
      ...reviewForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const submitReviewForm = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const toastId = toast.loading(
        editingReview ? "Updating review..." : "Adding review..."
      );

      if (editingReview) {
        await updateReview(editingReview._id, reviewForm);
        toast.update(toastId, {
          render: "Review updated!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        await createReview(reviewForm);
        toast.update(toastId, {
          render: "Review added!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      }

      setShowReviewModal(false);
      setReviewForm({
        content: "",
        rating: 5,
        video: "",
        videoId: "",
        userName: "",
        isBest: false,
      });
      setEditingReview(null);
      await fetchReviews(showOnlyBestReviews);
    } catch (err) {
      toast.error(err.message || "Failed to save review");
    } finally {
      setSubmitting(false);
    }
  };

  const editReview = (review) => {
    setEditingReview(review);
    setReviewForm({
      content: review.content,
      rating: review.rating,
      video: review.video,
      videoId: review.videoId,
      userName: review.userName || "",
      isBest: review.isBest || false,
    });
    setShowReviewModal(true);
  };

  const deleteReviewItem = async (id) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      await deleteReview(id);
      toast.success("Review deleted");
      setReviews((prev) => prev.filter((review) => review._id !== id));
    } catch (err) {
      toast.error("Failed to delete review");
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
          <h1 className="text-2xl font-bold text-gray-800">Reviews</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex justify-end mb-6">
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowOnlyBestReviews(!showOnlyBestReviews)}
              className={`inline-flex items-center px-4 py-2 border text-sm font-medium rounded-lg shadow-sm ${
                showOnlyBestReviews
                  ? "bg-red-100 text-red-700 border-red-300"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {showOnlyBestReviews ? "Show All Reviews" : "Show Best Only"}
              {showOnlyBestReviews && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {reviews.filter((review) => review.isBest).length}
                </span>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setEditingReview(null);
                setReviewForm({
                  content: "",
                  rating: 5,
                  video: "",
                  videoId: "",
                  userName: "",
                  isBest: false,
                });
                setShowReviewModal(true);
              }}
              className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
            >
              + Add New Review
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
          <ReviewList
            reviews={reviews}
            onEdit={editReview}
            onDelete={deleteReviewItem}
            showOnlyBest={showOnlyBestReviews}
          />
        )}
      </main>

      {showReviewModal && (
        <ReviewModal
          show={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          reviewForm={reviewForm}
          setReviewForm={setReviewForm}
          submitting={submitting}
          uploading={uploading}
          handleReviewChange={handleReviewChange}
          handleFileUpload={handleFileUpload}
          submitReviewForm={submitReviewForm}
          editingReview={editingReview}
        />
      )}
    </div>
  );
};

export default ReviewsPage;
