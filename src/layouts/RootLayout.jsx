import { Outlet, Link } from "react-router-dom";
import NextGenFooter from "../components/Shared/NextGenFooter";
import NextGenNavbar from "../components/Shared/NextGenNavbar";

const RootLayout = () => {
  return (
    <div className="app">
      <NextGenNavbar />

      <Outlet />

      <NextGenFooter />
    </div>
  );
};

export default RootLayout;
