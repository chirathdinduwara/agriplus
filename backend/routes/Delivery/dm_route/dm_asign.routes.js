import express from "express";
import {
  allAsignDelPersons,
  asignDelPerson,
} from "../../../controllers/Delivery/dm_controller/dm_asign.controller.js";
const router = express.Router();

router.post("/deliver-asign/new", asignDelPerson);
router.get("/deliver-asign/all", allAsignDelPersons);

export default router;
