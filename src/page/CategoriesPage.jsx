import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/api";
import CategoryList from "../components/CategoryList";
import CategoryModal from "../components/CategoryModal";

const CategoriesPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    isShownInCategory: true,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await getCategories();
      setCategories(res.data.categories);
    } catch (err) {
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCategoryForm({
      ...categoryForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const submitCategoryForm = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const toastId = toast.loading(
        editingCategory ? "Updating category..." : "Creating category..."
      );

      if (editingCategory) {
        await updateCategory(editingCategory.slug, categoryForm);
        toast.update(toastId, {
          render: "Category updated!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        await createCategory(categoryForm);
        toast.update(toastId, {
          render: "Category created!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      }

      setShowCategoryModal(false);
      setCategoryForm({
        name: "",
        isShownInCategory: true,
      });
      setEditingCategory(null);
      await fetchCategories();
    } catch (err) {
      toast.error(err.message || "Failed to save category");
    } finally {
      setSubmitting(false);
    }
  };

  const editCategory = (category) => {
    setEditingCategory(category);
    setCategoryForm({
      name: category.name,
      isShownInCategory: category.isShownInCategory,
    });
    setShowCategoryModal(true);
  };

  const deleteCategoryItem = async (id, slug) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await deleteCategory(slug);
      toast.success("Category deleted");
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
    } catch (err) {
      toast.error("Failed to delete category");
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
          <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex justify-end mb-6">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setEditingCategory(null);
              setCategoryForm({
                name: "",
                isShownInCategory: true,
              });
              setShowCategoryModal(true);
            }}
            className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
          >
            + Add New Category
          </motion.button>
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
          <CategoryList
            categories={categories}
            onEdit={editCategory}
            onDelete={deleteCategoryItem}
          />
        )}
      </main>

      {showCategoryModal && (
        <CategoryModal
          show={showCategoryModal}
          onClose={() => setShowCategoryModal(false)}
          categoryForm={categoryForm}
          setCategoryForm={setCategoryForm}
          onSubmit={submitCategoryForm}
          submitting={submitting}
          handleChange={handleCategoryChange}
          editingCategory={editingCategory}
        />
      )}
    </div>
  );
};

export default CategoriesPage;
