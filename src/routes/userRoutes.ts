import express from "express";
import UserController from "../controllers/UserController";
import { authenticate } from "../middleware/auth";
import { validate } from "../middleware/validation";
import Joi from "joi";

const router = express.Router();

const orderSchema = Joi.object({
	items: Joi.array()
		.items(
			Joi.object({
				id: Joi.number().integer().required(),
				quantity: Joi.number().integer().min(1).required(),
			})
		)
		.min(1)
		.required(),
});

router.get("/items", authenticate, UserController.viewAvailableItems);
router.post(
	"/orders",
	authenticate,
	validate(orderSchema),
	UserController.placeOrder
);

export default router;
