import express from "express";
import dotenv from "dotenv";
import errorHandler from "./middleware/errorHandler";
import adminRoutes from "./routes/adminRoutes";
import userRoutes from "./routes/userRoutes";
import sequelize from "./config/db";
import authRoutes from "./routes/authRoutes";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
	message: "Too many requests from this IP, please try again later.",
});

dotenv.config();

const app = express();
app.use(express.json());
app.use(limiter);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/user", userRoutes);

app.use(errorHandler);

sequelize.sync().then(() => console.log("Database connected"));

export default app;
