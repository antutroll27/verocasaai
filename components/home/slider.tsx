"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function SliderSection() {
	return (
		<section className="pt-28 sm:pb-64 pb-28 bg-[#FFB0B0]" id="sample">
			<div className="w-full lg:max-w-6xl mx-auto px-6">
				<h2 className="text-[#0C2D57] text-3xl lg:text-[64px] lg:leading-[81px] font-bold mb-7">
					BEFORE <span className="text-[#FC6736]">VS</span> AFTER <br /> EXAMPLES
				</h2>
				<p className="text-[#0C2D57] text-lg f mb-20">
					"Don't be afraid to give up the good to go for the great." – John D.
					Rockefeller
				</p>
				<div className="slider-container">
					<Swiper
						spaceBetween={40}
						slidesPerView={1}
						navigation={true}
						modules={[Navigation]}
						className="mySwiper"
					>
						<SwiperSlide>
							<div className="grid grid-cols-2 gap-6">
								<div className="relative">
									<img src="./img/slider/before1.png" alt="before living room" className="w-full h-[300px] object-cover rounded-lg" />
									<div className="absolute top-4 left-4 bg-[#FC6736] text-white px-3 py-1 rounded-md text-sm font-medium">
										Before
									</div>
								</div>
								<div className="relative">
									<img src="./img/slider/after1.png" alt="after living room" className="w-full h-[300px] object-cover rounded-lg" />
									<div className="absolute top-4 left-4 bg-[#0C2D57] text-white px-3 py-1 rounded-md text-sm font-medium">
										After
									</div>
								</div>
							</div>
						</SwiperSlide>
						<SwiperSlide>
							<div className="grid grid-cols-2 gap-6">
								<div className="relative">
									<img src="./img/slider/before2.png" alt="before kitchen" className="w-full h-[300px] object-cover rounded-lg" />
									<div className="absolute top-4 left-4 bg-[#FC6736] text-white px-3 py-1 rounded-md text-sm font-medium">
										Before
									</div>
								</div>
								<div className="relative">
									<img src="./img/slider/after2.png" alt="after kitchen" className="w-full h-[300px] object-cover rounded-lg" />
									<div className="absolute top-4 left-4 bg-[#0C2D57] text-white px-3 py-1 rounded-md text-sm font-medium">
										After
									</div>
								</div>
							</div>
						</SwiperSlide>
						<SwiperSlide>
							<div className="grid grid-cols-2 gap-6">
								<div className="relative">
									<img src="./img/slider/before3.png" alt="before kitchen" className="w-full h-[300px] object-cover rounded-lg" />
									<div className="absolute top-4 left-4 bg-[#FC6736] text-white px-3 py-1 rounded-md text-sm font-medium">
										Before
									</div>
								</div>
								<div className="relative">
									<img src="./img/slider/after3.png" alt="after kitchen" className="w-full h-[300px] object-cover rounded-lg" />
									<div className="absolute top-4 left-4 bg-[#0C2D57] text-white px-3 py-1 rounded-md text-sm font-medium">
										After
									</div>
								</div>
							</div>
						</SwiperSlide>
						<SwiperSlide>
							<div className="grid grid-cols-2 gap-6">
								<div className="relative">
									<img src="./img/slider/before4.png" alt="before kitchen" className="w-full h-[300px] object-cover rounded-lg" />
									<div className="absolute top-4 left-4 bg-[#FC6736] text-white px-3 py-1 rounded-md text-sm font-medium">
										Before
									</div>
								</div>
								<div className="relative">
									<img src="./img/slider/after4.png" alt="after kitchen" className="w-full h-[300px] object-cover rounded-lg" />
									<div className="absolute top-4 left-4 bg-[#0C2D57] text-white px-3 py-1 rounded-md text-sm font-medium">
										After
									</div>
								</div>
							</div>
						</SwiperSlide>
					</Swiper>
				</div>
			</div>
		</section>
	);
}
