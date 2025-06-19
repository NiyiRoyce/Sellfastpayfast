import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

interface PageLayoutProps {
  children?: React.ReactNode;
}

const pathMatches = (patterns: string[], path: string) =>
  patterns.some((pattern) =>
    new RegExp("^" + pattern.replace(/:\w+/g, "[^/]+") + "$").test(path)
  );

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const hideHeaderPaths = [
    "/login",
    "/users",
    "/market",
    "/exchange",
    "/settings",
    "/resources", // <-- Added
  ];

  const hideFooterPaths = [
    "/login",
    "/users",
    "/market",
    "/exchange",
    "/settings",
    "/resources", // <-- Added
  ];

  const knownPatterns = [
    "/",
    "/rates",
    "/support",
    "/about-us",
    "/login",
    "/signup",
    "/users/:id",
    "/market",
    "/exchange",
    "/settings",
    "/resources", // <-- Added
  ];

  const is404 = !pathMatches(knownPatterns, currentPath);

  const shouldHideHeader = hideHeaderPaths.includes(currentPath);
  const shouldHideFooter = hideFooterPaths.includes(currentPath) || is404;

  return (
    <div className="w-full">
      {!shouldHideHeader && <Header />}
      <main>{children}</main>
      {!shouldHideFooter && <Footer />}
    </div>
  );
};

export default PageLayout;
