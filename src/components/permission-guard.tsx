'use client'
import { hasPermission } from '@/services/role.service'
import React from 'react'

interface PermissionGuardProps {
	userPermissions?: string[] | undefined
	requiredPermission?: string
	children: React.ReactNode
	permanent?: boolean
}

const PermissionGuard: React.FC<PermissionGuardProps> = ({
	userPermissions,
	requiredPermission,
	permanent,
	children,
}) => {
	if (permanent) {
		return <>{children}</>
	}
	if (!userPermissions) {
		return null
	}
	if (!requiredPermission) {
		return null
	}
	if (!hasPermission(userPermissions, requiredPermission)) {
		return null
	}

	return <>{children}</>
}

export default PermissionGuard
