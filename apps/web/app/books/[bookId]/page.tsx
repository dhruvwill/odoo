"use client";
import { Button } from "@repo/ui/components/ui/button";
import { getCheckoutSession } from "~/actions/stripe";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();
  const placeOrder = async () => {
    const redirectUrl = await getCheckoutSession({
      name: "Product Name",
      amount: 100,
      id: 1,
      email: "pradhyum@gmail.com",
    });
    console.log(redirectUrl);

    if (!redirectUrl.url) return;
    router.push(redirectUrl.url);
  };
  return (
    <div>
      <Button onClick={placeOrder}>Order Now</Button>
    </div>
  );
};

export default Page;
