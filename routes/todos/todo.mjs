import express, { Router } from "express";
import { deleteTodo, getAllTodo, getTodo, postTodo, putTodo,deleteAllTodo } from "../../controllers/todos/todo.mjs";
const router = Router();
import protectRoute from "../../middleware/protect.routes.js";


// router.route('/').get(getAllTodo).post(postTodo)
router.get("/",protectRoute,getAllTodo)
router.post("/",protectRoute,postTodo)
router.get("/:id",protectRoute,getTodo)

router.put("/:id",protectRoute,putTodo)

router.delete("/:id",protectRoute, deleteTodo)
router.delete("/",protectRoute,deleteAllTodo)

export default router;
