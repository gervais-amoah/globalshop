import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id: productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
    res.json(product);

    // if (productId.match(/^[0-9a-fA-F]{24}$/)) {
    //   // Yes, it's a valid ObjectId, proceed with `findById` call.
    // } else {
    //   res.status(404).json({ message: "Product not found" });
    // }
  })
);

export default router;
