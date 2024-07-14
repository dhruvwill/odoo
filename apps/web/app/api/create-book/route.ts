import { NextResponse, NextRequest } from "next/server";
import { db } from "~/lib/db"; // Adjust this import based on where you initialize Prisma

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      isbn,
      title,
      imageUrl,
      author,
      publisher,
      year,
      genre,
      quantity,
      availableQty,
      price,
      description,
    } = body;

    // // Validate required fields
    // if (
    //   !isbn ||
    //   !title ||
    //   !author ||
    //   !publisher ||
    //   !year ||
    //   !genre ||
    //   !quantity
    // ) {
    //   return NextResponse.json(
    //     // { error: "Missing required fields" },
    //     { error: "Missing required fields" },
    //     { status: 400 },
    //   );
    // }

    // Create the book in the database
    const newBook = await db.book.create({
      data: {
        isbn,
        title,
        imageUrl: imageUrl || "",
        description: description || "",
        author,
        publisher,
        year,
        genre,
        quantity,
        availableQty: availableQty || quantity, // Default to quantity if not provided
        price,
      },
    });

    return NextResponse.json(newBook, { status: 201 });
  } catch (error: any) {
    console.error("Error creating book:", error);

    // Check for unique constraint violation
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "A book with this ISBN already exists" },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { error: "An error occurred while creating the book" },
      { status: 500 },
    );
  }
}
