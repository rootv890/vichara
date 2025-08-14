import React from "react"
import { BentoGrid } from "./components/bento-grid"
import { CTASection } from "./components/cta"
import { HeroSection } from "./components/hero"

const MarketingView = () => {
	return (
		<main className="min-h-screen">
			<HeroSection />
			<BentoGrid />
			<CTASection />
		</main>
	)
}

export default MarketingView
