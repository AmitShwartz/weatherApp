import React from "react";
import "./Layout.scss";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const Layout = ({ children }) => (
  <>
    <Header />
    <div className="site-layout">
      <main className="site-content">{children}</main>
    </div>
    <Footer />
  </>
);

export default Layout;