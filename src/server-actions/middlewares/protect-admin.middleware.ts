import { type NextRequest, NextResponse } from 'next/server'

import { getTokensFromRequest } from './utils/get-tokens-from-request'
import { jwtVerifyServer } from './utils/jwt-verify'
import { redirectToLogin } from './utils/redirect-to-login'
import { redirectToMain } from './utils/redirect-to-main'
import { verifyUserPermission } from './utils/verify-user-permission'

export async function protectAdmin(request: NextRequest) {
	const tokens = await getTokensFromRequest(request)
	if (!tokens) return redirectToLogin(request)

	const verifiedData = await jwtVerifyServer(tokens.accessToken)
	if (!verifiedData) return redirectToLogin(request)
	const hasPermission = verifyUserPermission(
		verifiedData.role.permissions,
		'admin:dashboard.see'
	)
	console.log('hasPermission', hasPermission)
	if (!hasPermission) return redirectToMain(request)

	return NextResponse.next()
}
