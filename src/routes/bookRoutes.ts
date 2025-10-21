import express from "express";
import { getBooks, getBookById, getBooksByGenre, createBook, updateBook, deleteBook } from "../controllers/bookController";

const router = express.Router();
router.get("/", getBooks);
router.get("/:id", getBookById);
router.get("/genre/:id", getBooksByGenre);
router.post("/", createBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
