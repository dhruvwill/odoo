import axios from "axios";
import { db } from "~/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 },
    );
  }

  try {
    const books = await db.book.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { author: { contains: query, mode: "insensitive" } },
          { isbn: { contains: query, mode: "insensitive" } },
        ],
      },
      take: 20,
    });
    if (!books) {
      return NextResponse.json({
        status: "success",
        messsage: "no books found",
      });
    }
    // const books = [];
    console.log("Books returned:", books);
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
