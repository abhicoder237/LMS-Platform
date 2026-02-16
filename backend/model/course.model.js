import mongoose from "mongoose"

const courseSchema  = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    SubTitle:{
        type:String
    },
    description:{
        type:String,
         required:true
    },
    level:{
        type:String,
        enum:['Begginer' , 'Intermediate' , 'Advanced']
    },
    category:{
        type:String,
        default:true
    },
    price:{
        type:Number
    },
    thumbnail:{
        type:String
    },
    enrolledStudents:[{
         type:mongoose.Schema.Types.ObjectId,
         ref:"User"
    }],
     lectures:[{
         type:mongoose.Schema.Types.ObjectId,
         ref:"Lecture"
    }],
     reviews:[{
         type:mongoose.Schema.Types.ObjectId,
         ref:"Review"
    }],
     creator:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"User"
    },
    isPublished:{
        type:Boolean,
        default:false
    }


},{timestamps:true})


const Course = mongoose.model("Course" , courseSchema)

export default Course