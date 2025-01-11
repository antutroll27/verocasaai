import BannerSection from "@/components/home/banner";
import FooterSection from "@/components/home/footer";
import HowToUseSection from "@/components/home/howToUse";
import Navbar from "@/components/home/navbar";
import PricePlansSection from "@/components/home/pricePlans";
import SliderSection from "@/components/home/slider";

export default function Home() {
	return (
		<div>
			<Navbar />
			<BannerSection />
			<HowToUseSection />
			<SliderSection />
			<PricePlansSection />
			<FooterSection />
		</div>
	);
}
