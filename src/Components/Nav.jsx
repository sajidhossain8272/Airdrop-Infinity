// src/Components/Nav.jsx
import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaReadme, FaFire, FaInfinity, FaHome } from "react-icons/fa";

const navLinks = [
  {
    to: "/",
    label: "Home",
    icon: <FaHome className="inline-block mr-2 text-lg" />,
  },
  {
    to: "/listed-airdrop",
    label: "Infinity Airdrops",
    icon: <FaInfinity className="inline-block mr-2 text-lg" />,
  },
  {
    to: "/blog",
    label: "Infinity Academy",
    icon: <FaReadme className="inline-block mr-2 text-lg" />,
  },
  {
    to: "/infinity-drop",
    label: "Infinity Drop",
    icon: <FaFire className="inline-block mr-2 text-lg" />,
  },
];

const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu on outside click
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isMobileMenuOpen]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="sticky top-0 bg-base-100 z-50 shadow-sm bg-gradient-to-r from-blue-900/5 via-purple-700/5 to-pink-600/5">
      <div className="navbar lg:pl-40 lg:pr-40 px-4">
        {/* Mobile Menu Button */}
        <div className="navbar-start">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="btn btn-ghost lg:hidden"
            aria-label="Open mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            onClick={closeMobileMenu}
          >
            <span className="lato-bold lg:text-4xl text-xl">Airdrop</span>
            <img
              className="w-16"
              src="/Logo-t-2.png"
              alt="Airdrop Infinity Logo"
              width={100}
              height={100}
              loading="eager"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2 px-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `btn btn-ghost text-lg ${isActive ? "bg-black text-white" : ""}`
                  }
                >
                  {link.icon}
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section (optional) */}
        <div className="navbar-end pr-4"></div>
      </div>

      {/* Fullscreen Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[999] bg-black/70 flex items-start justify-end lg:hidden transition-all"
          aria-modal="true"
          role="dialog"
        >
          <div
            ref={menuRef}
            className="w-full h-full bg-base-100 flex flex-col pt-8 px-6 animate-slide-in"
          >
            <div className="flex justify-between items-center mb-8">
              <Link
                to="/"
                className="flex items-center gap-2"
                onClick={closeMobileMenu}
              >
                <span className="lato-bold text-2xl">Airdrop</span>
                <img
                  className="w-12"
                  src="/Logo-t-2.png"
                  alt="Airdrop Infinity Logo"
                  width={60}
                  height={60}
                  loading="eager"
                />
              </Link>
              <button
                onClick={closeMobileMenu}
                className="btn btn-ghost text-2xl"
                aria-label="Close mobile menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `flex items-center text-xl px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-black text-white"
                          : "hover:bg-gray-100 text-gray-900"
                      }`
                    }
                    onClick={closeMobileMenu}
                  >
                    {link.icon}
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Animation for mobile menu */}
      <style>
        {`
          @keyframes slide-in {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          .animate-slide-in {
            animation: slide-in 0.25s cubic-bezier(0.4,0,0.2,1);
          }
        `}
      </style>
    </nav>
  );
};

export default Nav;
