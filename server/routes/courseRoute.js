import express from 'express';
import { getAllCourses, getCourseId } from '../controllers/courseController.js';

const courseRouter = express.Router()

courseRouter.get("/all", getAllCourses) // Jab frontend /courses/all pe request karega (GET request), toh getAllCourses method chalega.
courseRouter.get("/:id", getCourseId)

export default courseRouter;

