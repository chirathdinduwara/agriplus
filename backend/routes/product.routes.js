import express from "express";
import { createProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.post('/add-prd', createProduct)

export default router;