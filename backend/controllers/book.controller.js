import mongoose from "mongoose";
import BookModel from "../models/book.model.js";
import ReviewModel from "../models/review.model.js";
import { user } from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";

// export const createBook = async (req, res) => {
//   try {
//     const { name, price, genre, description, inStock, image, pdf } =
//       req.body.name;
//     const author = req.userId;
//     console.log("req.body--",req.body);
//     // if (!name || !price || !genre || !description || !image) {
//     //   return res
//     //     .status(400)
//     //     .json({ success: false, message: "All fields are required" });
//     // }
//     let cloudniaryResponseimage = null;
//     let cloudniaryResponsepdf = null;
//     try {
//       cloudniaryResponseimage = await cloudinary.uploader.upload(image, {
//         folder: "book_store_app",
//       });
//     } catch (error) {
//       console.error("Error in uploading image to cloudinary: ", error);
//       return res
//         .status(500)
//         .json({ success: false, message: "Error in uploading image" });
//     }
//     try {
//       cloudniaryResponsepdf = await cloudinary.uploader.upload(pdf, {
//         folder: "book_store_app",
//       });
//     } catch (error) {
//       console.error("Error in uploading pdf to cloudinary: ", error);
//       return res
//         .status(500)
//         .json({ success: false, message: "Error in uploading pdf" });
//     }
//     console.log("cloudniaryResponseimage : " + cloudniaryResponseimage);
//     console.log("cloudniaryResponsepdf : " + cloudniaryResponsepdf);
//     const newBook = new BookModel({
//       name,
//       price,
//       genre,
//       description,
//       inStock,
//       image: cloudniaryResponseimage.secure_url
//         ? cloudniaryResponseimage.secure_url
//         : "",
//       pdf: cloudniaryResponsepdf.secure_url
//         ? cloudniaryResponsepdf.secure_url
//         : "",
//       authorId: new mongoose.Types.ObjectId(author),
//     });

//     console.log("newBook ", newBook);
//     await newBook.save();

//     return res.status(201).json({
//       success: true,
//       message: "Book created successfully",
//       book: newBook,
//     });
//   } catch (error) {
//     if (error instanceof mongoose.Error.ValidationError) {
//       return res.status(400).json({ success: false, message: error.message });
//     }
//     console.error("Error in creating book: ", error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal server error" });
//   }
// };
// --------------------------------------

export const createBook = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);
console.log("Headers:", req.headers["content-type"]);
console.log("Files:", req.files.image);
console.log("Files:", req.files.pdf);

    const { name, price, genre, description, inStock } = req.body;
    const authorId = req.userId;

    if (!name || !price || !genre || !description || !inStock) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.files?.image || !req.files?.pdf) {
      return res.status(400).json({ message: "Image and PDF are required" });
    }

    // Upload Image
    const imageFile = req.files.image[0];
    const imageUpload = await cloudinary.uploader.upload(
      `data:${imageFile.mimetype};base64,${imageFile.buffer.toString("base64")}`,
      { folder: "book_store/images" }
    );

    // Upload PDF
    const pdfFile = req.files.pdf[0];
    const pdfUpload = await cloudinary.uploader.upload(
      `data:${pdfFile.mimetype};base64,${pdfFile.buffer.toString("base64")}`,
      {
        folder: "book_store/pdfs",
        resource_type: "raw",
      }
    );

    const newBook = new BookModel({
      name,
      price,
      genre,
      description,
      inStock,
      image: imageUpload.secure_url,
      pdf: pdfUpload.secure_url,
      authorId,
    });
      console.log(newBook);
 await newBook.save();
    return res.status(201).json({
      success: true,
      message: "Book created successfully",
      book: newBook,
    });
  } catch (error) {
    console.error("Error creating book:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getBooks = async (req, res) => {
  try {
    const userID = req.userId;
    const userRole = await user.findById(userID).select("type");
    if (!userRole) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (userRole.type === "Seller") {
      const books = await BookModel.find({ authorId: userID }).populate(
        "review"
      );
      return res.status(200).json({ success: true, books });
    }
    if (userRole.type === "Customer" || userRole.type === "Admin") {
      const books = await BookModel.find().populate("review");
      return res.status(200).json({ success: true, books });
    }
  } catch (error) {
    console.error("Error in fetching books: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
// --------------------------------------
export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await BookModel.findById(id).populate("review");
    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }
    return res.status(200).json({ success: true, book });
  } catch (error) {
    console.error("Error in fetching book by ID: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
// --------------------------------------
export const getBookByAuthorId = async (req, res) => {
  try {
    const { id } = req.params;
    const books = await BookModel.find({ authorId: id }).populate("review");
    return res.status(200).json({ success: true, books });
  } catch (error) {
    console.error("Error in fetching books by user ID: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
// --------------------------------------
export const getBooksByGenre = async (req, res) => {
  try {
    const { genre } = req.params;
    const books = await BookModel.find({ genre }).populate("review");
    if (books.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No books found for this genre" });
    }
    return res.status(200).json({ success: true, books });
  } catch (error) {
    console.error("Error in fetching books by genre: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
// --------------------------------------
// export const updateBook = async (req, res,next) => {
//   try {
//     const { id } = req.params;
//     const authorId = req.userId;
//     const updates = req.body;
//     console.log("Author", authorId, updates);
//     const userData = await user.findById(authorId).select("type");
//     console.log(userData);
//     if (!userData) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }
//     const allowedRoles = ["Seller", "Admin"];

//     if (!allowedRoles.includes(userData.type)) {
//       return res.status(403).json({
//         success: false,
//         message: "Only sellers or admin can update books",
//       });
//     }

//     const exist = await BookModel.findOne({ authorId: authorId, _id: id });
//     if (!exist) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Book not found" });
//     }

//     const bookfind = await BookModel.findOne({ authorId: authorId, _id: id });
//     console.log(bookfind);

//     const updatedBook = await BookModel.findOneAndUpdate(
//       { authorId: authorId, _id: id },
//       { $set: updates },
//       { new: true, upsert: true }
//     );

//     console.log("updatedBook", updatedBook);
//     if (!updatedBook) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Book not found" });
//     }
//     return res.status(200).json({
//       success: true,
//       message: "Book updated successfully",
//       book: updatedBook,
//     });
//   } catch (error) {
//     console.error("Error in updating book: ", error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal server error" });
//   }
// };


export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const authorId = req.userId;

    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    // 1️⃣ Check user & role
    const userData = await user.findById(authorId).select("type");
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const allowedRoles = ["Seller", "Admin"];
    if (!allowedRoles.includes(userData.type)) {
      return res.status(403).json({
        success: false,
        message: "Only sellers or admin can update books",
      });
    }

    // 2️⃣ Find book
    const book = await BookModel.findOne({ _id: id, authorId });
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // 3️⃣ Update allowed text fields
    const allowedUpdates = [
      "name",
      "price",
      "genre",
      "description",
      "inStock",
    ];

    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        book[field] = req.body[field];
      }
    });

    // 4️⃣ Update image (if new image provided)
    if (req.files?.image?.length) {
      const imageFile = req.files.image[0];

      const imageUpload = await cloudinary.uploader.upload(
        `data:${imageFile.mimetype};base64,${imageFile.buffer.toString(
          "base64"
        )}`,
        { folder: "book_store/images" }
      );
      console.log("imageUpload",imageUpload);
      book.image = imageUpload.secure_url;
       console.log("book.image",book.image);
    }

    // 5️⃣ Update PDF (if new PDF provided)
    if (req.files?.pdf?.length) {
      const pdfFile = req.files.pdf[0];

      const pdfUpload = await cloudinary.uploader.upload(
        `data:${pdfFile.mimetype};base64,${pdfFile.buffer.toString(
          "base64"
        )}`,
        {
          folder: "book_store/pdfs",
          resource_type: "raw",
        }
      );
       console.log("pdfUpload",pdfUpload);
      book.pdf = pdfUpload.secure_url;
       console.log("book.pd",book.pdf);
    }

    // 6️⃣ Save changes
    await book.save();

    return res.status(200).json({
      success: true,
      message: "Book updated successfully",
      book,
    });
  } catch (error) {
    console.error("Error updating book:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// --------------------------------------
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const authorId = req.userId;
    console.log("deleteBook authorId,id ", authorId, id);
    const isUser = await user.findById(authorId).select("type");
    if (!isUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (isUser.type == "Customer") {
      return res.status(403).json({
        success: false,
        message: "Only sellers or admin can delete books",
      });
    }

    const deletedBook = await BookModel.findByIdAndDelete({
      authorId,
      _id: id,
    });
    if (!deletedBook) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }
    console.log("deletedBook ", deletedBook);
    return res
      .status(200)
      .json({ success: true, message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error in deleting book: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
// --------------------------------------
export const rate = async (req, res) => {
  try {
    const { bookId, rating, comment } = req.body;
    const authorId = req.userId;

    if (!bookId || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "bookId, rating and comment are required",
      });
    }
    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ success: false, message: "Rating must be between 1 and 5" });
    }

    console.log("bookId,rating,comment,userId ", bookId, rating, comment);
    const book = await BookModel.findOne({ _id: bookId });
    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }
    const isUserExist = await user.findOne({ _id: authorId });
    if (!isUserExist) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const existingReview = await ReviewModel.findOne({
      bookId: bookId,
      authorId,
    });

    if (existingReview) {
      existingReview.rating = rating;
      existingReview.comment = comment;
      await existingReview.save();
      await BookModel.updateOne(
        { _id: bookId, review: existingReview._id },
        { $set: { "review.$": existingReview._id } }
      );
    } else {
      const newReview = new ReviewModel({
        bookId: new mongoose.Types.ObjectId(bookId),
        authorId: new mongoose.Types.ObjectId(authorId),
        rating,
        comment,
      });
      await newReview.save();
      console.log("newReview ", newReview);
      await BookModel.updateOne(
        { _id: bookId },
        { $push: { review: newReview._id } }
      );
    }
    return res
      .status(201)
      .json({ success: true, message: "Review added successfully" });
  } catch (error) {
    console.error("Error in saving review: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
