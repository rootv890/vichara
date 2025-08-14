import MarketingNavbar from "@/modules/marketing/ui/components/marketing-navbar"
import React from "react"

type Props = {
	children: React.ReactNode
}

const MarketingLayout = ({ children }: Props) => {
	return (
		<div className="max-w-screen mx-auto">
			<MarketingNavbar />
			{children}
		</div>
	)
}

export default MarketingLayout
