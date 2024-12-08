import express from "express";
import AuthController from "../controllers/AuthController";
import { validate } from "../middleware/validation";
import Joi from "joi";

const router = express.Router();

const registerSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
	role: Joi.string().valid("admin", "user").required(),
});

const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
});

router.post("/register", validate(registerSchema), AuthController.createUser);
router.post("/login", validate(loginSchema), AuthController.generateToken);

export default router;
