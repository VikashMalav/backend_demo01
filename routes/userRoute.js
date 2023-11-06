import { Router } from "express";
import { getUsers, registerUser,loginUser, logOut } from "../controller/userController.js";
import { auth } from "../middlewares/authMiddleware.js";

export const userRouter =Router()


userRouter.get('/',auth,getUsers)
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/logout',logOut)
