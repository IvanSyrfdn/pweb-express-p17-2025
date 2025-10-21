import { PrismaClient } from "../generated/prisma"; // ⚠️ bukan '@prisma/client'

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

export default prisma;
