import React from 'react';
import NavBar from '../Navbar';
// import PlannerBar from '../PlannerBar';
import Footer from '../Footer';
import Sidebar from '../Sidebar';

const index = () => {
  return (
    <div className="Page_Wrapper flex flex-col h-screen bg-white">
      <div className="Page_container flex flex-col h-full">
        <NavBar />
        <div className="flex flex-1">
          <Sidebar />
          {/* <PlannerBar /> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default index;
