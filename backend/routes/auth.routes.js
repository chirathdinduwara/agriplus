import express from "express";
import { registerUser, adminLogin, registerAdmin } from "../controllers/auth.controller.js";


const router = express.Router();

router.post("/sign-up", registerUser);

router.post("/adminLogin", adminLogin);
router.post("/adminSignUp" , registerAdmin)


export default router;