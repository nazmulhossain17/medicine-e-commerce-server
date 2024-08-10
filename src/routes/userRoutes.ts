import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  sendVerificationCode,
  verifyUser,
} from "../controllers/authController";

const router = express.Router();

router.post("/create-account", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.post("/send-verification", sendVerificationCode);
router.post("/verify-user", verifyUser);

export default router;
