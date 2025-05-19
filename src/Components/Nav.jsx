// src/Components/Nav.jsx
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaReadme, FaFire, FaInfinity } from "react-icons/fa";

const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="sticky top-0 bg-base-100 z-50 shadow-sm bg-gradient-to-r from-blue-900/5 via-purple-700/5 to-pink-600/5">
      <div className="navbar lg:pl-40 lg:pr-40 px-4">
        {/* Mobile Menu */}
        <div className="navbar-start">
          <div className="dropdown">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="btn btn-ghost lg:hidden"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
            
            <ul
              className={`menu menu-sm dropdown-content mt-3 p-2 shadow-lg bg-base-100 rounded-box w-52 ${
                isMobileMenuOpen ? "block" : "hidden"
              }`}
            >
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `text-lg ${isActive ? "bg-black text-white" : "hover:bg-gray-100"}`
                  }
                  onClick={closeMobileMenu}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/listed-airdrop"
                  className={({ isActive }) =>
                    `text-lg ${isActive ? "bg-black text-white" : "hover:bg-gray-100"}`
                  }
                  onClick={closeMobileMenu}
                >
                  <FaInfinity className="inline-block mr-1 text-lg" />
                  Infinity Airdrops
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/blog"
                  className={({ isActive }) =>
                    `text-lg ${isActive ? "bg-black text-white" : "hover:bg-gray-100"}`
                  }
                  onClick={closeMobileMenu}
                >
                  Infinity Knowledge <FaReadme className="inline-block ml-1 text-lg" />
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/infinity-drop"
                  className={({ isActive }) =>
                    `text-lg ${isActive ? "bg-black text-white" : "hover:bg-gray-100"}`
                  }
                  onClick={closeMobileMenu}
                >
                  Infinity Drop <FaFire className="inline-block ml-1 text-lg" />
                </NavLink>
              </li>
            </ul>
          </div>

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
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `btn btn-ghost text-lg ${isActive ? "bg-black text-white" : ""}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/listed-airdrop"
                className={({ isActive }) =>
                  `btn btn-ghost text-lg ${isActive ? "bg-black text-white" : ""}`
                }
              >
                <FaInfinity className="inline-block mr-1 text-lg" />
                Infinity Airdrops
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  `btn btn-ghost text-lg ${isActive ? "bg-black text-white" : ""}`
                }
              >
                Infinity Knowledge <FaReadme className="inline-block ml-1 text-lg" />
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/infinity-drop"
                className={({ isActive }) =>
                  `btn btn-ghost text-lg ${isActive ? "bg-black text-white" : ""}`
                }
              >
                Infinity Drop <FaFire className="inline-block ml-1 text-lg" />
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Right Section (optional) */}
        <div className="navbar-end pr-4">
          {/* Add any additional controls here */}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
