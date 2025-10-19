import { Outlet } from "react-router";
import Footer from "./footer";
import NavBar from "./navBar";

const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
