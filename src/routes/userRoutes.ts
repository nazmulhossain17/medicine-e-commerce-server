import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  loginUser,
  logoutUser,
  makeUserAdmin,
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
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.post("/make-admin/:requesterId", makeUserAdmin);

export default router;
