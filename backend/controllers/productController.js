import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

//  @desc   Fetch all products
//  @route  GET /api/products
//  @access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//  @desc   Fetch a single product
//  @route  GET /api/products/:id
//  @access Public
const getProductById = asyncHandler(async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.json(product);
});

export { getProducts, getProductById };
