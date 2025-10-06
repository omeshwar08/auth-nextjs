/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

const ProfilePage = () => {
	const router = useRouter();
	const handleLogout = async function () {
		try {
			const response = await axios.get("/api/users/logout");
			router.push("/login");
		} catch (error: any) {
			console.log(error.message);
		}
	};
	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<h1>ProfilePage</h1>
			<button
				className="btn btn-primary mt-2 rounded-xl border-2 cursor-pointer"
				onClick={handleLogout}
			>
				Logout
			</button>
		</div>
	);
};

export default ProfilePage;
