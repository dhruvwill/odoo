"use client";
import { Separator } from "@repo/ui/components/ui/separator";
import React, { useState, useEffect } from "react";
import SearchBar from "~/components/dashboard/SearchBar";
import ProfileCard from "~/components/user/ProfileCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table";
import { Input } from "@repo/ui/components/ui/input";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

type Props = {};
const Page = (props: Props) => {
  const { isSignedIn, isLoaded, user } = useUser();

  if (!isSignedIn) {
    return null;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          "/api/get-borrowed-books?id=" + user.id,
        ); // Adjust this URL to your actual API endpoint
        if (response.status !== 200) {
          throw new Error("Failed to fetch books");
        }
        const data = await response.data;
        console.log(data.books);
        setBooks(data.books);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching books",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const filtered = books.filter((book) =>
      Object.values(book).some((value: any) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
    setFilteredBooks(filtered);
  }, [searchTerm, books]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <main className="h-[calc(100vh-64px)] max-w-7xl mx-auto px-8">
      <div className="mx-auto flex flex-col-reverse md:flex-row gap-3 w-full justify-between py-5">
        <div className="md:w-2/3 w-full flex flex-col items-center justify-between gap-5">
          <div className="w-full">
            <h1 className="text-xl font-semibold my-0">Search For Books</h1>
            <Separator className="my-3 h-[2px]" />
            <SearchBar className="w-full" />
          </div>
          <div className="flex-grow w-full my-3">
            <h1 className="text-xl font-semibold my-0">My Books</h1>
            <Separator className="my-3 h-[2px]" />
            <div className="bg-white overflow-hidden shadow rounded-lg border">
              <div className="p-6">
                <div className="flex justify-between mb-4 gap-2">
                  <Input
                    className="w-full"
                    placeholder="Search books..."
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
                {isLoading ? (
                  <p>Loading books...</p>
                ) : error ? (
                  <p className="text-red-500">{error}</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Genre</TableHead>
                        <TableHead>Year</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBooks.map((book: any, index) => (
                        <TableRow key={index}>
                          <TableCell>{book.book.title}</TableCell>
                          <TableCell>{book.book.author}</TableCell>
                          <TableCell>{book.book.genre}</TableCell>
                          <TableCell>{book.book.year}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </div>
          </div>
        </div>
        <ProfileCard />
      </div>
    </main>
  );
};

export default Page;
