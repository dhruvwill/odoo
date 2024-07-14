"use client";
import React from "react";
import BookCard from "~/components/dashboard/BookCard";
import ReactPaginate from "react-paginate";
import { db } from "~/lib/db";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import { notFound } from "next/navigation";
import axios from "axios";

function SearchResults({ query }: { query: string }) {
  const [currentPage, setCurrentPage] = useState(0);
  const booksPerPage = 1; // Adjust this number as needed

  // Calculate the index range for the current page
  const offset = currentPage * booksPerPage;
  const [books, setBooks] = useState([]);

  const currentPageBooks = books.slice(offset, offset + booksPerPage);
  query = query.replace(/^"|"$/g, "");

  // Encode the query parameter
  const encodedQuery = encodeURIComponent(query);
  useEffect(() => {
    async function fetchBook() {
      const res = await axios.get(`/api/get-book?query=${encodedQuery}`);
      setBooks(res.data);
      console.log(res.data);
    }
    fetchBook();
  }, []);

  const handlePageChange = ({ selected }: any) => {
    setCurrentPage(selected);
  };

  // if (books.length === 0) {
  //   return <p>No books found for "{query}"</p>;
  // }

  return (
    <>
      {books.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentPageBooks.map((book: any, idx: number) => (
              <BookCard
                id={book.id}
                key={idx}
                title={book.title}
                description={book.description}
                imageSrc={book.imageUrl}
              />
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
        </>
      ) : (
        <p>Couldnt find book with this name</p>
      )}
    </>
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
