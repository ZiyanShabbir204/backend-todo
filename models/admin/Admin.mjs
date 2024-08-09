import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    fullname : String,
    email : {
        type: String,
        required: true,
        unique : true
    },
    password :{
        type :String,
        select : false
    }

})

const Admin = mongoose.model("Admin",adminSchema)

export default Admin