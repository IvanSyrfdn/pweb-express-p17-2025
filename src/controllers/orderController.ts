import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getOrders = async (_: Request, res: Response) => {
  const orders = await prisma.orders.findMany({ include: { users: true } });
  res.json(orders);
};

export const createOrder = async (req: any, res: Response) => {
  const userId = req.user.id;
  const order = await prisma.orders.create({
    data: { user_id: userId, created_at: new Date(), updated_at: new Date() },
  });
  res.status(201).json(order);
};
