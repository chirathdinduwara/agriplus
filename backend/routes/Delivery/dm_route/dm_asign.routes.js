import express from "express";
import {
  allAsignDelPersons,
  asignDelPerson,
  updateAsignDelPersons,
  removeAsignDelPersons,
  getAsignDelByUserId,
  removeAsignDel,
  getAsignDelByUserName,
} from "../../../controllers/Delivery/dm_controller/dm_asign.controller.js";
const router = express.Router();

router.post("/deliver-asign/new", asignDelPerson);
router.get("/deliver-asign/all", allAsignDelPersons);
router.get("/assigned-dels/:userId", getAsignDelByUserId);
router.get("/assigned-dels-name/:userId", getAsignDelByUserName);

router.put("/deliver-asign/update/:id", updateAsignDelPersons);
router.delete("/deliver-asign/delete/:id", removeAsignDelPersons);
router.delete("/deliver-asign/delete/abc/:product_id", removeAsignDel);

export default router;
