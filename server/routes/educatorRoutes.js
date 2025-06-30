import express from 'express'
import { updateRoleToEducator } from '../controllers/educatorController.js'

const educatorRouter = express.Router() // new router bnaya 

//Add educator role
educatorRouter.get('/update-role', updateRoleToEducator) // jab koi get request bhejga toh 
// updateroletieducator chalega 

export default educatorRouter;

