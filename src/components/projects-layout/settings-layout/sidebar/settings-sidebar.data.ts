import {
	ChartColumn,
	FolderInput,
	ImageUp,
	LayoutDashboard,
	MessageCircleWarning,
	PencilRuler,
	Tags,
} from 'lucide-react'

import {
	ISidebarCategory,
	ISidebarItem,
} from '@/components/ui/sidebar/admin-sidebar.interface'
import { MAIN_PAGES, PROJECT_SETTINGS_PAGES } from '@/config/pages-url.config'
import { ProjectType } from '@/types/project.types'

// Функция, которая создает динамические ссылки для проекта
const getProjectControlItems = (
	slug: string,
	type: ProjectType
): ISidebarItem[] => [
	{
		Icon: LayoutDashboard,
		link:
			MAIN_PAGES.getProjectLink(slug, type) + PROJECT_SETTINGS_PAGES.GENERAL,
		name: 'General',
	},
	{
		Icon: Tags,
		link: MAIN_PAGES.getProjectLink(slug, type) + PROJECT_SETTINGS_PAGES.TAGS,
		name: 'Tags',
		disabled: false,
	},
	{
		Icon: PencilRuler,
		link:
			MAIN_PAGES.getProjectLink(slug, type) +
			PROJECT_SETTINGS_PAGES.DESCRIPTION,
		name: 'Description',
		disabled: false,
	},
]

const getProjectUploadItems = (
	slug: string,
	type: ProjectType
): ISidebarItem[] => [
	{
		Icon: ImageUp,
		link: MAIN_PAGES.getProjectLink(slug, type) + PROJECT_SETTINGS_PAGES.IMAGES,
		name: 'Images',
		disabled: false,
	},
	{
		Icon: FolderInput,
		link: MAIN_PAGES.getProjectLink(slug, type) + PROJECT_SETTINGS_PAGES.FILE,
		name: 'File',
		disabled: true,
	},
]

const getProjectAdminItems = (
	slug: string,
	type: ProjectType
): ISidebarItem[] => [
	{
		Icon: MessageCircleWarning,
		link:
			MAIN_PAGES.getProjectLink(slug, type) + PROJECT_SETTINGS_PAGES.MODERATION,
		name: 'Moderation',
		disabled: false,
		permission: 'admin:menu.project.settings.moderation',
	},
	{
		Icon: ChartColumn,
		link:
			MAIN_PAGES.getProjectLink(slug, type) + PROJECT_SETTINGS_PAGES.STATISTICS,
		name: 'Statistics',
		disabled: false,
		permission: 'admin:menu.project.settings.statistics',
	},
]

export const getProjectSettingsCategories = (
	slug: string,
	type: ProjectType
): ISidebarCategory[] => [
	{
		name: 'Project settings',
		items: getProjectControlItems(slug, type),
	},
	{
		name: 'Upload',
		items: getProjectUploadItems(slug, type),
	},
	{
		name: 'Admin',
		items: getProjectAdminItems(slug, type),
		permission: 'admin:menu.project.settings.*',
	},
]
