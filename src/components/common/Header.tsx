import React, { useState, useEffect, useRef } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { RiCloseFill } from "react-icons/ri";
import { useLocation, Link } from "react-router-dom";
import logo from "../../assets/img/logo-white.png";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  isActive: boolean;
  onClick?: () => void;
}

interface MobileNavLinkProps extends NavLinkProps {}

const Header: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const splitLocation = pathname.split("/");

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    updateHeaderHeight();

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      updateHeaderHeight();
    };

    const handleResize = () => {
      updateHeaderHeight();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isActiveRoute = (routePath: string = "/") => {
    if (routePath === "/" && (splitLocation[1] === "" || !splitLocation[1]))
      return true;
    return splitLocation[1] === routePath.replace("/", "");
  };

  const navItems = [
    { name: "Home", to: "/" },
    { name: "Rates", to: "/rates" },
    { name: "About Us", to: "/about-us" },
    { name: "Support", to: "/support" },
  ];

  const handleNavClick = () => {
    setOpen(false);
  };

  return (
    <>
      {/* Background Pattern - only visible when scrolled */}
      {scrolled && (
        <div className="fixed inset-0 opacity-5 pointer-events-none z-40">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FEFD0C]/10 via-transparent to-[#FEFD0C]/10"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FEFD0C]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FEFD0C]/5 rounded-full blur-3xl"></div>
        </div>
      )}

      <header
        ref={headerRef}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/60 backdrop-blur-xl border-b border-[#FEFD0C]/10 shadow-2xl shadow-black/50 md:py-3 py-2"
            : "bg-black md:py-6 py-4"
        }`}
        style={{
          fontFamily:
            'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
        }}
      >
        <div className="flex items-center justify-between xl:px-24 px-4 mx-auto w-full">
          <Link to="/" className="flex items-center cursor-pointer group">
            <div className="relative">
              <img
                src={logo}
                className="w-[180px] h-[50px] object-contain transition-all duration-300 group-hover:scale-105"
                alt="Logo"
              />
              {/* Subtle glow effect on hover */}
              <div className="absolute inset-0 bg-[#FEFD0C]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <div
            className={`h-12 w-12 xl:hidden flex items-center justify-center rounded-xl cursor-pointer transition-all duration-300 backdrop-blur-md border shadow-lg ${
              open
                ? "bg-[#FEFD0C]/90 text-black border-[#FEFD0C]/30 shadow-[#FEFD0C]/20 scale-110"
                : "bg-[#FEFD0C]/10 text-[#FEFD0C] border-[#FEFD0C]/20 hover:bg-[#FEFD0C]/20 hover:border-[#FEFD0C]/40 hover:scale-105"
            }`}
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? (
              <RiCloseFill className="text-2xl transition-transform duration-300" />
            ) : (
              <HiMenuAlt4 className="text-2xl transition-transform duration-300" />
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="xl:flex hidden items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                isActive={isActiveRoute(item.to)}
              >
                {item.name}
              </NavLink>
            ))}

            <Link to="/login" className="group">
              <div className="bg-gradient-to-r from-[#FEFD0C] to-[#FEFD0C]/90 px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#FEFD0C]/20 hover:scale-105 backdrop-blur-md border border-[#FEFD0C]/20">
                <span
                  className="text-black text-base font-semibold group-hover:text-gray-900 transition-colors duration-300"
                  style={{
                    fontFamily:
                      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
                  }}
                >
                  Let&apos;s trade
                </span>
              </div>
            </Link>
          </nav>
        </div>
      </header>

      {/* Mobile Navigation */}
      {open && (
        <div className="fixed top-0 left-0 w-full h-screen z-40 transition-all duration-500">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FEFD0C]/20 via-transparent to-[#FEFD0C]/20"></div>
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FEFD0C]/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FEFD0C]/10 rounded-full blur-3xl"></div>
            </div>
          </div>

          {/* Navigation Content */}
          <div className="relative z-10 flex flex-col justify-center items-center gap-8 px-4 h-full">
            <div className="bg-black/60 backdrop-blur-xl border border-[#FEFD0C]/10 rounded-3xl p-8 shadow-2xl shadow-black/50 w-full max-w-md">
              <div className="space-y-6">
                {navItems.map((item) => (
                  <MobileNavLink
                    key={item.to}
                    to={item.to}
                    isActive={isActiveRoute(item.to)}
                    onClick={handleNavClick}
                  >
                    {item.name}
                  </MobileNavLink>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-[#FEFD0C]/10">
                <Link
                  to="/login"
                  onClick={handleNavClick}
                  className="block group"
                >
                  <div className="bg-gradient-to-r from-[#FEFD0C] to-[#FEFD0C]/90 px-8 py-4 rounded-xl hover:shadow-lg hover:shadow-[#FEFD0C]/20 transition-all duration-300 text-center group-hover:scale-105">
                    <span
                      className="text-black text-lg font-semibold group-hover:text-gray-900 transition-colors duration-300"
                      style={{
                        fontFamily:
                          'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
                      }}
                    >
                      Let&apos;s trade
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer to offset fixed header height */}
      <div style={{ height: open ? 0 : headerHeight }}></div>
    </>
  );
};

const NavLink: React.FC<NavLinkProps> = ({ to, children, isActive, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="group relative"
    aria-current={isActive ? "page" : undefined}
  >
    <h3
      className={`text-lg font-medium transition-all duration-300 ${
        isActive
          ? "text-[#FEFD0C] drop-shadow-sm"
          : "text-white group-hover:text-[#FEFD0C] group-hover:drop-shadow-sm"
      }`}
      style={{
        fontFamily:
          'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
      }}
    >
      {children}
    </h3>
    <span
      className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#FEFD0C] to-[#FEFD0C]/50 transition-all duration-300 shadow-sm shadow-[#FEFD0C]/20 ${
        isActive ? "w-full" : "w-0"
      }`}
    />
  </Link>
);

const MobileNavLink: React.FC<MobileNavLinkProps> = ({
  to,
  children,
  isActive,
  onClick,
}) => (
  <Link
    to={to}
    onClick={onClick}
    className="block group"
    aria-current={isActive ? "page" : undefined}
  >
    <div
      className={`relative overflow-hidden py-3 px-4 rounded-xl transition-all duration-300 ${
        isActive
          ? "bg-[#FEFD0C]/10 border border-[#FEFD0C]/20"
          : "hover:bg-[#FEFD0C]/5 border border-transparent hover:border-[#FEFD0C]/10"
      }`}
    >
      <h3
        className={`text-xl font-medium transition-colors duration-300 ${
          isActive ? "text-[#FEFD0C]" : "text-white group-hover:text-[#FEFD0C]"
        }`}
        style={{
          fontFamily:
            'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
        }}
      >
        {children}
      </h3>
      <span
        className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-[#FEFD0C] to-[#FEFD0C]/50 transition-all duration-300 shadow-sm shadow-[#FEFD0C]/20 ${
          isActive ? "w-1/2" : "w-0"
        }`}
      />
    </div>
  </Link>
);

export default Header;