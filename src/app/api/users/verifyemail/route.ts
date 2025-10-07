/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
	try {
		const requestBody = await request.json();
		const { token } = requestBody;
		const user = await User.findOne({
			verifyToken: token,
			verifyTokenExpiry: { $gt: Date.now() },
		});
		if (!user) {
			return NextResponse.json(
				{
					error: "User not found. Invalid token",
				},
				{ status: 400 }
			);
		}
		user.isVerified = true;
		user.verifyToken = undefined;
		user.verifyTokenExpiry = undefined;
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
