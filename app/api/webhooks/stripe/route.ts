import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from "@/config";
import { Users } from "@/config/schema";
import { eq } from "drizzle-orm";
import { sendSubscriptionEmail } from "@/lib/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-01-27.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Make sure this is a subscription-related checkout
        if (session.mode === "subscription" && session.customer) {
          await handleSuccessfulSubscription(session);
        }
        break;
        
      case 'invoice.paid':
        const invoice = event.data.object as Stripe.Invoice;
        if (invoice.subscription && invoice.customer) {
          await handleSubscriptionRenewal(invoice);
        }
        break;
        
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error(`Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    );
  }
}

async function handleSuccessfulSubscription(session: Stripe.Checkout.Session) {
  // First, get customer details to find their email
  const customer = await stripe.customers.retrieve(session.customer as string);
  
  // Check if customer is deleted
  if (customer.deleted) {
    console.error("Customer has been deleted");
    return;
  }

  const customerEmail = customer.email;

  if (!customerEmail) {
    console.error("Customer email not found");
    return;
  }

  // Get subscription details
  if (!session.subscription) {
    console.error("No subscription in session");
    return;
  }

  const subscription = await stripe.subscriptions.retrieve(
    session.subscription as string
  );
  
  // Determine subscription type (monthly or yearly)
  const subscriptionType = getSubscriptionType(subscription);
  
  // Calculate next billing date
  const nextBillingDate = new Date(subscription.current_period_end * 1000);

  // Update user in your database
  const updatedUser = await db
    .update(Users)
    .set({
      subscriptionStatus: "active",
      subscriptionType: subscriptionType,
      nextBillingDate: nextBillingDate,
    })
    .where(eq(Users.email, customerEmail))
    .returning();

  if (updatedUser.length === 0) {
    console.error(`User with email ${customerEmail} not found`);
    return;
  }

  // Send confirmation email
  await sendSubscriptionEmail({
    email: customerEmail,
    name: updatedUser[0].name,
    subscriptionType: subscriptionType,
    nextBillingDate: nextBillingDate,
  });

  console.log(`Updated user ${customerEmail} with subscription ${subscriptionType}`);
}

async function handleSubscriptionRenewal(invoice: Stripe.Invoice) {
  // Get customer details
  const customer = await stripe.customers.retrieve(invoice.customer as string);
  
  // Check if customer is deleted
  if (customer.deleted) {
    console.error("Customer has been deleted");
    return;
  }
  
  const customerEmail = customer.email;

  if (!customerEmail) {
    console.error("Customer email not found");
    return;
  }

  // Get subscription details
  const subscription = await stripe.subscriptions.retrieve(
    invoice.subscription as string
  );
  
  // Determine subscription type (monthly or yearly)
  const subscriptionType = getSubscriptionType(subscription);
  
  // Calculate next billing date
  const nextBillingDate = new Date(subscription.current_period_end * 1000);

  // Update user in your database
  const updatedUser = await db
    .update(Users)
    .set({
      nextBillingDate: nextBillingDate,
    })
    .where(eq(Users.email, customerEmail))
    .returning();

  if (updatedUser.length === 0) {
    console.error(`User with email ${customerEmail} not found`);
    return;
  }

  // Send renewal confirmation email
  await sendSubscriptionEmail({
    email: customerEmail,
    name: updatedUser[0].name,
    subscriptionType: subscriptionType,
    nextBillingDate: nextBillingDate,
    isRenewal: true
  });

  console.log(`Updated renewal billing date for user ${customerEmail}`);
}

// Helper function to determine subscription type from Stripe subscription
function getSubscriptionType(subscription: Stripe.Subscription): string {
  // Check the first item in the subscription
  const item = subscription.items.data[0];
  if (!item) return "free";

  // Get the price and check its interval
  const priceId = item.price.id;
  
  // This is a simplification - you should adapt based on your actual price IDs
  if (priceId.includes("monthly") || item.price.recurring?.interval === "month") {
    return "monthly";
  } else if (priceId.includes("yearly") || item.price.recurring?.interval === "year") {
    return "yearly";
  }
  
  return "free"; // Default fallback
}