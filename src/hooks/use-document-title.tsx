// a simple hook to change the document title
import React from "react"

const useDocumentTitle = (title: string) => {
	React.useEffect(() => {
		document.title = title ? `${title} - Vichara` : "Vichara"
	}, [title])

	// cleanup
}

export default useDocumentTitle
