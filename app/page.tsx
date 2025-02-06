'use client'
import BannerSection from "@/components/home/banner";
import FooterSection from "@/components/home/footer";
import HowToUseSection from "@/components/home/howToUse";
import Navbar from "@/components/home/navbar";
import PricePlansSection from "@/components/home/pricePlans";
import SliderSection from "@/components/home/slider";
import ReactCookieBot from "react-cookiebot";


const COOKIE_BOT_ID = "1676e844-56d7-414d-83b3-e79ae790129b";

export default function Home() {
	return (
		<div>
			<Navbar />
			<BannerSection />
			<HowToUseSection />
			<SliderSection />
			<PricePlansSection />
			<FooterSection />
			<ReactCookieBot domainGroupId={COOKIE_BOT_ID} />
		</div>
	);
}
