import express from "express";
import AdminController from "../controllers/AdminController";
import { authenticate, authorize } from "../middleware/auth";
import { validate } from "../middleware/validation";
import Joi from "joi";

const router = express.Router();

const addItemSchema = Joi.object({
	name: Joi.string().required(),
	price: Joi.number().positive().required(),
	stock: Joi.number().integer().min(0).required(),
	category: Joi.string().required(),
});

const updateItemSchema = Joi.object({
	name: Joi.string().optional(),
	price: Joi.number().positive().optional(),
	stock: Joi.number().integer().min(0).optional(),
	category: Joi.string().optional(),
});

router.post(
	"/items",
	authenticate,
	authorize("admin"),
	validate(addItemSchema),
	AdminController.addItem
);
router.get(
	"/items",
	authenticate,
	authorize("admin"),
	AdminController.viewItems
);
router.patch(
	"/items/:id",
	authenticate,
	authorize("admin"),
	validate(updateItemSchema),
	AdminController.updateItem
);
router.delete(
	"/items/:id",
	authenticate,
	authorize("admin"),
	AdminController.removeItem
);
router.put(
	"/items/inventory",
	authenticate,
	authorize("admin"),
	AdminController.updateInventory
);

export default router;
