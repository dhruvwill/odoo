import axios from "axios";
import { db } from "~/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ status: "error" });
  }
  try {
    const numericId = Number(id);
    if (isNaN(numericId)) {
      throw new Error("Invalid ID provided");
    }
    const books = await db.book.findUnique({
      where: {
        id: numericId,
      },
    });
    if (!books) {
      return NextResponse.json({
        status: "error",
        messsage: "no book found with that id",
      });
    }
    // const books = [];
    console.log("ABCDEFGH Books returned:", books);
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
