import { Bell, ChartBar, Folders, LayoutDashboard } from 'lucide-react'

import {
	ISidebarCategory,
	ISidebarItem,
} from '@/components/ui/sidebar/admin-sidebar.interface'
import { DASHBOARD_PAGES } from '@/config/pages-url.config'

const USER_CONTROLL: ISidebarItem[] = [
	{
		Icon: LayoutDashboard,
		link: DASHBOARD_PAGES.OVERVIEW,
		name: 'Overview',
	},
	{
		Icon: ChartBar,
		link: DASHBOARD_PAGES.ANALYTICS,
		name: 'Analytics',
		disabled: true,
	},
	{
		Icon: Bell,
		link: DASHBOARD_PAGES.NOTIFICATIONS,
		name: 'Notifications',
		disabled: true,
	},
]
const MANAGE_CONTROLL: ISidebarItem[] = [
	{
		Icon: Folders,
		link: DASHBOARD_PAGES.PROJECTS,
		name: 'Projects',
	},
]

export const DASHBOARD_CATEGORIES: ISidebarCategory[] = [
	{
		items: USER_CONTROLL,
	},
	{
		name: 'Manage',
		items: MANAGE_CONTROLL,
	},
]
