import Todo from "../../models/Todos/Todo.mjs";

export const postTodo  =  async(req,res)=>{
    const { body } = req;
    const { title, description, completed } = body;
    //   console.log("title",title)
    try {
      const newTodo = new Todo({
        title,
        description,
        completed,
      });
      await newTodo.save();
      return res.status(200).json({ "newTodo": newTodo });
    } catch (error) {
      return res.status(400).json({ "error": error });
    }
}

export const getTodo = async(req,res) =>{
    const {id} = req.params

    try {
        const todo = await Todo.findById(id)
        if(todo){
            return res.status(200).json({"todo":todo})

        }
        else{
            return res.status(404).json({"todo":"not available"})
        }
        
        

    } catch (error) {
        return res.status(400).json({"error":error})
        
    }

}

export const getAllTodo  = async(req,res)=>{
    try {
        const todos  = await Todo.find()
        return res.status(200).json({"todos":todos})
    } catch (error) {
        return res.status(400).json({"error":error})
    }


}

export const putTodo =  async (req,res)=>{
    const {body} = req
    const {title,description,completed} = body
    const {id} = req.params

    try {
        const todo  = {
            title,
            description,
            completed
        }

        const updatedTodo  = await Todo.findByIdAndUpdate(id,todo,{new:true})
        return res.status(200).json({"todo":updatedTodo})
        
    } catch (error) {
        return res.status(400).json({ "error": error });
    }

}

export const deleteTodo =  async(req,res)=>{
    const {id} = req.params
    try {
        
        const deletedTodo = await Todo.findByIdAndDelete(id)
        return res.status(200).json({"todo":deletedTodo})
    } catch (error) {
        return res.status(400).json({ "error": error });
    }

}