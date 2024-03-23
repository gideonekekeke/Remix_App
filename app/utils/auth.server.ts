import { Authenticator, AuthorizationError } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { Prisma, prisma } from "./prisma.server";
import bcrypt from "bcryptjs";
import { sessionStorage } from "./session.server";

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
	throw new Error("you need to add a SESSION_SECRET");
}

const authenticator = new Authenticator<any>(sessionStorage);

const formStrategy = new FormStrategy(async ({ form }: any) => {
	let fullname = form.get("fullname");
	let email = form.get("email");
	let password = form.get("password");
	let user = await prisma.user.findUnique({
		where: { email },
	});

	if (!user) {
		console.log("you entered a wrong email address");
		throw new AuthorizationError();
	}

	const passwordMatch = await bcrypt.compare(password, user.password as string);

	if (!passwordMatch) {
		throw new AuthorizationError();
	}

	return user;
});

authenticator.use(formStrategy, "form");

export { authenticator };
