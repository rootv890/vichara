import { BouncyLoading } from "@/components/loadings"
import { NotesPageView } from "@/modules/notes/views/notes-page-view"
import React, { Suspense } from "react"

const NotesPage = async () => {
	return (
		<Suspense fallback={<BouncyLoading label="Loading Content..." />}>
			<NotesPageView />
		</Suspense>
	)
}

export default NotesPage
