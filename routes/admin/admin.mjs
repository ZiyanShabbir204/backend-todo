import express, { Router } from "express"
import { login, signup ,changePassword,getAllAdmin, updateProfile} from "../../controllers/admin/admin.mjs"
import protectRoute from "../../middleware/protect.routes.js"

const router = Router()

router.get("/",getAllAdmin)
router.post("/signup",signup)
router.post("/login",login)
router.put("/changepassword/:id",protectRoute,changePassword)
router.put("/updateprofile/:id",protectRoute,updateProfile)

export default router

