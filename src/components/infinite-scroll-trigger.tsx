/**
 * InfiniteScrollTrigger Component Plan
 *
 * Props:
 * - canLoadMore: boolean         // Indicates if more items can be loaded
 * - isLoadingMore: boolean       // Indicates if additional items are currently loading
 * - isLoadingFirstPage: boolean  // Indicates if the first page is loading
 * - isExhausted: boolean         // Indicates if all items have been loaded
 * - onLoadMore?: () => void      // Callback to load more items
 * - loadMoreText?: string        // Text for the "Load More" button (default: "LOAD MORE")
 * - noMoreText?: string          // Text when no more items are available (default: "NO MORE ITEMS")
 * - ref?: React.Ref<HTMLDivElement> // Ref for the container div
 *
 * UI Logic:
 * - If loading (isLoadingMore or isLoadingFirstPage): show "LOADING..."
 * - If exhausted (isExhausted): show noMoreText
 * - Otherwise: show loadMoreText on a button
 *   - Button is disabled if !canLoadMore or isLoadingMore
 *   - Button triggers onLoadMore when clicked
 * - All content is wrapped in a div with the provided ref
 */

import { cn } from "../lib/utils"
import { BouncyLoading } from "./loadings"
import { Button } from "./ui/button"

interface InfiniteScrollTriggerProps {
	// bools
	canLoadMore: boolean
	isLoadingMore: boolean
	// fns
	onLoadMore?: () => void
	// strings
	loadMoreText?: string
	noMoreText?: string
	className?: string
	// refs
	ref?: React.Ref<HTMLDivElement>
}

export const InfiniteScrollTrigger = ({
	canLoadMore,
	isLoadingMore,
	onLoadMore,
	loadMoreText = "Load More",
	noMoreText = "No More Items",
	className,
	ref,
}: InfiniteScrollTriggerProps) => {
	let text = "Load More"
	if (isLoadingMore) {
		text = "Loading..."
	} else if (!canLoadMore) {
		text = noMoreText
	}

	// regex for loading matching from text
	const isLoading = /\bloading\b/i.test(text)

	return (
		<div
			ref={ref}
			className={cn("flex w-full   justify-center py-2", className)}
		>
			<Button
				disabled={!canLoadMore || isLoadingMore}
				onClick={onLoadMore}
				size={"sm"}
				variant={"ghost"}
			>
				{isLoading ? (
					<BouncyLoading label={text} />
				) : (
					<span className="font-serif">{text}</span>
				)}
			</Button>
		</div>
	)
}
