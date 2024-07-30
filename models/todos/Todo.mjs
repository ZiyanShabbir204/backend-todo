import mongoose from "mongoose";

const todoSchema  =  mongoose.Schema({
    title : String,
    description : String,
    completed :  Boolean
},{ timestamps: true })


const Todo  = mongoose.model("Todos",todoSchema)

export default Todo