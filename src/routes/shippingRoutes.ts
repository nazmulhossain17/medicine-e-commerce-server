import { Router } from "express";
import {
  createShippingAddress,
  getAllShippingAddresses,
  getShippingAddresses,
} from "../controllers/shippingController";

const router = Router();

router.post("/create-shipping", createShippingAddress);
router.get("/addresses/:id", getAllShippingAddresses);
router.get("/addresses/:userId", getShippingAddresses);
export default router;
