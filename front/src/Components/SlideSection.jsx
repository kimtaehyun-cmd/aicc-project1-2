import React, { useState } from 'react';

const SlideSection = () => {
  const images = [
    {
      src: require('../assets/slideImg3.jpg'),
      description:
        '서울 북촌 한옥마을에서 한국 전통 건축의 아름다움과 고즈넉한 분위기를 만끽하세요. 현대와 과거가 조화를 이루는 이곳에서 특별한 문화 체험을 즐겨보세요 !',
      title: '서울 북촌 한옥마을',
    },
    {
      src: require('../assets/slideImg2.jpg'),
      description:
        '한라산의 겨울은 눈 덮인 설경과 상고대가 어우러져 마치 동화 속 풍경을 연상케 합니다. 순백의 자연 속에서 제주도의 특별한 겨울을 경험해보세요 !',
      title: '한라산의 겨울',
    },
    {
      src: require('../assets/slideImg1.jpg'),
      description:
        '동궁과 월지는 고대 신라의 화려한 궁궐과 아름다운 연못이 어우러진 야경 명소입니다. 밤하늘 아래 빛나는 환상적인 경관 속에서 신라의 역사를 느껴보세요 !',
      title: '동궁과 월지의 야경',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('');

  const handleNext = () => {
    if (isAnimating) return;
    setDirection('next');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setIsAnimating(false);
    }, 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setDirection('prev');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div className="SlideSection_container flex flex-col items-center mt-10 relative">
      <div className="SlideSection_wrapper relative flex w-4/5 h-[90%] mb-10 overflow-visible">
        <div
          className={`w-[50%] transition-transform duration-500 ease-in-out transform ${
            isAnimating
              ? direction === 'next'
                ? 'translate-x-[-100%]'
                : 'translate-x-[100%]'
              : 'translate-x-0'
          }`}
        >
          <img
            src={images[currentIndex].src}
            alt="Slide"
            className="w-full h-full object-cover rounded-md"
            style={{ aspectRatio: '16/9' }}
          />
        </div>
        <div
          className={`w-[50%] transition-transform duration-500 ease-in-out transform ${
            isAnimating
              ? direction === 'next'
                ? 'translate-x-[-100%]'
                : 'translate-x-[100%]'
              : 'translate-x-0'
          } flex flex-col items-start justify-center p-4 ml-8`}
        >
          {images[currentIndex].title && (
            <h2 className="text-2xl font-bold mb-8 text-left text-gray-800">
              {images[currentIndex].title}
            </h2>
          )}
          <p className="text-lg font-semibold text-gray-700 text-left">
            {images[currentIndex].description}
          </p>
        </div>
      </div>
      <button
        onClick={handlePrev}
        className="absolute left-[40px] top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg opacity-90 w-12 h-12 flex items-center justify-center z-20"
      >
        &#10094;
      </button>
      <button
        onClick={handleNext}
        className="absolute right-[40px] top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg opacity-90 w-12 h-12 flex items-center justify-center z-20"
      >
        &#10095;
      </button>
    </div>
  );
};

export default SlideSection;
