import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Line } from "rc-progress";
import Footer from "../../components/student/Footer";
import { toast } from "react-toastify";
import axios from "axios";

const MyEnrollment = () => {
  const {
    enrolledCourses,
    calculateCourseDuration,
    navigate,
    userData,
    userEnrolledCourses,
    backendUrl,
    getToken,
    calculateTotalLecture,
  } = useContext(AppContext);
  const [progressArray, setProgressArray] = useState([]);

  const getCourseProgress = async () => {
    try {
      const token = await getToken();
      const tempProgresArray = await Promise.all(
        enrolledCourses.map(async (course) => {
          const { data } = await axios.post(
            `${backendUrl}/api/user/get-course-progress`,
            { courseId: course._id },
            { headers: { Authorization: `Bearer ${token}` } }
          );  

          let totallectures = calculateTotalLecture(course);
          const lecturecomplete = data.progressData
            ? data.progressData.lectureCompleted.length
            : 0;
          return { totallectures, lecturecomplete };
        })
      );
      setProgressArray(tempProgresArray);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (userData) {
      userEnrolledCourses();
    }
  }, [userData]);

  useEffect(() => {
    if (enrolledCourses.length > 0) {
      getCourseProgress();
    }
  }, [enrolledCourses]);

  return (
    <>
      <div className="md:px-36 px-8 pt-10">
        <h1 className="text-2xl font-semibold">My Enrollment</h1>
        <table className="table-auto table-fixed w-full overflow-hidden border mt-10">
          <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden">
            <tr>
              <th className="px-4 py-3 font-semibold truncate">Course</th>
              <th className="px-4 py-3 font-semibold truncate">Duration</th>
              <th className="px-4 py-3 font-semibold truncate">Completed</th>
              <th className="px-4 py-3 font-semibold truncate">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {enrolledCourses.map((course, index) => (
              <tr key={index} className="border-b border-gray-500/20">
                <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3">
                  <img
                    src={course.courseThumbnail}
                    alt=""
                    className="w-14 sm:w-24 md:w-28"
                  />
                  <div className="flex-1">
                    <p className="mb-1 max-sm:text-sm">{course.courseTitle}</p>
                    <Line
                      strokeWidth={2}
                      percent={
                        progressArray[index]
                          ? (progressArray[index].lecturecomplete /
                              progressArray[index].totallectures) *
                            100
                          : 0
                      }
                      className="bg-gray-300 rounded-full"
                    />
                  </div>
                </td>
                <td className="px-4 py-3 max-sm:hidden">
                  {calculateCourseDuration(course)}
                </td>
                <td className="px-4 py-3 max-sm:hidden">
                  {progressArray[index] &&
                    `${progressArray[index].lecturecomplete} / ${progressArray[index].totallectures}`}{" "}
                  <span>Lectures</span>
                </td>
                <td className="px-4 py-3 max-sm:text-right">
                  <button
                    className="px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-600 max-sm:text-xs text-white rounded"
                    onClick={() => navigate("/player/" + course._id)}
                  >
                    {progressArray[index] &&
                    progressArray[index].lecturecomplete ===
                      progressArray[index].totallectures
                      ? "Completed"
                      : "On Going"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default MyEnrollment;
