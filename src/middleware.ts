import { NextRequest, NextResponse } from 'next/server'

import { MAIN_PAGES } from './config/pages-url.config'
import { EnumTokens } from './services/auth-token.service'

export async function middleware(request: NextRequest, response: NextResponse) {
	const { url, cookies } = request

	const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value
	const accessToken = cookies.get(EnumTokens.ACCESS_TOKEN)?.value

	const isDashboardPage = url.includes('/dashboard')

	const isAuthPage = url.includes('/auth')

	if (isAuthPage && refreshToken) {
		return NextResponse.redirect(new URL(MAIN_PAGES.HOME, url))
	}

	if (isAuthPage) {
		return NextResponse.next()
	}
	if (isDashboardPage && !refreshToken && !accessToken) {
		return NextResponse.redirect(new URL('/auth', request.url))
	}

	if (!refreshToken) {
		return NextResponse.redirect(new URL('/auth', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/admin/:path*', '/auth/:path', '/dashboard/:path*'],
}
