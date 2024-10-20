import { hasPermission } from '@/services/role.service'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
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
	const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)

	useEffect(() => {
		if (!isLoading) {
			if (
				permanent ||
				(userPermissions &&
					hasPermission(userPermissions, requiredPermission || ''))
			) {
				setIsAuthorized(true)
			} else {
				router.replace(re)
			}
		}
	}, [isLoading, userPermissions, requiredPermission, router, re])

	if (isLoading) {
		return <div>{loaderComponent || <MiniLoader />}</div>
	}

	return isAuthorized ? <>{children}</> : null
}

export default PagePermissionGuard
