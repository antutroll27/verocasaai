"use client";
import { UserDataContext } from "@/app/_context/UserDataContext";
import { Button } from "@/components/ui/button";
import { db } from "@/config";
import { Users } from "@/config/schema";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import React, { useState, useContext } from "react";
import { UserDetailType } from "@/types";
import { eq } from "drizzle-orm";
import Link from "next/link";

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
			"No Advertisments ",
			"Customer Support",
			"Access to upcoming beta features",
		],
		buttonText: "Upgrade",
		highlighted: true,
	},
	{
		name: "Premium Monthly",
		subtitle: "Premium, but Monthly Paid ",
		price: "9.99",
		period: "/ month",
		features: [
			"Unlimited Designs",
			"No Advertisments ",
			"Customer Support",
			"Access to upcoming beta features",
		],
		buttonText: "Upgrade",
		highlighted: true,
	},
];

function PurchaseSubscription() {
	const options = [
		{
			price: 0.0,
			subscriptionType: "free",
		},
		{
			price: 14.99,
			subscriptionType: "monthly - No ads",
		},
		{
			price: 149.99,
			subscriptionType: "yearly - No ads",
		},
	];

	const [selectedPrice, setSelectedPrice] = useState<{
		price: number;
		name: string;
	} | null>(null);
	const { userDetail, setUserDetail } = useContext(UserDataContext);
	const router = useRouter();

	const onPaymentSuccess = async () => {
		if (!userDetail || !selectedPrice) return;

		try {
			const result = await db
				.update(Users)
				.set({
					subscriptionStatus: "active",
					subscriptionType: selectedPrice.name,
					nextBillingDate: new Date(
						selectedPrice.name === "Monthly"
							? new Date().setMonth(new Date().getMonth() + 1)
							: new Date().setFullYear(new Date().getFullYear() + 1)
					),
				})
				.where(eq(Users.id, userDetail.id))
				.returning();

			if (result) {
				// Create a properly typed update with all required properties explicitly
				const updatedUser: UserDetailType = {
					id: userDetail.id,
					name: userDetail.name,
					email: userDetail.email,
					imageUrl: userDetail.imageUrl,
					createdAt: userDetail.createdAt,
					credits: userDetail.credits,
					subscriptionStatus: "active",
					subscriptionType: selectedPrice.name,
					nextBillingDate: new Date(
						selectedPrice.name === "Monthly"
							? new Date().setMonth(new Date().getMonth() + 1)
							: new Date().setFullYear(new Date().getFullYear() + 1)
					),
				};

				setUserDetail(updatedUser);
				router.push("/dashboard");
			}
		} catch (error) {
			console.error("Error updating subscription:", error);
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

			<div className="w-full lg:max-w-6xl mx-auto px-6 ">
				
				<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
					{pricingPlans.map((plan, index) => (
						<div
							key={plan.name}
							className={`${
								index == 0
									? "bg-[#D9D9D9]"
									: index == 1
									? "bg-[#FFB0B0]"
									: "bg-[#D9D9D9]"
							} p-8 ${plan.highlighted ? "transform " : "shadow-none"}`}
						>
							<h6 className="text-[#0C2D57] text-[15px] font-bold mb-1">
								{plan.name}
							</h6>
							<span className="block text-[12px] font-normal mb-6">
								{plan.subtitle}
							</span>
							<div className="flex items-baseline mb-4">
								<span className="text-[#0C2D57] text-5xl font-bold">
									$ {plan.price}
								</span>
								<span className="text-[#0C2D57] ml-1"> {plan.period}</span>
							</div>
							<ul className="min-h-[96px] mb-8 space-y-2">
								{plan.features.map((feature) => (
									<li key={feature} className="flex items-center text-[12px]">
										<svg
											className="mr-[10px]"
											width="16"
											height="16"
											viewBox="0 0 16 16"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M11.1425 0.5H4.8575C2.1275 0.5 0.5 2.1275 0.5 4.8575V11.135C0.5 13.8725 2.1275 15.5 4.8575 15.5H11.135C13.865 15.5 15.4925 13.8725 15.4925 11.1425V4.8575C15.5 2.1275 13.8725 0.5 11.1425 0.5ZM10.0925 8.3975L7.445 11.045C7.3325 11.1575 7.19 11.21 7.0475 11.21C6.905 11.21 6.7625 11.1575 6.65 11.045C6.4325 10.8275 6.4325 10.4675 6.65 10.25L8.9 8L6.65 5.75C6.4325 5.5325 6.4325 5.1725 6.65 4.955C6.8675 4.7375 7.2275 4.7375 7.445 4.955L10.0925 7.6025C10.3175 7.82 10.3175 8.18 10.0925 8.3975Z"
												fill="#0C2D57"
											/>
										</svg>

										{feature}
									</li>
								))}
							</ul>

							{index == 0 ? (
								<button className="bg-white text-[#ABA4A1] min-w-[142px] py-2 px-8 ">
									{plan.buttonText}
								</button>
							) : (
								<div className="mt-2 pt-2">
									<button
										onClick={() =>
											plan.name !== "Free" &&
											setSelectedPrice({
												name: plan.name,
												price: Number(plan.price),
											})
										}
										className={`bg-[#0C2D57] text-white min-w-[142px] py-2 px-8 `}
									>
										{plan.buttonText}
									</button>
								</div>
							)}
						</div>
					))}
				</div>
			</div>

			<div className="mt-20">
				{selectedPrice?.price && (
					<PayPalButtons
						style={{ layout: "horizontal" }}
						onApprove={async () => {
							try {
								await onPaymentSuccess();
							} catch (error) {
								console.error("Payment processing failed:", error);
							}
						}}
						onError={(err) => {
							console.error("PayPal Error:", err);
						}}
						onCancel={() => console.log("Payment cancelled by user")}
						createOrder={(data, actions) => {
							if (!selectedPrice?.price) {
								throw new Error("No subscription plan selected");
							}
							return actions.order.create({
								intent: "CAPTURE",
								purchase_units: [
									{
										amount: {
											value: selectedPrice.price.toFixed(2),
											currency_code: "USD",
										},
									},
								],
							});
						}}
					/>
				)}
			</div>
		</div>
	);
}

export default PurchaseSubscription;
