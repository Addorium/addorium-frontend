import { Folder, Folders, ScanEye, ScanFace, Users } from 'lucide-react'

import {
	ISidebarCategory,
	ISidebarItem,
} from '@/components/ui/sidebar/admin-sidebar.interface'
import { ADMIN_PAGES } from '@/config/pages-url.config'

export const USER_CONTROLL: ISidebarItem[] = [
	{
		Icon: Users,
		link: ADMIN_PAGES.USERS,
		name: 'Users',
	},
	{
		Icon: ScanFace,
		link: ADMIN_PAGES.ROLES,
		name: 'Roles',
	},
]
export const PROJECTS_CONTROLL: ISidebarItem[] = [
	{
		Icon: Folders,
		link: ADMIN_PAGES.PROJECTS,
		name: 'Projects',
	},
	{
		Icon: Folder,
		link: ADMIN_PAGES.CATEGORIES,
		name: 'Categories',
	},
	{
		Icon: Folder,
		link: ADMIN_PAGES.TAGS,
		name: 'Tags',
	},
]
export const DEVELOPERS_CONTROLL: ISidebarItem[] = [
	{
		Icon: ScanEye,
		link: ADMIN_PAGES.PERSONAL_ACCESS_TOKENS,
		name: 'Personal access tokens',
	},
	{
		Icon: Folder,
		link: ADMIN_PAGES.APPLICATIONS,
		name: 'Applications',
	},
]

export const ADMIN_CATEGORIES: ISidebarCategory[] = [
	{
		name: 'User controll',
		items: USER_CONTROLL,
	},
	{
		name: 'Projects controll',
		items: PROJECTS_CONTROLL,
	},
	{
		name: 'Developers controll',
		items: DEVELOPERS_CONTROLL,
	},
]
