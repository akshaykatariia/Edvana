import Stripe from "stripe";
import Course from "../models/Course.js";
import Purchase from "../models/Purchase.js";
import User from "../models/User.js";
import { CourseProgress } from "../models/CourseProgress.js";

// get user data
export const getUserData = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const userData = await User.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: "user not found" });
    }
    res.json({ success: true, userData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//get enrolled courses with lecture links

export const userEnrolledCourses = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const userData = await User.findById(userId).populate("enrolledCourses");

    res.json({ success: true, enrolledCourses: userData.enrolledCourses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
// Purchase Course

export const purchaseCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const { origin } = req.headers;
    const userId = req.auth.userId;
    const userData = await User.findById(userId);
    const courseData = await Course.findById(courseId);

    if (!userData || !courseData) {
      return res.json({ success: false, message: "Data Not Found" });
    }

    const purchaseData = {
      courseId: courseData._id,
      userId,
      amount: (
        courseData.coursePrice -
        (courseData.discount * courseData.coursePrice) / 100
      ).toFixed(2),
    };

    const newPurchase = await Purchase.create(purchaseData);

    //stripe gateway initialize
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
    const currency = process.env.CURRENCY.toLowerCase();

    //creating line items for the stripe
    const lineItems = [
      {
        price_data: {
          currency,
          product_data: {
            name: courseData.courseTitle,
          },
          unit_amount: Math.floor(newPurchase.amount) * 100,
        },
        quantity: 1,
      },
    ];

    const session = await stripeInstance.checkout.sessions.create({
      success_url: `${origin}/loading/my-enrollment`,
      cancel_url: `${origin}/`,
      line_items: lineItems,
      mode: "payment",
      metadata: {
        purchaseId: newPurchase._id.toString(),
      },
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// update user course progress

export const UpdateuserCourseProgress = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { courseId, lectureId } = req.body;
    const progressData = await CourseProgress.findOne({ userId, courseId });

    if (progressData) {
      if (progressData.lectureCompleted.includes(lectureId)) {
        return res.json({
          success: true,
          message: "lecture already completed",
        });
      }
      progressData.lectureCompleted.push(lectureId);
      progressData.save();
    } else {
      await CourseProgress.create({
        courseId,
        userId,
        lectureCompleted: [lectureId],
      });
    }
    res.json({ success: true, message: "progress updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// get user course progress

export const getUserCourseProgress = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { courseId } = req.body;
    const progressData = await CourseProgress.findOne({ userId, courseId });
    res.json({ success: true, progressData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Add user Ratings to course

export const addUserRatings = async (req, res) => {
  const userId = req.auth.userId;
  const { courseId, rating } = req.body;
  if (!userId || !courseId || !rating || rating < 1 || rating > 5) {
    return res.json({ success: false, message: "invalid detailes" });
  }
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.json({ success: false, message: "course not found" });
    }
    const user = await User.findById(userId);
    if (!user || !user.enrolledCourses.includes(courseId)) {
      return res.json({
        success: false,
        message: "user has not purchased this course.",
      });
    }

    const existingRatingIndex = course.courseRatings.findIndex(
      (r) => r.userId === userId
    );
    if (existingRatingIndex > -1) {
      course.courseRatings[existingRatingIndex].rating = rating;
    } else {
      course.courseRatings.push({ userId, rating });
    }

    await course.save();

    res.json({ success: true, message: "rating added" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
