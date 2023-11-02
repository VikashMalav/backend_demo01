import { Router } from "express";
import { addHotel, createHotel } from "../controller/hotelController.js";

const hotelRouter = Router()

hotelRouter.get("/",addHotel)
hotelRouter.post("/createHotel",createHotel)


export default hotelRouter