import express from "express";
import {
  registerDelPerson,
  getDelPersons,
  deleteDelPerson,
  delPersonLogin,
} from "../../controllers/delivery_controller/del_person.controller.js";
import {
  assignDelivery,
  getAssignDeliveries,
  updateAssignDeliveries,
  deleteAssignDelivery,
} from "../../controllers/delivery_controller/del_assign.controller.js";

const router = express.Router();
router.post("/delPerSignUp", registerDelPerson);
router.post("/delPerLogin", delPersonLogin);
router.get("/delPersons", getDelPersons);
router.delete("/delPerson/:id", deleteDelPerson);

router.post("/assignDel", assignDelivery);
router.get("/assignDels", getAssignDeliveries);
router.put("/assignDels/:id", updateAssignDeliveries);
router.delete("/assignDels/:id", deleteAssignDelivery);

export default router;
