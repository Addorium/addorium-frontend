import { axiosWithAuth } from '@/api/interceptors'
import { PaginatedResponse } from '@/types/paginated.types'
import { IGetTagsProps, ITag, ITagCreateProps } from '@/types/tag.types'

class TagsService {
	private BASE_URL = '/tags'

	async getAll(query: IGetTagsProps) {
		const response = await axiosWithAuth.get<PaginatedResponse<ITag>>(
			this.BASE_URL,
			{
				params: {
					...query,
				},
			}
		)
		return response.data
	}

	async create(data: ITagCreateProps) {
		const response = await axiosWithAuth.post<ITag>(this.BASE_URL, data, {
			headers: {
				'Content-Type': 'multipart/form-data',
				Accept: '*/*',
			},
		})
		return response.data
	}
}

export const tagsService = new TagsService()
