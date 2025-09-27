import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FiVideo,
  FiStar,
  FiCamera,
  FiGrid,
  FiArrowLeft,
  FiSettings,
  FiHelpCircle,
} from "react-icons/fi";

const Dashboard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Video Reels",
      description: "Manage your video portfolio",
      icon: <FiVideo className="h-8 w-8 text-red-500" />,
      path: "/dashboard/videos",
      color: "bg-gradient-to-br from-red-50 to-red-100",
    },
    {
      title: "Reviews",
      description: "Manage customer reviews",
      icon: <FiStar className="h-8 w-8 text-yellow-500" />,
      path: "/dashboard/reviews",
      color: "bg-gradient-to-br from-yellow-50 to-yellow-100",
    },
    {
      title: "Categories",
      description: "Organize your content",
      icon: <FiCamera className="h-8 w-8 text-blue-500" />,
      path: "/dashboard/categories",
      color: "bg-gradient-to-br from-blue-50 to-blue-100",
    },
    {
      title: "Services",
      description: "Manage your services",
      icon: <FiGrid className="h-8 w-8 text-green-500" />,
      path: "/dashboard/services",
      color: "bg-gradient-to-br from-green-50 to-green-100",
    },
    {
      title: "FAQs",
      description: "Manage frequently asked questions",
      icon: <FiHelpCircle className="h-8 w-8 text-indigo-500" />,
      path: "/dashboard/faqs",
      color: "bg-gradient-to-br from-indigo-50 to-indigo-100",
    },
    {
      title: "Settings",
      description: "Configure your preferences",
      icon: <FiSettings className="h-8 w-8 text-purple-500" />,
      path: "/dashboard/settings",
      color: "bg-gradient-to-br from-purple-50 to-purple-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8 flex items-center">
          <motion.button
            onClick={() => navigate("/")}
            className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiArrowLeft className="h-5 w-5 text-gray-600" />
          </motion.button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Manage your content and services
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${card.color} rounded-xl shadow-md p-6 cursor-pointer transition-all duration-200 hover:shadow-lg flex flex-col h-full`}
              onClick={() => navigate(card.path)}
            >
              {/* Card Content */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {card.description}
                  </p>
                </div>
                {card.icon}
              </div>

              {/* Manage Button at Bottom */}
              <div className="mt-auto pt-4 border-t border-gray-200">
                <div className="flex items-center text-sm text-red-600 font-medium">
                  Manage
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
