const axios = require("axios");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function fetchBookData(isbn) {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`,
    );
    const bookData = response.data.items[0].volumeInfo;
    return {
      isbn: isbn,
      title: bookData.title,
      author: bookData.authors ? bookData.authors.join(", ") : "Unknown",
      publisher: bookData.publisher || "Unknown",
      year: bookData.publishedDate
        ? parseInt(bookData.publishedDate.substring(0, 4))
        : 0,
      genre: bookData.categories ? bookData.categories[0] : "Uncategorized",
      quantity: 10,
      availableQty: 10,
    };
  } catch (error) {
    console.error(`Error fetching data for ISBN ${isbn}:`, error);
    return null;
  }
}

async function addBookToDatabase(bookData) {
  try {
    const book = await prisma.book.create({
      data: bookData,
    });
    console.log(`Added book: ${book.title}`);
    return book;
  } catch (error) {
    console.error(`Error adding book to database:`, error);
    return null;
  }
}

async function addTenBooks() {
  const isbns = [
    "9781787123427",
    "9780061120084",
    "9780140283331",
    "9780743273565",
    "9780316769174",
    "9780062315007",
    "9780679783268",
    "9780451524935",
    "9780307474278",
    "9780547928227",
  ];

  for (const isbn of isbns) {
    const bookData = await fetchBookData(isbn);
    if (bookData) {
      await addBookToDatabase(bookData);
    }
  }

  console.log("Finished adding books");
}

addTenBooks()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
