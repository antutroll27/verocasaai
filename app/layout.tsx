import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provider";
import CookiebotScript from "./components/CookiebotScript";


// Define the metadata for the application, which includes the title and description.
// This metadata is used for SEO purposes and is displayed in the browser tab.
// 'title' sets the name of the application, while 'description' provides a brief overview
// of the app's functionality for users and search engines.
export const metadata: Metadata = {
	title: "VerocasaAI - AI-Powered Interior Design",
	description: "Transform your space with AI-powered interior redesigns.",
	metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://verocasaai.com"),
	icons: {
		icon: "/favicon.ico",
	  },
	  openGraph: {
		title: "VerocasaAI - AI-Powered Interior Design",
		description: "Transform your space with AI-powered interior redesigns.",
		url: "https://verocasaai.com",
		images: ["/og-image.jpg"],
	  },
	  twitter: {
		card: "summary_large_image",
		title: "VerocasaAI",
		description: "Transform your space with AI-powered interior redesigns.",
		images: ["/twitter-image.jpg"],
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
		<ClerkProvider >
			<html lang="en">
				<head>
					<CookiebotScript /> 
					<meta name="monetag" content="62ac71454f9e16becafd494bad988175"></meta>
					
					<script type="application/ld+json" dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "Service",
							serviceType: "AI Interior Room Design",
							provider: { "@type": "Organization", name: "VerocasaAI" },
							description: "Transform your space with AI-powered interior redesigns.",
						})
					}} />
				</head>
				<body className={`${spcgrtsk.className} bg-colors-custom-pastel`} suppressHydrationWarning>
					
					<Provider>{children}</Provider>
				</body>
			</html>
		</ClerkProvider>
	);
}
