import { clerkClient } from '@clerk/express';
import Course from '../models/Course.js';
import { v2 as cloudinary } from 'cloudinary';

// update role to educator
export const updateRoleToEducator = async (req, res) => {
  try {
    const userId = req.auth.userId;

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: "educator",
      },
    });

    res.json({ success: true, message: "You can publish a course now" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// add new course(uploading course)
export const addCourse = async (req, res) => {
  try {
    const { courseData } = req.body;
    const imageFile = req.file;
    const educatorId = req.auth.userId;

    if (!imageFile) {
      return res.json({ success: false, message: "Thumbnail not attached" });
    }

    const parsedCoursedata = await JSON.parse(courseData); // convert in js object format
    parsedCoursedata.educator = educatorId; // link educator with his course

    const newCourse = await Course.create(parsedCoursedata); // added course in database
    const imageUpload = await cloudinary.uploader.upload(imageFile.path);
    // now saving image and all in db
    newCourse.courseThumbnail = imageUpload.secure_url;
    await newCourse.save();

    res.json({ success: true, messgae: "Course Added" });
  } catch (error) {
    res.json({ success: false, messgae: Error.message });
  }
};


