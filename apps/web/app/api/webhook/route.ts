import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { borrowBook } from "~/services/BookService";
import { db } from "~/lib/db";
import { stripe } from "~/lib/stripe";
import { currentProfile } from "~/lib/currentProfile";

export async function POST(req: Request) {
  console.log("WEBHOOK CALLED");

  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error: any) {
    console.error("Error verifying webhook:", error.message);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }
  console.log("WEBHOOK EVENT BELOW");

  console.log(event);

  if (!event) return;

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Extract metadata
    const bookId = session.metadata?.bookId;
    const userId = session.metadata?.userId;
    const customerEmail = session.metadata?.userEmail;
    console.log("WEBHOOK DETAILS DATA");

    console.log(bookId, userId, customerEmail);

    if (!bookId || !userId || !customerEmail)
      return new NextResponse("Product id & Customer Email are required", {
        status: 400,
      });

    // CREATE ORDER IN DB
    await db.order.create({
      data: {
        productId: parseInt(bookId),
        email: customerEmail,
      },
    });

    // const profile = await currentProfile();
    await borrowBook(
      userId,
      Number(bookId),
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    );
  }
  return new NextResponse(null, { status: 200 });
}
