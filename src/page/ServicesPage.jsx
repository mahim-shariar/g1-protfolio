import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "../services/api";
import ServiceList from "../components/ServiceList";
import ServiceModal from "../components/ServiceModal";

const ServicesPage = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOnlyBestServices, setShowOnlyBestServices] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [serviceForm, setServiceForm] = useState({
    title: "",
    description: "",
    icon: "",
    details: "",
    deliveryTime: "",
    revisions: "",
    features: [],
    examples: [],
    isBest: false,
  });

  useEffect(() => {
    fetchServices(showOnlyBestServices);
  }, [showOnlyBestServices]);

  const fetchServices = async (filterBest = false) => {
    try {
      setLoading(true);
      let query = "";
      if (filterBest) {
        query = { isBest: true };
      }
      const res = await getServices(query);
      setServices(res.data.services);
    } catch (err) {
      toast.error("Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  const handleServiceChange = (e) => {
    const { name, value, type, checked } = e.target;
    setServiceForm({
      ...serviceForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const submitServiceForm = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const toastId = toast.loading(
        editingService ? "Updating service..." : "Adding service..."
      );

      if (editingService) {
        await updateService(editingService._id, serviceForm);
        toast.update(toastId, {
          render: "Service updated!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        await createService(serviceForm);
        toast.update(toastId, {
          render: "Service added!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      }

      setShowServiceModal(false);
      setServiceForm({
        title: "",
        description: "",
        icon: "",
        details: "",
        deliveryTime: "",
        revisions: "",
        features: [],
        examples: [],
        isBest: false,
      });
      setEditingService(null);
      await fetchServices(showOnlyBestServices);
    } catch (err) {
      toast.error(err.message || "Failed to save service");
    } finally {
      setSubmitting(false);
    }
  };

  const editService = (service) => {
    setEditingService(service);
    setServiceForm({
      title: service.title,
      description: service.description,
      icon: service.icon || "",
      details: service.details || "",
      deliveryTime: service.deliveryTime || "",
      revisions: service.revisions || "",
      features: service.features || [],
      examples: service.examples || [],
      isBest: service.isBest || false,
    });
    setShowServiceModal(true);
  };

  const deleteServiceItem = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      await deleteService(id);
      toast.success("Service deleted");
      setServices((prev) => prev.filter((service) => service._id !== id));
    } catch (err) {
      toast.error("Failed to delete service");
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
          <h1 className="text-2xl font-bold text-gray-800">Services</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex justify-end mb-6">
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowOnlyBestServices(!showOnlyBestServices)}
              className={`inline-flex items-center px-4 py-2 border text-sm font-medium rounded-lg shadow-sm ${
                showOnlyBestServices
                  ? "bg-red-100 text-red-700 border-red-300"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {showOnlyBestServices
                ? "Show All Services"
                : "Show Featured Only"}
              {showOnlyBestServices && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {services.filter((service) => service.isBest).length}
                </span>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setEditingService(null);
                setServiceForm({
                  title: "",
                  description: "",
                  icon: "",
                  details: "",
                  deliveryTime: "",
                  revisions: "",
                  features: [],
                  examples: [],
                  isBest: false,
                });
                setShowServiceModal(true);
              }}
              className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
            >
              + Add New Service
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
          <ServiceList
            services={services}
            onEdit={editService}
            onDelete={deleteServiceItem}
            showOnlyBest={showOnlyBestServices}
          />
        )}
      </main>

      {showServiceModal && (
        <ServiceModal
          show={showServiceModal}
          onClose={() => setShowServiceModal(false)}
          serviceForm={serviceForm}
          setServiceForm={setServiceForm}
          submitting={submitting}
          handleServiceChange={handleServiceChange}
          submitServiceForm={submitServiceForm}
          editingService={editingService}
        />
      )}
    </div>
  );
};

export default ServicesPage;
