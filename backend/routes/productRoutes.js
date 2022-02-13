import express from "express";
import {
  deleteProduct,
  getProductById,
  getProducts,
} from "../controllers/productController.js";
import { checkAdmin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, checkAdmin, deleteProduct);

export default router;
