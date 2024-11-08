import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <div className="navbar bg-base-100 lato-regular lg:pl-40 lg:pr-40 pr-">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-2xl"
            >
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "btn btn-ghost text-lg bg-black text-white"
                    : "btn btn-ghost text-lg"
                }
              >
                Home
              </NavLink>
              <li>
                <a className="text-lg">Airdrops</a>
                <ul className="p-2">
                  <li><a className="text-md">Featured Airdrops</a></li>
                  <li><a className="text-md">New Airdrops</a></li>
                  <li><a className="text-md">Exchange Airdrops</a></li>
                  <li><a className="text-md">Telegram Mini Airdrops</a></li>
                </ul>
              </li>
              <li><a>Blogs</a></li>
            </ul>
          </div>
          <a className="btn btn-ghost lato-bold lg:text-4xl text-xl hover:bg-none">Airdrop</a>
          <img className="w-16" width="100" src="./Logo-t-2.png" alt="" />
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "btn btn-ghost text-lg bg-black text-white"
                  : "btn btn-ghost text-lg"
              }
            >
              Home
            </NavLink>
            <li>
              <details className="pl-20 pr-20">
                <summary className="text-lg">Airdrops</summary>
                <ul className="p-2">
                  <li><a className="text-md">Featured Airdrops</a></li>
                  <li><a className="text-md">New Airdrops</a></li>
                  <li><a className="text-md">Exchange Airdrops</a></li>
                  <li><a className="text-md">Telegram Mini Airdrops</a></li>
                </ul>
              </details>
            </li>
            <NavLink
              to="/blogs"
              className={({ isActive }) =>
                isActive
                  ? "btn btn-ghost text-lg bg-black text-white"
                  : "btn btn-ghost text-lg"
              }
            >
              Blogs
            </NavLink>
          </ul>
        </div>

        <div className="navbar-end">
          <a className="btn text-white bg-gradient-to-r from-blue-900 via-purple-700 to-pink-600">
            Subscribe
          </a>
        </div>
      </div>
    </div>
  );
};

export default Nav;
