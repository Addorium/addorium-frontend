// PagePermissionGuard.tsx
'use client'
import { useRouter } from 'next/navigation'
import MiniLoader from './ui/loader/mini-loader/mini-loader'

interface PagePermissionGuardProps {
	userPermissions?: string[]
	requiredPermission?: string
	children: React.ReactNode
	permanent?: boolean
	redirectUrl?: string
	isLoading?: boolean
	loaderComponent?: React.ReactNode
}

const PagePermissionGuard: React.FC<PagePermissionGuardProps> = ({
	userPermissions,
	requiredPermission,
	permanent,
	redirectUrl: re = '/',
	children,
	isLoading = false,
	loaderComponent,
}) => {
	const router = useRouter()
	isLoading = isLoading
	if (isLoading) {
		return <div className=''>{loaderComponent || <MiniLoader />}</div>
	}
	if (permanent) {
		return <>{children}</>
	}

	if (!requiredPermission) {
		router.replace(re)
		return
	}

	if (!userPermissions || !hasPermission(userPermissions, requiredPermission)) {
		router.replace(re)
	}

	return <>{children}</>
}

function hasPermission(
	userPermissions: string[],
	requiredPermission: string
): boolean {
	const permissionParts = requiredPermission.split('.')
	const permissionModificator = permissionParts[0].split(':')[0]
	permissionParts[0] = permissionParts[0].split(':')[1]
	for (const userPermission of userPermissions) {
		const userPermissionParts = userPermission.split('.')
		const result = matchPermissionParts(
			userPermissionParts,
			permissionParts,
			permissionModificator
		)
		if (result) {
			return true
		}
	}
	return false
}

function matchPermissionParts(
	userPermissionParts: string[],
	permissionParts: string[],
	permissionModificator: string
): boolean {
	const userModificator = userPermissionParts[0].split(':')[0]
	userPermissionParts[0] = userPermissionParts[0].split(':')[1]

	if (userModificator === 'users' && permissionModificator === 'admin') {
		return false
	}

	for (let i = 0; i < permissionParts.length; i++) {
		if (userPermissionParts[i] === '*') {
			return true
		}
		if (userPermissionParts[i] !== permissionParts[i]) {
			return false
		}
	}
	return userPermissionParts.length === permissionParts.length
}

export default PagePermissionGuard
