"use client";
import React, { useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import EmptyState from "./EmptyState";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users, RedesignedAIRoomImage } from "@/config/schema";
import { eq } from "drizzle-orm";
import { db } from "@/config";
import RoomRedesigns from "./RoomRedesigns";
import { UserDataContext } from "@/app/_context/UserDataContext";
import { Sparkles } from "lucide-react";

interface Room {
  id: number;
  createdAt: string;
  AIGeneratedImage: string;
  OgImage: string;
  roomType: string;
  AIRedesignType: string;
}

function Listing() {
	const { user } = useUser();
	const [userRoomList, setUserRoomList] = useState<Room[]>([]);
	const { userDetail } = useContext(UserDataContext);

	// Get the first element of the array if userDetail is an array
	const userData = Array.isArray(userDetail) ? userDetail[0] : userDetail;
	useEffect(() => {
		user && fetchUserRoomsList();
	}, [user]);

	const fetchUserRoomsList = async () => {
		const userEmail = user?.primaryEmailAddress?.emailAddress;
		if (userEmail) {
			try {
				const response = await fetch(`/api/userRooms?email=${userEmail}`);
				if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
				const data = await response.json() as Room[];
				const sortedRooms = data.sort((a, b) => {
					const timeCompare = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
					// If timestamps are equal, sort by numeric id
					return timeCompare === 0 ? Number(b.id) - Number(a.id) : timeCompare;
				});
				setUserRoomList(sortedRooms);
				console.log(sortedRooms);
			} catch (error) {
				console.error("Fetch error:", error);
			}
		}
	};
	return (
		<div className="max-w-7xl mx-auto px-1 ">
			{" "}
			{/* Added container with max width */}
			<div className="mt-20">
				<h2 className="text-6xl font-bold text-colors-custom-pink mb-8">
					Never run out of Ideas{" "}
				</h2>

				<h2 className="text-5xl font-bold text-colors-custom-purple mb-10" style={{ fontFamily: 'Tomatoes, sans-serif' }}>
					{user?.fullName}
				</h2>
				
			</div>
			{userRoomList?.length === 0 ? (
				<div>
					<EmptyState />
				</div>
			) : (
				<div className="mt-10">
					{/* Gallery Header with Button */}
					<div className="flex justify-between items-center mb-10 max-w-full">
						{" "}
						{/* Added max-w-full */}
						
						<Link href={"/dashboard/ai-redesign"}>
							<Button className=" bg-colors-custom-purple hover:bg-colors-custom-purple/70 transition-all duration-200 flex items-center gap-5 py-5 px-6 text-sm">
							<Sparkles />
								<span >RE-DESIGN ROOM WITH AI</span>
								
							</Button>
						</Link>
					</div>

					{/* Gallery Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
						{userRoomList.map((room, index) => (
							<div key={index} className="max-w-[300px] w-full mx-auto">
								<RoomRedesigns room={room} />
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default Listing;
