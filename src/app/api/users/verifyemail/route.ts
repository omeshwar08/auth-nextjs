/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
	try {
		const requestBody = await request.json();
		const { token } = requestBody;
		console.log("-----User verification starts-----");
		console.log(token);
		console.log(new Date(Date.now()));
		const user = await User.findOne({
			verifyToken: token,
			verifyTokenExpiry: { $gt: Date.now() },
		});
		console.log(user);
		if (!user) {
			return NextResponse.json(
				{
					error: "User not found. Invalid token",
				},
				{ status: 400 }
			);
		}
		console.log(
			"------------------------------User Verification------------------------------"
		);
		console.log(user);
		user.isVerified = true;
		user.verifyToken = undefined;
		user.verifyTokenExpiry = undefined;
		console.log(user);
		await user.save();
		return NextResponse.json({
			message: "User is verified successfully",
			success: true,
		});
	} catch (error: any) {
		return NextResponse.json(
			{ error: "ERROR " + error.message },
			{ status: 500 }
		);
	}
}
