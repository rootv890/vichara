import React from "react"

export const useScrollTop = (threshold: number = 10) => {
	const [scrolled, setScrolled] = React.useState(false)

	React.useEffect(() => {
		function handleScroll() {
			if (window.scrollY > threshold) {
				setScrolled(true)
			} else {
				setScrolled(false)
			}
		}

		window.addEventListener("scroll", handleScroll)

		// clean up
		return () => {
			window.removeEventListener("scroll", handleScroll)
		}
	}, [scrolled])
	return scrolled
}
