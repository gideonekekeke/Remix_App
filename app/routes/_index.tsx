import { json, type MetaFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export function loader() {
	return json({ message: "wowww it worked" });
}

export default function Index() {
	const data: any = useLoaderData();
	return (
		<div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
			<div>Welcome home</div>
			<Outlet />
		</div>
	);
}
