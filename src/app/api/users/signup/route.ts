/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/db/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

await connect();

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { username, email, password } = requestBody;

    if (!username || !email || !password) {
      return NextResponse.json({
        error: "username, email and password are required",
        status: 400,
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json({ error: "User already exists", status: 400 });
    }

    const salt = await bcryptjs.genSalt(11);
    const hashPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });
    const savedUser = await newUser.save();
    return NextResponse.json({
      message: "User created successfully",
      user: savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
