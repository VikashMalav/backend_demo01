import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()


export const auth =(req,res,next)=>{
   try {
   const token = req.cookies?.token
   console.log(">>>>>>>>>>>>>>>>>>>>>>>>", req.cookies)
   if(!token){
    return res.status(401).json({message:"unauthrized ,no token"})

   }
 
    
    const decoded =jwt.verify(token,process.env.SECRET_KEY)
    console.log("+++++++++++decoded>>>>>>>>++++++++++++",decoded)
        req.user=decoded
        next()
   } catch (error) {
    console.log(error)
    next(error)
   }
   
}