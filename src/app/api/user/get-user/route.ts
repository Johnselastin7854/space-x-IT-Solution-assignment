import { NextRequest, NextResponse } from "next/server";
import { getTokenData } from "~/helpers/getTokenData";
import { db } from "~/server/db";

export async function GET(request: NextRequest) {
  try {
    const userData: any = await getTokenData(request);
    const user = await db.user.findUnique({
      where: {
        id: userData?.id,
      },
      select: {
        email: true,
        name: true,
        id: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
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
