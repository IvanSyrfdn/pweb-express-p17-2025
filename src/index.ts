import express from "express";
import prisma from "./config/prisma";

const app = express();
app.use(express.json());

app.get("/", async (_, res) => {
  const users = await prisma.user.findMany();
  res.json({
    message: "Server connected successfully 🚀",
    users_count: users.length
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Running on http://localhost:${PORT}`));