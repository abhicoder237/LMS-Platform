import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/connectDB.js"
import cookieParser from "cookie-parser"
import authRoute from "./routes/authRoutes.js"
import userRoute from "./routes/userRoutes.js"
import courseRoute from "./routes/courseRoute.js"; 
import lectureRoute from "./routes/lectureRoutes.js"
import paymentROute from "./routes/paymentRoutes.js"

dotenv.config()

const app = express()

 app.use(cors({
  origin: "https://learnxai-2r7w.onrender.com",
  credentials: true
}))


app.use(express.json())
app.use(cookieParser())
app.use("/api/auth" ,authRoute);
app.use("/api/user" , userRoute)
app.use("/api/course" , courseRoute)
app.use("/api/lecture" , lectureRoute)
app.use("/api/razorpay" ,paymentROute)


const PORT = process.env.PORT || 8000



// app.get("/" , (req ,res)=>{
//     res.send("Hello")
// })


app.listen(PORT , ()=>{
    console.log(`Server Listening on Port ${PORT}`)
    connectDB()
})
