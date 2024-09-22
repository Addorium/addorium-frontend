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
