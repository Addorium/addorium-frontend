import { LucideIcon } from 'lucide-react'

export const sizeStyles = {
	small: 'text-[14px] min-h-[40px] px-2 py-1',
	normal: 'text-[17px] min-h-[42px] px-3 py-3',
	large: 'text-[20px] min-h-[50px] px-3 py-3',
	custom: 'text-[16px] min-h-[42px] px-3 py-3',
}

export const iconSize = {
	small: 'w-[20px] h-[20px]',
	normal: 'w-[24px] h-[24px]',
	large: 'w-[32px] h-[32px]',
	custom: 'w-[24px] h-[24px]',
}

export const typeStyles = {
	core: `bg-core-2 text-gray-1 hover:bg-core-1 disabled:bg-core-2/15 disabled:text-gray-1/15`,
	red: `bg-red/75 text-gray-1 hover:bg-red disabled:bg-red/15 disabled:text-gray-1/15`,
	green: `bg-green-2 text-gray-1 hover:bg-green/75 disabled:bg-green/15 disabled:text-gray-1/15`,
	orange: `bg-orange text-gray-1 hover:bg-orange/75 disabled:bg-orange/15 disabled:text-gray-1/15`,
	gray: `bg-gray-3/75 text-gray-1 hover:bg-gray-3 disabled:bg-gray-3/15 disabled:text-gray-1/15`,
	light_gray: `bg-gray-2/70 text-gray-1 hover:bg-gray-2 disabled:bg-gray-2/30 disabled:text-gray-1/30`,
	dark: `bg-background-6 text-gray-6 hover:bg-background-6/75 disabled:bg-backound-6/15 disabled:text-gray-6/15`,
	bordered: `border border-background-4 text-gray-1 hover:bg-background-4 disabled:border-background-4/15 disabled:text-gray-1/15`,
	transperent: `text-gray-1 hover:bg-gray-3 disabled:border-background-4/15 disabled:text-gray-1/15`,
	coreBorder: `border border-core-0 text-gray-1 hover:bg-core-0 disabled:border-core-0/15 disabled:text-gray-1/15`,
	redBorder: `border border-red text-gray-1 hover:bg-red disabled:border-red/15 disabled:text-gray-1/15`,
	greenBorder: `border border-green text-gray-1 hover:bg-green disabled:border-green/15 disabled:text-gray-1/15`,
	orangeBorder: `border border-orange text-gray-1 hover:bg-orange disabled:border-orange/15 disabled:text-gray-1/15`,
}

export const baseStyles = (size: ButtonSize, type: ButtonType) =>
	`rounded-[16px] transition-bg duration-300 ease-in-out ${sizeStyles[size]} ${typeStyles[type]} flex items-center justify-center text-nowrap`

export interface CustomButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children?: React.ReactNode
	type_style?: ButtonType
	size?: ButtonSize
	Icon?: LucideIcon
	iconurl?: string
	onlyIcon?: boolean
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

export type ButtonSize = 'small' | 'normal' | 'large' | 'custom'
export type ButtonType =
	| 'core'
	| 'red'
	| 'green'
	| 'orange'
	| 'gray'
	| 'light_gray'
	| 'dark'
	| 'transperent'
	| 'bordered'
	| 'coreBorder'
	| 'redBorder'
	| 'greenBorder'
	| 'orangeBorder'
