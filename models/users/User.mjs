import mongoose from "mongoose";

const userSchema  =  mongoose.Schema({
    name : String,
    email : String,
    username :  String
})

const User  = mongoose.model("Users",userSchema)

export default User