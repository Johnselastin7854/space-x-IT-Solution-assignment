import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json(
      {
        message: "Logout Successfully",
        success: true,
      },
      {
        status: 200,
      },
    );
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    });
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
