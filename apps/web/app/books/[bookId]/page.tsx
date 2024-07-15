"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import { toast } from "@repo/ui/components/ui/use-toast";
import {
  Book,
  BookOpen,
  Calendar,
  User,
  ShoppingCart,
  Bookmark,
  DollarSign,
} from "lucide-react";
import { getCheckoutSession } from "~/actions/stripe";

interface BookDetails {
  id: number;
  isbn: string;
  title: string;
  imageUrl: string;
  author: string;
  description: string;
  publisher: string;
  year: number;
  genre: string;
  price: number;
  quantity: number;
  availableQty: number;
  createdAt: string;
  updatedAt: string;
}

export default function BookPage() {
  const router = useRouter();
  const params = useParams();
  const [book, setBook] = useState<BookDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isLoaded, user, isSignedIn } = useUser();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `/api/get-book-by-id?id=${params.bookId}`,
        );
        console.log("Book data", response.data);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book:", error);
        toast({
          title: "Error",
          description: "Failed to fetch book details. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (params.bookId) {
      fetchBook();
    }
  }, [params.bookId]);

  const placeOrder = async () => {
    if (!isSignedIn) {
      toast({
        title: "Please Sign In",
        description: "You need to be signed in to place an order.",
        variant: "destructive",
      });
      return;
    }

    const redirectUrl = await getCheckoutSession({
      name: book!.title,
      amount: book!.price, // Convert to cents
      id: book!.id.toString(),
      userEmail: user?.emailAddresses[0].emailAddress,
      userId: user?.id!,
    });

    if (!redirectUrl.url) {
      toast({
        title: "Error",
        description: "Failed to create checkout session. Please try again.",
        variant: "destructive",
      });
      return;
    }
    router.push(redirectUrl.url);
  };

  if (!isLoaded || isLoading) {
    return <BookSkeleton />;
  }

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{book.title}</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <img
              src={book.imageUrl || "/placeholder-book.jpg"}
              alt={book.title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="md:col-span-2 space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              {book.description || "No description available."}
            </p>
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-500" />
              <span>{book.author || "Unknown Author"}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span>{book.year}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Bookmark className="w-5 h-5 text-gray-500" />
              <span>{book.genre}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Book className="w-5 h-5 text-gray-500" />
              <span>{book.publisher}</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-gray-500" />
              <span>
                {book.price > 0 ? `$${book.price.toFixed(2)}` : "Free"}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-gray-500" />
            <span>
              {book.availableQty > 0
                ? `${book.availableQty} available`
                : "Out of stock"}
            </span>
          </div>
          <Button onClick={placeOrder} disabled={book.availableQty === 0}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            {book.price > 0 ? "Borrow Now" : "Borrow for Free"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function BookSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Skeleton className="w-full h-64" />
          </div>
          <div className="md:col-span-2 space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-10 w-32" />
        </CardFooter>
      </Card>
    </div>
  );
}
