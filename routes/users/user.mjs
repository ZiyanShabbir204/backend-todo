import express, { Router } from "express";
import User from "../../models/Users/User.mjs";
import { deleteUser, getAllUser, getUser, postUser, putUser,deleteAllUser } from "../../controllers/users/user.mjs";
import protectRoute from "../../middleware/protect.routes.js";
const router = Router();


router.get("/",protectRoute, getAllUser)

router.get("/:id",protectRoute,getUser)

router.post("/",protectRoute,postUser);

router.put("/:id",protectRoute,putUser)
router.delete("/",protectRoute,deleteAllUser)

router.delete("/:id",protectRoute,deleteUser)
export default router;
