import { axiosWithAuth } from '@/api/interceptors'
import {
	ICategory,
	ICategoryCreateProps,
	IGetCategoriesProps,
} from '@/types/category.types'
import { PaginatedResponse } from '@/types/paginated.types'

class CategoriesService {
	private BASE_URL = '/categories'

	async getAll(query: IGetCategoriesProps) {
		const response = await axiosWithAuth.get<PaginatedResponse<ICategory>>(
			this.BASE_URL,
			{
				params: {
					...query,
				},
			}
		)
		return response.data
	}

	async create(data: ICategoryCreateProps) {
		const response = await axiosWithAuth.post<ICategory>(this.BASE_URL, data, {
			headers: {
				'Content-Type': 'multipart/form-data',
				Accept: '*/*',
			},
		})
		return response.data
	}
}

export const categoriesService = new CategoriesService()
