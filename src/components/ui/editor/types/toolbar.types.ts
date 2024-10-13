import TextWrapper from '@/classes/TextWrapper.class'

export interface ToolbarButton {
	icon: React.ReactNode
	onClick: (wrapper: TextWrapper) => void
	tooltip: string
}
export interface ToolbarButtonProps {
	button: ToolbarButton
	textWrapper: TextWrapper
	disabled?: boolean
}

export interface ToolbarCategory {
	name: string
	buttons: ToolbarButton[]
}
export interface ToolbarCategoryProps {
	category: ToolbarCategory
	textWrapper: TextWrapper
}

export interface ToolbarProps {
	categories: ToolbarCategory[]
	textWrapper: TextWrapper
	disabled?: boolean
}
