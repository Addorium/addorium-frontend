import type { LucideIcon } from 'lucide-react'

export interface IUserMenuItem {
	link?: string
	name: string
	icon: LucideIcon
	type?: 'normal' | 'red' | 'green'
	onClick?: () => void
}
