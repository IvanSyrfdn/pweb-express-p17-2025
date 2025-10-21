import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import genreRoutes from "./routes/genreRoutes";
import bookRoutes from "./routes/bookRoutes";
import orderRoutes from "./routes/orderRoutes";
import orderItemRoutes from "./routes/orderItemRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/genres", genreRoutes);
app.use("/books", bookRoutes);
app.use("/orders", orderRoutes);
app.use("/order-items", orderItemRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
