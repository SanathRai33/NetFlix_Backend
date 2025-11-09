import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

const authController = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
        status: error,
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
        status: error,
      });
    }

    return res.status(201).json({
      message: "User created successfully",
      success: true,
      status: 201,
    });

  } catch (error) {
    return res.status(500).json({
      message: `Internal server error: ${error}`,
      success: false,
      status: error,
    });
  }
};

export default authController;