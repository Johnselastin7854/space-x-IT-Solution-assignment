import { NextResponse, NextRequest } from "next/server";
import { getTokenData } from "~/helpers/getTokenData";
import { db } from "~/server/db";

export async function POST(request: NextRequest) {
  try {
    const userData: any = await getTokenData(request);
    const { selectedCategories } = await request.json();
    console.log(selectedCategories, "api");
    const userCategories = selectedCategories.map((category: any) => ({
      userId: userData?.id,
      categoryId: category,
    }));

    await db.userCategory.createMany({
      data: userCategories,
    });
    return NextResponse.json({ message: "Categories saved successfully" });
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
