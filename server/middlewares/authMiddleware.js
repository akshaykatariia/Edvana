import { clerkClient } from "@clerk/express";

// middleware protect educator routes

export const protectEducator=async(req,res,next)=>{
    try {
        const userId=req.auth.userId
        const response =await clerkClient.users.getUser(userId);
        // console.log("response is ",response);
        if(response.publicMetadata.role !== 'educator'){
            return res.json({success:false,message:'UnAuthorized Access'})
        }

        next()

    } catch (error) {
        res.json({success:false,message:error.mmessage})
    }
}