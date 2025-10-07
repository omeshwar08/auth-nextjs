/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async function ({ emailType, email, userId }: any) {
	try {
		const hashToken = await bcryptjs.hash(userId.toString(), 11);
		if (emailType === "VERIFY") {
			await User.findByIdAndUpdate(
				{ _id: userId },
				{
					verifyToken: hashToken,
					verifyTokenExpiry: Date.now() + 60 * 60 * 1000,
				}
			);
		} else if (emailType === "RESET") {
			console.log("--------------------Email Sent--------------------");
			console.log({ email, emailType, userId });
			await User.findByIdAndUpdate(
				{ _id: userId },
				{
					forgotPasswordToken: hashToken,
					forgotPasswordTokenExpiry: Date.now() + 60 * 60 * 1000,
				}
			);
		}

		const transport = nodemailer.createTransport({
			host: "sandbox.smtp.mailtrap.io",
			port: 2525,
			auth: {
				user: process.env.NODEMAILER_USER,
				pass: process.env.NODEMAILER_PASS,
			},
		});
		const mailOptions = {
			from: "omeshwar_dev@gmail.com",
			to: email,
			subject: emailType === "VERIFY" ? "Verify your email" : "Reset password",
			html: `
            <p>
            Click <a href="${
							process.env.DOMAIN
						}/forgetpassword/?token=${hashToken}">here</a> to ${
				emailType === "VERIFY" ? "verify your email" : "reset your password"
			} or copy/paste the below link in your browser
            <br>
            ${process.env.DOMAIN}/verifyemail/?token=${hashToken}
            </p>
            `,
		};
		const mailResponse = await transport.sendMail(mailOptions);
		return mailResponse;
	} catch (error: any) {
		throw new Error(error.message);
	}
};
