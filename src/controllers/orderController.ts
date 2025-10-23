import { Request, Response } from "express";
import prisma from "../config/prisma";

type OrderItemInput = { book_id: string; quantity: number };

export const getOrders = async (req: any, res: Response) => {
  try {
    const userId = req.user?.id;
    const orders = await prisma.orders.findMany({
      where: userId ? { user_id: userId } : {},
      include: {
        order_items: {
          include: { books: true },
        },
        users: true,
      },
      orderBy: { created_at: "desc" },
    });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching orders" });
  }
};

export const createOrder = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const { items }: { items: OrderItemInput[] } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0)
      return res.status(400).json({ message: "Items are required" });

    // Validate books and stock
    const bookIds = items.map((i) => i.book_id);
    const books = await prisma.books.findMany({ where: { id: { in: bookIds } } });
    const booksMap = new Map(books.map((b) => [b.id, b]));

    for (const it of items) {
      const book = booksMap.get(it.book_id);
      if (!book) return res.status(404).json({ message: `Book ${it.book_id} not found` });
      if (book.stock_quantity < it.quantity)
        return res.status(400).json({ message: `Insufficient stock for book ${book.title}` });
    }

    // Use transaction: create order, create items, deduct stock
    const order = await prisma.$transaction(async (tx) => {
      const createdOrder = await tx.orders.create({
        data: { user_id: userId },
      });

      for (const it of items) {
        await tx.order_items.create({
          data: {
            order_id: createdOrder.id,
            book_id: it.book_id,
            quantity: it.quantity,
          },
        });

        // deduct stock
        await tx.books.update({
          where: { id: it.book_id },
          data: { stock_quantity: { decrement: it.quantity } as any }, // prisma Float/Int helpers
        });
      }

      return createdOrder;
    });

    res.status(201).json({ message: "Order created", orderId: order.id });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
