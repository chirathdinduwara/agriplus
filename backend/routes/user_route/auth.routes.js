import express from "express";
import {
  registerUser,
  userLogout,
  getAllUserActivities,
  clearAllUserActivities,
  adminLogin,
  registerAdmin,
  userLogin,
  allUsers,
  getUser,
  updateUser,
  removeUser,
  getAdmins,
  staffLogin,
  registerStaff,
  allStaff,
  updateStaff,
  getStaff,
  deleteActivitiesByEmail,
} from "../../controllers/user_controller/auth.controller.js";

const router = express.Router();

router.post("/sign-up", registerUser);
router.post("/login", userLogin);
router.put("/logout", userLogout);
router.get("/activities", getAllUserActivities);
router.delete("/activities", clearAllUserActivities);
router.delete("/activities/by-email", deleteActivitiesByEmail);
router.get("/users", allUsers);
router.get("/user/:id", getUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", removeUser);

router.post("/adminLogin", adminLogin);
router.post("/adminSignUp", registerAdmin);
router.get("/admin", getAdmins);

router.post("/staffLogin", staffLogin);
router.post("/staffSignUp", registerStaff);
router.get("/staffs", allStaff);
router.put("/staff/:id", updateStaff);
router.get("/staff/:id", getStaff);

export default router;
