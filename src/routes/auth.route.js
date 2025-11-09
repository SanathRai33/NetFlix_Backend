import express from "express";
const router = express.Router();
import authController from "../controller/auth.controller.js";

router.post("/register", authController);

export default router;