import Link from "next/link";
import React from "react";

export default function BannerSection() {
	return (
		<section className="pt-20 sm:pb-28 pb-16 bg-[#EFECEC]">
			<div className="w-full lg:max-w-6xl mx-auto px-6 ">
				<h1 className="text-center text-5xl lg:text-[120px] lg:leading-[153px] font-bold text-[#0C2D57] mb-8">
					Transform your
					<br />
					Room with <span className="text-[#FC6736]">AI</span>
				</h1>
				<div className="flex flex-col flex-col-reverse xl:flex-row">
					<div className="w-full lg:w-2/5 ml-0 lg:ml-32 mt-0 lg:mt-8">
						<p className="text-[#0C2D57] text-sm mb-8 pr-0 lg:pr-10">
							Bought a new forever place and you are looking forward to giving
							it a <b>new design</b> or bored of your current{" "}
							<b>room aesthetics ?</b> Not sure what <b>vibe</b> you are looking
							for ? Let us help you with AI
						</p>
						<Link
							href="/dashboard/ai-redesign"
							className="bg-[#0C2D57]  w-[207px] text-sm text-white px-4 py-3 hover:bg-opacity-80 flex items-center gap-3"
						>
							<svg
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M11.4667 8.2666C9.70006 8.2666 8.26672 9.69994 8.26672 11.4666C8.26672 12.0666 8.43339 12.6333 8.73339 13.1133C9.28672 14.0399 10.3001 14.6666 11.4667 14.6666C12.6334 14.6666 13.6534 14.0399 14.2001 13.1133C14.4934 12.6333 14.6667 12.0666 14.6667 11.4666C14.6667 9.69994 13.2334 8.2666 11.4667 8.2666ZM13.0534 11.0466L11.3467 12.6199C11.2534 12.7066 11.1267 12.7533 11.0067 12.7533C10.8801 12.7533 10.7534 12.7066 10.6534 12.6066L9.86672 11.8199C9.67339 11.6266 9.67339 11.3066 9.86672 11.1133C10.0601 10.9199 10.3801 10.9199 10.5734 11.1133L11.0201 11.5599L12.3734 10.3066C12.5734 10.1199 12.8934 10.1333 13.0801 10.3333C13.2667 10.5399 13.2534 10.8599 13.0534 11.0466Z"
									fill="#EFECEC"
								/>
								<path
									d="M14.6667 5.81993C14.6667 6.61326 14.54 7.34659 14.32 8.02659C14.28 8.16659 14.1134 8.2066 13.9934 8.11993C13.2667 7.57993 12.38 7.29326 11.4667 7.29326C9.15337 7.29326 7.26671 9.17993 7.26671 11.4933C7.26671 12.2133 7.45337 12.9199 7.80671 13.5466C7.91337 13.7333 7.78671 13.9733 7.58671 13.8999C5.98004 13.3533 2.73337 11.3599 1.68004 8.02659C1.46004 7.34659 1.33337 6.61326 1.33337 5.81993C1.33337 3.75993 2.99337 2.09326 5.04004 2.09326C6.24671 2.09326 7.32671 2.67993 8.00004 3.57993C8.67337 2.67993 9.75337 2.09326 10.96 2.09326C13.0067 2.09326 14.6667 3.75993 14.6667 5.81993Z"
									fill="#EFECEC"
								/>
							</svg>
							REDESIGN YOUR ROOM
						</Link>
					</div>
					<div className="w-full lg:w-3/5 relative mb-10 lg:mb-0">
						<img src="/img/home/before-hm-b.png" alt="" />
						<div className="static -top-[77px] lg:absolute lg:-right-[280px] xl:absolute xl:-right-[160px] 2xl:absolute 2xl:-right-[208px]">
							<img src="/img/home/after-hm-a.png" alt="" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
