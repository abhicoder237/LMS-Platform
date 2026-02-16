import express from "express"
import { getCreatorById, getCurrentUser, updateProfile } from "../controller/user.controller.js"
import isAuth from "../middleware/isAuth.js"
import upload from "../middleware/multer.js"

const userRoute = express.Router()


userRoute.get('/get_currUser' , isAuth , getCurrentUser)
userRoute.post('/profile' , isAuth ,upload.single('photoUrl') , updateProfile)
userRoute.post('/get_creator' , isAuth , getCreatorById)

export default userRoute