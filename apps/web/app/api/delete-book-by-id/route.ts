import { NextResponse } from "next/server";
import { db } from "~/lib/db";

export async function POST(req: Request) {
  const bookId = req.body;

  if (!bookId) {
    return NextResponse.json({ status: "error" });
  }

  try {
    console.log("Book ID:", bookId);
    const numericId = Number(bookId);
    if (isNaN(numericId)) {
      throw new Error("Invalid ID provided");
    }

    const book = await db.book.delete({
      where: {
        id: bookId,
      },
    });
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
