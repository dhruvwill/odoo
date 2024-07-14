"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import ReactPaginate from "react-paginate";

// types.ts
export interface Book {
  id: number;
  isbn: string;
  title: string;
  imageUrl: string;
  author: string;
  description: string;
  publisher: string;
  year: number;
  genre: string;
  quantity: number;
  availableQty: number;
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const booksPerPage = 1; // Adjust this number as needed

  // Calculate the index range for the current page
  const offset = currentPage * booksPerPage;
  const [books, setBooks] = useState<Book[]>([]);
  const currentPageBooks = books.slice(offset, offset + booksPerPage);
  const router = useRouter();

  useEffect(() => {
    // Fetch books from the API
    fetch("/api/get-book")
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }, []);

  const handleBorrow = (bookId: number) => {
    router.push(`/books/${bookId}`);
  };

  const handlePageChange = ({ selected }: any) => {
    setCurrentPage(selected);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Library Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPageBooks.map((book) => (
          <Card key={book.id} className="flex flex-col">
            <CardHeader>
              <div className="aspect-w-2 aspect-h-3 mb-4">
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="object-cover rounded-lg"
                />
              </div>
              <CardTitle>{book.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-gray-500 mb-2">by {book.author}</p>
              <ScrollArea className="h-24 mb-2">
                <p className="text-sm">{book.description}</p>
              </ScrollArea>
              <div className="flex justify-between items-center mt-2">
                <Badge
                  variant={book.availableQty > 0 ? "success" : "destructive"}
                >
                  {book.availableQty > 0 ? "Available" : "Unavailable"}
                </Badge>
                <span className="text-sm">
                  {book.availableQty} of {book.quantity} left
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                disabled={book.availableQty === 0}
                onClick={() => handleBorrow(book.id)}
              >
                {book.availableQty > 0 ? "Borrow Now" : "Join Waitlist"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={Math.ceil(books.length / booksPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
        previousClassName={"page-item"}
        nextClassName={"page-item"}
        pageClassName={"page-item"}
        breakClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousLinkClassName={"page-link"}
        nextLinkClassName={"page-link"}
        breakLinkClassName={"page-link"}
      />
    </div>
  );
}
