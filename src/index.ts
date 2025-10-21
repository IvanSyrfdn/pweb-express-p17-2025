import express from "express";
import prisma from "./config/prisma";

const app = express();
app.use(express.json());

// ✅ Tambahkan route dasar ini:
app.get("/", (_, res) => {
  res.status(200).json({
    message: "Server is up and running 🚀",
  });
});

// Tes koneksi database
app.get("/test-db", async (_, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
