import { Request, Response } from "express";
import GroceryItem from "../models/GroceryItem";
import Order from "../models/Order";

const viewAvailableItems = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const items = await GroceryItem.findAll();
		res.status(200).json(items);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};

const placeOrder = async (req: Request, res: Response): Promise<void> => {
	const transaction = await GroceryItem.sequelize?.transaction();
	try {
		const { items } = req.body;
		if (!Array.isArray(items) || items.length === 0) {
			res.status(400).json({ message: "Invalid order format" });
			return;
		}

		const userId = (req as any).user?.id;
		if (!userId) {
			res.status(401).json({ message: "Unauthorized" });
			return;
		}

		let totalAmount = 0;
		const orderDetails: { id: number; quantity: number }[] = [];

		for (const item of items) {
			const groceryItem = await GroceryItem.findByPk(item.id);
			if (!groceryItem || groceryItem.stock < item.quantity) {
				throw new Error(
					`Item with ID ${item.id} is unavailable or has insufficient stock.`
				);
			}

			await groceryItem.update(
				{ stock: groceryItem.stock - item.quantity },
				{ transaction }
			);
			totalAmount += groceryItem.price * item.quantity;
			orderDetails.push({ id: groceryItem.id, quantity: item.quantity });
		}

		const order = await Order.create(
			{ items: orderDetails, totalAmount, userId },
			{ transaction }
		);

		await transaction?.commit();
		res.status(201).json(order);
	} catch (error: any) {
		await transaction?.rollback();
		res.status(500).json({ error: error.message });
	}
};

export default { viewAvailableItems, placeOrder };
