/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

const ProfilePage: React.FC = () => {
	const router = useRouter();

	const handleLogout = async () => {
		try {
			await axios.get("/api/users/logout");
			router.push("/login");
		} catch (error: any) {
			console.error(error);
			toast.error(error?.message || "Logout failed");
		}
	};

	const handleUserButton = async () => {
		try {
			const response = await axios.get("/api/users/me");
			const id = await response?.data?.data?._id;
			if (!id) {
				toast.error("Unable to get user id");
				return;
			}
			// navigate programmatically (no nested Link)
			router.push(`/profile/${id}`);
		} catch (error: any) {
			console.error(error);
			toast.error(error?.message || "Failed to fetch user");
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<Toaster />
			<h1>Profile Page</h1>

			<button
				className="btn btn-secondary my-2 p-2 border-2 rounded-xl"
				onClick={handleUserButton}
			>
				User Details
			</button>

			<button
				className="btn btn-primary p-2 mt-2 border-2 rounded-xl"
				onClick={handleLogout}
			>
				Logout
			</button>
		</div>
	);
};

export default ProfilePage;
