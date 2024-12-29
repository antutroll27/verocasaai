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

function PurchaseSubscription() {
	const options = [
		{
			price: 0.0,
			subscriptionType: "free",
		},
		{
			price: 8.99,
			subscriptionType: "monthly - No ads",
		},
		{
			price: 60,
			subscriptionType: "yearly - No ads",
		},
	];

	const [selectedPrice, setSelectedPrice] = useState<{
		price: number;
		subscriptionType: string;
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
					subscriptionType: selectedPrice.subscriptionType,
					nextBillingDate: new Date(
						selectedPrice.subscriptionType === "monthly"
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
					subscriptionType: selectedPrice.subscriptionType,
					nextBillingDate: new Date(
						selectedPrice.subscriptionType === "monthly"
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
					<h2 className="text-xl text-colors-custom-purple pt-4">
						Choose your subscription plan
					</h2>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 mt-10">
				{options.map((item, index) => (
					<div
						key={index}
						className={`w-full flex flex-col gap-2 justify-center items-center border shadow-md rounded-lg p-5
                            ${
															selectedPrice?.subscriptionType ===
															item.subscriptionType
																? "border-primary"
																: ""
														}
                        `}
					>
						<h2 className="font-bold text-3xl">
							{item.subscriptionType === "free" ? "Free" : "Premium"}
						</h2>
						<h2 className="font-medium text-xl">Subscription</h2>

						<Button
							className={` ${
								item.subscriptionType === "free"
									? "disabled bg-primary/90 "
									: "bg-colors-custom-purple"
							} w-full`}
							onClick={() =>
								item.subscriptionType !== "free" && setSelectedPrice(item)
							}
						>
							{item.subscriptionType === "free" ? "" : "$" + item.price + " / "}
							<span className="capitalize">{item.subscriptionType}</span>
						</Button>
						<h2 className="font-medium text-primary">
							{item.subscriptionType === "free" ? "" : "$" + item.price}
						</h2>
					</div>
				))}
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
