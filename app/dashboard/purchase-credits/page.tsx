"use client";
import React, { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { UserDataContext } from "@/app/_context/UserDataContext";
import { db } from "@/config";
import { Users } from "@/config/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { UserDetailType } from "@/types";

// 1) Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// 2) Example Price IDs (from .env or hardcoded):
const monthlyPriceId = process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID || "price_XXX_monthly";
const yearlyPriceId = process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID || "price_XXX_yearly";

const pricingPlans = [
  {
    name: "Free",
    subtitle: "No Charges , just Advertisements",
    price: "0",
    period: "/ month",
    features: ["Unlimited Designs", "Advertisements after every Redesign"],
    buttonText: "Upgrade",
    highlighted: true,
  },
  {
    name: "Premium Yearly",
    subtitle: "No ADs, Smooth Service",
    price: "99.99",
    period: "/ yearly",
    features: [
      "Unlimited Designs",
      "No Advertisements",
      "Customer Support",
      "Access to upcoming beta features",
    ],
    buttonText: "Upgrade",
    highlighted: true,
  },
  {
    name: "Premium Monthly",
    subtitle: "Premium, but Monthly Paid",
    price: "9.99",
    period: "/ month",
    features: [
      "Unlimited Designs",
      "No Advertisements",
      "Customer Support",
      "Access to upcoming beta features",
    ],
    buttonText: "Upgrade",
    highlighted: true,
  },
];

function PurchaseSubscription() {
  const { userDetail, setUserDetail } = useContext(UserDataContext);
  const router = useRouter();
  const [selectedPrice, setSelectedPrice] = useState<{
    name: string;
    price: number;
  } | null>(null);

  // 3) Optional: update user’s subscription in DB after success
  const onPaymentSuccess = async () => {
    if (!userDetail || !selectedPrice) return;

    try {
      const result = await db
        .update(Users)
        .set({
          subscriptionStatus: "active",
          subscriptionType: selectedPrice.name,
          nextBillingDate: new Date(
            selectedPrice.name.includes("Monthly")
              ? new Date().setMonth(new Date().getMonth() + 1)
              : new Date().setFullYear(new Date().getFullYear() + 1)
          ),
        })
        .where(eq(Users.id, userDetail.id))
        .returning();

      if (result) {
        const updatedUser: UserDetailType = {
          ...userDetail,
          subscriptionStatus: "active",
          subscriptionType: selectedPrice.name,
          nextBillingDate: new Date(),
        };
        setUserDetail(updatedUser);

        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error updating subscription:", error);
    }
  };

  // 4) Create the Checkout session and redirect
  const handleCheckout = async () => {
    if (!selectedPrice) return;

    try {
      // Pick the right Price ID
      let priceId: string;
      if (selectedPrice.name.includes("Monthly")) {
        priceId = monthlyPriceId;
      } else if (selectedPrice.name.includes("Yearly")) {
        priceId = yearlyPriceId;
      } else {
        alert("Free plan does not require checkout");
        return;
      }

      // Call your /api/stripe route
      const res = await fetch("/api/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (!data.sessionId) {
        throw new Error(data.error || "No sessionId returned");
      }

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({ sessionId: data.sessionId });
    } catch (error: any) {
      console.error("Stripe checkout error:", error);
      alert(error.message);
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="text-center pt-28">
          <h2 className="text-6xl font-bold text-colors-custom-purple">
            Purchase Subscription
          </h2>
          <h2 className="text-xl text-colors-custom-purple pt-4 pb-20">
            Choose your subscription plan
          </h2>
        </div>
      </div>

      <div className="w-full lg:max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.name}
              className={`p-8 ${
                index === 0 ? "bg-[#D9D9D9]" : index === 1 ? "bg-[#FFB0B0]" : "bg-[#D9D9D9]"
              }`}
            >
              <h6 className="text-[#0C2D57] text-[15px] font-bold mb-1">{plan.name}</h6>
              <span className="block text-[12px] font-normal mb-6">{plan.subtitle}</span>
              <div className="flex items-baseline mb-4">
                <span className="text-[#0C2D57] text-5xl font-bold">${plan.price}</span>
                <span className="text-[#0C2D57] ml-1"> {plan.period}</span>
              </div>
              <ul className="min-h-[96px] mb-8 space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-[12px]">
                    {/* Icon omitted for brevity */}
                    {feature}
                  </li>
                ))}
              </ul>

              {/* If not free, set the plan on click */}
              {index === 0 ? (
                <button className="bg-white text-[#ABA4A1] min-w-[142px] py-2 px-8">
                  {plan.buttonText}
                </button>
              ) : (
                <div className="mt-2 pt-2">
                  <button
                    onClick={() =>
                      setSelectedPrice({ name: plan.name, price: Number(plan.price) })
                    }
                    className="bg-[#0C2D57] text-white min-w-[142px] py-2 px-8"
                  >
                    {plan.buttonText}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 5) Replace PayPal with a Stripe Checkout button */}
      <div className="mt-20 flex justify-center">
        {selectedPrice && (
          <Button onClick={handleCheckout}>
            Checkout with Stripe
          </Button>
        )}
      </div>
    </div>
  );
}

export default PurchaseSubscription;