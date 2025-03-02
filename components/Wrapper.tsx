"use client";
import ScrollToTop from "./common/ScrollToTop";

import "../app/globals.css";
import "../app/css/animate.css";
import "../app/css/bootstrap.min.css";
import "../app/css/fontawesome.css";
import "../app/css/magnific-popup.css";
import "../app/css/metisMenu.css";
import "../app/css/main.css";

import "bootstrap/dist/js/bootstrap";

const Wrapper = ({ children }: any) => {
  return (
    <div className="text-white">
      {children}
      <ScrollToTop />
    </div>
  );
};

export default Wrapper;
