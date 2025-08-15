import MainLayout from "@/modules/notes/ui/layouts/main-layout"
import React from "react"
import layout from "../layout"

type Props = {
	children: React.ReactNode
}

function Layout({ children }: Props) {
	return <MainLayout>{children}</MainLayout>
}

export default Layout
