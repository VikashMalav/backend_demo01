import dotenv from "dotenv";
dotenv.config()
import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import hotelRouter from "./routes/hotelRoute.js";
import { userRouter } from "./routes/userRoute.js";
import { QrRouter } from "./routes/qrCodeGenRoute.js";
import cookieParser from "cookie-parser";
const app = express()
const port = process.env.PORT || 8080

mongoose.connect(process.env.DATABASE_URI)
    .then(() => {
        app.listen(port, console.log(`server running at ${port}`))
        console.log("database is connected succesfully ...")
    })
    .catch((err) => {
        console.log("Error in connecting database", err)
        process.exit(1)
    })


app.use(cors({origin: ['http://localhost:5173'],credentials:true}))
app.use(express.json())
app.use(cookieParser())
app.use('/hotel', hotelRouter)
app.use('/user', userRouter)
// app.use('http://localhost:8080/qr', QrRouter)

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: `Internal Server Error : ${err}` });
});







