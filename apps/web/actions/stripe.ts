"use server";

import { stripe } from "~/lib/stripe";

export const getCheckoutSession = async ({
  name,
  amount,
  id,
  email,
}: {
  name: string;
  amount: number;
  id: number;
  email: string;
}) => {
  if (!name || !amount || !id || !email) {
    return { error: "Name, amount, id and email are required" };
  }
  const stripeSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: name,
            // Add other product details here if needed
          },
          unit_amount: amount * 100, // Make sure the amount is in the smallest currency unit (e.g., cents for USD)
        },
        quantity: 1,
      },
    ],
    success_url: "http://localhost:3001/thank-you",
    cancel_url: "http://localhost:3001/",
    mode: "payment",
    metadata: {
      customerEmail: email,
      productId: id,
    },
  });
  return { url: stripeSession.url };
};
