import { LayoutDashboard, User } from 'lucide-react'

import { DASHBOARD_PAGES, MAIN_PAGES } from '@/config/pages-url.config'
import { IUserMenuItem } from './menu.interface'

export const USER_MENU: IUserMenuItem[] = [
	{
		icon: User,
		link: MAIN_PAGES.HOME,
		name: 'Profile',
		type: 'normal',
	},
	{
		icon: LayoutDashboard,
		link: DASHBOARD_PAGES.OVERVIEW,
		name: 'Dashboard',
		type: 'normal',
	},
]