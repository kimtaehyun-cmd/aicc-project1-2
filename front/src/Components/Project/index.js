import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import ProjectBar from '../ProjectBar';

const TravelProject = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <ProjectBar />
      <Footer />
    </div>
  );
};

export default TravelProject;
