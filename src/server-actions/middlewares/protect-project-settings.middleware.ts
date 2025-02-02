import { type NextRequest, NextResponse } from 'next/server'

import { projectService } from '@/services/project.service'
import { getTokensFromRequest } from './utils/get-tokens-from-request'
import { jwtVerifyServer } from './utils/jwt-verify'
import { redirectToLogin } from './utils/redirect-to-login'
import { redirectToMain } from './utils/redirect-to-main'
import { redirectToProject } from './utils/redirect-to-project'
import { verifyUserPermission } from './utils/verify-user-permission'

export async function protectProjectSettings(
	request: NextRequest,
	projectSettingsMath: RegExpMatchArray
) {
	//get project by slug
	const [_, type, slug] = projectSettingsMath
	const project = await projectService.getBySlug(slug)
	if (!project) return redirectToMain(request)

	//verify user token
	const tokens = await getTokensFromRequest(request)
	if (!tokens) return redirectToLogin(request)
	const verifiedData = await jwtVerifyServer(tokens.accessToken)
	if (!verifiedData) {
		return redirectToProject(request, project.type, project.slug)
	}

	const hasPermission = verifyUserPermission(
		verifiedData.role.permissions,
		'admin:project.settings.edit'
	)
	if (project.owner?.id !== verifiedData.id && !hasPermission) {
		return redirectToProject(request, project.type, project.slug)
	}
	console.log('project', project)
	console.log('verifiedData', verifiedData)

	return NextResponse.next()
}
