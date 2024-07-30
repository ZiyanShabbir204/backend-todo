import express, { Router } from "express";
import User from "../../models/Users/User.mjs";
import { deleteUser, getAllUser, getUser, postUser, putUser } from "../../controllers/users/user.mjs";
const router = Router();


router.get("/",getAllUser)

router.get("/:id",getUser)

router.post("/",postUser);

router.put("/:id",putUser)

router.delete("/:id",deleteUser)
export default router;
