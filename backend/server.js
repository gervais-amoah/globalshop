import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

import path from "path";

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

// ROUTES
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);

// PAYPAL
app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

//  IMAGE UPLOAD
const __dirname = path.resolve(); // gets the current directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
