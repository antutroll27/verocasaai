"use client";
import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { UserDataContext } from "@/app/_context/UserDataContext";
import { Users } from "@/config/schema";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { useUser } from "@clerk/nextjs"; // if you're using Clerk


function Header() {


	const { userDetail, setUserDetail } = useContext(UserDataContext);

	useEffect(() => {
		if (!userDetail) {
			console.error("User details are missing or not provided in context");
		}
	}, [userDetail]);

	return (
		<div className="p-10 flex justify-around items-center ">
			{/* Logo Section */}
			<Image
				src="/verocasalogowhitehouse.png"
				alt="logo"
				width={200} // Larger width
				height={200} // Larger height
				className="object-contain" // Keeps image within bounds
			/>

			<div className="flex items-center gap-16 pr-5">
				{/* Credits Display */}
               <Link
					href="/dashboard"
					className="text-colors-custom-purple text-base"
				>
					Dashboard
				</Link>
				<Link
					href="/dashboard/ai-redesign"
					className="text-colors-custom-purple text-base"
				>
					Re-Design your Room
				</Link>
				<Link
					href="/dashboard/purchase-credits"
					className="text-colors-custom-purple text-base"
				>
					Buy Credits
				</Link>

				<div className="flex gap-3 items-center bg-colors-white px-4 py-1 rounded-md">
					

					
					<h2 className={`font-bold text-l ${userDetail?.subscriptionType === "free"
							? "text-red-500"
							: "text-green-500"
						}`}>
						{userDetail?.subscriptionType === "free"
							? "FREE TIER"
							: "PREMIUM TIER"
						}
					</h2>
					
				</div>

				{/* User Button */}
				<div className="transform scale-125 pt-1">
					<UserButton />
				</div>
			</div>
		</div>
	);
}

export default Header;
