import { createContext, useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { UserDetailType } from "@/types";

type UserDataContextType = {
	userDetail: UserDetailType | null;
	setUserDetail: (userDetail: UserDetailType | null) => void;
	isLoading: boolean;
};

export const UserDataContext = createContext<UserDataContextType>({
	userDetail: null,
	setUserDetail: () => {},
	isLoading: false,
});

export function UserDataProvider({ children }: { children: React.ReactNode }) {
	const [userDetail, setUserDetail] = useState<UserDetailType | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const { user, isLoaded: isClerkLoaded } = useUser();

	async function fetchUserData() {
		if (!user?.primaryEmailAddress?.emailAddress) {
			console.log("No user email available");
			setIsLoading(false);
			return;
		}

		try {
			console.log(
				"Fetching user data for:",
				user.primaryEmailAddress.emailAddress
			);

			const response = await fetch("/api/verify-user", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ user }),
			});

			if (!response.ok) {
				throw new Error(`Failed to fetch user data: ${response.status}`);
			}

			const data = await response.json();
			console.log("API Response:", data);

			if (!data.result) {
				throw new Error("No user data in response");
			}

			const userData = data.result;
			console.log("Setting user data:", userData);

			setUserDetail(Array.isArray(userData) ? userData[0] : userData);
			console.log("User data set:", userDetail);
		} catch (error) {
			console.error("Error in fetchUserData:", error);
			// Consider adding user feedback here
			setUserDetail(null);
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		console.log("UserDataProvider effect triggered:", {
			isClerkLoaded,
			hasUser: !!user,
			email: user?.primaryEmailAddress?.emailAddress,
		});

		if (isClerkLoaded && user) {
			fetchUserData();
		}
	}, [user, isClerkLoaded]);

	// Debug effect to track userDetail changes
	useEffect(() => {
		console.log("UserDetail state updated:", userDetail);
	}, [userDetail]);

	return (
		<UserDataContext.Provider value={{ userDetail, setUserDetail, isLoading }}>
			{children}
		</UserDataContext.Provider>
	);
}
