"use client";
import React, { useState, useContext, useEffect } from "react";
import ImageUpload from "./_components/ImageUpload";
import Room from "./_components/Room";
import AIRedesign from "./_components/AIRedesign";
import PromptArea from "./_components/PromptArea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from "axios";
import { storage } from "@/config/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/nextjs";
import Loading from "./_components/Loading";
import OutputImageDialog from "./_components/OutputImageDialog";
import { UserDataContext } from "@/app/_context/UserDataContext";
import { db } from "@/config"; // Import the database client from the configuration
import { Users } from "@/config/schema"; // Import the schema for RedesignedAI Room Images
import { eq } from "drizzle-orm";
import { Sparkles } from "lucide-react";

interface FormData {
	image?: File;
	room?: string;
	AIRedesign?: string;
	CustomPrompt?: string;
}

interface AIResponse {
	result: string;
	error?: string;
}

function AiRedesign() {
	const { user } = useUser(); // Get user information from Clerk
	const { userDetail, isLoading } = useContext(UserDataContext);
	const [formData, setFormData] = useState<FormData>({});
	const [loading, setLoading] = useState(false); // Loading state for async operations
	const [AIOutputImage, setAIOutputImage] = useState<string | undefined>(); // State to hold AI generated image
	// Removed unused output state
	const [outputImageDialog, setOutputImageDialog] = useState(false); // Control dialog visibility
	const [beforeImage, setBeforeImage] = useState<string | undefined>(); // State for the uploaded image URL

	// Handle input changes and update formData state
	const onHandleInputChange = (
		value: string | File,
		fieldName: keyof FormData
	) => {
		setFormData((prev) => ({
			...prev,
			[fieldName]: value,
		}));
		console.log(formData); // Log current form data for debugging
	};

	// Show loading state while user data is being fetched
	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<Loading loading={true} />
			</div>
		);
	}

	// Save user-uploaded image to Firebase and return its URL
	const SaveUserImageToFirebase = async () => {
		const fileName = Date.now() + "_userUpload.png"; // Unique filename based on timestamp
		const imageRef = ref(storage, "AIRedesignedRooms/" + fileName); // Reference to Firebase storage

		await uploadBytes(imageRef, formData.image as File).then((resp) => {
			console.log("...File Uploaded");
		});

		// Get the URL of the uploaded image
		const fetchUrl = await getDownloadURL(imageRef);
		console.log(fetchUrl); // Log the URL for debugging
		setBeforeImage(fetchUrl); // Set the before image state
		return fetchUrl; // Return the URL
	};

	// Generate the AI image based on user input
	const ManifestAiImage = async () => {
		try {
			// Check for user and credits
			if (!userDetail || userDetail.credits < 1) {
				alert(
					"Insufficient credits. Please purchase more credits to continue."
				);
				return;
			}

			setLoading(true);
			const userImageUrl = await SaveUserImageToFirebase();

			// Generate AI image
			const result = await axios.post("/api/AIRedesigns", {
				imageUrl: userImageUrl,
				room: formData?.room,
				aiRedesign: formData?.AIRedesign,
				customPrompt: formData?.CustomPrompt,
				userEmail: user?.primaryEmailAddress?.emailAddress,
			});
			if (!result.data || !result.data.result) {
				throw new Error("Failed to generate AI image");
			}

			// Deduct credits
			//await deductCredits();

			setAIOutputImage(result.data.result);
			setOutputImageDialog(true);
		} catch (error: any) {
			console.error("Error:", error);
			alert(
				error.message || "Failed to process your request. Please try again."
			);
		} finally {
			setLoading(false);
		}
	};

	/* const deductCredits = async () => {
		if (!userDetail || !userDetail.id) {
			throw new Error("User details are not available");
		}

		console.log("User details before deducting credits:", userDetail);

		const result = await db
			.update(Users)
			.set({
				credits: (userDetail.credits || 0) - 1, // Deduct one credit
			})
			.where(eq(Users.id, userDetail.id))
			.returning({ id: Users.id }); // Return the updated user's ID

		if (result.length > 0) {
			const updatedCredits = userDetail.credits - 1;
			setUserDetail({ ...userDetail, credits: updatedCredits });
			return result[0].id; // Return the updated user's ID
		} else {
			throw new Error("Failed to update credits in the database.");
		}
	};*/

	return (
		<div className="mb-52">
			{/* Heading text */}
			<div className="pt-40 ">
				<h2 className="text-5xl font-bold text-colors-custom-purple text-center ">
					Never let Creative Block Stop you{" "}
				</h2>
				<h2 className="text-4xl font-bold text-colors-custom-purple text-center mb-5"></h2>
				<p className="text-colors-custom-purple text-center text-xl">
					Upload Pic, Select a Style and Manifest your new Redesigns{" "}
				</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 mt-20 gap-20">
				{/* Image Upload Component */}
				<ImageUpload
					selectedImage={(value) => onHandleInputChange(value, "image")}
				/>

				{/* Form for user input */}
				<div className="max-w-3xl">
					{/* Type of Room Selection */}
					<Room
						selectedRoomType={(value) => onHandleInputChange(value, "room")}
					/>
					{/* AI Redesign Type Selection */}
					<AIRedesign
						selectedAIRedesignType={(value) =>
							onHandleInputChange(value, "AIRedesign")
						}
					/>
					{/* Custom Additional Requirements Input */}
					<PromptArea
						customPrompt={(value) => onHandleInputChange(value, "CustomPrompt")}
					/>

					{/* Button to Generate AI Image */}
					<div className="flex justify-end relative pt-3 max-w-2xl">
						<Button
							className="bg-colors-custom-purple mt-10 gap-5 px-7 py-5 shadow-xl hover:shadow-3xl transition-shadow"
							onClick={ManifestAiImage}
						>
							<Sparkles className="animate-pulse" />
							<span>GENERATE  RE-DESIGNED  ROOM</span>
						</Button>
						
						{userDetail ? (
							<p
								className={`${
									userDetail.subscriptionType === "free"
										? "text-colors-custom-pink"
										: "text-colors-custom-lightpurple"
								} absolute top-0 right-0 text-base pt-1 pr-2 mb-5`}
							>
								* {userDetail.subscriptionType === "free" 
									? <><strong>Free</strong> User</> 
									: <><strong>Premium</strong> User (No Ads)</>
								}
							</p>
						) : (
							<p className="absolute top-0 right-0 text-lg pt-1 pr-2 animate-pulse bg-gray-200 rounded">
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							</p>
						)}
						
					</div>
				</div>
			</div>
			<Loading loading={loading} /> {/* Loading component */}
			<OutputImageDialog
				openImageDialog={outputImageDialog}
				closeImageDialog={() => setOutputImageDialog(false)}
				beforeImage={beforeImage}
				afterAiImage={AIOutputImage}
			/>
		</div>
	);
}

export default AiRedesign;
