import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

const PRODUCTS_LIST_SIZE = 12;
const ADMIN_PRODUCTS_LIST_SIZE = 10;
const TOP_PRODUCT_SIZE = 3;

//  @desc   Fetch all products
//  @route  GET /api/products
//  @access Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = PRODUCTS_LIST_SIZE;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};

  const count = await Product.countDocuments({ ...keyword });

  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

//  @desc   Fetch a single product
//  @route  GET /api/products/:id
//  @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//  @desc   Fetch all products
//  @route  GET /api/products
//  @access Public
const adminGetProducts = asyncHandler(async (req, res) => {
  const pageSize = ADMIN_PRODUCTS_LIST_SIZE;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Product.countDocuments();

  const products = await Product.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

//  @desc   Get top rated products
//  @route  GET /api/products/top
//  @access Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
    .sort({ rating: "-1" })
    .limit(TOP_PRODUCT_SIZE);
  res.status(200).json(products);
});

//  @desc   Create a new product
//  @route  POST /api/products
//  @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//  @desc   Update a product
//  @route  PUT /api/product
//  @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  } else {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  }
});

//  @desc   Delete a product
//  @route  DELETE /api/product
//  @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  } else {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json("Product deleted");
  }
});

//  @desc   Create a new review
//  @route  POST /api/products
//  @access Private/Admin
const createProductReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const { rating, comment } = req.body;

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  } else {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("You cannot reviewed the same product twice");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;

    await product.save();
    res.status(200).json({ message: "Review added" });
  }
});

export {
  adminGetProducts,
  createProduct,
  createProductReview,
  deleteProduct,
  getProductById,
  getProducts,
  getTopProducts,
  updateProduct,
};
