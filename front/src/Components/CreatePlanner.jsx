import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Navbar from './Navbar';

const Createplanner = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅
  const authData = useSelector((state) => state.auth.authData); // Redux에서 인증 데이터를 가져옴
  const [projectTitle, setProjectTitle] = useState(''); // 프로젝트 제목을 저장하는 상태
  const [startDate, setStartDate] = useState(''); // 시작 날짜를 저장하는 상태
  const [endDate, setEndDate] = useState(''); // 종료 날짜를 저장하는 상태
  const [projectIdx, setProjectIdx] = useState(''); // 프로젝트의 고유 식별자(project_idx)를 저장할 상태

  // 1. 컴포넌트가 마운트될 때, 서버에서 달력 데이터를 가져옴
  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        // 사용자의 user_idx로 서버에서 달력 데이터를 가져옴
        const response = await axios.get(
          `http://localhost:8080/get_calendar_date/${authData.user_idx}`
        );
        if (response.data && response.data.length > 0) {
          const { project_idx, start_date, end_date } = response.data[0];
          setProjectIdx(project_idx); // 프로젝트의 고유 식별자를 상태로 저장
          setStartDate(subtractOneDay(start_date) || ''); // 시작 날짜를 하루 줄여서 저장
          setEndDate(subtractOneDay(end_date) || ''); // 종료 날짜를 하루 줄여서 저장
        }
      } catch (error) {
        console.error('Error fetching calendar data:', error); // 에러 발생 시 콘솔에 출력
      }
    };

    fetchCalendarData(); // 컴포넌트가 마운트될 때 데이터 가져오기 실행
  }, [authData.user_idx]);

  // 날짜를 하루 줄이는 함수 (백엔드에서 받은 날짜를 조정)
  const subtractOneDay = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 1); // 날짜를 하루 줄임
    return date.toISOString().split('T')[0]; // 'YYYY-MM-DD' 형식으로 반환
  };

  // 2. "저장" 버튼 클릭 시, project_idx와 함께 데이터를 백엔드로 전송
  const handleSave = async () => {
    if (!projectIdx) {
      console.error('프로젝트가 생성되지 않았습니다');
      return; // projectIdx가 없는 경우 에러 출력하고 함수 종료
    }

    try {
      // 프로젝트 제목을 서버에 PATCH 요청으로 업데이트
      await axios.patch('http://localhost:8080/update_planner_title', {
        project_idx: projectIdx,
        project_title: projectTitle,
        start_date: startDate,
        end_date: endDate,
      });
      // navigate(`/planner/${projectIdx}`);
      navigate('/planner'); // 성공적으로 저장되면 플래너 페이지로 이동
    } catch (error) {
      console.error('Error updating project:', error); // 에러 발생 시 콘솔에 출력
    }
  };

  const handleChange = (e) => {
    setProjectTitle(e.target.value); // 입력된 제목을 상태로 저장
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === 'startDate') {
      setStartDate(value); // 시작 날짜를 상태로 저장
    } else if (name === 'endDate') {
      setEndDate(value); // 종료 날짜를 상태로 저장
    }
  };

  return (
    <div>
      <div className="Page_Wrapper flex flex-col h-screen bg-white">
        <div className="Page_container flex flex-col h-full">
          <Navbar /> {/* 상단 네비게이션 바 */}
          <div className="flex flex-1">
            <Sidebar /> {/* 좌측 사이드바 */}
            <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center focus:outline-none z-50">
              <div className="w-[50%] h-[60%] rounded-md">
                <div className="input-wrapper bg-slate-300 shadow-lg rounded-md flex flex-col w-full h-full items-center gap-1">
                  <div className="top w-full h-10 text-center p-8 font-bold text-2xl">
                    My Travel Planner {/* 타이틀 */}
                  </div>
                  <div className="middle h-5/6 flex w-full ml-14 mt-10">
                    <div className="left flex flex-col w-1/4 items-center justify-evenly">
                      <div className=" bg-slate-300 w-2/3 rounded-md text-2xl font-bold text-center">
                        제목 {/* 제목 입력 라벨 */}
                      </div>
                      <div className="bg-slate-300 w-2/3 rounded-md text-2xl font-bold text-center">
                        시작 날짜 {/* 시작 날짜 입력 라벨 */}
                      </div>
                      <div className="bg-slate-300 w-2/3 rounded-md text-2xl font-bold text-center">
                        마지막 날짜 {/* 마지막 날짜 입력 라벨 */}
                      </div>
                    </div>
                    <div className="right flex flex-col w-3/4 items-center justify-evenly">
                      <label
                        htmlFor="projectTitle"
                        className="bg-slate-200 w-3/4"
                      >
                        <input
                          type="text"
                          id="projectTitle"
                          name="projectTitle"
                          placeholder="장소를 입력해주세요"
                          value={projectTitle} // 입력된 제목을 상태에서 가져옴
                          onChange={handleChange} // 제목 입력 시 상태 업데이트
                          className="Logo_text bg-slate-200 w-full rounded-md text-black input-placeholder p-3"
                        />
                      </label>
                      <label htmlFor="startDate" className="bg-slate-200 w-3/4">
                        <input
                          type="date"
                          id="startDate"
                          name="startDate"
                          value={startDate} // 선택된 시작 날짜를 상태에서 가져옴
                          onChange={handleDateChange} // 시작 날짜 변경 시 상태 업데이트
                          className="Logo_text bg-slate-200 w-full rounded-md p-3"
                        />
                      </label>
                      <label htmlFor="endDate" className="bg-slate-200 w-3/4">
                        <input
                          type="date"
                          id="endDate"
                          name="endDate"
                          value={endDate} // 선택된 종료 날짜를 상태에서 가져옴
                          onChange={handleDateChange} // 종료 날짜 변경 시 상태 업데이트
                          className="Logo_text bg-slate-200 w-full rounded-md p-3"
                        />
                      </label>
                    </div>
                  </div>
                  <form className="w-full h-1/6 Logo_text flex flex-col justify-between">
                    <div className="sub-btn h-full flex justify-end pt-4 p-6">
                      <button
                        onClick={handleSave} // 버튼 클릭 시 저장 함수 실행
                        type="button"
                        className="flex justify-end Sign_up p-3 pt-4 rounded-md shadow-md"
                      >
                        여행 플래너 생성 {/* 버튼 텍스트 */}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer /> {/* 하단 푸터 */}
    </div>
  );
};

export default Createplanner;
