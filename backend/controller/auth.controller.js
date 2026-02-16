import User from "../model/user.model.js"
import validator from "validator"
import bcrypt from "bcrypt"
import genToken from "../config/token.js"



export const registerController = async (req ,res)=>{
    try {
        const {name , email , password , role } = req.body

        // find user 
        const exitUser = await User.findOne({email})
        // check user exist or not

        if(exitUser){
          return   res.status(400).json({message:"User Already Exist"})
        }
        // email validation 

        if(!validator.isEmail(email)){
            return   res.status(400).json({message:"Enter Valid Email"})
        }
        // password validation

        if(!password || password.length < 8){
             return   res.status(400).json({message:"Enter Strong Pasword"})
        }

        // password hashed

        const hashedPass = await bcrypt.hash(password.toString()  , 10)

        // create user 

        const user = await User.create({
            name ,
            email ,
            role ,
            password: hashedPass 
        })
        const token = await genToken(user._id)
        res.cookie("token" , token ,{
            httpOnly:true ,
            secure:true,
             sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(201).json({
            message:"User Created Successfuly",
            user
        })
    } catch (error) {
        console.log("error in Register controller ")
         console.log("error in login ")
        return res.status(500).json({
            message:`Register error ${error}`
        })
    }
}


export const loginController = async(req ,res)=>{
    try {
        const {email , password , role} = req.body
         
        // find user 
        const user = await User.findOne({email})
        // check user exist or not

        if(!user){
          return   res.status(400).json({message:"Invalid Credientials"})
        }

        // password match

        const isPassMatch = await bcrypt.compare(password , user.password)

        if(!isPassMatch){
              return   res.status(400).json({message:"Invalid Credientials"})
        }
        // role defined 

        if (user.role.toLowerCase() !== role.toLowerCase()) {
      return res.status(401).json({
        message: "Role does not match. Please select correct role",
      });
    }
        // cookie and token setup 

         const token = await genToken(user._id)
        res.cookie("token" , token ,{
            httpOnly:true ,
            secure:true,
           sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(201).json({
            message:"Login Successfuly",
            user
             
        })
        
        
    } catch (error) {
        console.log("error in login " , error)
        return res.status(500).json({
            message:`Login error ${error}`
        })
    }
}


export const logoutController = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",   
    });

    return res.status(200).json({
      message: "Logout Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: `Logout error ${error}`,
    });
  }
};
