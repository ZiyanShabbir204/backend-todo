import express, { Router } from "express";
import User from "../../models/Users/User.mjs";
import { deleteUser, getAllUser, getUser, postUser, putUser,deleteAllUser } from "../../controllers/users/user.mjs";
import protectRoute from "../../middleware/protect.routes.js";
const router = Router();


router.get("/", getAllUser)

router.get("/:id",getUser)

router.post("/",postUser);

router.put("/:id",putUser)
router.delete("/",deleteAllUser)

router.delete("/:id",deleteUser)
export default router;
