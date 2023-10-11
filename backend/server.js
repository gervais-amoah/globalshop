import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB(); //  connect to mongoDB

const app = express();

//  Request body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Cookie parser middleware
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is up and running...");
});

app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
