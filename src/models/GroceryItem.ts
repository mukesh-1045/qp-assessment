import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class GroceryItem extends Model {
	public id!: number;
	public name!: string;
	public price!: number;
	public stock!: number;
	public category!: string;
}

GroceryItem.init(
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING, allowNull: false },
		price: { type: DataTypes.FLOAT, allowNull: false },
		stock: { type: DataTypes.INTEGER, defaultValue: 0 },
		category: { type: DataTypes.STRING, allowNull: false },
	},
	{ sequelize, modelName: "GroceryItem" }
);

export default GroceryItem;
