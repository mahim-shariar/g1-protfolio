import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import RootLayout from "./layouts/RootLayout";
import LoadingSpinner from "./components/Shared/LoadingSpinner";
import DashboardLayout from "./layouts/DashboardLayout";
import Login from "./page/Login";
import PrivateRoute from "./components/auth/PrivateRoute";

// Lazy-loaded pages
const Home = lazy(() => import("./page/Home"));
const Projects = lazy(() => import("./page/Projects"));
const Services = lazy(() => import("./page/Services"));
const WhyChooseUs = lazy(() => import("./page/WhyChooseUs"));
const ContactPage = lazy(() => import("./page/ContactPage"));
const Dashboard = lazy(() => import("./page/Dashboard"));
const VideosPage = lazy(() => import("./page/VideosPage"));
const ReviewsPage = lazy(() => import("./page/ReviewsPage"));
const CategoriesPage = lazy(() => import("./page/CategoriesPage"));
const ServicesPage = lazy(() => import("./page/ServicesPage"));
const FaqsPage = lazy(() => import("./page/FaqsPage"));
const Faqs = lazy(() => import("./page/Faqs"));
const Settings = lazy(() => import("./page/Settings"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "projects",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Projects />
          </Suspense>
        ),
      },
      {
        path: "services",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Services />
          </Suspense>
        ),
      },
      {
        path: "whyChooseUs",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <WhyChooseUs />
          </Suspense>
        ),
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ContactPage />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "faqs",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <FaqsPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <Dashboard />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "videos",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <VideosPage />
          </Suspense>
        ),
      },
      {
        path: "reviews",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ReviewsPage />
          </Suspense>
        ),
      },
      {
        path: "categories",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <CategoriesPage />
          </Suspense>
        ),
      },
      {
        path: "services",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ServicesPage />
          </Suspense>
        ),
      },
      {
        path: "settings",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Settings />
          </Suspense>
        ),
      },
      {
        path: "faqs",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Faqs />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
