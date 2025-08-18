import { atomWithStorage } from "jotai/utils"

import { Id } from "@convex/_generated/dataModel"
import {
	ACTIVE_NOTE_ID_STORAGE_KEY,
	NOTES_EXPANDED_STORAGE_KEY,
	NOTES_STATUS_STORAGE_KEY,
	ORGANIZATION_STORAGE_KEY,
	SIDEBAR_STORAGE_KEY,
	SIDEBAR_WIDTH_STORAGE_KEY,
} from "./constants"

// ─── Sidebar ────────────────────────────────────────────────
export const isSidebarCollapsed = atomWithStorage(SIDEBAR_STORAGE_KEY, false)
export const sidebarWidthAtom = atomWithStorage<number>(
	SIDEBAR_WIDTH_STORAGE_KEY,
	280
)
export const gutterWidthAtom = atomWithStorage<number>("gutterWidth", 0)

// ─── Organization ──────────────────────────────────────────
export const organizationIdAtom = atomWithStorage<string | null>(
	ORGANIZATION_STORAGE_KEY,
	null
)

// ─── Notes ─────────────────────────────────────────────────
export const expandedNotesAtom = atomWithStorage<Record<string, boolean>>(
	NOTES_EXPANDED_STORAGE_KEY,
	{}
)
export const currentActiveNoteIdAtom = atomWithStorage<Id<"notes"> | null>(
	ACTIVE_NOTE_ID_STORAGE_KEY,
	null
)

// notes status tracker

interface notesStatusAtom {
	saving: boolean
	changingTitle: boolean
}

export const notesStatusAtom = atomWithStorage<notesStatusAtom>(
	NOTES_STATUS_STORAGE_KEY,
	{
		saving: false,
		changingTitle: false,
	}
)

// ─── Miscellaneous ─────────────────────────────────────────
export const persistantCounter = atomWithStorage<number>("persistantCounter", 0)

export const isNoteHeaderToolbarVisibleAtom = atomWithStorage<boolean>(
	"noteHeaderToolbarVisible",
	false
)
