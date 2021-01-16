const express = require("express");
const passport = require('passport');
const router = express.Router();
const ProductService = require('../../services/products');
//JWT strategy
require('../../utils/auth/strategies/jwt');
const validationHandler = require("../../utils/middleware/validationHandler");

const { productIdSchema, productTagSchema, createProductSchema, updateProductSchema } = require("../../utils/schemas/products.schema");

const productService = new ProductService();


router.get("/", async (req, res, next) => {
  try {
    const products = await productService.getProducts(req.query.tags);
    res.status(200).json({data: products, message: "Products listed"})

  } catch (error) {
    next(error)
  }
} );

router.get("/:productId", async (req, res, next) => {
  try {
    const product = await productService.getProduct(req.params.productId);
    res.status(200).json({data: product, message: "product retrieved"});
  } catch (error) {
    next(error);
  }
});

router.post("/", 
  validationHandler(createProductSchema),
  async (req, res, next) => {
    try {
      const product = await productService.createProduct(req.body.product);
      res.status(201).json({data: product, message: "Product created"})
    } catch (error) {
      next(error);
    }
  });

router.put("/:productId", 
  passport.authenticate("jwt", {session: false}),
  validationHandler({productId: productIdSchema},"params"),
  validationHandler(updateProductSchema),
  async (req, res, next) => {
    try {
      const product = await productService.updateProduct(req.params.productId, req.body);
      res.status(200).json({data: product, message: "Product updated"})
    } catch (error) {
      next(error);
    }
  });

router.delete("/:productId", 
  passport.authenticate("jwt", {session: false}),
  async (req, res, next) => {
    try {
      const product = await productService.deleteProduct(req.params.productId);
      res.status(200).json({data: product, message: "Product deleted"});
    } catch (error) {
      next(error);
    }
  }
)

module.exports = router;