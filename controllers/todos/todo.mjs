import Todo from "../../models/Todos/Todo.mjs";
import { responseHelper } from "../../utilis/responseHelper.mjs";
import { statusHelper } from "../../utilis/statusHelper.mjs";
export const postTodo = async (req, res) => {
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
    return res.status(statusHelper(1)).json(responseHelper(true,"new todo added",newTodo))
    // return res.json(responseHelper(true,null,newTodo))

    // return res.status(200).json({ newTodo: newTodo });
  } catch (error) {
    return res.status(statusHelper(2)).json(responseHelper(false,error, null))

    // return res.json(responseHelper(false,error,null))

    // return res.status(400).json({ error: error });
  }
};

export const getTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findById(id);
    if (todo) {
      return res.status(statusHelper(1)).json(responseHelper(true,"todo",todo))

        // return res.json(responseHelper(true,null,todo))

    //   return res.status(200).json({ todo: todo });
    } else {
      return res.status(statusHelper(4)).json(responseHelper(false,"This todo is not avialable",null))

      //   return res.json(responseHelper(false,"not available",null))

      // return res.status(404).json({ todo: "not available" });
    }
  } catch (error) {
    return res.status(statusHelper(2)).json(responseHelper(false,error, null))

    // return res.status(400).json({ error: error });
  }
};

export const getAllTodo = async (req, res) => {
  try {
    const todos = await Todo.find();
    return res.status(statusHelper(1)).json(responseHelper(true,"All Todos",todos))
  } catch (error) {
    return res.status(statusHelper(2)).json(responseHelper(false,error, null))
  }
};

export const putTodo = async (req, res) => {
  const { body } = req;
  const { title, description, completed } = body;
  const { id } = req.params;

  try {
    const todo = {
      title,
      description,
      completed,
    };

    const updatedTodo = await Todo.findByIdAndUpdate(id, todo, { new: true });
    return res.status(statusHelper(1)).json(responseHelper(true,"todo info updated",updatedTodo))
  } catch (error) {
    return res.status(statusHelper(2)).json(responseHelper(false,error, null))

    // return res.status(400).json({ error: error });
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    return res.status(statusHelper(1)).json(responseHelper(true,"todo deleted",deletedTodo))

    // return res.status(200).json({ todo: deletedTodo });
  } catch (error) {
    return res.status(statusHelper(2)).json(responseHelper(false,error, null))

    // return res.status(400).json({ error: error });
  }
};
export const deleteAllTodo = async (req, res) => {
  try {
    const deleteAll = await Todo.deleteMany({});
    // console.log("deleteAll", deleteAll);
    return res.status(statusHelper(1)).json(responseHelper(true," all todo deleted",deleteAll))

    // return res.status(200).json({ todo: deleteAll });
  } catch (error) {
    return res.status(statusHelper(2)).json(responseHelper(false,error, null))

    // return res.status(400).json({ error: error });
  }
};
