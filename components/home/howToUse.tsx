import React from "react";

const steps = [
	{
		number: 1,
		title: "Upload",
		subtitle: "Your room’s image",
		description: "Upload the image of the room you want to re-design",
		img: "/img/use/use-1.png",
	},
	{
		number: 2,
		title: "Select",
		subtitle: "Roomtype + Designtype",
		description:
			"Select the type of room it is ( Kitchen , toilet , living room , etc)  and the AI Re-design type . If you have your own ideas in mind , type it inside the =‘ Additional Custom Prompt’ textbox area .",
		img: "/img/use/use-2.png",
	},
	{
		number: 3,
		title: "Generate",
		subtitle: "AI Redesigned Room",
		description:
			"Click the Manifest Revamped Room button & Manifest the design of your dreams and give life to your pre-existing rooms. Want a result customised to your style or have a design in your mind ? Type it inside the ‘Additional Custom Prompt’ textbox area",
		img: "/img/use/use-3.png",
	},
];

export default function HowToUseSection() {
	return (
		<section className="pt-20 sm:pb-56 pb-28 bg-[#EFECEC]" id="howtouse">
			<div className="w-full lg:max-w-6xl mx-auto px-6">
				<h2 className="text-3xl lg:text-[64px] lg:leading-[81px] font-bold mb-7">
					How to <span className="text-[#FC6736]">Use</span>
				</h2>
				<p className="text-[#0C2D57] text-lg mb-16">
					Complex ideas, effortlessly transformed. Your dream room, just three
					clicks away.
					<br />
					Simplicity isn’t boring—it’s brilliance. Redesign in minutes, not
					hours.
				</p>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{steps.map((step, index) => (
						<div
							key={step.number}
							className={`bg-[${
								index == 0 ? "#FFB0B0" : index == 1 ? "#FC6736" : "#0C2D57"
							}] p-8 `}
						>
							<div
								className={`inline-block text-4xl lg:text-[61px] lg:leading-[78px] text-2xl font-bold mb-4 mr-8 ${
									index == 0
										? "text-[#0C2D57]"
										: index == 1
										? "text-[#ffffff]"
										: "text-[#ffffff]"
								} `}
							>
								{step.number}
							</div>
							<div className="inline-block">
								<h3
									className={`${
										index == 0
											? "text-[#0C2D57]"
											: index == 1
											? "text-[#ffffff]"
											: "text-[#ffffff]"
									} text-[22px] font-bold `}
								>
									{step.title}
								</h3>
								<span
									className={`${
										index == 0
											? "text-[#0C2D57]"
											: index == 1
											? "text-[#ffffff]"
											: "text-[#ffffff]"
									} text-sm`}
								>
									{step.subtitle}
								</span>
							</div>
							<p
								className={` ${
									index == 0
										? "text-[#0C2D57] mb-[79px]"
										: index == 1
										? "text-[#ffffff] mb-[50px]"
										: "text-[#ffffff] mb-[50px]"
								} text-sm mb-4`}
							>
								{step.description}
							</p>
							<img src={step.img} alt="" />
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
