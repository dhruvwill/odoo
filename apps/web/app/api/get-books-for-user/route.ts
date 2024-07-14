import { db } from "~/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "ID parameter is required" },
      { status: 400 },
    );
  }

  try {
    const books = await db.user.findUnique({
      where: {
        id,
      },
      include: {
        borrowedBooks: true, // This includes the borrowed books relation
      },
    });
    if (!books) {
      return NextResponse.json({
        status: "success",
        messsage: "no books found",
      });
    }
    return NextResponse.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);

    // Log more details about the error
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }

    return NextResponse.json(
      {
        error: "Error fetching books",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
