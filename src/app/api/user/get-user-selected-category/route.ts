import { NextResponse, NextRequest } from "next/server";
import { getTokenData } from "~/helpers/getTokenData";
import { db } from "~/server/db";

export async function GET(request: NextRequest) {
  try {
    const userData: any = getTokenData(request);

    const userCategories = await db.userCategory.findMany({
      where: { userId: userData?.id },
      include: {
        category: true,
      },
    });

    const selectedCategoryIds = userCategories.map(
      (userCategory) => userCategory.categoryId,
    );

    return NextResponse.json({ data: selectedCategoryIds });
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
