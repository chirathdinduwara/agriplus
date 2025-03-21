import express from "express";
import { createOrder } from "../../controllers/order_controller/order.controller.js";

const router = express.Router();

router.post("/add_order", createOrder);

export default router;
