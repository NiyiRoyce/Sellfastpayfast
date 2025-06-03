import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

interface PageLayoutProps {
  children?: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const location = useLocation();

  const hideHeaderPaths = ["/login","/users"];
  const hideFooterPaths = ["/rates", "/login","/users"];

  // Detect if the current path is NOT matching any known route (show error page)
  // This is a rough way since location.pathname isn't '*'
  // Instead, add the 404 page's path if you want to exclude footer specifically for 404

  // If you want to hide footer on all unknown routes (404), you can check like this:
  const knownPaths = ["/", "/rates", "/support", "/about-us", "/login", "/signup"];
  const is404 = !knownPaths.includes(location.pathname);

  const shouldHideHeader = hideHeaderPaths.includes(location.pathname);
  const shouldHideFooter = hideFooterPaths.includes(location.pathname) || is404;

  return (
    <div className="w-full">
      {!shouldHideHeader && <Header />}
      <div>{children}</div>
      {!shouldHideFooter && <Footer />}
    </div>
  );
};

export default PageLayout;
