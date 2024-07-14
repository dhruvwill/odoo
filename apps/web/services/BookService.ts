import { db } from "~/lib/db";

async function borrowBook(userId: string, bookId: number, dueDate: Date) {
  return db.$transaction(async (tx) => {
    const book = await tx.book.findUnique({
      where: { id: bookId },
      select: { availableQty: true },
    });

    if (!book || book.availableQty < 1) {
      throw new Error("Book is not available for borrowing");
    }

    const borrow = await tx.borrow.create({
      data: {
        userId,
        bookId,
        dueDate,
        status: "BORROWED",
      },
    });

    await tx.book.update({
      where: { id: bookId },
      data: { availableQty: { decrement: 1 } },
    });

    return borrow;
  });
}
