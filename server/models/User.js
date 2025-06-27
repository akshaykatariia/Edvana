import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        _id:{type: String, required:true},
        name: {type: String, required:true},
        email: {type: String, required:true},
        imageUrl: {type: String, required:true},
        enrolledCourses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course'
            }
        ]

    }, {timestamps: true} // Mongoose will automatically add:

// createdAt – when the user was created 
// updatedAt – when the user was last updated
);

const User = mongoose.model('user', userSchema);

export default User;