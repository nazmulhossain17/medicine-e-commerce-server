import express from "express";
import {
  getUserById,
  loginUser,
  logoutUser,
  registerUser,
  sendVerificationCode,
  updateUser,
  verifyUser,
} from "../controllers/authController";

const router = express.Router();

router.post("/create-account", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.post("/send-verification", sendVerificationCode);
router.post("/verify-user", verifyUser);

router.put("/update/:userId", updateUser);
router.get("/profile/:id", getUserById);

export default router;
