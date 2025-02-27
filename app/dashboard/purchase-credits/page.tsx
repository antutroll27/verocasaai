"use client";
import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { UserDataContext } from "@/app/_context/UserDataContext";
import { Button } from "@/components/ui/button";

// 1) Load Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// 2) Example Price IDs
const monthlyPriceId = process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID || "price_XXX_monthly";
const yearlyPriceId = process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID || "price_XXX_yearly";

// 3) Our plan definitions
const pricingPlans = [
  {
    name: "Free",
    subtitle: "No Charges, just Advertisements",
    price: "0",
    period: "/ month",
    features: ["Unlimited Designs", "Advertisements after every Redesign"],
    buttonText: "Current Plan",
    highlighted: true,
    type: "free",
  },
  {
    name: "Yearly Premium",
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
    type: "yearly",
  },
  {
    name: "Monthly Premium",
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
    type: "monthly",
  },
];

export default function PurchaseSubscription() {
  const { userDetail } = useContext(UserDataContext);
  const router = useRouter();
  const [selectedPrice, setSelectedPrice] = useState<{
    name: string;
    price: number;
    type: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Grab subscription info from userDetail
  const subscriptionType = userDetail?.subscriptionType; // "free", "monthly", "yearly"
  const subscriptionStatus = userDetail?.subscriptionStatus; // "active" or "inactive"

  // 4) Normal "Upgrade" => calls /api/stripe => redirects to Checkout
  const handleCheckout = async () => {
    if (!selectedPrice || !userDetail) {
      alert("Please select a pricing plan or login to continue");
      return;
    }
    setIsLoading(true);

    try {
      let priceId: string;
      if (selectedPrice.type === "monthly") {
        priceId = monthlyPriceId;
      } else if (selectedPrice.type === "yearly") {
        priceId = yearlyPriceId;
      } else {
        alert("Free plan does not require checkout");
        setIsLoading(false);
        return;
      }

      const res = await fetch("/api/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId,
          userEmail: userDetail.email,
        }),
      });
      const data = await res.json();
      if (!data.sessionId) {
        throw new Error(data.error || "No sessionId returned");
      }

      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({ sessionId: data.sessionId });
    } catch (error: any) {
      console.error("Stripe checkout error:", error);
      alert(`Payment error: ${error.message || "Unknown error occurred"}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 5) For subscribed users => direct them to your permanent Stripe portal
  const handlePortal = () => {
    setIsLoading(true);
    // Directly send them to your portal link:
    window.location.href = "https://billing.stripe.com/p/login/bIYg172XY3hWbwQ8ww";
  };

  // 6) Decide how each plan’s button is rendered
  const renderPlanButton = (planType: string) => {
    // If monthly sub is active
    if (subscriptionType === "monthly" && subscriptionStatus === "active") {
      if (planType === "monthly") {
        // Show green "Subscribed"
        return (
          <button
            onClick={handlePortal}
            className="bg-green-600 text-white min-w-[142px] py-2 px-8"
          >
            Subscribed
          </button>
        );
      } else if (planType === "yearly") {
        // Now, we want to route them to the portal to upgrade
        return (
          <button
            onClick={handlePortal}
            className="bg-[#0C2D57] text-white min-w-[142px] py-2 px-8"
          >
            Upgrade
          </button>
        );
      }
      // If planType === "free"
      return (
        <button className="bg-white text-[#ABA4A1] min-w-[142px] py-2 px-8">
          Current Plan
        </button>
      );
    }

    // If yearly sub is active
    if (subscriptionType === "yearly" && subscriptionStatus === "active") {
      if (planType === "yearly") {
        return (
          <button
            onClick={handlePortal}
            className="bg-green-600 text-white min-w-[142px] py-2 px-8"
          >
            Subscribed
          </button>
        );
      } else if (planType === "monthly") {
        // Grey out monthly
        return (
          <button
            className="bg-gray-400 text-white min-w-[142px] py-2 px-8"
            disabled
          >
            Not Available
          </button>
        );
      }
      // If planType === "free"
      return (
        <button className="bg-white text-[#ABA4A1] min-w-[142px] py-2 px-8">
          Current Plan
        </button>
      );
    }

    // Otherwise, user is free or inactive => normal upgrade
    return (
      <button
        onClick={() => {
          if (planType === "monthly") {
            setSelectedPrice({
              name: "Monthly Premium",
              price: 9.99,
              type: "monthly",
            });
          } else if (planType === "yearly") {
            setSelectedPrice({
              name: "Yearly Premium",
              price: 99.99,
              type: "yearly",
            });
          }
        }}
        className="bg-[#0C2D57] text-white min-w-[142px] py-2 px-8"
      >
        Upgrade
      </button>
    );
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
                index === 0
                  ? "bg-[#D9D9D9]"
                  : index === 1
                  ? "bg-[#FFB0B0]"
                  : "bg-[#D9D9D9]"
              }`}
            >
              <h6 className="text-[#0C2D57] text-[15px] font-bold mb-1">
                {plan.name}
              </h6>
              <span className="block text-[12px] font-normal mb-6">
                {plan.subtitle}
              </span>
              <div className="flex items-baseline mb-4">
                <span className="text-[#0C2D57] text-5xl font-bold">
                  ${plan.price}
                </span>
                <span className="text-[#0C2D57] ml-1">{plan.period}</span>
              </div>
              <ul className="min-h-[96px] mb-8 space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-[12px]">
                    {feature}
                  </li>
                ))}
              </ul>

              {/* If free plan */}
              {plan.type === "free" ? (
                <button className="bg-white text-[#ABA4A1] min-w-[142px] py-2 px-8">
                  {plan.buttonText}
                </button>
              ) : (
                <div className="mt-2 pt-2">
                  {renderPlanButton(plan.type)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* If user selected a plan => show checkout button */}
      <div className="mt-20 flex justify-center">
        {selectedPrice && (
          <Button
            onClick={handleCheckout}
            disabled={isLoading}
            className="bg-[#FC6736] hover:bg-[#e55a2e] text-white py-3 px-6 rounded-md text-lg"
          >
            {isLoading
              ? "Processing..."
              : `Checkout with Stripe - $${selectedPrice.price}`}
          </Button>
        )}
      </div>

      {selectedPrice && (
        <div className="mt-8 text-center text-sm text-colors-custom-purple">
          <p>By subscribing, you'll get unlimited AI redesigns without advertisements.</p>
          <p>You'll receive a confirmation email after your payment is processed.</p>
        </div>
      )}
    </div>
  );
}