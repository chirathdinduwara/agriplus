import express from "express";
import {
  registerDelPerson,
  getDelPersons,
  deleteDelPerson,
  delPersonLogin,
  assignDelivery,
  getAssignDeliveries,
  updateAssignDeliveries,
  deleteAssignDelivery,
} from "../../controllers/delivery_controller/del_per.controller.js";

const router = express.Router();
router.post("/delevery-person/signup", registerDelPerson);
router.post("/delevery-person/login", delPersonLogin);
router.get("/delevery-person/getall", getDelPersons);
router.delete("/delevery-person/delete/:id", deleteDelPerson);

router.post("/delevery-person/assignDel", assignDelivery);
router.get("/delevery-person/assignDels", getAssignDeliveries);
router.put("/delevery-person/assignDels/:id", updateAssignDeliveries);
router.delete("/delevery-person/assignDels/:id", deleteAssignDelivery);

export default router;
