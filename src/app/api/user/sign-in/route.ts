import { NextResponse, NextRequest } from "next/server";
import { db } from "~/server/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "~/env";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }
    const user = await db.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const tokenData = {
      id: user.id,
      username: user.name,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, env.TOKEN_SECRET!, {
      expiresIn: "8h",
    });

    const response = NextResponse.json(
      { message: "Login successful", success: true },
      {
        status: 200,
      },
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 8 * 60 * 60 * 1000),
    });

    return response;
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
