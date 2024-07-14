"use client";
import React from "react";
import BookCard from "~/components/dashboard/BookCard";
import ReactPaginate from "react-paginate";
import { db } from "~/lib/db";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import { notFound } from "next/navigation";
import axios from "axios";

const demoBooks = [
  {
    title: "Demo 1",
    description: "hello1",
    imageSrc:
      "http://books.google.com/books/content?id=yDB0tAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    timeRemaining: "3 days",
  },
  {
    title: "Demo 1",
    description: "hello1",
    imageSrc:
      "http://books.google.com/books/content?id=yDB0tAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    timeRemaining: "3 days",
  },
  {
    title: "Demo 1",
    description: "hello1",
    imageSrc:
      "http://books.google.com/books/content?id=yDB0tAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    timeRemaining: "3 days",
  },
  {
    title: "Demo 1",
    description: "hello1",
    imageSrc:
      "http://books.google.com/books/content?id=yDB0tAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    timeRemaining: "3 days",
  },
  {
    title: "Demo 1",
    description: "hello1",
    imageSrc:
      "http://books.google.com/books/content?id=yDB0tAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    timeRemaining: "3 days",
  },
];

function SearchResults({ query }: { query: string }) {
  const [books, setBooks] = useState([]);
  query = query.replace(/^"|"$/g, "");

  // Encode the query parameter
  const encodedQuery = encodeURIComponent(query);
  useEffect(() => {
    async function fetchBook() {
      // const res = await axios.get(`/api/get-book?query=${encodedQuery}`);
      // setBooks(res.data);
    }
    fetchBook();
  }, []);

  // if (books.length === 0) {
  //   return <p>No books found for "{query}"</p>;
  // }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {demoBooks.map((book: any, idx: number) => (
        <BookCard
          key={idx}
          title={book.title}
          description={book.description}
          imageSrc={book.imageUrl}
          timeRemaining={book.timeRemaining}
        />
      ))}
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

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  if (!query) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <SearchResults query={query} />
      {/* </Suspense> */}
    </div>
  );
}
