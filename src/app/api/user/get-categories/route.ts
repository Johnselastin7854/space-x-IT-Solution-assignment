import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = (searchParams.get("page") as string) || "1";
  const limitNumber = (searchParams.get("skip") as string) || "6";

  try {
    const categories = await db.category.findMany({
      skip: (parseInt(page) - 1) * parseInt(limitNumber),
      take: parseInt(limitNumber),
    });

    const totalCategoriesCount = await db.category.count();
    const totalPages = Math.ceil(totalCategoriesCount / parseInt(limitNumber));

    return NextResponse.json({ categories, totalPages, currentPage: page });
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
