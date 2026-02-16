import dotenv from 'dotenv'
dotenv.config()
import Razorpay from "razorpay";
import Course from "../model/course.model.js";
import User from "../model/user.model.js"
 

const RazorpayInstance  = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
   key_secret: process.env.RAZORPAY_KEY_SECRET
}) 


 


export const razorPayOrder = async (req, res) => {
  try {
    const { courseId } = req.body;

    // find course
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    const options = {
      amount: course.price * 100, // rupees → paise
      currency: "INR",
      receipt: courseId.toString(),
    };

    
    const order = await RazorpayInstance.orders.create(options);

    return res.status(200).json({
      message: "Payment  created successfully",
      order,
    });

  } catch (error) {
    console.error("Error in order controller:", error);

    return res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
};


export const verifyPayment = async (req ,res) =>{
    try {
        // get the course id , user id and razorpay_oder id
        const {courseId , userId , razorpay_order_id} = req.body
        // fetch oder 
        const verifyInfo = await RazorpayInstance.orders.fetch(razorpay_order_id)

        // condtion paid check 
         if(verifyInfo.status === 'paid'){
            // for course enrolled
            const user = await User.findById(userId)
            if(!user.enrollCourse.includes(courseId)){
               await user.enrollCourse.push(courseId)
               await user.save()
            }

            // for students enrollment
            const course  = await Course.findById(courseId).populate("lectures")
            if(!course.enrolledStudents.includes(userId)){
                 await course.enrolledStudents.push(userId)
                 await course.save()
            }
             const updatedUser = await User.findById(userId)
            return res.status(201).json({
                message:"Payment Verfied and Enroll Successfully",
                updatedUser
            })
         }else{
             return res.status(400).json({
                message:"Sorry! Payment  Failed "
            })
         }

    } catch (error) {
        
    }
}