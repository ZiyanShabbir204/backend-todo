import mongoose from "mongoose";

const userSchema  =  mongoose.Schema({
    name : String,
    email : {
        type : String,
        required: true,
        unique : true
    },
    username :  String
})

const User  = mongoose.model("Users",userSchema)

export default User