/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function VerifyEmail() {
	const [token, setToken] = useState("");
	const [verified, setVerified] = useState(false);
	const router = useRouter();

	const verifyEmail = async () => {
		try {
			const response = await axios.post("/api/users/verifyemail", { token });
			setVerified(true);
			router.push("/login");
		} catch (error: any) {
			console.error(error.message);
			toast.error(
				error.response?.data?.message || "Email verification failed ❌"
			);
		}
	};

	useEffect(() => {
		// const urlToken = window.location.search.split("=")[1];
		// setToken(urlToken || "");
		const params = new URLSearchParams(window.location.search);
		const urlToken = params.get("token") || ""; // or the query key you use
		setToken(urlToken);
	}, []);

	useEffect(() => {
		if (token.length > 0) {
			verifyEmail();
		}
	}, [token]);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<Toaster position="top-center" reverseOrder={false} />
			<h1 className="text-4xl mb-4">Verify Email</h1>

			<h2 className="p-2 bg-orange-500 text-black rounded">
				{token ? `${token}` : "No token found"}
			</h2>

			<h2 className="mt-4 text-lg font-semibold">
				{verified ? "✅ Verified" : "⏳ Verifying..."}
			</h2>
		</div>
	);
}
