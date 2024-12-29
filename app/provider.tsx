"use client";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { UserDataContext } from "./_context/UserDataContext";
import { UserDetailType } from "@/types";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function Provider({ children }: PropsWithChildren) {
	const [userDetail, setUserDetail] = useState<UserDetailType | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { user } = useUser();

	useEffect(() => {
		console.log({ user });
		if (user) {
			VerifyUser();
		} else {
			setIsLoading(false);
		}
	}, [user]);

	const VerifyUser = async () => {
		try {
			// Format user data before sending
			const userData = {
				fullName: user?.fullName,
				primaryEmailAddress: {
					emailAddress: user?.primaryEmailAddress?.emailAddress,
				},
				imageUrl: user?.imageUrl,
			};

			const dataResult = await axios.post("/api/verify-user", {
				user: userData,
			});
			setUserDetail(dataResult.data.result);
			setIsLoading(false);
		} catch (error) {
			console.error("Verify user error:", error);
			setIsLoading(false);
		}
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				Loading...
			</div>
		);
	}

	return (
		<UserDataContext.Provider value={{ userDetail, setUserDetail, isLoading }}>
			<PayPalScriptProvider
				options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENTID || "" }}
			>
				{children}
			</PayPalScriptProvider>
		</UserDataContext.Provider>
	);
}

export default Provider;
