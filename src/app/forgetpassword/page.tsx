/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const ForgetPassword = () => {
	const [password, setPassword] = useState("");
	const router = useRouter();

	const forgetPasswordButton = async () => {
		try {
			const params = new URLSearchParams(window.location.search);
			const urlToken = params.get("token") || ""; // or the query key you use
			await axios.post("/api/users/changepassword", {
				token: urlToken,
				newPassword: password,
			});
			router.push("/login");
		} catch (error: any) {
			toast.error("Failed to update password - Error: " + error.message);
		}
	};
	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<Toaster position="top-center" reverseOrder={false} />
			<h1 className="text-2xl font-bold">Forget Password</h1>
			<label className="input validator my-2">
				<svg
					className="h-[1em] opacity-50"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
				>
					<g
						strokeLinejoin="round"
						strokeLinecap="round"
						strokeWidth="2.5"
						fill="none"
						stroke="currentColor"
					>
						<path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
						<circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
					</g>
				</svg>
				<input
					type="password"
					required
					placeholder="Password"
					minLength={8}
					pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
					title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</label>
			<p className="validator-hint hidden">
				Must be more than 8 characters, including
				<br />
				At least one number <br />
				At least one lowercase letter <br />
				At least one uppercase letter
			</p>
			{/* Login Button input box */}
			<div className="card-actions justify-center mt-2 p-2">
				<button className="btn btn-primary" onClick={forgetPasswordButton}>
					Submit
				</button>
			</div>
		</div>
	);
};

export default ForgetPassword;
