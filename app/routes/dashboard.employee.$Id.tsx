import { useParams } from "@remix-run/react";

export default function SingleEmployee() {
	const { id } = useParams();
	return <div>Gideon ekeke {id}</div>;
}
