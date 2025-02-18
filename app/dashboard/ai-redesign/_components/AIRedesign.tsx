import React, { useState } from "react";
import Image from "next/image";

function AIRedesign({
	selectedAIRedesignType,
}: {
	selectedAIRedesignType: (designName: string) => void;
}) {
	const DesignTypes = [
		{
			name: "Minimalistic",
			image: "/minimalistic.jpg",
		},
		{
			name: "Modern",
			image: "/modern.PNG",
		},
		{
			name: "Old School",
			image: "/oldschool.PNG",
		},
		{
			name: "Futuristic",
			image: "/futuristic.PNG",
		},
		{
			name: "Industrial",
			image: "/industrial.jpg",
		},
		{
			name: "Art Deco",
			image: "/artdeco.jpg",
		},
		{
			name: "Rustic",
			image: "/rustic.PNG",
		},
		{
			name: "Scandinavian",
			image: "/scandinavian.jpg",
		},
		{
			name: "Modern Korean",
			image: "/modern-korean.png",
		},
		{
			name: "Modern Japanese",
			image: "/modern-japanese.webp",
		},
		{
			name: "Old School Japanese",
			image: "/old-school-japanese.jpg",
		},
		{
			name: "Gothic ",
			image: "/gothic.jpg",
		},
		{
			name: "Modern + Gothic ",
			image: "/modern-gothic.jpg",
		},
		{
			name: "Biophilic",
			image: "/biophilic.webp",
		},
		{
			name: "Modern Indian Vastu",
			image: "/modern-indian-vastu.jpg",
		},
		{
			name: "Victorian",
			image: "/victorian.webp",
		},
		{
			name: "80s American ",
			image: "/80s-american.jpg",
		},
		{
			name: "Shabby Chic",
			image: "/shabby-chic.jpg",
		},
		{
			name: "Kawaii Pastel",
			image: "/kawaii-pastel.jpg",
		},
		{
			name: "Mediterranean Coastal",
			image: "/mediterranean-coastal.jpg",
		},
	];

	const [selectedRoomRedesign, setSelectedRoomRedesign] = useState<
		string | undefined
	>();
	return (
		<div className="mt-10 max-w-6xl">
			{" "}
			{/* Added max-w-3xl to constrain width */}
			<h2 className="pl-4 text-neutral-50 bg-colors-custom-lightpurple font-bold rounded-md">
				2. Select AI Redesign Type*
			</h2>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-8 mt-8 justify-items-center px-1">
				{DesignTypes.map((design, index) => (
					<div
						key={index}
						onClick={() => {
							setSelectedRoomRedesign(design.name);
							selectedAIRedesignType(design.name);
						}}
						className="flex flex-col items-center w-full max-w-[160px] mx-auto"
					>
						{" "}
						{/* Added w-full */}
						<Image
							src={design.image}
							alt={design.name}
							width={120}
							height={90}
							className={`rounded-md mb-2 hover:scale-110 hover:shadow-xl transition-all duration-300 cursor-pointer object-cover w-full aspect-[4/3] border border-gray-100 ${
								design.name === selectedRoomRedesign &&
								"ring-4 ring-colors-custom-purple rounded-md border-colors-custom-purple border-4"
							} `}
						/>
						<h3
							className={`text-xs font-medium text-colors-custom-purple text-center mt-2 w-full leading-tight ${
								design.name === selectedRoomRedesign && "font-bold text-sm"
							}`}
						>
							{design.name}
						</h3>
					</div>
				))}
			</div>
		</div>
	);
}

export default AIRedesign;
