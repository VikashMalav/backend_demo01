import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import hotelRouter from "./routes/hotelRoute.js";
import { userRouter } from "./routes/userRoute.js";
import { QrRouter } from "./routes/qrCodeGenRoute.js";
const app = express()
const port = process.env.PORT || 8080
 
mongoose.connect('mongodb+srv://vickymalav03:uNFOVZ4Lk2KIxoYO@cluster0.oc2lxdb.mongodb.net/sample_airbnb')
    .then(() => {
        app.listen(port, console.log(`server running at ${port}`))
        console.log("database is connected succesfully ...")
    })
    .catch((err) => console.log("Error in connecting database",err))


app.use(cors())
// app.use(express.json())
app.use('/hotel',hotelRouter)
app.use('/user',userRouter)
app.use('http://localhost:8080/qr',QrRouter)

app.use((err, req, res, next) => {
  
    console.error(err);
  
   
    res.status(500).json({ error: `Internal Server Error : ${err}` });
  });
  
  





