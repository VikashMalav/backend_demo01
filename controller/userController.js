import { User } from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

export const getUsers = async (req, res, next) => {

    try {
        const users = await User.find()
        if (users.length === 0) {
            return res.json({ message: "users not available" })
        }
        return res.status(201).json({ count: users.length, data: users })

        users
    } catch (error) {
        console.log(error)
        next(error)
    }
}


export const registerUser = async (req, res, next) => {

    try {
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

        return res.status(201).json({ user, message: "user created successfully!!" })


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
                
                const token = jwt.sign({email},process.env.SECRET_KEY,{ expiresIn: '1h' })

                return res.status(200).json({ message: "User logged In",token })
            }
        }
       
        
        return res.status(401).json({ message: "invalid credentials" })
        


    } catch (error) {
        console.log(error)
        next(error)
    }
}

