"use client";

import Navbar from "~/components/Navbar";
import SearchBar from "~/components/dashboard/SearchBar";
import { useUser } from "@clerk/nextjs";
import Book from "~/components/dashboard/Book";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const { isSignedIn, user } = useUser();
  const [newArrivals, setNewArrivals] = useState([]);
  const [trending, setTrending] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        setIsLoading(true);
        const [newArrivalsRes, trendingRes] = await Promise.all([
          axios.get("https://www.googleapis.com/books/v1/volumes", {
            params: {
              q: "subject:fiction",
              orderBy: "newest",
              printType: "books",
              maxResults: 8,
            },
          }),
          axios.get("https://www.googleapis.com/books/v1/volumes", {
            params: {
              q: "bestseller",
              orderBy: "relevance",
              printType: "books",
              maxResults: 7,
            },
          }),
        ]);
        console.log("New Arrivals:", newArrivalsRes.data.items);
        setNewArrivals(newArrivalsRes.data.items);
        setTrending(trendingRes.data.items);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (isSignedIn) {
      fetchBooks();
    }
  }, [isSignedIn]);

  const renderBooks = (books: any) => {
    return books.map((book: any) => (
      <Book
        key={book.id}
        imageSrc={book.volumeInfo.imageLinks?.thumbnail || ""}
        title={book.volumeInfo.title}
        description={
          book.volumeInfo.description?.slice(0, 100) + "..." ||
          "No description available."
        }
        author={book.volumeInfo.authors?.[0] || "Unknown"}
        publicationYear={book.volumeInfo.publishedDate?.split("-")[0] || "N/A"}
        rating={book.volumeInfo.averageRating || 0}
      />
    ));
  };

  return (
    <main className="no-scrollbar">
      <Navbar />
      <div className="w-full max-w-6xl px-4 py-8 mx-auto ">
        {isSignedIn && (
          <div className="flex flex-col gap-6  overflow-y-auto h-screen no-scrollbar">
            <h1 className="text-xl font-extrabold text-center text-gray-900 dark:text-white md:text-2xl lg:text-4xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                Search Your
              </span>{" "}
              Favourite Books...
            </h1>
            <hr className="border-gray-300 dark:border-gray-700" />
            <SearchBar />
            {isLoading ? (
              <p className="text-center">Loading books...</p>
            ) : (
              <div className="flex flex-col gap-6 lg:flex-row">
                <div className="flex-1">
                  <h2 className="mb-4 text-xl font-semibold text-center text-gray-900 dark:text-white">
                    New Arrivals...
                  </h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
                    {renderBooks(newArrivals)}
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="mb-4 text-xl font-semibold text-center text-gray-900 dark:text-white">
                    Trending...
                  </h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
                    {renderBooks(trending)}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
