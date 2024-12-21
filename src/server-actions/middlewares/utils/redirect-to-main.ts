import type { NextRequest } from 'next/server'

import { MAIN_PAGES } from '@/config/pages-url.config'
import { nextRedirect } from './next-redirect'

export const redirectToMain = (request: NextRequest) => {
	return nextRedirect(MAIN_PAGES.HOME, request.url)
}
