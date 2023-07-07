import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useGetUserProfileQuery } from '../slices/userApiSlice';
import { FiUser, FiLogOut, FiSettings, FiHome } from 'react-icons/fi';
import { useLogoutMutation } from '../slices/userApiSlice';
import { clearCredentials } from '../slices/authSlice';
import { FiMenu } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  const [logout] = useLogoutMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      dispatch(clearCredentials());
      localStorage.removeItem('userInfo');
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold text-white logo">Logo</span>
            <span className="hidden lg:inline-block text-lg ml-2 text-white company-name">Company Name</span>
          </div>
          <div className="-mr-2 flex items-center lg:hidden">
       



          <span
  onClick={handleToggle}
  className="inline-flex items-center justify-center p-2  text-white hover:text-white transition duration-150 ease-in-out"
  aria-expanded={isOpen ? 'true' : 'false'}
>
  <FiMenu className="block h-6 w-6  ml-4" />
</span>


          </div>
          <div className="hidden lg:flex lg:items-center">
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="text-white hover:text-blue-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
            </div>
            {userInfo ? (
              <div className="ml-4 relative flex-shrink-0 z-50">
                <button
                  className="flex text-white items-center hover:text-blue-300 px-3 py-2 rounded-md text-sm font-medium focus:outline-none border-none"
                  onClick={handleToggle}
                  aria-expanded={isOpen ? 'true' : 'false'}
                >
                  <FiUser className="" />
                  <span className="ml-1">{userInfo.name}</span>
                  <svg
                    className="ml-1 h-5 w-5 transform -rotate-90 transition duration-150 ease-in-out"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {isOpen && (
                  <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-50 user-dropdown">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FiSettings className="mr-2" />
                      Profile
                    </Link>
                    <button
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FiLogOut className="mr-2" />
                      Dashboard
                    </button>
                    <button
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={logoutHandler}
                    >
                      <FiLogOut className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="ml-4">
                <Link
                  to="/login"
                  className="text-white hover:text-blue-300 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="ml-4 text-white hover:text-blue-300 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3">
            <Link
              to="/"
              className="text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            {userInfo ? (
              <>
                <Link
                  to="/profile"
                  className="text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Profile
                </Link>
                <div
                  className="text-white block px-3 py-2 text-base rounded-md font-medium"
                  onClick={logoutHandler}
                >
                  Logout
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
