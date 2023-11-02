import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()


export const auth =(req,res,next)=>{
   const token = req.header("Authorization")
   if(!token){
    return res.status(401).json({message:"unauthrized"})

   }
   console.log(token.split('Bearer ').join(''))

   try {
    const tokenWithoutPrefix = token.replace(/^Bearer /, '')
    const decoded =jwt.verify(tokenWithoutPrefix,process.env.SECRET_KEY)
    console.log("+++++++++++decoded>>>>>>>>++++++++++++",decoded)
        req.user=decoded
        next()
   } catch (error) {
    console.log(error)
    next(error)
   }
   
}