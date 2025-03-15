import { updateDeliveryStatus } from "../../controllers/Order_and_Delivery/delivery_person_status.controller.js";
import express from "express";

const router = express.Router();

router.put("/update_status", updateDeliveryStatus);

export default router;
