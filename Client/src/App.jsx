import React from 'react';
import { Route, Routes, useMatch, Navigate } from 'react-router-dom'; 
import Home from './pages/student/Home';
import CoursesList from './pages/student/CoursesList';
import CourseDetails from './pages/student/CourseDetails';
import MyEnrollment from './pages/student/MyEnrollments';
import Player from './pages/student/Player';
import Loading from './components/student/Loading';
import Educator from './pages/educator/Educator';
import Dashboard from './pages/educator/Dashboard';
import Addcourse from './pages/educator/AddCourses';
import Mycourses from './pages/educator/MyCourses';
import StudentsEnrolled from './pages/educator/StudentsEnrolled';
import DeleteCoursesGrid from './pages/educator/DeleteCoursesGrid';
import Navbar from './components/student/Navbar';
import PrivacyPolicy from './pages/student/PrivacyPolicy';
import { ToastContainer } from 'react-toastify';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "quill/dist/quill.snow.css";


const App = () => {
  const isEducatorPage=useMatch('/educator/*');
  return (

    <div className='text-default min-h-screen bg-white'>
      <ToastContainer/>
      {!isEducatorPage && <Navbar/>}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/privacy-policy' element={<PrivacyPolicy/>} />
        <Route path='/course-list' element={<CoursesList/>} />
        <Route path='/course-list/:input' element={<CoursesList/>} />
        <Route path='/course/:id' element={<CourseDetails/>} />
        <Route path='/my-enrollment' element={<MyEnrollment/>} />
        <Route path='/player/:courseId' element={<Player/>} />
        <Route path='/loading/:path' element={<Loading/>} />

        <Route path='/educator' element={<Educator/>}>
            <Route index element={<Navigate to="dashboard" replace />} />    this defaults open dashboard  on clicking educator dashbaord button
            <Route path='dashboard' element={<Dashboard />} /> 
            <Route path='add-course' element={<Addcourse/>}/>
            <Route path='my-course' element={<Mycourses/>}/>
            <Route path='delete-courses' element={<DeleteCoursesGrid/>}/>
            <Route path='enorlled-students' element={<StudentsEnrolled/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
