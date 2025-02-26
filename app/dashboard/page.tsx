"use client";
import { UserButton } from '@clerk/nextjs';
import React, { useContext, useEffect } from 'react';
import Listing from './_components/Listing';
import { useSearchParams } from 'next/navigation';
import { UserDataContext } from '@/app/_context/UserDataContext';
import { db } from '@/config';
import { Users } from '@/config/schema';
import { eq } from 'drizzle-orm';
import Stripe from 'stripe';

function Dashboard() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { userDetail, setUserDetail } = useContext(UserDataContext);

  // Handle successful Stripe checkout redirect
  useEffect(() => {
    const handleStripeSuccess = async () => {
      if (!sessionId || !userDetail?.email) return;

      try {
        // Initialize Stripe
        const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
          apiVersion: "2025-01-27.acacia",
        });

        // Retrieve the session to get subscription details
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        
        if (session.status === 'complete') {
          // Get subscription details
          if (!session.subscription) {
            console.error("No subscription in session");
            return;
          }

          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
          );

          // Determine subscription type
          const isYearly = subscription.items.data.some(item => 
            item.price.recurring?.interval === 'year' || 
            item.price.id.includes('yearly')
          );

          const subscriptionType = isYearly ? 'yearly' : 'monthly';
          
          // Calculate next billing date
          const nextBillingDate = new Date(subscription.current_period_end * 1000);

          // Update user in the database
          const updatedUser = await db
            .update(Users)
            .set({
              subscriptionStatus: 'active',
              subscriptionType: subscriptionType,
              nextBillingDate: nextBillingDate,
            })
            .where(eq(Users.email, userDetail.email))
            .returning();

          if (updatedUser.length > 0) {
            // Update the context with the new user details
            setUserDetail({
              ...userDetail,
              subscriptionStatus: 'active',
              subscriptionType: subscriptionType,
              nextBillingDate: nextBillingDate,
            });

            // Show success message
            alert(`Your ${subscriptionType} subscription has been activated! Thank you for your purchase.`);
          }
        }
      } catch (error) {
        console.error('Error handling Stripe success:', error);
      }
    };

    if (sessionId) {
      handleStripeSuccess();
    }
  }, [sessionId, userDetail, setUserDetail]);

  return (
    <div>
       <Listing></Listing>
    </div>
  );
}

export default Dashboard;