import express from 'express'
import isAuth from '../middleware/isAuth.js'
import { createLecture, editLecture, getCourseLecture, removeLecture } from '../controller/course.lecture.js'
import upload from '../middleware/multer.js'
import { searchController } from '../controller/searchAi.controller.js'

const lectureRoute = express.Router()

lectureRoute.post("/create_lecture/:courseId" ,isAuth , createLecture )
lectureRoute.get("/get_lecture/:courseId" , isAuth , getCourseLecture)
lectureRoute.post("/edit_lecture/:lectureId" , isAuth ,upload.single("videoUrl") , editLecture)
lectureRoute.delete("/delete_lecture/:lectureId" , isAuth , removeLecture)



// for gemini 

lectureRoute.post('/search' , searchController)
export default lectureRoute