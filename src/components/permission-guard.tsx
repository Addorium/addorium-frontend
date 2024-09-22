'use client'
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

export default PermissionGuard
