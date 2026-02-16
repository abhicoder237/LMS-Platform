import express from "express"
import isAuth from "../middleware/isAuth.js"
import { courseController, creatorController, editCourse, getCourseById, getPublishedCourse, removeCourse } from "../controller/course.controller.js"
import upload from "../middleware/multer.js"
 

const courseRoute = express.Router()


courseRoute.post("/create" , isAuth , courseController)
courseRoute.get("/get_Pub_course" , getPublishedCourse)
courseRoute.get("/getCreator" , isAuth ,creatorController)
courseRoute.post("/edit_course/:courseId" , isAuth ,upload.single("thumbnail"), editCourse)
courseRoute.get("/get_courseBYId/:courseId" , isAuth , getCourseById)
courseRoute.delete("/remove_course/:courseId" , isAuth , removeCourse)

 


export default courseRoute