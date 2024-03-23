import { LoaderFunction } from "@remix-run/node";
import { Link, useActionData } from "@remix-run/react";
import { useState } from "react";
import { authenticator } from "~/utils/auth.server";
import { RegisterUser } from "~/utils/user.server";

export const loader: LoaderFunction = async ({ request }) => {
	const user = await authenticator.isAuthenticated(request, {
		successRedirect: "/",
	});
	return { user };
};
export async function action({ request }: any) {
	const form = await request.formData();
	const action = form.get("_action");
	const fullname = form.get("fullname");
	const email = form.get("email");
	const password = form.get("password");

	await RegisterUser({ fullname, email, password });

	return await authenticator.authenticate("form", request, {
		successRedirect: "/login",
		failureRedirect: "/signup",
		context: { formData: form },
	});
}
export default function Signup() {
	const actionData: any = useActionData();
	console.log("this is action", actionData);
	const [formData, setFormData] = useState({
		fullname: actionData?.field?.fullname || "",
		email: actionData?.field?.email || "",
		password: actionData?.field?.password || "",
	});

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData((form) => ({ ...form, [name]: value }));
	};

	return (
		<div className='flex mt-20 items-center flex-col shadow-sm '>
			<div className='text-[30px] font-bold'>Create an account</div>
			<form method='POST'>
				<input
					required
					value={formData.fullname}
					onChange={handleInputChange}
					name='fullname'
					className='w-[400px] border h-[35px] mb-4 mt-2'
					placeholder='enter your fullname'
				/>
				<br />
				<input
					required
					value={formData.email}
					onChange={handleInputChange}
					name='email'
					className='w-[400px] border h-[35px] mb-4 mt-2'
					placeholder='enter email'
				/>
				<br />
				<input
					required
					value={formData.password}
					onChange={handleInputChange}
					name='password'
					className='w-[400px] border h-[35px] mb-4 mt-2'
					placeholder='enter password'
				/>
				<br />
				<button className='bg-blue-700 text-white pl-5 pr-5 p-2'>Submit</button>
			</form>
			<p>
				Already have an account? <Link to='/login'>Login</Link>
			</p>
		</div>
	);
}
