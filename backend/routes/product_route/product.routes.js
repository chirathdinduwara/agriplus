import express from "express";
import { allPrds, createProduct } from "../../controllers/product_controller/product.controller.js";

const router = express.Router();

router.post('/addPrd', createProduct)
router.get('/products', allPrds)

export default router;