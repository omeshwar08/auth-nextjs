/* eslint-disable @typescript-eslint/no-explicit-any */
import { sendEmail } from "@/helpers/mailer";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { connect } from "@/db/db";

connect();

export async function POST(request: NextRequest) {
	try {
		console.log("--------------------Forget Password--------------------");
		const userId = await getDataFromToken(request);
		console.log(userId);
		const user = await User.findById({ _id: userId });
		console.log(user);
		await sendEmail({ emailType: "RESET", email: user?.email, userId });
		return NextResponse.json(
			{ message: "Email sent successfully" },
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{ error: "ERROR: " + error.message },
			{ status: 400 }
		);
	}
}
