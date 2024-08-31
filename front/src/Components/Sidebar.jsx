import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="Sidebar_container w-2/5 mr-1 flex flex-col justify-between">
      <div className="Introduce p-1 h-1/3">
        <p className="Introduce_wrapper text-center border-2 border-white m-1 p-3 flex flex-col">
          <span className="Introduce_title text-5xl m-2 border-2 border-white mt-16 p-1 font-bold font-gothicA1">
            My Travel Planner
          </span>
          <br />
          <span className="Introduce_text text-3xl m-2 border-2 border-white mt-2 p-1 font-gothicA1 font-semibold">
            소중한 추억을 계획해 보세요 !!
          </span>
        </p>
      </div>
      <div className="Sub_link_container m-1 h-1/2 flex flex-col items-center">
        <div className="Sub_link_wrapper flex flex-col justify-center items-center space-y-4 w-2/3">
          <div className="map p-2 text-xl w-full text-center bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
            <Link
              to="/map"
              className="w-full block h-full text-inherit no-underline text-white"
            >
              여행지도
            </Link>
          </div>
          <div className="planner p-2 text-xl w-full text-center bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
            <Link
              to="/calendarpage"
              className="w-full block h-full text-inherit no-underline text-white"
            >
              여행 계획하기
            </Link>
          </div>
          <div className="project p-2 text-xl w-full text-center bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
            <Link
              to="/travelproject"
              className="w-full block h-full text-inherit no-underline text-white"
            >
              여행 목록 보기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
