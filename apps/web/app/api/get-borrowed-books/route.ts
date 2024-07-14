import { NextResponse } from "next/server";
import { db } from "~/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id");

  if (!userId) {
    return NextResponse.json({ message: "userID is required" });
  }

  try {
    console.log("Fetching books");

    const books = await db.borrow.findMany({
      where: {
        userId,
      },
      include: {
        book: true,
      },
    });

    console.log("Books fetched");

    return NextResponse.json({ books });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ status });
  }
}
