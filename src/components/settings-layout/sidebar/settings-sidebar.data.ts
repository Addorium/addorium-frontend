import {
	Folder,
	GalleryThumbnails,
	MonitorIcon,
	PaintRoller,
	ScanEye,
	Shield,
	User2,
} from 'lucide-react'

import {
	ISidebarCategory,
	ISidebarItem,
} from '@/components/ui/sidebar/admin-sidebar.interface'
import { SETTINGS_PAGES } from '@/config/pages-url.config'

export const DISPLAY_CONTROLL: ISidebarItem[] = [
	{
		Icon: PaintRoller,
		link: SETTINGS_PAGES.APPERANCE,
		name: 'Appearance',
	},
]
export const ACCOUNT_CONTROLL: ISidebarItem[] = [
	{
		Icon: User2,
		link: SETTINGS_PAGES.ACCOUNT,
		name: 'Profile',
	},
	{
		Icon: Shield,
		link: SETTINGS_PAGES.SECURITY,
		name: 'Security',
	},
	{
		Icon: GalleryThumbnails,
		link: SETTINGS_PAGES.AUTHORIZED_APPS,
		name: 'Authorized apps',
		disabled: true,
	},
	{
		Icon: MonitorIcon,
		link: SETTINGS_PAGES.SESSIONS,
		name: 'Sessions',
	},
]
export const DEVELOPER_CONTROLL: ISidebarItem[] = [
	{
		Icon: ScanEye,
		link: SETTINGS_PAGES.PERSONAL_ACCESS_TOKENS,
		name: 'Personal access tokens',
		disabled: true,
	},
	{
		Icon: Folder,
		link: SETTINGS_PAGES.APPLICATIONS,
		name: 'Applications',
		disabled: true,
	},
]

export const SETTINGS_CATEGORIES: ISidebarCategory[] = [
	{
		name: 'Display',
		items: DISPLAY_CONTROLL,
	},
	{
		name: 'User account',
		items: ACCOUNT_CONTROLL,
	},
	{
		name: 'Developers',
		items: DEVELOPER_CONTROLL,
	},
]
