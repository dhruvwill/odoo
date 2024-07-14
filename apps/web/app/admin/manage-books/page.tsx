"use client";
import React, { useState, useEffect } from "react";
import { Book, PlusCircle, Search, Trash2 } from "lucide-react";
import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@repo/ui/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { toast } from "@repo/ui/components/ui/use-toast";
import PageTitle from "~/components/dashboard/PageTitle";
import axios from "axios";
import Router from "next/router";

type BookType = {
  id: number;
  isbn: string;
  title: string;
  imageUrl: string;
  author: string;
  publisher: string;
  year: number;
  genre: string;
  quantity: number;
  availableQty: number;
  price: number;
  description?: string;
};

const LibraryPage = () => {
  const [books, setBooks] = useState<BookType[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<BookType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("all");
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [googleBooks, setGoogleBooks] = useState<any[]>([]);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingBook, setIsAddingBook] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<BookType | null>(null);

  const [addBookQuery, setAddBookQuery] = useState("");

  const handleDeleteClick = (book: BookType) => {
    setBookToDelete(book);
    setIsDeleteModalOpen(true);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    const filtered = books.filter(
      (book) =>
        (book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (genreFilter === "all" || book.genre === genreFilter),
    );
    setFilteredBooks(filtered);
  }, [searchTerm, genreFilter, books]);

  const fetchBooks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/get-book");
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      setBooks(data);
      setFilteredBooks(data);
    } catch (err) {
      setError(
        "An error occurred while fetching books. Please try again later.",
      );
      console.error("Error fetching books:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleGenreFilter = (value: string) => {
    setGenreFilter(value);
  };

  const searchGoogleBooks = async (query: string) => {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}`,
    );
    const data = await response.json();
    setGoogleBooks(data.items || []);
  };

  const handleDeleteConfirm = async () => {
    if (!bookToDelete) return;

    try {
      console.log("Deleting book:", bookToDelete);
      const response = await axios.post(`/api/delete-book-by-id`, {
        data: {
          id: bookToDelete.id,
        },
      });

      if (response.status != 200) {
        throw new Error("Failed to delete book");
      }

      // Remove the deleted book from the local state
      setBooks(books.filter((book) => book.isbn !== bookToDelete.isbn));
      setFilteredBooks(
        filteredBooks.filter((book) => book.isbn !== bookToDelete.isbn),
      );

      toast({
        title: "Book deleted",
        description: `"${bookToDelete.title}" has been removed from the library.`,
      });

      Router.reload();
    } catch (error) {
      console.error("Error deleting book:", error);
      toast({
        title: "Error",
        description: "Failed to delete the book. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleteModalOpen(false);
      setBookToDelete(null);
    }
  };

  const handleAddBook = async () => {
    if (selectedBook) {
      setIsAddingBook(true);
      const newBook: BookType = {
        isbn:
          selectedBook.volumeInfo.industryIdentifiers?.[0]?.identifier ||
          "Unknown",
        title: selectedBook.volumeInfo.title,
        imageUrl: selectedBook.volumeInfo.imageLinks?.thumbnail || "",
        author: selectedBook.volumeInfo.authors?.join(", ") || "Unknown",
        publisher: selectedBook.volumeInfo.publisher || "Unknown",
        year: selectedBook.volumeInfo.publishedDate
          ? parseInt(selectedBook.volumeInfo.publishedDate.substring(0, 4))
          : 0,
        genre: selectedBook.volumeInfo.categories?.[0] || "Uncategorized",
        quantity: quantity,
        availableQty: quantity, // Initially, available quantity is the same as total quantity
        price: selectedBook.saleInfo?.listedPrice?.amount || 0,
        description: selectedBook.volumeInfo.description || "",
      };

      try {
        console.log(JSON.stringify(newBook));
        const response = await fetch("/api/create-book", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newBook),
        });

        if (!response.ok) {
          throw new Error("Failed to add book");
        }

        const addedBook = await response.json();

        // Update the local state with the newly added book
        setBooks([...books, addedBook]);

        // Close the modal and reset the form
        setIsAddBookModalOpen(false);
        setSelectedBook(null);
        setQuantity(1);

        // Optionally, show a success message
        // You might want to use a toast notification library here
        console.log("Book added successfully");
      } catch (error) {
        // Handle any errors that occurred during the request
        console.error("Error adding book:", error);

        // Optionally, show an error message to the user
        // You might want to use a toast notification library here
        console.log("Failed to add book. Please try again.");
      } finally {
        setIsAddingBook(false);
      }
    }
  };

  if (isLoading) {
    return <div className="text-center mt-8">Loading books...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <PageTitle title="Manage Books" />

      <div className="flex justify-between items-center my-6">
        <div className="flex items-center space-x-4">
          <Input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full"
          />
          <Select onValueChange={handleGenreFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genres</SelectItem>
              <SelectItem value="Fiction">Fiction</SelectItem>
              <SelectItem value="Science Fiction">Science Fiction</SelectItem>
              <SelectItem value="Romance">Romance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Dialog open={isAddBookModalOpen} onOpenChange={setIsAddBookModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2" /> Add Book
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a New Book</DialogTitle>
              <DialogDescription>
                Search for a book using the Google Books API and add it to your
                library.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Search Google Books..."
                  // onChange={(e) => searchGoogleBooks(e.target.value)}
                  onChange={(e) => setAddBookQuery(e.target.value)}
                />
                <Button>
                  <Search onClick={() => searchGoogleBooks(addBookQuery)} />
                </Button>
              </div>
              {googleBooks.length > 0 && (
                <Select
                  onValueChange={(value) =>
                    setSelectedBook(
                      googleBooks.find((book) => book.id === value),
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a book" />
                  </SelectTrigger>
                  <SelectContent>
                    {googleBooks.map((book) => (
                      <SelectItem key={book.id} value={book.id}>
                        {book.volumeInfo.title} by{" "}
                        {book.volumeInfo.authors?.join(", ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {selectedBook && (
                <div>
                  <h3 className="font-bold">{selectedBook.volumeInfo.title}</h3>
                  <p>by {selectedBook.volumeInfo.authors?.join(", ")}</p>
                  <p>
                    Published by:{" "}
                    {selectedBook.volumeInfo.publisher || "Unknown"}
                  </p>
                  <p>
                    Year:{" "}
                    {selectedBook.volumeInfo.publishedDate
                      ? selectedBook.volumeInfo.publishedDate.substring(0, 4)
                      : "Unknown"}
                  </p>
                  <p>
                    ISBN:{" "}
                    {selectedBook.volumeInfo.industryIdentifiers?.[0]
                      ?.identifier || "Unknown"}
                  </p>
                  <Input
                    type="number"
                    placeholder="Quantity"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="mt-2"
                  />
                </div>
              )}
              <Button
                onClick={handleAddBook}
                disabled={!selectedBook || isAddingBook}
              >
                {isAddingBook ? "Adding..." : "Add to Library"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBooks.map((book) => (
            <TableRow key={book.isbn}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.genre}</TableCell>
              <TableCell>{book.availableQty}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteClick(book)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{bookToDelete?.title}"? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const handleDeleteConfirm = async () => {
  if (!bookToDelete) return;

  try {
    const response = await fetch(`/api/delete-book/${bookToDelete.isbn}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete book");
    }

    // Remove the deleted book from the local state
    setBooks(books.filter((book) => book.isbn !== bookToDelete.isbn));
    setFilteredBooks(
      filteredBooks.filter((book) => book.isbn !== bookToDelete.isbn),
    );

    toast({
      title: "Book deleted",
      description: `"${bookToDelete.title}" has been removed from the library.`,
    });
  } catch (error) {
    console.error("Error deleting book:", error);
    toast({
      title: "Error",
      description: "Failed to delete the book. Please try again.",
      variant: "destructive",
    });
  } finally {
    setIsDeleteModalOpen(false);
    setBookToDelete(null);
  }
};

export default LibraryPage;
