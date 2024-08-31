import React from 'react';
import { Link } from 'react-router-dom';
import { MdCardTravel, MdOutlinePersonPin, MdLogout } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { closeModal } from '../redux/slices/modalSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth.authData);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="Page_wrapper flex justify-between items-center p-4">
        <div className="Logo flex items-center">
          <Link to="/" className="flex items-center" onClick={handleCloseModal}>
            <MdCardTravel
              className="Logo_image_svg"
              style={{ color: 'rgba(66, 153, 225, .5)', fontSize: '2rem' }}
            />
            <div className="Logo_text ml-2 text-xl font-bold">
              My Travel Planner
            </div>
          </Link>
        </div>
        <div>
          {authData ? (
            <div className="Sign_box_container flex items-center space-x-4">
              <div className="flex items-center bg-slate-200 rounded-xl p-2">
                <MdOutlinePersonPin className="text-2xl" />
                <div className="ml-2 text-lg font-semibold">
                  {authData.name}님
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800"
              >
                <MdLogout className="text-2xl" />
              </button>
            </div>
          ) : (
            <div className="Sign_box_wrapper flex space-x-4">
              <Link
                to="/register"
                className="text-black hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-900 hover:text-white px-4 py-2 rounded"
              >
                회원가입
              </Link>
              <Link
                to="/login"
                className="text-black hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-900 hover:text-white px-4 py-2 rounded"
              >
                로그인
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
