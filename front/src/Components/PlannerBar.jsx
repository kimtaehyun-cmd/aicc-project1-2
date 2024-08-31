import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';
import Additem from './Additem';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const PlannerBar = () => {
  const [patchTravelData, setPatchTravelData] = useState([]); // 여행 데이터를 저장할 상태
  const [visibleItems, setVisibleItems] = useState([]); // 필터링된 항목들을 저장할 상태
  const [selectedProject, setSelectedProject] = useState(null); // 선택된 프로젝트를 저장할 상태
  const isOpen = useSelector((state) => state.modal.isOpen); // 모달의 열림 상태 확인
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(null); // 에러 상태 관리
  const authData = useSelector((state) => state.auth.authData); // 인증 데이터 가져오기
  const { project_idx } = useParams(); // URL에서 project_idx를 가져옴

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 서버에서 모든 여행 데이터를 가져옵니다.
        const response = await axios.get(
          `http://localhost:8080/get_travel_data/${authData.user_idx}/${project_idx}`
        );
        console.log('Fetched data from server:', response.data);
        setPatchTravelData(response.data); // 가져온 데이터를 상태에 저장

        // project_idx에 해당하는 데이터만 필터링하여 표시합니다.
        const filteredItems = response.data.filter(
          (item) => item.project_idx === parseInt(project_idx)
        );
        setVisibleItems(filteredItems); // 필터링된 데이터를 visibleItems 상태에 저장
        setSelectedProject(parseInt(project_idx)); // 선택된 프로젝트 설정

        setLoading(false); // 로딩 상태 종료
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('데이터를 가져오는 데 문제가 발생했습니다.'); // 에러 메시지 설정
        setLoading(false); // 로딩 상태 종료
      }
    };

    if (authData && authData.user_idx) {
      fetchData(); // authData와 user_idx가 있는 경우 데이터 가져오기
    }
  }, [authData, project_idx]); // authData와 project_idx가 변경될 때마다 데이터를 가져옵니다.

  const handleSave = useCallback(
    async (newData) => {
      try {
        console.log('Saving data to server:', newData);
        await axios.patch('http://localhost:8080/patch_travel_data', newData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // 데이터를 업데이트한 후 필터링된 리스트를 갱신합니다.
        const updatedData = [...patchTravelData, newData];
        setPatchTravelData(updatedData);

        // 선택된 project_idx에 해당하는 데이터만 필터링하여 업데이트합니다.
        const filteredItems = updatedData.filter(
          (item) => item.project_idx === parseInt(project_idx)
        );
        setVisibleItems(filteredItems);
      } catch (error) {
        console.error('Error saving data:', error);
      }
    },
    [patchTravelData, project_idx]
  );

  const handleDelete = async (project_idx) => {
    console.log('Deleting project_idx:', project_idx);
    if (!project_idx) {
      console.error('Invalid project_idx:', project_idx);
      return;
    }

    const confirmDelete = window.confirm('정말로 이 항목을 삭제하시겠습니까?');
    if (confirmDelete) {
      try {
        await axios.delete(
          `http://localhost:8080/delete_travel_data/${authData.user_idx}/${project_idx}`
        );
        console.log('Deleted data from server:', project_idx);

        // 삭제된 항목을 UI에서 제거합니다.
        const updatedData = visibleItems.filter(
          (item) => item.project_idx !== project_idx
        );
        setPatchTravelData(updatedData);
        setVisibleItems(updatedData);
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    }
  };

  const handleDateSelect = (project_idx) => {
    setSelectedProject(project_idx);
  };

  return (
    <div className="flex h-full p-4">
      {/* 왼쪽 사이드 */}
      <div className="w-1/3 p-4 border-gray-300">
        <div className="bg-white p-4 rounded-lg shadow-custom ">
          <h2 className="text-xl font-bold mb-4">Travel Planner</h2>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <div className="mb-4">
              <div className="bg-[#e0f0ff] shadow-md p-2 rounded">
                <h3 className="text-lg font-semibold mb-2 text-center">
                  {loading
                    ? '로딩 중...' // 로딩 중일 때 메시지 표시
                    : error
                    ? error // 에러가 발생했을 때 에러 메시지 표시
                    : visibleItems.length > 0
                    ? visibleItems[0]?.project_title || '여행 제목 없음' // 필터링된 데이터가 있을 경우 제목 표시
                    : '여행 제목 없음'}
                </h3>
              </div>
              <div className="space-y-2 mt-4">
                {loading ? (
                  <p>로딩 중...</p> // 로딩 중일 때 메시지 표시
                ) : error || visibleItems.length === 0 ? (
                  <p>{error || '날짜 데이터 없음'}</p> // 에러 또는 데이터 없음 메시지 표시
                ) : (
                  visibleItems
                    .filter((item) => item.start_date && item.end_date) // 시작 날짜와 종료 날짜가 있는 항목 필터링
                    .map((item, index) => {
                      const startDate = new Date(
                        item.start_date
                      ).toLocaleDateString('ko-KR'); // 시작 날짜 포맷팅
                      const endDate = new Date(
                        item.end_date
                      ).toLocaleDateString('ko-KR'); // 종료 날짜 포맷팅

                      return (
                        <button
                          key={index}
                          className="bg-slate-400 text-center rounded-lg w-full p-2 hover:bg-slate-300"
                          onClick={() => handleDateSelect(item.project_idx)} // 버튼 클릭 시 프로젝트 선택
                        >
                          <p>{`여행 기간: ${startDate} ~ ${endDate}`}</p>
                        </button>
                      );
                    })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 오른쪽 사이드 */}
      <div className="w-2/3 border-l h-5/6 p-4">
        <div className="bg-white p-4 rounded-lg shadow-custom h-full flex flex-col justify-start ">
          <h2 className="mb-4 text-3xl font-bold text-center p-2 items-center justify-center flex">
            <p className=" w-1/4  border-b border-t border-black py-1">
              <div className=" border-b  border-t border-black py-2">
                여행 정보
              </div>
            </p>
            {isOpen && <Modal handleSave={handleSave} />}{' '}
            {/* 모달이 열려있을 때만 표시 */}
          </h2>
          {visibleItems.length > 0 && selectedProject !== null ? ( // 선택된 프로젝트가 있을 때 표시
            <div className="mt-4 flex flex-wrap justify-center items-center">
              {visibleItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 rounded-lg shadow-md mb-4 w-[30%] h-[25vh] flex flex-col justify-around mx-[1.66%] relative"
                >
                  {item.planner_img && (
                    <div className="w-full h-1/2 flex justify-center items-center">
                      <img
                        src={`http://localhost:8080/uploads/${item.planner_img}`}
                        alt="Planner"
                        className="object-cover rounded-md h-full w-full"
                      />
                    </div>
                  )}
                  <h3 className="text-left text-xl font-semibold flex-grow flex items-center">
                    {item.planner_title || '제목: 없음'}
                  </h3>
                  <p className="text-left text-lg flex-grow flex items-center">
                    {`날짜: ${
                      item.planner_date
                        ? new Date(item.planner_date).toLocaleString('ko-KR')
                        : '날짜 없음'
                    }`}
                  </p>
                  <p className="text-left text-lg flex-grow flex items-center">
                    {item.planner_description || '내용: 없음'}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="flex justify-center items-center flex-col mt-24">
                <div className="mt-0">
                  <Additem />{' '}
                  {/* 여행 정보가 없을 때 아이템 추가 컴포넌트 표시 */}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlannerBar;
