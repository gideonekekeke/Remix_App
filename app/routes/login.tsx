import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Link, useActionData } from "@remix-run/react";
import { authenticator } from "~/utils/auth.server";
import { useState } from "react";

export const loader: LoaderFunction = async ({ request }) => {
	const user = await authenticator.isAuthenticated(request, {
		successRedirect: "/",
	});
	return { user };
};

export const action: ActionFunction = async ({ request }) => {
	return authenticator.authenticate("form", request, {
		successRedirect: "/",
		failureRedirect: "/login",
	});
};

export default function Login() {
	const actionData: any = useActionData();
	const [formData, setFormData] = useState({
		email: actionData?.fields?.email || "",
		password: actionData?.fields?.password || "",
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
					name='email'
					onChange={handleInputChange}
					value={formData.email}
					className='w-[400px] border h-[35px] mb-4 mt-2'
					placeholder='enter email'
				/>
				<br />
				<input
					name='password'
					onChange={handleInputChange}
					value={formData.password}
					className='w-[400px] border h-[35px] mb-4 mt-2'
					placeholder='enter password'
				/>
				<br />
				<button className='bg-blue-700 text-white pl-5 pr-5 p-2'>Submit</button>
			</form>
			<p>
				Dont't have an account? <Link to='/signup'>Register</Link>
			</p>
		</div>
	);
}
