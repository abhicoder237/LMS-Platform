import Course from "../model/course.model.js"

export const searchController = async (req ,res ) =>{
    try {
        const {input } = req.body

        if(!input){
            return res.status(401).json({
                message:"Search Query is Required"
            })
        }
       const course = await Course.find({
        isPublished: true , $or:[
            {title:{$regex :input , $options: 'i'}},
            {SubTitle:{$regex :input , $options: 'i'}},
            {category:{$regex :input , $options: 'i'}},
            {description:{$regex :input , $options: 'i'}},
            {level:{$regex :input , $options: 'i'}},
        ]
       })
       console.log("Course" , course)
       return res.status(201).json(course)
    } catch (error) {
         return res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    })
}}