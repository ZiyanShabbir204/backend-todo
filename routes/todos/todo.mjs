import express, { Router } from "express";
import { deleteTodo, getAllTodo, getTodo, postTodo, putTodo,deleteAllTodo } from "../../controllers/todos/todo.mjs";
const router = Router();
import protectRoute from "../../middleware/protect.routes.js";


router.route('/').get(getAllTodo).post(postTodo)

router.get("/:id",getTodo)

router.put("/:id",putTodo)

router.delete("/:id",deleteTodo)
router.delete("/",deleteAllTodo)

export default router;
