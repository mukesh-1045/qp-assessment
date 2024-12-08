import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

class AuthController {
	static async createUser(req: Request, res: Response): Promise<void> {
		try {
			const { email, password, role } = req.body;
			const hashedPassword = await bcrypt.hash(password, 10);
			const user = await User.create({ email, password: hashedPassword, role });
			res.status(201).json({ message: "User created", user });
		} catch (err: any) {
			res
				.status(500)
				.json({ message: "Error creating user", error: err.message });
		}
	}

	static async generateToken(req: Request, res: Response): Promise<void> {
		try {
			const { email, password } = req.body;
			const user = await User.findOne({ where: { email } });
			if (!user) {
				res.status(404).json({ message: "User not found" });
				return;
			}

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				res.status(401).json({ message: "Invalid credentials" });
				return;
			}

			const token = jwt.sign(
				{ id: user.id, role: user.role },
				process.env.JWT_SECRET!,
				{ expiresIn: "1h" }
			);
			res.status(200).json({ token });
		} catch (err: any) {
			res
				.status(500)
				.json({ message: "Error generating token", error: err.message });
		}
	}
}

export default AuthController;
