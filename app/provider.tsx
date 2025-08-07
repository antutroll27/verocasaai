"use client";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { UserDataContext } from "./_context/UserDataContext";
import { UserDetailType } from "@/types";
import { setUserProperties } from "@/lib/analytics";

function Provider({ children }: PropsWithChildren) {
	const [userDetail, setUserDetail] = useState<UserDetailType | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { user } = useUser();

	useEffect(() => {
		if (user) {
			VerifyUser();
		} else {
			setIsLoading(false);
		}
	}, [user]);

	const VerifyUser = async () => {
		try {
			// Format user data before sending
			const clerkUserData = {
				fullName: user?.fullName,
				primaryEmailAddress: {
					emailAddress: user?.primaryEmailAddress?.emailAddress,
				},
				imageUrl: user?.imageUrl,
			};

			const dataResult = await axios.post("/api/verify-user", {
				user: clerkUserData,
			});
			const userDetailData = dataResult.data.result;
			setUserDetail(userDetailData);
			
			// Identify user in Amplitude when they log in
			if (user?.id && userDetailData) {
				setUserProperties(user.id, {
					email: user.primaryEmailAddress?.emailAddress,
					name: user.fullName,
					subscriptionTier: userDetailData.subscriptionTier || "FREE",
					signUpDate: user.createdAt
				});
			}
			
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
			{children}
		</UserDataContext.Provider>
	);
}

export default Provider;
