import express, { Router } from "express";
import { deleteTodo, getAllTodo, getTodo, postTodo, putTodo } from "../../controllers/todos/todo.mjs";
const router = Router();


router.route('/').get(getAllTodo).post(postTodo)

router.get("/:id",getTodo)

router.put("/:id",putTodo)

router.delete("/:id",deleteTodo)
export default router;
