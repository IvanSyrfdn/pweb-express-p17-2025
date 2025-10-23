import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getStatistics = async (_: Request, res: Response) => {
  try {
    const totalUsers = await prisma.users.count();
    const totalGenres = await prisma.genres.count({ where: { deleted_at: null } });
    const totalBooks = await prisma.books.count({ where: { deleted_at: null } });
    const totalOrders = await prisma.orders.count();

    // Hitung total pendapatan
    const orderItems = await prisma.order_items.findMany({
      include: { books: true },
    });

    const totalRevenue = orderItems.reduce((sum, item) => {
      return sum + item.quantity * item.books.price;
    }, 0);

    res.json({
      totalUsers,
      totalGenres,
      totalBooks,
      totalOrders,
      totalRevenue,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
