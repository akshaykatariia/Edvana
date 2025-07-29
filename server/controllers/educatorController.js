import { clerkClient } from '@clerk/express'
import Course from '../models/Course.js';
import { v2 as cloudinary } from 'cloudinary'
import Purchase from '../models/Purchase.js';
import User from '../models/User.js';

//update role to educator
export const updateRoleToEducator = async (req, res) => {
  try {
    const userId = req.auth.userId

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: 'educator',
      }
    })

    res.json({ success: true, message: 'you can publish a course now' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

//Add New Course

export const addCourse = async (req, res) => {
  try {
    const { courseData } = req.body
    // console.log("course data is ", courseData);
    const imageFile = req.file
    // console.log("req file is ", imageFile);
    const educatorId = req.auth.userId;
    if (!imageFile) {
      return res.json({ success: false, message: "Thumbnail Not Attached" })
    }
    const parsedCourseData = await JSON.parse(courseData)
    // console.log("parsedCourseData Is ", parsedCourseData);
    parsedCourseData.educator = educatorId
    const newCourse = await Course.create(parsedCourseData)
    // console.log(newCourse);
    const imageUpload = await cloudinary.uploader.upload(imageFile.path)
    // console.log(imageUpload);
    newCourse.courseThumbnail = imageUpload.secure_url
    await newCourse.save()

    res.json({ success: true, message: "Course Added" });
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// Get all Courses

export const geEducatorCourse = async (req, res) => {
  try {


    const educator = req.auth.userId;
    const courses = await Course.find({ educator });
    res.json({ success: true, courses })
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

//Get Educator Dashboard Data(total Earning,Enrolled Students,No. of Courses)
export const educatorDeshboardData = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });
    const totalCourses = courses.length;

    const courseIds = courses.map((course) => course._id)

    //calculate totalearnings from purchases
    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: 'completed'
    });

    const totalEarnings = purchases.reduce((sum, purchase) => sum + purchase.amount, 0)

    // collect unique inrolled student IDs with their course titles 

    const enrolledStudentData = [];
    for (const course of courses) {
      const students = await User.find({
        _id: { $in: course.enrolledStudents }
      }, 'name imageUrl')
      students.forEach(student => {
        enrolledStudentData.push({
          courseTitle: course.courseTitle,
          student
        })
      })
    }
    res.json({ success: true, educatorDeshboardData: { enrolledStudentData, totalCourses, totalEarnings } })
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

//get enrolled student data with purchased data 

export const getEnrolledStudentData = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });
    const courseIds = courses.map((course) => course._id)
    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed"
    }).populate('userId', 'name imageUrl').populate('courseId', 'courseTitle')

    const enrolledStudents = purchases.map(purchase => ({
      student: purchase.userId,
      courseTitle: purchase.courseId.courseTitle,
      purchaseDate: purchase.createdAt
    }));

    res.json({ success: true, enrolledStudents });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

// delete course 

export const deleteCourse = async (req, res) => {
  try {
    const {courseId} = req.params
    await Course.findByIdAndDelete(courseId);
    await User.updateMany(
      { enrolledCourses: courseId },
      { $pull: { enrolledCourses: courseId } }
    );
    res.json({success:true,message:"course deleted"})
  } catch (error) {
    res.json({ success: false,message:"error kuch yaha hai" });
  }
}
