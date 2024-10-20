import { axiosWithAuth } from '@/api/interceptors'
import {
	GalleryImage,
	GalleryImageUpdate,
	GalleryImageUpload,
} from '@/types/galery.types'

class GalleryService {
	private BASE_URL = '/gallery'

	async create(data: GalleryImageUpload) {
		const response = await axiosWithAuth.post<GalleryImage>(
			this.BASE_URL,
			data,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
					Accept: '*/*',
				},
			}
		)
		return response.data
	}
	async delete(id: number) {
		const response = await axiosWithAuth.delete(this.BASE_URL + '/' + id)
		return response.data
	}
	async update(data: GalleryImageUpdate) {
		const response = await axiosWithAuth.put<GalleryImage>(
			this.BASE_URL + '/' + data.id,
			data
		)
		return response.data
	}
}

export const galleryService = new GalleryService()
