import { useState } from "react";
import { NavLink } from "react-router-dom";
import { signInWithGoogle } from "../firebase"; // Ensure correct import path

const Nav = () => {
  const [user, setUser] = useState(null); // State to store user info

  const handleSignIn = async () => {
    try {
      const signedInUser = await signInWithGoogle();
      if (signedInUser) {
        setUser(signedInUser); // Update the user state
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div>
      <div className='navbar bg-base-100 lato-regular lg:pl-40 lg:pr-40'>
        {/* Navbar Start */}
        <div className='navbar-start'>
          <div className='dropdown'>
            <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h8m-8 6h16'
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-2xl'
            >
              <NavLink
                to='/'
                className={({ isActive }) =>
                  isActive
                    ? "btn btn-ghost text-lg bg-black text-white"
                    : "btn btn-ghost text-lg"
                }
              >
                Home
              </NavLink>
              {/* <li>
                <a className="text-lg">Airdrops</a>
                <ul className="p-2">
                  <li>
                    <NavLink to="/construction" className="text-md">
                      Featured Airdrops
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/construction" className="text-md">
                      New Airdrops
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/construction" className="text-md">
                      Exchange Airdrops
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/construction" className="text-md">
                      Telegram Mini Airdrops
                    </NavLink>
                  </li>
                </ul>
              </li> */}
              <a
                href='https://medium.com/@airdropinfinity'
                target='_blank'
                rel='noopener noreferrer'
                className='btn btn-ghost text-lg'
              >
                Blogs
              </a>{" "}
              <NavLink
                to='/InfinityDrop'
                className={({ isActive }) =>
                  isActive
                    ? "btn btn-ghost text-lg bg-black text-white"
                    : "btn btn-ghost text-lg"
                }
              >
                Infinity Drop 🔥
              </NavLink>{" "}
            </ul>
          </div>
          <a className='lato-bold lg:text-4xl text-xl hover:cursor-none pr-2'>
            Airdrop
          </a>
          <img
            className='w-16 pt-1'
            width='100'
            src='/Logo-t-2.png'
            alt='Logo'
          />
        </div>

        {/* Navbar Center */}
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal px-1 gap-2'>
            <NavLink
              to='/'
              className={({ isActive }) =>
                isActive
                  ? "btn btn-ghost text-lg bg-black text-white"
                  : "btn btn-ghost text-lg"
              }
            >
              Home
            </NavLink>
            {/* <li>
              <details className="pl-20 pr-20">
                <summary className="text-lg">Airdrops</summary>
                <ul className="p-2">
                  <li>
                    <NavLink to="/construction" className="text-md">
                      Featured Airdrops
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/construction" className="text-md">
                      New Airdrops
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/construction" className="text-md">
                      Exchange Airdrops
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/construction" className="text-md">
                      Telegram Mini Airdrops
                    </NavLink>
                  </li>
                </ul>
              </details>
            </li> */}
            <a
              href='https://medium.com/@airdropinfinity'
              target='_blank'
              rel='noopener noreferrer'
              className='btn btn-ghost text-lg'
            >
              Blogs
            </a>
            <NavLink
              to='/InfinityDrop'
              className={({ isActive }) =>
                isActive
                  ? "btn btn-ghost text-lg bg-black text-white"
                  : "btn btn-ghost text-lg"
              }
            >
              Infinity Drop 🔥
            </NavLink>{" "}
          </ul>
        </div>

        {/* Navbar End */}
        <div className='navbar-end'>
          {!user ? (
            <button
              onClick={handleSignIn}
              className='btn text-white bg-gradient-to-r from-blue-900 via-purple-700 to-pink-600'
            >
              Subscribe
            </button>
          ) : (
            <p className='lg:text-lg lg: lato-bold text-sm navbar-end'>
              <span className='lato-black pr-1'>Welcome:</span>
              <span className='user-text'>{user.displayName}! </span>
            </p>
          )}
        </div>
      </div>

      <hr className='h-2 bg-gradient-to-r from-blue-900 via-purple-700 to-pink-600 rounded-lg mx-auto' />
    </div>
  );
};

export default Nav;
