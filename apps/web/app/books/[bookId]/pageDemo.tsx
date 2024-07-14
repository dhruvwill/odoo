"use client";
import { Button } from "@repo/ui/components/ui/button";
import { getCheckoutSession } from "~/actions/stripe";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import React from "react";
import axios from "axios";
import BookShow from "~/components/dashboard/BookShow";
const Page = () => {
  const router = useRouter();
  const params = useParams();
  const [book, setBook] = useState<any>();
  const { isLoaded, user, isSignedIn } = useUser();

  // if (!isSignedIn) router.push("/");

  useEffect(() => {
    // console.log("USER", user, isSignedIn);

    async function fetchBookById() {
      const res = await axios.get(`/api/get-book-by-id?id=${params.bookId}`);
      setBook(res.data);
      console.log(res.data);
    }

    fetchBookById();
  }, []);

  if (!isLoaded) {
    return null;
  } else {
    // console.log(user);
    // console.log(user?.emailAddresses[0].emailAddress);
  }
  const placeOrder = async () => {
    const redirectUrl = await getCheckoutSession({
      name: book.title,
      amount: 10,
      id: book.id,
      userEmail: user?.emailAddresses[0].emailAddress,
      userId: user?.id!,
    });
    console.log(redirectUrl);

    if (!redirectUrl.url) return;
    router.push(redirectUrl.url);
  };

  return (
    <div>
      {book?.title}
      {/* {user?.emailAddresses[0]} */}
      <BookShow />

      <Button onClick={placeOrder}>Order Now</Button>
    </div>
  );
};

export default Page;
