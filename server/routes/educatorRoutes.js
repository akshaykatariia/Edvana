import express from 'express'
import { updateRoleToEducator } from '../controllers/educatorController.js'
import { protectEducator } from '../middlewares/authMiddleware.js'
import { addCourse } from '../controllers/educatorController.js'
import upload from '../configs/multer.js'

const educatorRouter = express.Router() // new router bnaya 

//Add educator role
educatorRouter.get('/update-role', updateRoleToEducator) // jab koi get request bhejga toh 
// updateroletoeducator chalega 

educatorRouter.post('/add-course', upload.single('image'), protectEducator, addCourse)// add course also saves data other than image 

export default educatorRouter;

 