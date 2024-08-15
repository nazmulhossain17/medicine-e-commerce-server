import { Router } from "express";
import {
  createShippingAddress,
  deleteShippingAddress,
  getAllShippingAddresses,
  getShippingAddresses,
} from "../controllers/shippingController";

const router = Router();

router.post("/create-shipping", createShippingAddress);
router.get("/addresses/:id", getAllShippingAddresses);
router.get("/addresses/:userId", getShippingAddresses);
router.delete("/shipping-address/:addressId", deleteShippingAddress);

export default router;
