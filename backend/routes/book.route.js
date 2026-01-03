
import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { createBook, getBooks, getBookById, updateBook, deleteBook,rate, getBookByAuthorId, getBooksByGenre } from "../controllers/book.controller.js";
import { upload } from "../middleware/multerConfig.js";


const bookRoutes = express.Router();

bookRoutes.get("/",getBooks);
bookRoutes.post("/", upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),createBook);
// bookRoutes.put("/:id", upload.any(), (req, res) => {
//   console.log("ANY FILES:", req.files);
//   console.log("BODY:", req.body);
//   res.json({ ok: true });
// });
bookRoutes.get("/:id",getBookById);
bookRoutes.get("/author/:id",getBookByAuthorId);
bookRoutes.get("/genre/:genre",getBooksByGenre);
bookRoutes.put("/:id",upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),updateBook);
bookRoutes.delete("/:id",deleteBook);
bookRoutes.post("/rate",rate);
export default bookRoutes;