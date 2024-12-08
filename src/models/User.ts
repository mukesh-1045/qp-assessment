import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface UserAttributes {
	id: number;
	email: string;
	password: string;
	role: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User
	extends Model<UserAttributes, UserCreationAttributes>
	implements UserAttributes
{
	public id!: number;
	public email!: string;
	public password!: string;
	public role!: string;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

User.init(
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		email: { type: DataTypes.STRING, allowNull: false, unique: true },
		password: { type: DataTypes.STRING, allowNull: false },
		role: { type: DataTypes.STRING, allowNull: false, defaultValue: "user" },
	},
	{ sequelize, modelName: "User" }
);

export default User;
