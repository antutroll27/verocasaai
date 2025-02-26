import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getAuth } from "@clerk/nextjs/server";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
});

// Define price IDs
const PRICE_IDS = {
  MONTHLY: process.env.STRIPE_MONTHLY_PRICE_ID || "price_XXX_monthly",
  YEARLY: process.env.STRIPE_YEARLY_PRICE_ID || "price_XXX_yearly"
};

export async function POST(req: NextRequest) {
  try {
    // Get auth session
    const { userId } = await getAuth(req);
    
    // Ensure user is authenticated
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get request data
    const { priceId, userEmail } = await req.json();
    
    if (!priceId) {
      return NextResponse.json({ error: "Price ID is required" }, { status: 400 });
    }

    // Determine the success URL with app URL from environment
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://verocasaai.com";
    const successUrl = `${appUrl}/dashboard?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${appUrl}/dashboard/purchase-credits`;

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
      metadata: {
        userId: userId,
      },
      customer_email: userEmail, // Pass the user's email for easier identification
      // After success, redirect user here with the session ID
      success_url: successUrl,
      // If user cancels, redirect them here
      cancel_url: cancelUrl,
    });

    // Return the session ID to the client
    return NextResponse.json({ sessionId: session.id });
  } catch (error: any) {
    console.error("Stripe error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}