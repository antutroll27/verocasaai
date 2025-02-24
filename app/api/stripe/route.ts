import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
});

export async function POST(req: Request) {
  try {
    const { priceId } = await req.json(); // the Price ID from the client

    // Create a Checkout Session for a subscription
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      // After success, redirect user here
      success_url: `https://verocasaai.com/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      // If user cancels, redirect them here
      cancel_url: `https://verocasaai.com/dashboard/purchase-credits`,
    });

    // Return the session ID to the client
    return NextResponse.json({ sessionId: session.id });
  } catch (error: any) {
    console.error("Stripe error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}