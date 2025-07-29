import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';

const DeleteCoursesGrid = () => {
  const [courses, setCourses] = useState([]);
  const { backendUrl, getToken } = useContext(AppContext)

  const fetchCourses = async () => {
    const token = await getToken();
    const res = await axios.get(backendUrl+'/api/educator/courses',{ headers: { Authorization: `Bearer ${token}` } });
    setCourses(res.data.courses);
  };

  const handleDelete = async (courseId) => {
    const confirm = window.confirm("Are you sure you want to delete this course?");
    // console.log(courseId);
    if (!confirm) return;

    const {data}=await axios.delete(backendUrl+`/api/educator/delete-course/${courseId}`); // deleting from backend 
    setCourses((prev) => prev.filter((c) => c._id !== courseId)); // updating course in frontend manually 

    if(data.success){
        toast.success(data.message);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
      {courses.map(course => (
        <div key={course._id} onClick={() => handleDelete(course._id)}
          className="cursor-pointer hover:shadow-lg rounded-xl overflow-hidden border">
          <img src={course.courseThumbnail} alt="course" className="h-32 w-full object-cover" />
          <div className="p-2 text-sm text-center font-medium text-gray-700">
            {course.courseTitle}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DeleteCoursesGrid;
