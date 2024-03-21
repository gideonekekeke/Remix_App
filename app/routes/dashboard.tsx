import { Outlet } from "@remix-run/react";
export default function Dashboard() {
	return (
		<div>
			<div className='text-[30px] bg-red-700 text-white'>Header</div>
			<div>Sidebar</div>
			<div>
				<Outlet />
			</div>
		</div>
	);
}
