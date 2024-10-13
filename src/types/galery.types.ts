export interface GalleryImage {
	id: number
	title: string
	description: string
	url: string
	projectId: number
	bannerOf: number
	createdAt: Date
	updatedAt: Date
	deletedAt: Date
}

export interface GalleryImageUpload {
	title: string
	description: string
	file: File
}
