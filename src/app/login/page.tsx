/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const LogInPage = () => {
	const [user, setUser] = useState({
		password: "",
		email: "",
	});
	const router = useRouter();
	const onLogIn = async () => {
		try {
			const response = await axios.post("/api/users/login", user);
			console.log(response.data);
			router.push("/profile");
		} catch (error: any) {
			console.log(error.message);
		}
	};

	return (
		<div className="flex justify-center items-center my-20">
			<div className="card bg-base-300 w-96 shadow-sm">
				<div className="card-body">
					<h2 className="text-center text-2xl font-bold">LogIn</h2>
					{/* email input box */}
					<label className="input validator my-1">
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
								<rect width="20" height="16" x="2" y="4" rx="2"></rect>
								<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
							</g>
						</svg>
						<input
							type="email"
							placeholder="user@gmail.com"
							value={user.email}
							required
							onChange={(e) => setUser({ ...user, email: e.target.value })}
						/>
					</label>
					<div className="validator-hint hidden">Enter valid email address</div>
					{/* password input box */}
					<label className="input validator my-1">
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
							value={user.password}
							onChange={(e) => setUser({ ...user, password: e.target.value })}
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
					<div className="card-actions justify-center">
						<button className="btn btn-primary" onClick={onLogIn}>
							LogIn
						</button>
					</div>
					<p className="text-center p-1 m-1 cursor-pointer">
						<Link href="/signup">Not Registered! SignUp Here</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default LogInPage;
