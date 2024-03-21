import { Outlet } from "@remix-run/react";

export default function Dashboard() {
	return (
		<div>
			<div>Header</div>
			<div>Sidebar</div>
			<div>
				<Outlet />
			</div>
		</div>
	);
}
