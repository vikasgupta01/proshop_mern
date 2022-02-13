import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { checkAdmin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, checkAdmin, createProduct);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, checkAdmin, deleteProduct)
  .put(protect, checkAdmin, updateProduct);

export default router;
