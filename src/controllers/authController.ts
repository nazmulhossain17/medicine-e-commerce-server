import { Request, Response } from "express";
import User from "../models/userModel";
import generateToken from "../utils/generateToken";
import crypto from "crypto";
import Verify from "../models/verifyModel";
import { sendMail } from "../utils/send";
import mongoose from "mongoose";

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

export const sendVerificationCode = async (req: Request, res: Response) => {
  const { email } = req.body;

  // Check if the user exists
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Check if the user is already verified
  if (user.isVerified) {
    return res.status(400).json({ message: "User is already verified" });
  }

  // Generate a 6-digit numeric verification code
  const verificationCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  // Set expiration time for the verification code (e.g., 1 hour)
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  // Save the verification code to the database
  const verification = new Verify({
    user: user._id,
    code: verificationCode,
    expiresAt,
  });

  await verification.save();

  // Send the verification code to the user's email
  try {
    await sendMail(
      user.email,
      "Email Verification",
      `Your verification code is: ${verificationCode}`,
      `<!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            width: 100%;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            margin: 20px auto;
            max-width: 600px;
          }
          .header {
            text-align: center;
            padding: 10px 0;
          }
          .header h1 {
            color: #333333;
          }
          .content {
            padding: 20px;
          }
          .otp {
            font-size: 24px;
            font-weight: bold;
            color: #333333;
            text-align: center;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #777777;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Email Verification</h1>
          </div>
          <div class="content">
            <p>Dear ${user.name},</p>
            <p>Please use the following code to verify your email address. This code is valid for 1 hour.</p>
            <div class="otp">${verificationCode}</div>
            <p>If you did not request this verification, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>Thank you</p>
          </div>
        </div>
      </body>
      </html>`
    );

    res.status(200).json({ message: "Verification code sent to your email" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to send verification email", error });
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  const { email, code } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User is already verified" });
    }

    console.log("Received code:", code);
    console.log("User ID:", user._id);

    // Ensure the user._id is in the correct format
    const userId = user._id;

    // Find the verification record
    const verification = await Verify.findOne({
      user: userId, // Correct field name
      code,
      expiresAt: { $gt: new Date() }, // Check if the code is not expired
    });

    console.log("Verification record found:", verification);

    if (!verification) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification code" });
    }

    // Mark the user as verified
    user.isVerified = true;
    await user.save();

    // Delete the verification record as it's no longer needed
    await Verify.findByIdAndDelete(verification._id);

    res.status(200).json({ message: "User verified successfully" });
  } catch (error) {
    console.error("Error verifying user:", error);
    res.status(500).json({ message: "Server error" });
  }
};
