import express from "express"
import { razorPayOrder, verifyPayment } from "../controller/oder.controller.js"


const paymentROute = express.Router()


paymentROute.post("/razor_pay_order" ,razorPayOrder)
paymentROute.post("/razor_pay_verify" , verifyPayment)


export default paymentROute