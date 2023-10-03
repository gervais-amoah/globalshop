import dotenv from "dotenv";
import express from "express";
import productRoutes from "./routes/productRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB(); //  connect to mongoDB

const app = express();

app.get("/", (req, res) => {
  res.send("API is up and running...");
});

app.use("/api/products", productRoutes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
