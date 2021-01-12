const express = require("express");
const router = express.Router();
const ProductService = require('../../services/products');

const productService = new ProductService();

router.get('/', async (req, res, next) => {

  try {
    const products = await productService.getProducts();
    console.log(products)
    res.render("products", {products});

  } catch (error) {
    next(error);
  }
});

module.exports = router;
