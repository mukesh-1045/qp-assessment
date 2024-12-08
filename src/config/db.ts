import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
	host: process.env.DB_HOST || "postgres",
	dialect: "postgres",
	username: process.env.DB_USERNAME || "postgres",
	password: process.env.DB_PASSWORD || "password",
	database: process.env.DB_NAME || "grocery_db",
});

export default sequelize;
