import { Hotel } from "../models/hotelModel.js"

export const addHotel= async(req,res)=>{

  try {
    console.log("first")
     const hotels= await Hotel.find()
     console.log(hotels)
     res.status(200).json({count:hotels.length,data:hotels})
  } catch (error) {
    console.log(error)
  }


}

export const createHotel= async(req,res,next)=>{

    try {
      console.log("creating user")
     const hotel= {
        name: "dhakad",
        address: "mandaniya",
        rating: 6,
        category: "chinease",}
       const hotels= await Hotel.create(hotel)
       console.log(hotels)
       res.status(200).json({message:"hotel created successfully"})
    } catch (error) {
      console.log(error)
      next(error)
    }
  
    
  }