
import mongoose from "mongoose";


const bookSchema=new mongoose.Schema({

    name:String,
    price:Number,
    genre:{
        type: String,
        required: true,
        enum: ['Fiction', 'Non-Fiction', 'Science Fiction', 'Mystery', 'Fantasy', 'Other'],
    },
    description:String,
    inStock:Number,
    review:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review"
    }],
    image:String,
    authorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }


})

 const Book = mongoose.model("Book",bookSchema);
 export default Book;