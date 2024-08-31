import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa6';
import { useSelector } from 'react-redux';

const TravelProjectList = () => {
  const [getTravelData, setGetTravelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [toggle, setToggle] = useState(false);
  const authData = useSelector((state) => state.auth.authData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/get_project_data/${authData.user_idx}`
        );
        console.log('API Response:', response);
        setGetTravelData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('데이터를 가져오는 데 문제가 발생했습니다.');
        setLoading(false);
      }
    };

    if (authData && authData.user_idx) {
      fetchData();
    }
  }, [authData]);

  const toggleList = () => {
    setToggle(!toggle);
  };

  // Determine the number of projects to show based on the toggle state
  const displayedProjects = toggle ? getTravelData : getTravelData.slice(0, 5);

  return (
    <div className="flex p-4">
      {/* 왼쪽 사이드 */}
      <div className="w-1/3 p-4 border-r h-full border-gray-300">
        <div className="sidebar-wrapper h-full flex flex-col">
          <div className="project_side_bar_box bg-white p-4 rounded-lg shadow-custom h-full">
            <h2 className="text-xl font-bold mb-4">Travel Planner</h2>
            <div className="inner-sidebar-wrapper flex flex-col h-full">
              <div
                className={`Project_side_bar_wrapper bg-gray-100 p-3 rounded-lg shadow-md ${
                  isExpanded ? 'h-auto' : 'h-auto'
                }`}
              >
                <div className="Project_side_bar_container mb-2 flex-1">
                  {loading ? (
                    <div>로딩 중...</div>
                  ) : error ? (
                    <div>{error}</div>
                  ) : displayedProjects.length > 0 ? (
                    displayedProjects.map((project, index) => (
                      <Link
                        key={index}
                        to={`/planner/${project.project_idx}`}
                        className="Projuect_Link"
                      >
                        <div className="Project_sub_wrapper gap-4 flex flex-col m-3">
                          <div className="bg-[#e0f0ff] shadow-md p-2 rounded">
                            <h3 className="text-lg font-semibold m-1 text-center">
                              {project.project_title || '여행 제목 없음'}
                            </h3>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div>여행 제목 없음</div>
                  )}
                </div>
                <div className="bg-slate-300 p-1 m-2 rounded flex flex-col items-center shadow-md">
                  {toggle ? (
                    <FaCaretUp
                      className="cursor-pointer transition-transform ease-in-out transform hover:scale-125"
                      onClick={toggleList}
                    />
                  ) : (
                    <FaCaretDown
                      className="cursor-pointer transition-transform ease-in-out transform hover:scale-125"
                      onClick={toggleList}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelProjectList;
