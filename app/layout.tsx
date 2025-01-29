import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provider";

// Define the metadata for the application, which includes the title and description.
// This metadata is used for SEO purposes and is displayed in the browser tab.
// 'title' sets the name of the application, while 'description' provides a brief overview
// of the app's functionality for users and search engines.
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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider redirectUrl={"http://localhost:3000/dashboard"}>
			<html lang="en">
				<body className={`${spcgrtsk.className} bg-colors-custom-pastel`}>
					<Provider>{children}</Provider>
				</body>
			</html>
		</ClerkProvider>
	);
}
