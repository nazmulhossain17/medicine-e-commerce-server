import { Request, Response } from "express";
import ShippingAddress from "../models/shippingModel";
import User from "../models/userModel";

export const createShippingAddress = async (req: Request, res: Response) => {
  try {
    const {
      userId,
      division,
      district,
      subDistrict,
      address,
      name,
      phone,
      paymentMethod,
      products, // Add products to the request body
    } = req.body;

    // Validate paymentMethod
    if (!["Online Payment", "Cash on Delivery"].includes(paymentMethod)) {
      return res.status(400).json({ message: "Invalid payment method" });
    }

    // Check if the user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create and save the shipping address
    const shippingAddress = new ShippingAddress({
      userId,
      division,
      district,
      subDistrict,
      address,
      name,
      phone,
      paymentMethod,
      products, // Include products in the shipping address
    });

    await shippingAddress.save();
    res.status(201).json({
      message: "Shipping address created successfully",
      shippingAddress,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ message: "Error creating shipping address", error });
  }
};

export const getShippingAddresses = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const addresses = await ShippingAddress.find({ userId });
    res.status(200).json(addresses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching shipping addresses", error });
  }
};

export const getAllShippingAddresses = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id; // Get the user ID from URL params

    // Fetch the user to check their role
    const user = await User.findById(userId);

    // Check if user exists and if their role is admin or superAdmin
    if (!user || (user.role !== "admin" && user.role !== "superAdmin")) {
      return res.status(403).json({
        message:
          "Access denied. Only admins or superAdmins can view all shipping addresses.",
      });
    }

    // Fetch all shipping addresses
    const addresses = await ShippingAddress.find({});
    res.status(200).json(addresses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching shipping addresses", error });
  }
};
