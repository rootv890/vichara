import { atomWithStorage } from "jotai/utils"

import {
	NOTES_EXPANDED_STORAGE_KEY,
	ORGANIZATION_STORAGE_KEY,
	SIDEBAR_STORAGE_KEY,
	SIDEBAR_WIDTH_STORAGE_KEY,
} from "./constants"

export const isSidebarCollapsed = atomWithStorage(SIDEBAR_STORAGE_KEY, false)
export const organizationIdAtom = atomWithStorage<string | null>(
	ORGANIZATION_STORAGE_KEY,
	null
)
// to keep the history of expanded notes
export const expandedNotesAtom = atomWithStorage<Record<string, boolean>>(
	NOTES_EXPANDED_STORAGE_KEY,
	{}
)

export const sidebarWidthAtom = atomWithStorage<number>(
	SIDEBAR_WIDTH_STORAGE_KEY,
	280
)

export const persistantCounter = atomWithStorage<number>("persistantCounter", 0)
