import { prisma } from "./prisma.server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const RegisterUser = async (user: any) => {
	const passwordHash = await bcrypt.hash(user.password, 12);

	const newUser = await prisma.user.create({
		data: {
			email: user.email,
			fullname: user.fullname,
			password: passwordHash,
		},
	});

	return {
		id: newUser.id,
		email: user.email,
		fullname: user.fullname
	};
};
