
import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { createBook, getBooks, getBookById, updateBook, deleteBook,rate, getBookByAuthorId, getBooksByGenre } from "../controllers/book.controller.js";


const bookRoutes = express.Router();

bookRoutes.get("/",getBooks);
bookRoutes.post("/", createBook);
bookRoutes.get("/:id",getBookById);
bookRoutes.get("/author/:id",getBookByAuthorId);
bookRoutes.get("/genre/:genre",getBooksByGenre);
bookRoutes.put("/:id",updateBook);
bookRoutes.delete("/:id",deleteBook);
bookRoutes.post("/rate",rate);
export default bookRoutes;