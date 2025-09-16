import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import RootLayout from "./layouts/RootLayout";
import LoadingSpinner from "./components/Shared/LoadingSpinner";

// Lazy-loaded pages
const Home = lazy(() => import("./page/Home"));
const Projects = lazy(() => import("./page/Projects"));
const Services = lazy(() => import("./page/Services"));
const WhyChooseUs = lazy(() => import("./page/WhyChooseUs"));
const ContactPage = lazy(() => import("./page/ContactPage"));
// const NotFoundPage = lazy(() => import("./page/NotFoundPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement: <ErrorBoundary />,
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
    ],
  },
  // {
  //   path: "dashboard",
  //   element: (
  //     <PrivateRoute>
  //       <DashboardLayout />
  //     </PrivateRoute>
  //   ),
  //   errorElement: <ErrorBoundary />,
  //   children: [
  //     {
  //       index: true,
  //       element: (
  //         <Suspense fallback={<LoadingSpinner />}>
  //           <Dashboard />
  //         </Suspense>
  //       ),
  //     },
  //     {
  //       path: "profile",
  //       element: (
  //         <Suspense fallback={<LoadingSpinner />}>
  //           <ProfilePage />
  //         </Suspense>
  //       ),
  //     },
  //   ],
  // },
  // {
  //   path: "*",
  //   element: (
  //     <Suspense fallback={<LoadingSpinner />}>
  //       <NotFoundPage />
  //     </Suspense>
  //   ),
  // },
]);

export default router;
