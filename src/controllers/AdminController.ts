import { Request, Response } from "express";
import GroceryItem from "../models/GroceryItem";

const addItem = async (req: Request, res: Response): Promise<void> => {
	try {
		const { name, price, stock, category } = req.body;
		const item = await GroceryItem.create({ name, price, stock, category });
		res.status(201).json(item);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};

const viewItems = async (_req: Request, res: Response): Promise<void> => {
	try {
		const items = await GroceryItem.findAll();
		res.status(200).json(items);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};

const updateItem = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;
		const { name, price, category, stock } = req.body;
		const item = await GroceryItem.findByPk(id);
		if (!item) {
			res.status(404).json({ message: "Item not found" });
			return;
		}
		await item.update({ name, price, category, stock });
		res.status(200).json(item);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};

const removeItem = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;
		const item = await GroceryItem.findByPk(id);
		if (!item) {
			res.status(404).json({ message: "Item not found" });
			return;
		}
		await item.destroy();
		res.status(204).send();
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};

const updateInventory = async (req: Request, res: Response): Promise<void> => {
	try {
		const updates = req.body;

		if (!Array.isArray(updates)) {
			res
				.status(400)
				.json({ message: "Request body should be an array of updates" });
			return;
		}

		const updatedItems = [];
		const createdItems = [];

		for (const { id, stock, name, price, category } of updates) {
			let item = await GroceryItem.findByPk(id);
			if (item) {
				await item.update({ name, stock, price, category });
				updatedItems.push(item);
			} else {
				item = await GroceryItem.create({ id, name, stock, price, category });
				createdItems.push(item);
			}
		}

		res.status(200).json({
			updatedItems,
			createdItems,
		});
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};

export default { addItem, viewItems, updateItem, removeItem, updateInventory };
