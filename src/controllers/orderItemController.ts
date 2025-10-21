import { Request, Response } from "express";
import prisma from "../config/prisma";

export const addItemToOrder = async (req: Request, res: Response) => {
  const { order_id, book_id, quantity } = req.body;

  const item = await prisma.order_items.create({
    data: {
      order_id,
      book_id,
      quantity,
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  res.status(201).json(item);
};

export const getItemsByOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const items = await prisma.order_items.findMany({
    where: { order_id: id },
    include: { books: true },
  });
  res.json(items);
};
