import mongoose from "mongoose";


export const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONOGODB_URI)
        console.log("Mongodb connected.....")

    } catch (error) {
        console.log("error in mongodb connection" , error)
    }
}

export default connectDB