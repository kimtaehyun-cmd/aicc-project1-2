import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Itempanel from '../Itempanel';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import SlideSection from '../SlideSection';
import AdImgSection from '../AdImgSection'; // AdSection 컴포넌트 추가

const Index = () => {
  const [isFooterVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled to the bottom of the page
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setFooterVisible(true);
      } else {
        setFooterVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="Page_Wrapper flex flex-col min-h-screen bg-white">
      <Navbar />
      <div className="Page_container flex flex-col flex-grow">
        <div className="flex flex-1 items-start justify-center mt-40">
          <div className="flex">
            <Sidebar />
            <Itempanel />
          </div>
        </div>
        <div className="mt-40 bg-gray-100">
          <SlideSection />
        </div>
        <div className=" mt-20 mb-40">
          <AdImgSection />
        </div>
      </div>
      {isFooterVisible && <Footer className="flex-shrink-0" />}
    </div>
  );
};

export default Index;
