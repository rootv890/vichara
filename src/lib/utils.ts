import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function processNoteIcon(icon: string | null | undefined): string {
	// Fallback sticky note icon
	const fallback = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
			fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
			stroke-linejoin="round" class="lucide lucide-sticky-note-icon lucide-sticky-note">
			<path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z"/>
			<path d="M15 3v4a2 2 0 0 0 2 2h4"/>
		</svg>`

	if (!icon) return fallback

	// If already SVG markup
	if (icon.trim().startsWith("<svg")) {
		return icon
	}

	// If it's a data URI (base64 or inline SVG)
	if (icon.startsWith("data:image/")) {
		return `<img src="${icon}" alt="icon" width="24" height="24" />`
	}

	// If it's an emoji or plain text
	if (/[\p{Emoji}\p{Extended_Pictographic}]/u.test(icon)) {
		return `<span style="font-size:20px">${icon}</span>`
	}

	// Otherwise treat as text string (could be a Lucide/Feather icon name later)
	return `<span style="font-size:14px">${icon}</span>`
}
