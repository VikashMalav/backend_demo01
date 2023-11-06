import { User } from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

export const 
getUsers = async (req, res, next) => {

    try {
        const id=req.user?._id
        console.log("userid",id)
        const user = await User.findById(id,{password:0})
        if (!user) {
            return res.status(404).json({ message: "user not available" })
        }
        return res.status(200).json({ user })

      
    } catch (error) {
        console.log(error)
        next(error)
    }
}


export const registerUser = async (req, res, next) => {

    try {
        console.log(req.body)
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({ message: "all fields are required" })
        }
        const isUserExist = await User.findOne({email})
        if (isUserExist) {
            
            return res.status(400).json({ message: "User already exist please login" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        // console.log(hashedPassword)
        const user = new User({ name, email, password: hashedPassword })
        await user.save()

        return res.status(201).json({user:{name: user.name,email:user.email}, message: "user created successfully!!" })


    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const loginUser = async (req, res, next) => {
         
    try {
        const {  email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "all fields are required" })
        }
        const user = await User.findOne({email})
        if (user) {
            const isAuth =await bcrypt.compare(password,user.password)
            if(isAuth){
                const payload={_id:user._id,email}
                const token = jwt.sign(payload,process.env.SECRET_KEY,{ expiresIn: '1h' })
                console.log("token>>>>>>>>>>>>>>>>>>>>",token)
                        res.cookie('token',token, { maxAge: 900000, httpOnly: true ,secure:false,path:'/'})
                return res.status(200).json({ message: "User logged In", user :{name:user.name,email:user.email}})
            }
        }
       
        
        return res.status(401).json({ message: "invalid credentials" })
        


    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const logOut = async (req, res, next) => {

    try {
        if(req.cookies.token){
            res.cookie('token','',{ expires: new Date(0) })
     res.status(200).json({message:"user Logout Successfully!!"})

        }else{
            res.status(401).json({message:"user already Logout "})
        }
      
    } catch (error) {
        console.log(error)
        next(error)
    }
}