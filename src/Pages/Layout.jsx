import React from "react";
import {Outlet} from "react-router-dom";
import Navigacija from "../Components/Navbar/Navbar";


const Layout = () => {
  return (
    <>
      <Navigacija />
      <Outlet />
    </>
  );
};

export default Layout;