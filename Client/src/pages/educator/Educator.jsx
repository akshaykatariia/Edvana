import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/educator/Navbar'
import Sidebar from '../../components/educator/Sidebar'
import Footer from '../../components/educator/Footer'


const Educator = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <Outlet /> {/* This is where nested routes like Dashboard, AddCourse will render */}
      </div>
    </div>
  );
};

export default Educator
