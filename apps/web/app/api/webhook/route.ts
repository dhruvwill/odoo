import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

// import { db } from "@/lib/db";
import { stripe } from "~/lib/stripe";

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
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  if (!event) return;

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Extract metadata
    const productId = session.metadata?.productId;
    const customerEmail = session.metadata?.customerEmail;

    if (!productId || !customerEmail)
      return new NextResponse("Product id & Customer Email are required", {
        status: 400,
      });

    // CREATE ORDER IN DB
    // await db.order.create({
    //   data: {
    //     productId: parseInt(productId),
    //     email: customerEmail,
    //   },
    // });
  }
  return new NextResponse(null, { status: 200 });
}
