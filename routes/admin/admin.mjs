import express, { Router } from "express"
import { login, signup ,changePassword,getAllAdmin, updateProfile,sendEmail, verifyEmail} from "../../controllers/admin/admin.mjs"
import protectRoute from "../../middleware/protect.routes.js"

const router = Router()

router.get("/",getAllAdmin)
router.post("/signup",signup)
router.post("/login",login)
router.put("/changepassword/:id",protectRoute,changePassword)
router.put("/updateprofile/:id",protectRoute,updateProfile)
router.post("/sendemail",sendEmail)
router.put("/verifyemail/:id",verifyEmail)

export default router

