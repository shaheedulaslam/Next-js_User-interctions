import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"please provide a username"]
    },
    email:{
        type:String,
        required:[true,"please provide a email"]
    },
    password:{
        type:String,
        required:[true,"please provide a password"]
    },
    isVerified:{
        type:Boolean,
        default:false
    }

})

const User = mongoose.models.user || mongoose.model('user',userSchema)
export default User


