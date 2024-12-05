import { NextResponse, NextRequest } from "next/server";
import { db } from "~/server/db";
import bcrypt from "bcrypt";
import { verifyEmail } from "~/helpers/verifyEmailer";

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        {
          error: "All fields are required",
        },
        {
          status: 400,
        },
      );
    }

    const exsistingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (exsistingUser) {
      return NextResponse.json(
        {
          error: "Email already exists",
        },
        {
          status: 400,
        },
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await db.user.create({
      data: {
        name: username,
        email,
        password: hashedPassword,
      },
    });

    await verifyEmail(email);

    return NextResponse.json(
      {
        message: "User Created successfully",
        success: true,
      },
      {
        status: 201,
      },
    );
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json(
        {
          error: err.message,
        },
        {
          status: 500,
        },
      );
    }
  }
}
