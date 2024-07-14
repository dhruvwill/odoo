import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: any) {
  const API_KEY = process.env.GOOGLE_BOOKS_API_KEY!;
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 },
    );
  }

  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${query}&key=${API_KEY}
      `,
    );

    // console.log(response.data.items);
    return NextResponse.json(response.data);
    // res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { error: "Error fetching books" },
      { status: 500 },
    );
  }
}
