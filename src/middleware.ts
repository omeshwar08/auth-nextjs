import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	const url = request.nextUrl.pathname;
	const publicUrl =
		url === "/login" ||
		url === "/signup" ||
		url === "/verifyemail" ||
		url === "/forgetpassword";
	const token = request.cookies.get("token")?.value || "";
	if (publicUrl && token) {
		return NextResponse.redirect(new URL("/profile", request.nextUrl));
	}
	if (!publicUrl && !token) {
		return NextResponse.redirect(new URL("/login", request.nextUrl));
	}
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: [
		"/login",
		"/signup",
		"/profile",
		"/",
		"/profile/:path*",
		"/verifyemail",
		"/forgetpassword",
	],
};
