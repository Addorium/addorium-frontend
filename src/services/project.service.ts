import { axiosClassic, axiosWithAuth } from '@/api/interceptors'
import { PaginatedResponse } from '@/types/paginated.types'
import {
	IProject,
	IProjectsCreateProps,
	IProjectsGetProps,
	IProjectsUpdateProps,
} from '@/types/project.types'

class ProjectService {
	private BASE_URL = '/projects'

	async getAll(query: IProjectsGetProps) {
		const response = await axiosClassic.get<PaginatedResponse<IProject>>(
			this.BASE_URL,
			{
				params: {
					...query,
				},
			}
		)
		return response.data
	}

	async getByUserId(userId: string, query: IProjectsGetProps) {
		const response = await axiosClassic.get<PaginatedResponse<IProject>>(
			`${this.BASE_URL}/user/${userId}`,
			{
				params: {
					...query,
				},
			}
		)
		return response.data
	}
	async getByUserProjects(query: IProjectsGetProps) {
		const response = await axiosWithAuth.get<PaginatedResponse<IProject>>(
			`${this.BASE_URL}/user/my`,
			{
				params: {
					...query,
				},
			}
		)
		return response.data
	}

	async getBySlug(slug: string) {
		const response = await axiosClassic.get<IProject>(
			`${this.BASE_URL}/slug/${slug}`
		)
		return response.data
	}

	async create(data: IProjectsCreateProps) {
		const response = await axiosWithAuth.post(this.BASE_URL, {
			...data,
		})
		return response.data
	}
	async update(data: IProjectsUpdateProps) {
		const response = await axiosWithAuth.put(this.BASE_URL + '/' + data.id, {
			...data,
		})
		return response.data
	}
	async updateIcon(formData: FormData) {
		const response = await axiosWithAuth.patch(
			this.BASE_URL + '/update/icon',
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
	async clearIcon(id: string) {
		const response = await axiosWithAuth.delete(
			this.BASE_URL + '/update/icon/' + id
		)
		return response.data
	}
}

export const projectService = new ProjectService()