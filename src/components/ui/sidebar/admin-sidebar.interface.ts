import type { LucideIcon } from 'lucide-react'

export interface ISidebarItem {
	link: string
	name: string
	Icon: LucideIcon
	permission?: string
	disabled?: boolean
}
export interface ISidebarCategory {
	name?: string
	items: ISidebarItem[]
	permission?: string
}
