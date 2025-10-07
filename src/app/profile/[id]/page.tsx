import React from "react";

type Props = {
	params: { id: string };
};

export default async function UserProfile({ params }: Props) {
	// Await params in case it's a Promise (required by Next)
	const { id } = await params;
	return (
		<div>
			<h1>User Profile</h1>
			<p>ID: {id}</p>
		</div>
	);
}
