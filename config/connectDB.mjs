import mongoose from "mongoose";

const URL  = "mongodb+srv://ziyanshabbir25:Pakistan204@cluster0.wsdkccj.mongodb.net/"


const connectDB = async ()=>{
    try {
        mongoose.connect(URL)
        console.log("your database connected")
    } catch (error) {
        console.log("error while connecting database",error)
    }
}

export default connectDB