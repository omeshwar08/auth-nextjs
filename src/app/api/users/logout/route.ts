/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const response = NextResponse.json({
			message: "Logout Successfull",
			success: true,
		});
		response.cookies.set("token", "", {
			httpOnly: true,
			expires: new Date(0),
		});
		return response;
	} catch (error: any) {
		return NextResponse.json({
			error: "ERROR: " + error.message,
			success: false,
			status: 500,
		});
	}
}
