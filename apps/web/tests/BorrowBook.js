const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function borrowBook(userId, bookId, dueDate) {
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

async function testBorrowBook() {
  try {
    const book = await db.book.findFirst({
      where: { availableQty: { gt: 0 } },
      select: { id: true },
    });

    const user = await db.user.findFirst({
      select: { id: true },
    });

    if (!book || !user) {
      console.error("No available book or user found for testing");
      return;
    }

    console.log(`Testing with Book ID: ${book.id} and User ID: ${user.id}`);

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    const borrowResult = await borrowBook(user.id, book.id, dueDate);
    console.log("Borrow result:", borrowResult);

    const updatedBook = await db.book.findUnique({
      where: { id: book.id },
      select: { availableQty: true },
    });

    console.log("Updated book available quantity:", updatedBook.availableQty);

    const borrowRecord = await db.borrow.findFirst({
      where: { userId: user.id, bookId: book.id, status: "BORROWED" },
    });

    console.log("Borrow record:", borrowRecord);
  } catch (error) {
    console.error("Error during test:", error);
  } finally {
    await db.$disconnect();
  }
}

testBorrowBook();
