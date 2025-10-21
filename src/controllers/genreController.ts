import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getGenres = async (_: Request, res: Response) => {
  const genres = await prisma.genres.findMany();
  res.json(genres);
};

export const getGenreById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const genre = await prisma.genres.findUnique({ where: { id } });
  if (!genre) return res.status(404).json({ message: "Genre not found" });
  res.json(genre);
};

export const createGenre = async (req: Request, res: Response) => {
  const { name } = req.body;
  const genre = await prisma.genres.create({
    data: { name, created_at: new Date(), updated_at: new Date() },
  });
  res.status(201).json(genre);
};

export const updateGenre = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  const genre = await prisma.genres.update({
    where: { id },
    data: { name, updated_at: new Date() },
  });
  res.json(genre);
};

export const deleteGenre = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.genres.update({
    where: { id },
    data: { deleted_at: new Date() },
  });
  res.json({ message: "Genre deleted (soft delete)" });
};
