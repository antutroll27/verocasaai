import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provider";
import ReactCookieBot from "react-cookiebot";

// Define the metadata for the application
export const metadata: Metadata = {
	title: "VerocasaAI - AI-Powered Interior Design",
	description: "Transform your space with AI-powered interior redesigns.",
	icons: {
		icon: "/favicon.ico",
	},
};

const spcgrtsk = Space_Grotesk({ 
	subsets: ["latin"],
});

// Cookie bot domain group ID
const COOKIE_BOT_ID = "1676e844-56d7-414d-83b3-e79ae790129b";

export default function RootLayout({   
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// Use process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL or similar for production
	const redirectUrl = process.env.NODE_ENV === 'production'
		? process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL
		: 'http://localhost:3000/dashboard';

	return (
		<ClerkProvider redirectUrl={redirectUrl}>
			<html lang="en">
				<body suppressHydrationWarning className={`${spcgrtsk.className} bg-colors-custom-pastel`}>
					<ReactCookieBot domainGroupId={COOKIE_BOT_ID} />
					<Provider>{children}</Provider>
				</body>
			</html>
		</ClerkProvider>
	);
}
