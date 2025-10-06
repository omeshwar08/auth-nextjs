/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/db/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
	try {
		const requestBody = await request.json();
		const { email, password } = requestBody;

		const user = await User.findOne({ email });

		if (!user) {
			return NextResponse.json({
				error: "User does not exists",
				success: false,
				status: 400,
			});
		}
		const validPassword = await bcryptjs.compare(password, user.password);
		if (!validPassword) {
			return NextResponse.json({
				error: "password is invalid",
				status: 400,
			});
		}
		if (!validPassword) {
			return NextResponse.json({ error: "Invalid password", status: 400 });
		}

		const tokenData = {
			id: user._id,
		};
		const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
			expiresIn: "1d",
		});
		const response = NextResponse.json({
			message: "Login Successfull",
			success: true,
		});
		response.cookies.set("token", token, {
			httpOnly: true,
		});
		return response;
	} catch (error: any) {
		return NextResponse.json({ error: "Error", message: error.message });
	}
}
