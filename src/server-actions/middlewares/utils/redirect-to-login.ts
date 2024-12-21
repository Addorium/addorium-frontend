import type { NextRequest } from 'next/server'

import { MAIN_PAGES } from '@/config/pages-url.config'
import { nextRedirect } from './next-redirect'

export const redirectToLogin = (request: NextRequest) => {
	return nextRedirect(MAIN_PAGES.AUTH, request.url)
}
