import express, { Router } from "express"
import { login, signup } from "../../controllers/admin/admin.mjs"

const router = Router()

router.post("/signup",signup)
router.post("/login",login)

export default router

