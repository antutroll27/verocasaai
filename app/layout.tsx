import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Script from "next/script";
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
				<head>
					<Script id="cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="ddc2c77e-ef0f-4e9c-ba2b-66cf1aa817ce" strategy="beforeInteractive" />
				</head>
				<body className={`${spcgrtsk.className} bg-colors-custom-pastel`} suppressHydrationWarning>
					
					<Provider>{children}</Provider>
				</body>
			</html>
		</ClerkProvider>
	);
}
