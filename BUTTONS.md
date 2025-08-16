# Button Usage Guide

This document provides a comprehensive guide for using the custom button system in this project.

## 🎨 Design Philosophy

Our button system is built with a focus on:

- **Modern aesthetics** with rounded corners and smooth animations
- **Brand consistency** using semantic color tokens
- **Accessibility** with proper focus states and ARIA support
- **Semantic meaning** with intent-based components

## 📦 Available Components

### Basic Components

```tsx
import { Button, IconButton } from "@/components/ui/button"
```

### Semantic Components

```tsx
import { DestructiveButton, SuccessButton } from "@/components/ui/button"
```

## 🎯 Variants

Our button system includes 6 carefully designed variants:

### `solid` - Primary Actions

The main call-to-action button with high contrast.

```tsx
<Button variant="solid">Create Note</Button>
```

### `subtle` - Secondary Actions

Clean minimal style with subtle borders and backgrounds.

```tsx
<Button variant="subtle">Save Draft</Button>
```

### `surface` - Elevated Feel

Buttons with built-in shadows for elevated interfaces.

```tsx
<Button variant="surface">Settings</Button>
```

### `outline` - Professional Style

Clean bordered buttons for professional interfaces.

```tsx
<Button variant="outline">Cancel</Button>
```

### `ghost` - Minimal Interaction

Transparent buttons that reveal on hover.

```tsx
<Button variant="ghost">Close</Button>
```

### `plain` - Text-like

Minimal text-style buttons for inline actions.

```tsx
<Button variant="plain">Learn more</Button>
```

## 📏 Sizes

7 sizes available from extra small to extra large:

```tsx
<Button size="2xs">Tiny</Button>
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium (default)</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
<Button size="2xl">Huge</Button>
```

## 🎨 Color Palettes

Use Chakra UI's built-in color palettes for semantic meaning:

```tsx
<Button colorPalette="blue">Info Action</Button>
<Button colorPalette="green">Success Action</Button>
<Button colorPalette="red">Danger Action</Button>
<Button colorPalette="yellow">Warning Action</Button>
```

## 🚨 Semantic Components

### DestructiveButton

For dangerous actions like delete, remove, or destructive operations:

```tsx
import { DestructiveButton } from "@/components/ui/button"

<DestructiveButton variant="solid">Delete Forever</DestructiveButton>
<DestructiveButton variant="outline">Remove Item</DestructiveButton>
<DestructiveButton variant="ghost">Discard</DestructiveButton>
```

### SuccessButton

For positive actions like save, complete, or confirm:

```tsx
import { SuccessButton } from "@/components/ui/button"

<SuccessButton variant="solid">Save Changes</SuccessButton>
<SuccessButton variant="subtle">Mark Complete</SuccessButton>
```

## 🔧 Common Patterns

### With Icons

```tsx
import { LuPlus, LuSave, LuTrash2 } from "react-icons/lu"

<Button variant="solid">
  <LuPlus />
  Add Item
</Button>

<Button variant="subtle">
  <LuSave />
  Save Draft
</Button>

<DestructiveButton variant="outline">
  <LuTrash2 />
  Delete
</DestructiveButton>
```

### Loading States

```tsx
<Button loading>Processing...</Button>
<Button loading loadingText="Saving...">Save</Button>
```

### Disabled States

```tsx
<Button disabled>Cannot Click</Button>
<Button variant="outline" disabled>Disabled Outline</Button>
```

### Full Width

```tsx
<Button
	w="full"
	variant="solid"
>
	Full Width Button
</Button>
```

## 🎨 Visual Hierarchy Guide

Use this hierarchy for consistent UX:

1. **Primary Action**: `variant="solid"` - Most important action on the page
2. **Secondary Action**: `variant="subtle"` or `variant="outline"` - Supporting actions
3. **Tertiary Action**: `variant="ghost"` - Least important actions
4. **Destructive Action**: `DestructiveButton` - Dangerous operations
5. **Success Action**: `SuccessButton` - Positive confirmations

## 📱 Responsive Usage

```tsx
<Button
	size={{ base: "sm", md: "md", lg: "lg" }}
	variant="solid"
>
	Responsive Button
</Button>
```

## ✨ Advanced Features

### Custom Styling

You can still override styles when needed:

```tsx
<Button
	variant="solid"
	bg="purple.500"
	_hover={{ bg: "purple.600" }}
>
	Custom Purple
</Button>
```

### As Link

```tsx
<Button asChild>
	<a href="/dashboard">Go to Dashboard</a>
</Button>
```

## 🚀 Best Practices

1. **Use semantic components** when possible (`DestructiveButton` for deletions)
2. **Maintain visual hierarchy** (solid > subtle > outline > ghost)
3. **Be consistent** with sizing across related actions
4. **Use appropriate colors** for context (red for destructive, green for success)
5. **Include icons** for better UX when space allows
6. **Test accessibility** ensure proper focus states and ARIA labels

## 🎯 Real-world Examples

### Sidebar Actions

```tsx
// New item button
<Button variant="subtle" size="sm" w="full">
  <LuPlus />
  New Note
</Button>

// Collapse button
<Button variant="ghost" size="sm">
  <TbMenu />
</Button>
```

### Modal Actions

```tsx
// Modal footer
<HStack gap={3}>
	<Button
		variant="outline"
		onClick={onCancel}
	>
		Cancel
	</Button>
	<SuccessButton
		variant="solid"
		onClick={onSave}
	>
		Save Changes
	</SuccessButton>
</HStack>
```

### Dangerous Actions

```tsx
// Delete confirmation
<DestructiveButton
	variant="solid"
	loading={isDeleting}
	onClick={handleDelete}
>
	<LuTrash2 />
	Delete Forever
</DestructiveButton>
```

---

This button system provides a solid foundation for building consistent, accessible, and beautiful user interfaces. The design adapts automatically to light/dark mode and provides smooth micro-interactions that enhance the user experience.
