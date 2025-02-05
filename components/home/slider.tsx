"use client";
import React from "react";

declare global {
	interface Window {
		Cookiebot?: {
			consent: boolean;
		};
	}
}
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Virtual } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function SliderSection() {
	const [isClient, setIsClient] = React.useState(false);
	const [isCookiebotReady, setIsCookiebotReady] = React.useState(false);

	React.useEffect(() => {
		const checkCookiebot = () => {
			if (window.Cookiebot && window.Cookiebot.consent) {
				setIsCookiebotReady(true);
			}
		};

		// Check immediately
		checkCookiebot();

		// Also check when Cookiebot's consent changes
		window.addEventListener('CookiebotOnAccept', checkCookiebot);
		window.addEventListener('CookiebotOnDecline', checkCookiebot);

		return () => {
			window.removeEventListener('CookiebotOnAccept', checkCookiebot);
			window.removeEventListener('CookiebotOnDecline', checkCookiebot);
		};
	}, []);

	React.useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient || !isCookiebotReady) {
		return null;
	}

	return (
		<section className="pt-28 sm:pb-64 pb-28 bg-[#FFB0B0]" id="sample">
			<div className="w-full lg:max-w-6xl mx-auto px-6">
				<h2 className="text-[#0C2D57] text-3xl lg:text-[64px] lg:leading-[81px] font-bold mb-7">
					Before vs After <br /> Examples
				</h2>
				<p className="text-[#0C2D57] text-sm mb-20">
					"Don't be afraid to give up the good to go for the great." – John D.
					Rockefeller
				</p>
				<div className="slider-container">
					<Swiper
						spaceBetween={30}
						slidesPerView={3}
						navigation={true}
						modules={[Navigation, Virtual]}
						className="mySwiper"
						virtual={true}
					>
						<SwiperSlide>
							<img src="./img/slider/before1.png" alt="before after" className="w-full h-auto" />
						</SwiperSlide>
						<SwiperSlide>
							<img src="./img/slider/after1.png" alt="before after" className="w-full h-auto" />
						</SwiperSlide>
						<SwiperSlide>
							<img src="./img/slider/after2.png" alt="before after" className="w-full h-auto" />
						</SwiperSlide>
						<SwiperSlide>
							<img src="./img/slider/before2.png" alt="before after" className="w-full h-auto" />
						</SwiperSlide>
					</Swiper>
				</div>
			</div>
		</section>
	);
}
