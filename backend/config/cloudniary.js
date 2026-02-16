import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"


const uploadCloudniary = async (filePath)=>{
    cloudinary.config({ 
  cloud_name:  process.env.CLOUDNIARY_NAME, 
  api_key:  process.env.CLOUDNIARY_API_KEY, 
  api_secret:  process.env.CLOUDNIARY_sECRET_KEY,
});
   
try {
     if(!filePath) null
   
    const uploadResult = await cloudinary.uploader.upload(filePath , {resource_type : "auto"})
    fs.unlinkSync(filePath)
    return uploadResult  
} catch (error) {
 fs.unlinkSync(filePath)
 console.log("Error in cloudinary " , error)

}}

export default uploadCloudniary