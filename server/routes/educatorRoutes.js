import express from 'express'
import { educatorDashboardData, getEnrolledStudentsData, updateRoleToEducator } from '../controllers/educatorController.js'
import { protectEducator } from '../middlewares/authMiddleware.js'
import { addCourse } from '../controllers/educatorController.js'
import upload from '../configs/multer.js'
import { getEducatorCourses } from '../controllers/educatorController.js'


const educatorRouter = express.Router() // new router bnaya 

//Add educator role
educatorRouter.get('/update-role', updateRoleToEducator) // jab koi get request bhejga toh 
// updateroletoeducator chalega 

educatorRouter.post('/add-course', upload.single('image'), protectEducator, addCourse)// add course also saves data other than image 

educatorRouter.get('/courses', protectEducator, getEducatorCourses)
educatorRouter.get('/dashboard', protectEducator, educatorDashboardData)
educatorRouter.get('/enrolled-students', protectEducator, getEnrolledStudentsData)


export default educatorRouter;

 