import { Router } from "express"
import { adminLogincontroller } from "../controllers/admin.controller.js"

const adminRouter = Router()
adminRouter.post('/admin/login',adminLogincontroller)
export default adminRouter