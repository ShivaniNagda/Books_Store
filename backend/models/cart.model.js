import mongoose from "mongoose";


export const cartSchema = new mongoose.Schema({
    bookId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        // required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        // required:true
    },
    quantity:{
        type:Number,
        // default:1
    }
})

export default cart = mongoose.model("Cart",cartSchema);