/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
	try {
		const requestBody = await request.json();
		const { token, newPassword } = requestBody;
		const user = await User.findOne({
			forgotPasswordToken: token,
			forgotPasswordTokenExpiry: { $gt: Date.now() },
		});
		if (!user) {
			return NextResponse.json(
				{
					error: "User not found. Invalid token",
				},
				{ status: 400 }
			);
		}
		const hashPassword = await bcryptjs.hash(newPassword, 11);
		user.password = hashPassword;
		user.forgotPasswordToken = undefined;
		user.forgotPasswordTokenExpiry = undefined;
		await user.save();
		const response = NextResponse.json(
			{ message: "Password changed" },
			{ status: 200 }
		);
		response.cookies.set("token", "", {
			httpOnly: true,
			expires: new Date(0),
		});
		return response;
	} catch (error: any) {
		return NextResponse.json(
			{ message: "ERROR: " + error.message },
			{ status: 400 }
		);
	}
}
