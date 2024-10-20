import { MAIN_PAGES } from '@/config/pages-url.config'

export interface INavBarItem {
	label: string
	href: string
}

export const NAVBAR_ITEMS: INavBarItem[] = [
	{ label: 'Scripts', href: MAIN_PAGES.SCRIPTS },
	{ label: 'Blueprints', href: MAIN_PAGES.BLUEPRINTS },
	{ label: 'Themes', href: MAIN_PAGES.THEMES },
	{ label: 'Packs', href: MAIN_PAGES.PACKS },
]
