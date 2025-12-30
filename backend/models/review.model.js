import mongoose from "mongoose";

const reviewSchema=new mongoose.Schema({
    bookId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    authorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    comment:{
        type:String,
        required:true
    }
},{timestamps:true});
const review = mongoose.model("Review",reviewSchema);
export default review ;