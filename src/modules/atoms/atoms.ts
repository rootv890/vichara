import { atomWithStorage } from "jotai/utils"
import { atom } from "jotai/vanilla"
import { SIDEBAR_STORAGE_KEY } from "./constants"

export const isSidebarCollapsed = atomWithStorage(SIDEBAR_STORAGE_KEY, false)
export const organizationIdAtom = atom<string | null>(null)
