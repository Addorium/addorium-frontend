import { NextRequest, NextResponse } from 'next/server'

import {
	ADMIN_PAGES,
	DASHBOARD_PAGES,
	MAIN_PAGES,
} from './config/pages-url.config'
import { protectAdmin } from './server-actions/middlewares/protect-admin.middleware'
import { protectDashboard } from './server-actions/middlewares/protect-dashboard.middleware'
import { protectLoginPages } from './server-actions/middlewares/protect-login.middleware'

export async function middleware(request: NextRequest, response: NextResponse) {
	const url = new URL(request.url)
	const pathname = url.pathname

	if (pathname.includes(DASHBOARD_PAGES.OVERVIEW)) {
		return protectDashboard(request)
	}

	if (pathname.includes(MAIN_PAGES.AUTH)) {
		return protectLoginPages(request)
	}

	if (pathname.includes(ADMIN_PAGES.HOME)) {
		return protectAdmin(request)
	}
}

export const config = {
	matcher: ['/admin/:path*', '/auth/:path', '/dashboard/:path*'],
}
