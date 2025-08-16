import { atomWithStorage } from "jotai/utils"
import { atom } from "jotai/vanilla"
import { ORGANIZATION_STORAGE_KEY, SIDEBAR_STORAGE_KEY } from "./constants"

export const isSidebarCollapsed = atomWithStorage(SIDEBAR_STORAGE_KEY, false)
export const organizationIdAtom = atomWithStorage<string | null>(
	ORGANIZATION_STORAGE_KEY,
	null
)
