import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../redux/slices/modalSlice';
import axios from 'axios';

const Modal = ({ handleSave }) => {
  console.log('Received handleSave:', handleSave);
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isOpen);
  const { modalType, task } = useSelector((state) => state.modal);

  const [planner_data, setPlanner_data] = useState({
    project_idx: task?.project_idx || 3,
    planner_date: task?.planner_date || new Date().toISOString().slice(0, 16),
    planner_title: task?.planner_title || '',
    planner_description: task?.planner_description || '',
    planner_img: task?.planner_img || '',
  });

  const [imagePreview, setImagePreview] = useState(
    task?.planner_img
      ? `http://localhost:8080/uploads/${task.planner_img}`
      : null
  );

  useEffect(() => {
    if (modalType === 'update' && task) {
      setPlanner_data({
        project_idx: task.project_idx || 3,
        planner_date:
          task.planner_date || new Date().toISOString().slice(0, 16),
        planner_title: task.planner_title || '',
        planner_description: task.planner_description || '',
        planner_img: task.planner_img || '',
      });
      setImagePreview(
        task.planner_img
          ? `http://localhost:8080/uploads/${task.planner_img}`
          : null
      );
    } else {
      setPlanner_data({
        project_idx: 3,
        planner_date: new Date().toISOString().slice(0, 16),
        planner_title: '',
        planner_description: '',
        planner_img: '',
      });
      setImagePreview(null);
    }
  }, [modalType, task]);

  // 모달 닫기
  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  // 날짜 변경 처리
  const handlePlanner_dateChange = (event) => {
    setPlanner_data({
      ...planner_data,
      planner_date: event.target.value,
    });
  };

  // 제목 및 설명 변경 처리
  const handleChange = (event) => {
    const { name, value } = event.target;
    setPlanner_data((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPlanner_data({
        ...planner_data,
        planner_img: file,
      });
      setImagePreview(URL.createObjectURL(file)); // 이미지 미리보기 URL 생성
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('project_idx', planner_data.project_idx);
      formData.append('planner_date', planner_data.planner_date);
      formData.append('planner_title', planner_data.planner_title);
      formData.append('planner_description', planner_data.planner_description);
      formData.append('planner_img', planner_data.planner_img);

      const response = await axios.patch(
        'http://localhost:8080/patch_travel_data',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        const savedData = {
          ...planner_data,
          planner_img: planner_data.planner_img
            ? planner_data.planner_img.name
            : null,
        };
        handleSave(savedData); // 새로운 데이터를 PlannerBar로 전달
        handleCloseModal(); // 모달 닫기
      } else {
        console.error('데이터 저장 오류:', response.status);
      }
    } catch (error) {
      console.error('데이터 저장 오류:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="Modal_page fixed flex w-custom-w h-custom-h items-center justify-center z-50 p-1 left-64 top-20 m-1">
      <div className="Modal_wrapper w-2/3 h-full bg-slate-300 rounded-md">
        <div className="Modal_container h-full flex flex-col px-3 py-2 gap-3">
          <div className="close_box flex justify-end">
            <IoMdClose onClick={handleCloseModal} className="cursor-pointer" />
          </div>
          <div className="location bg-slate-100 w-full h-1/6 border-2 flex justify-center items-center">
            <div className="input-control h-full w-full">
              <label htmlFor="planner_title " className="sr-only">
                프로젝트 제목을 입력해주세요
              </label>
              <input
                type="text"
                id="planner_title"
                name="planner_title"
                placeholder="프로젝트 제목을 입력해주세요..."
                className="w-full h-full rounded px-2 bg-slate-100"
                value={planner_data.planner_title}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* <div className="date bg-slate-100 w-full h-1/6 border-2 flex justify-center items-center">
            <div className="input-control w-full h-full flex items-center justify-center">
              <label htmlFor="planner_date" className="sr-only">
                날짜를 입력해주세요
              </label>
              <input
                type="datetime-local"
                id="planner_date"
                name="planner_date"
                className="w-full h-full border border-gray-300 rounded-md"
                value={planner_data.planner_date}
                onChange={handlePlanner_dateChange}
              />
            </div>
          </div> */}

          <div className="content h-1/2 flex border-2 gap-1">
            <div className="photo_wrapper bg-slate-100 w-3/5 h-full flex items-center justify-center relative">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <span className="text-gray-500">사진 넣기</span>
              )}
              <input
                type="file"
                id="planner_img"
                name="planner_img"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            <div className="text bg-slate-100 w-2/5 h-full border-2 flex justify-center items-center">
              <div className="input-control w-full h-full">
                <label htmlFor="planner_description" className="sr-only">
                  내용을 입력해주세요
                </label>
                <input
                  type="text"
                  id="planner_description"
                  name="planner_description"
                  placeholder="내용을 입력해주세요..."
                  className="w-full h-full bg-slate-100 rounded px-2"
                  value={planner_data.planner_description}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="date bg-slate-100 w-full h-1/6 border-2 flex justify-center items-center">
            <div className="input-control w-full h-full flex items-center justify-center">
              <label htmlFor="planner_date" className="sr-only">
                날짜를 입력해주세요
              </label>
              <input
                type="datetime-local"
                id="planner_date"
                name="planner_date"
                className="w-full h-full bg-slate-100 rounded-md"
                value={planner_data.planner_date}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="Save_button_container flex justify-end">
            <div className="Save_button_wrapper rounded-md flex justify-end items-center py-1 px-10 m-1 gap-2 w-1/5 h-1/12 ">
              <button
                type="submit"
                onClick={handleSubmit}
                className="p-2 bg-customTeal text-xl text-black rounded-md hover:bg-blue-500 hover:text-gray-200 font-bold w-full"
              >
                {modalType === 'update' ? '할일 수정하기' : '할일 추가하기'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
