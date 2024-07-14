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

type Props = {};

type Book = {
  title: string;
  author: string;
  genre: string;
  year: number;
};

const Page = (props: Props) => {
  const [books, setBooks] = useState<Book[]>([
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Fiction",
      year: 1960,
    },
    { title: "1984", author: "George Orwell", genre: "Fiction", year: 1949 },
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Fiction",
      year: 1925,
    },
    // Add more books here
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  useEffect(() => {
    const filtered = books.filter((book) =>
      Object.values(book).some((value) =>
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
                    {filteredBooks.map((book, index) => (
                      <TableRow key={index}>
                        <TableCell>{book.title}</TableCell>
                        <TableCell>{book.author}</TableCell>
                        <TableCell>{book.genre}</TableCell>
                        <TableCell>{book.year}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
