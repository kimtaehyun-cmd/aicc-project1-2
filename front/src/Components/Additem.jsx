import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../redux/slices/modalSlice';
import { GoPlusCircle } from 'react-icons/go';

const Additem = () => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal({ modalType: 'create', project: null }));
  };

  return (
    <div className="flex p-2">
      {/* h-screen을 제거하고, 상위 요소의 높이를 줄여 더 위로 배치 */}
      <div className="w-full px-2">
        <div className="Additem_wrapper w-full h-auto p-[0.25rem]">
          <div className="Additem_container w-full h-full flex items-center justify-center mt-0 rounded-md text-4xl font-semibold">
            <button
              className="flex items-center gap-x-2 group"
              onClick={handleOpenModal}
            >
              <div className="border border-gray-500 rounded-md flex gap-2 p-3 mt-10">
                <GoPlusCircle />
                여행 목록 추가하기
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Additem;
