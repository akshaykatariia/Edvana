import Course from "../models/Course.js";

// Get all Courses

export const getAllCourses = async(req,res)=>{
    try {
        const courses = await Course.find({isPublished:true}).select(['-courseContent','-enrolledStudents']).populate({path:'educator'})

        res.json({success:true,courses});
    } catch (error) {
        res.json({success:true,messag:error.message});
    }
}

// Get course by id 

export const getCourseId=async (req,res)=>{
    const {id} = req.params
    try {
        const courseData= await Course.findById(id).populate({path:'educator'})

        //Remove lecture url if isPreview is false
        courseData.courseContent.forEach(chapter=>{
            chapter.chapterContent.forEach(lecture=>{
                if(!lecture.isPreviewFree){
                    lecture.lectureUrl="";
                }
            }) 
        })
        
        res.json({success:true,courseData})
    } catch (error) {
        res.json({success:false,message:error.message});
    }
}