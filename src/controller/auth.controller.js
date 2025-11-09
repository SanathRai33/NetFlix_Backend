import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    if (!user) {
      return res.status(400).json({
        message: "User not created",
        success: false,
        status: 400,
      });
    }

    return res.status(201).json({
      message: "User created successfully",
      success: true,
      status: 201,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
      status: 500,
    });
  }
};