const express = require("express");
const router = express.Router();
const ProductService = require('../../services/products');
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
  validationHandler({productId: productIdSchema},"params"),
  validationHandler(updateProductSchema),
  async (req, res, next) => {
    try {
      const product = productService.updateProduct(req.params.productId, req.body.product);
      res.status(200).json({data: product, message: "Pproduct updated"})
    } catch (error) {
      next(error);
    }
  });

router.delete("/:productId", async (req, res, next) => {
  try {
    const product = await productService.deleteProduct(req.params.productId);
    res.status(200).json({data: product, message: "Product deleted"});
  } catch (error) {
    next(error);
  }
})

module.exports = router;