import { axiosWithAuth } from '@/api/interceptors'
import { PaginatedResponse } from '@/types/paginated.types'
import { IRole, IRolesGetProps } from '@/types/role.types'

class RoleService {
	private BASE_URL = '/roles'

	async getAll(query: IRolesGetProps) {
		const response = await axiosWithAuth.get<PaginatedResponse<IRole>>(
			this.BASE_URL,
			{
				params: {
					...query,
				},
			}
		)
		return response.data
	}
}

export const roleService = new RoleService()

export function hasPermission(
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
