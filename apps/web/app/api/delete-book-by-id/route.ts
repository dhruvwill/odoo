import { NextResponse } from "next/server";
import { db } from "~/lib/db";

export async function POST(req: Request) {
  const body = await req.json();
  const bookId = body.data.id;

  if (!bookId) {
    return NextResponse.json({ status: "error" });
  }

  try {
    const numericId = Number(bookId);
    if (isNaN(numericId)) {
      throw new Error("Invalid ID provided");
    }

    const book = await db.book.delete({
      where: {
        id: bookId,
      },
    });
    console.log("Book", book);
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
