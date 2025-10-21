import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getBooks = async (_: Request, res: Response) => {
  const books = await prisma.books.findMany({ include: { genres: true } });
  res.json(books);
};

export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const book = await prisma.books.findUnique({ where: { id }, include: { genres: true } });
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
};

export const getBooksByGenre = async (req: Request, res: Response) => {
  const { id } = req.params;
  const books = await prisma.books.findMany({
    where: { genre_id: id },
    include: { genres: true },
  });
  res.json(books);
};

export const createBook = async (req: Request, res: Response) => {
  const data = req.body;
  const book = await prisma.books.create({
    data: {
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
    },
  });
  res.status(201).json(book);
};

export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const book = await prisma.books.update({
    where: { id },
    data: { ...data, updated_at: new Date() },
  });
  res.json(book);
};

export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.books.update({
    where: { id },
    data: { deleted_at: new Date() },
  });
  res.json({ message: "Book deleted (soft delete)" });
};
