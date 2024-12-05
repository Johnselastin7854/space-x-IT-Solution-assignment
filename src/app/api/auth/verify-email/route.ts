import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { email, code } = data;

    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        {
          status: 404,
        },
      );
    }

    if (user.isVerfied) {
      return NextResponse.json(
        { error: "User is already verified" },
        { status: 400 },
      );
    }

    if (user.userVerifyToken !== code) {
      return NextResponse.json(
        { error: "Invalid verification code" },
        { status: 400 },
      );
    }

    const currentTime = new Date();
    if (
      user.userVerifyTokenExpiry &&
      currentTime > user.userVerifyTokenExpiry
    ) {
      return NextResponse.json(
        { error: "Verification code has expired" },
        { status: 400 },
      );
    }

    await db.user.update({
      where: { email },
      data: {
        userVerifyToken: null,
        userVerifyTokenExpiry: null,
        isVerfied: true,
      },
    });
    return NextResponse.json({
      success: true,
      message: "Verification successfull",
    });
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
