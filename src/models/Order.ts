import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";
import GroceryItem from "./GroceryItem";

class Order extends Model {
	public id!: number;
	public items!: { id: number; quantity: number }[];
	public totalAmount!: number;
	public userId!: number;
}

Order.init(
	{
		id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
		items: { type: DataTypes.JSON, allowNull: false },
		totalAmount: { type: DataTypes.FLOAT, allowNull: false },
		userId: { type: DataTypes.INTEGER, allowNull: false },
	},
	{ sequelize, tableName: "orders" }
);

export default Order;
