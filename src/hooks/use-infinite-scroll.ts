import React from "react"

interface UseInfiniteScrollProps {
	status: "CanLoadMore" | "LoadingMore" | "Exhausted" | "LoadingFirstPage"
	loadSize?: number
	loadMore: (numItems: number) => void
	observerEnabled: boolean
}

export const useInfiniteScroll = ({
	loadMore,
	observerEnabled,
	status,
	loadSize = 10,
}: UseInfiniteScrollProps) => {
	const topElementRef = React.useRef<HTMLDivElement | null>(null)
	const handleLoadMore = React.useCallback(() => {
		if (status === "CanLoadMore") {
			loadMore(loadSize)
		}
	}, [status, loadMore, loadSize])

	React.useEffect(() => {
		// early return
		const topElement = topElementRef.current
		if (!observerEnabled || !topElement) return
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting && status === "CanLoadMore") {
					handleLoadMore()
				}
			},
			{
				threshold: 0.1,
			}
		)

		// call observe
		observer.observe(topElement)
		// clean up return
		return () => {
			observer.disconnect()
		}
	}, [observerEnabled, topElementRef, handleLoadMore, status])

	// returns
	return {
		topElementRef,
		handleLoadMore,
		canLoadMore: status === "CanLoadMore",
		isLoadingMore: status === "LoadingMore",
		isExhausted: status === "Exhausted",
	}
}
