export const loader = ({ request }: any) => {
	const data = {
		take: 20,
		select: { id: true, title: true, createdAt: true },
		orderBy: { createdAt: "desc" },
	};

	return data;
};
export const about = () => {
	return <div>about</div>;
};
