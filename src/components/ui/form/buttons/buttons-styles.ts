import { LucideIcon } from 'lucide-react'

export const sizeStyles = {
	small: 'text-xs px-2 rounded-lg',
	medium: 'text-sm px-4 py-2 rounded-xl',
	normal: 'text-base px-6 py-3 rounded-xl',
	large: 'text-lg px-8 py-4 rounded-xl',
	custom: 'text-base px-3 py-3 rounded-xl',
	icon: 'text-sm h-10 w-10 px-2 py-2 rounded-lg',
}

export const iconSize = {
	small: 'w-4 h-4',
	medium: 'w-5 h-5',
	normal: 'w-6 h-6',
	large: 'w-7 h-7',
	custom: 'w-6 h-6',
	icon: 'w-6 h-6',
}

export const typeStyles = {
	primary: `bg-core-2 text-gray-1 hover:bg-core-1 disabled:bg-core-2/80 disabled:text-gray-1/80`,
	red: `bg-red/75 text-gray-1 hover:bg-red disabled:bg-red/80 disabled:text-gray-1/80`,
	green: `bg-green-2 text-gray-1 hover:bg-green/75 disabled:bg-green/80 disabled:text-gray-1/80`,
	orange: `bg-orange text-gray-1 hover:bg-orange/75 disabled:bg-orange/80 disabled:text-gray-1/80`,
	secondary: `bg-background-2 text-gray-1 hover:bg-background-1 disabled:bg-background-2/80 disabled:text-gray-1/80`,
	tertiary: `bg-gray-2/70 text-gray-1 hover:bg-gray-2 disabled:bg-gray-2/30 disabled:text-gray-1/30`,
	dark: `bg-background-6 text-gray-1 hover:bg-background-5 disabled:bg-background-6/80 disabled:text-gray-1/80`,
	line_secondary: `border border-1.5 border-background-4 text-gray-1 hover:bg-background-4 disabled:border-background-4/80 disabled:text-gray-1/80`,
	transperent: `text-gray-1 disabled:border-background-4/80 disabled:text-gray-1/80 hover:text-core-1`,
	transperent_red: `text-gray-1 disabled:border-background-4/80 disabled:text-gray-1/80 hover:text-red`,
	line_primary: `border border-core-0 text-gray-1 hover:bg-core-0 disabled:border-core-0/80 disabled:text-gray-1/80`,
	line_red: `border border-red text-gray-1 hover:bg-red disabled:border-red/80 disabled:text-gray-1/80`,
	line_green: `border border-green text-gray-1 hover:bg-green disabled:border-green/80 disabled:text-gray-1/80`,
	line_orange: `border border-orange text-gray-1 hover:bg-orange disabled:border-orange/80 disabled:text-gray-1/80`,
}

export const baseStyles = (size: ButtonSize, type: ButtonType) =>
	` gap-0.5 transition-all duration-300 ease-in-out ${sizeStyles[size]} ${typeStyles[type]} flex items-center justify-center text-nowrap`

export interface CustomButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children?: React.ReactNode
	type_style?: ButtonType
	secontary_style?: ButtonType
	size?: ButtonSize
	Icon?: LucideIcon
	iconurl?: string
	onlyIcon?: boolean
	width?: string
}

export interface CustomLinkButtonProps
	extends React.ButtonHTMLAttributes<HTMLLinkElement> {
	href: string
	children?: React.ReactNode
	type_style?: ButtonType
	size?: ButtonSize
	Icon?: LucideIcon
	iconurl?: string
	onlyIcon?: boolean
}

export type ButtonSize =
	| 'small'
	| 'medium'
	| 'normal'
	| 'large'
	| 'custom'
	| 'icon'
export type ButtonType =
	| 'primary'
	| 'secondary'
	| 'tertiary'
	| 'line_primary'
	| 'line_secondary'
	| 'line_red'
	| 'line_green'
	| 'line_orange'
	| 'red'
	| 'green'
	| 'orange'
	| 'dark'
	| 'transperent'
	| 'transperent_red'
