import { db } from "~/lib/db";

export async function borrowBook(
  userId: string,
  bookId: number,
  dueDate: Date,
) {
  console.log("Inside borrow book function");

  return db.$transaction(async (tx) => {
    // Check if the user exists
    const user = await tx.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }

    // Check if the book exists and its available quantity
    const book = await tx.book.findUnique({
      where: { id: bookId },
      select: { availableQty: true },
    });

    if (!book) {
      throw new Error(`Book with id ${bookId} not found`);
    }

    if (book.availableQty < 1) {
      throw new Error(`Book with id ${bookId} is not available for borrowing`);
    }

    // Create the borrow record
    const borrow = await tx.borrow.create({
      data: {
        userId,
        bookId,
        dueDate,
        status: "BORROWED",
      },
    });

    console.log("Book borrowed:", borrow);

    // Update the book's available quantity
    await tx.book.update({
      where: { id: bookId },
      data: { availableQty: { decrement: 1 } },
    });

    const updatedBook = await tx.book.findUnique({
      where: { id: bookId },
      select: { availableQty: true },
    });

    console.log("Updated book quantity:", updatedBook);

    return borrow;
  });
}
