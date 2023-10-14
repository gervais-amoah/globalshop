import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
  createProductReview,
  adminGetProducts,
} from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/admin").get(protect, admin, adminGetProducts);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

router.route("/:id/reviews").post(protect, createProductReview);

export default router;
