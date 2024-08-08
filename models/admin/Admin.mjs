import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    fullname : String,
    email : {
        type: String,
        required: true,
        unique : true
    },
    password : String

})

const Admin = mongoose.model("Admin",adminSchema)

export default Admin