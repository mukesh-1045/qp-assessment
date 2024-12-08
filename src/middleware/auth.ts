import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";

export const authenticate = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const token = req.headers.authorization?.split(" ")[1];
	if (!token) {
		res.status(401).json({ message: "Unauthorized" });
		return;
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
		const user = await User.findByPk(decoded.id);
		if (!user) {
			res.status(404).json({ message: "User not found" });
			return;
		}
		(req as any).user = user;
		next();
	} catch (error) {
		res.status(403).json({ message: "Forbidden" });
	}
};

export const authorize =
	(role: string) =>
	(req: Request, res: Response, next: NextFunction): void => {
		if (!(req as any).user || (req as any).user.role !== role) {
			res.status(403).json({ message: "Access denied" });
			return;
		}
		next();
	};
