import express from "express";
import {
  DmLogin,
  registerDm,
} from "../../../controllers/Delivery/dm_controller/dm.controller.js";
const router = express.Router();

router.post("/deliverManager/login", DmLogin);
router.post("/deliverManager/register", registerDm);

export default router;
