import express, { Router } from "express";
import { deleteTodo, getAllTodo, getTodo, postTodo, putTodo } from "../../controllers/todos/todo.mjs";
const router = Router();


router.get("/",getAllTodo)

router.get("/:id",getTodo)

router.post("/",postTodo);

router.put("/:id",putTodo)

router.delete("/:id",deleteTodo)
export default router;
