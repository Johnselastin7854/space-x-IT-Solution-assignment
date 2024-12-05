import nodemailer from "nodemailer";
import { env } from "~/env";
import { db } from "~/server/db";

export const verifyEmail = async (email: string) => {
  try {
    const randomCode = Math.floor(
      10000000 + Math.random() * 90000000,
    ).toString();

    await db.user.update({
      where: {
        email: email,
      },
      data: {
        userVerifyToken: randomCode,
        userVerifyTokenExpiry: new Date(Date.now() + 3 * 60 * 1000),
      },
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: env.NODE_MAILER_EMAIL,
        pass: env.NODE_MAILER_PASS,
      },
    });

    await transporter.sendMail({
      from: env.NODE_MAILER_EMAIL,
      to: email,
      subject: "Your Verification Code",
      text: `Your verification code is: ${randomCode}`,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
