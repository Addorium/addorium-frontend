import type { NextRequest } from 'next/server'

import { MAIN_PAGES } from '@/config/pages-url.config'
import { ProjectType } from '@/types/project.types'
import { nextRedirect } from './next-redirect'

export const redirectToProject = (
	request: NextRequest,
	type: ProjectType,
	slug: string
) => {
	switch (type) {
		case 'BLUEPRINT':
			return nextRedirect(MAIN_PAGES.BLUEPRINT_SLUG(slug), request.url)
		case 'THEME':
			return nextRedirect(MAIN_PAGES.THEME_SLUG(slug), request.url)
		case 'SCRIPT':
			return nextRedirect(MAIN_PAGES.SCRIPT_SLUG(slug), request.url)
		default:
			return nextRedirect(MAIN_PAGES.HOME, request.url)
	}
}
