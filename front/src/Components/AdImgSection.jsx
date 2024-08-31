import React from 'react';

const AdSection = () => {
  const ads = [
    {
      src: require('../assets/AdImg1.jpg'),
      text: 'planner 회원 특별 할인 이벤트',
    },
    { src: require('../assets/AdImg2.jpg'), text: '항공권 예약' },
    { src: require('../assets/AdImg3.jpg'), text: '호텔 예약' },
  ];

  const imageWidth = 450; // 넓어진 이미지 너비
  const imageHeight = 270; // 이미지 높이

  return (
    <div className="AdSection_container flex justify-center items-center mt-10 bg-white p-4">
      {ads.map((ad, index) => (
        <div
          key={index}
          className="p-1 relative"
          style={{
            marginRight: index === 0 ? '80px' : '0',
            marginLeft: index === 2 ? '80px' : '0',
          }}
        >
          <img
            src={ad.src}
            alt={`Ad ${index + 1}`}
            className="rounded-md shadow-lg"
            style={{
              width: `${imageWidth}px`,
              height: `${imageHeight}px`,
              objectFit: 'cover',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '18px',
              margin: '10px',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '3px',
              padding: '10px 20px',
              cursor: 'pointer',
              textAlign: 'center',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
            }}
            className="hover:bg-opacity-75 transition-opacity"
          >
            {ad.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdSection;
