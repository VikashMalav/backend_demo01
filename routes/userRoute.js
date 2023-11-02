import { Router } from "express";
import { getUsers, registerUser,loginUser } from "../controller/userController.js";
import { auth } from "../middlewares/authMiddleware.js";

export const userRouter =Router()


userRouter.get('/',auth,getUsers)
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
