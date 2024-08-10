import { Request, Response } from "express";
import User from "../models/userModel";
import generateToken from "../utils/generateToken";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id, // Convert _id to a string
      name: user.name,
      email: user.email,
      role: user.role,
      photo: user.photo,
      token: generateToken(user._id as string), // Convert _id to a string
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    const token = generateToken(user._id as string);

    // Set token in cookie
    res.cookie("access_token", token, {
      httpOnly: true, // Ensure the cookie is sent only over HTTP(S), not accessible via JavaScript
      secure: process.env.NODE_ENV === "production", // Set to true in production
      sameSite: "strict", // Adjust according to your needs (strict, lax, none)
      maxAge: 72 * 60 * 60 * 1000, // Cookie expires in 72 hours
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      photo: user.photo,
      token, // Optional: Also send the token in the response body
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

export const logoutUser = (req: Request, res: Response) => {
  // Clear the JWT token cookie
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ message: "Logged out successfully" });
};
