import { loginController, logoutController, registerController } from "../controller/auth.controller.js"
import express from "express"

const authRoute = express.Router()

authRoute.post("/register" , registerController)
authRoute.post("/login" , loginController)
authRoute.post("/logout" , logoutController)


export default authRoute