import { Router } from "express";
import { loginFunction, submitController } from "../controllers/form.controller.js";
const formRouter = Router()
formRouter.post('/',submitController)
formRouter.post('/login', loginFunction)
export default formRouter