import { axiosClassic, axiosWithAuth } from '@/api/interceptors'
import { PaginatedResponse } from '@/types/paginated.types'
import { IUser, IUsersGetProps, IUsersUpdateProps } from '@/types/user.types'

export interface IProfileResponse extends IUser {
	avatar: string
}

class UserService {
	private BASE_URL = '/users'

	async getProfile() {
		const response = await axiosWithAuth.get<IProfileResponse>(
			this.BASE_URL + '/me'
		)
		return response.data
	}
	async getServerProfile(accessToken: string) {
		const response = await axiosClassic.get<IProfileResponse>(
			this.BASE_URL + '/me',
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		)
		return response.data
	}
	async getAll(query: IUsersGetProps) {
		const response = await axiosWithAuth.get<PaginatedResponse<IUser>>(
			this.BASE_URL,
			{
				params: {
					...query,
				},
			}
		)
		return response.data
	}

	async getById(id: string) {
		const response = await axiosWithAuth.get<IUser>(this.BASE_URL + '/' + id)
		return response.data
	}

	async updateAvatar(formData: FormData) {
		const response = await axiosWithAuth.patch(
			this.BASE_URL + '/avatar',
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
					Accept: '*/*',
				},
			}
		)
		return response.data
	}
	async clearAvatar(id: string) {
		const query = new URLSearchParams({
			id,
		}).toString()
		const response = await axiosWithAuth.delete(this.BASE_URL + '/avatar/' + id)
		return response.data
	}

	async update(data: IUsersUpdateProps) {
		const response = await axiosWithAuth.put(this.BASE_URL, {
			...data,
		})
		return response.data
	}
}

export const userService = new UserService()
