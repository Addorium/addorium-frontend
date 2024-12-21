import { hasPermission } from '@/services/role.service'

export const verifyUserPermission = (
	userPermissions: string[],
	permission: string
): boolean => {
	return hasPermission(userPermissions, permission)
}
