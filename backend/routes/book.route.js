
import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { createBook, getBooks, getBookById, updateBook, deleteBook,rate, getBookByAuthorId, getBooksByGenre } from "../controllers/book.controller.js";
import upload from "../middleware/multer.js"


const bookRoutes = express.Router();

bookRoutes.get("/",verifyToken,getBooks);
bookRoutes.post("/",verifyToken, createBook);
bookRoutes.get("/:id",verifyToken,getBookById);
bookRoutes.get("/author/:id",verifyToken,getBookByAuthorId);
bookRoutes.get("/genre/:genre",verifyToken,getBooksByGenre);
bookRoutes.put("/:id",verifyToken,updateBook);
bookRoutes.delete("/:id",verifyToken,deleteBook);
bookRoutes.post("/rate",verifyToken,rate);
export default bookRoutes;