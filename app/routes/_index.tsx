import { json, type MetaFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

// export async function loader() {
	// return json({ message: "wowww it worked" });
// }
// 

export async function loader() {
	const data = await fetch("https://fakestoreapi.com/products");
	return json(await data.json());
}

export default function Index() {
	const data: any = useLoaderData();

  console.log(data);
	return (
		<div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
			<div>Welcome home</div>
			<div>Api integration</div>
		</div>
	);
}
