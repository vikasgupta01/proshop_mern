import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = expressAsyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

// @desc    Delete Product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    product.remove();
    res.json({ message: "Product Removed" });
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

// @desc    Create Product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = expressAsyncHandler(async (req, res) => {
  const product = new Product({
    user: req.user._id,
    name: "Sample Name",
    image: "/images/sample.jpg",
    brand: "Sample Brand",
    category: "Sample Category",
    description: "Sample Description",
    rating: 0,
    numReviews: 0,
    price: 0,
    countInStock: 0,
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update Product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = expressAsyncHandler(async (req, res) => {
  const { name, image, brand, category, description, price, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.description = description;
    product.price = price;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
