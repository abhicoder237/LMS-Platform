import jwt from "jsonwebtoken"

const genToken = async(userId)=>{
    try {
        const token = jwt.sign(({userId}) ,process.env.SECRET_KEY , {expiresIn : "7d"})
        console.log(token)
        return token
    } catch (error) {
        console.log("error in token " , error)
    }
}

export default genToken