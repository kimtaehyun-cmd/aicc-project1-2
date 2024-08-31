import React from 'react';
import Calendar from '../Calendar';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import Footer from '../Footer';

const index = () => {
  return (
    <div className="Planner_wrapper flex flex-col h-screen bg-white">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <Calendar />
      </div>
      <Footer />
    </div>
  );
};

export default index;
