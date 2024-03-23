import { Link } from "@remix-run/react";

export default function Login() {
	return (
		<div className='flex mt-20 items-center flex-col shadow-sm '>
			<div className='text-[30px] font-bold'>Create an account</div>
			<form>
				<input
					className='w-[400px] border h-[35px] mb-4 mt-2'
					placeholder='enter email'
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
