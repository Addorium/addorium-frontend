import { ICategory } from './category.types'
import { GalleryImage } from './galery.types'
import { ITag } from './tag.types'
import { IUser } from './user.types'

export interface IProject {
	id: number
	name: string
	slug: string
	visibility: ProjectVisibility
	status: ProjectStatus
	icon: string
	banner: string
	description: string
	categoryId: number
	category: ICategory
	tags: ITag[]
	type: ProjectType
	galleryImages: GalleryImage[]
	fileUrl: string
	ownerId: number
	owner?: IUser
	createdAt: string
	updatedAt: string
	deletedAt: string
}
export type ProjectVisibility = 'PUBLIC' | 'PRIVATE' | 'UNLISTED'
export type ProjectStatus = 'DRAFT' | 'MODERATION' | 'PUBLISHED'
export type ProjectType = 'BLUEPRINT' | 'SCRIPT' | 'THEME'

export interface IProjectsCreateProps {
	type: ProjectType
	name: string
	slug: string
	visibility: ProjectVisibility
	ownerId: number
}
export interface IProjectsGetProps {
	page?: number
	orderBy?: string
	orderDirection?: 'asc' | 'desc'
	search?: string
	ownerId?: number
}

export interface IProjectsUpdateProps {
	id: number
	name?: string
	slug?: string
	visibility?: ProjectVisibility
	status?: ProjectStatus
	icon?: string
	banner?: string
	description?: string
	categoryId?: number
	tags?: number[]
	type?: ProjectType
	fileUrl?: string
	ownerId?: number
}

export const ReadableProjectVisibility = {
	PUBLIC: 'Public',
	PRIVATE: 'Private',
	UNLISTED: 'Unlisted',
}
export const ReadableProjectStatus = {
	DRAFT: 'Draft',
	MODERATION: 'Moderation',
	PUBLISHED: 'Published',
}
export const ReadableProjectType = {
	BLUEPRINT: 'Blueprint',
	SCRIPT: 'Script',
	THEME: 'Theme',
}

export const getProjectTypeFromStr = (type: string): ProjectType => {
	switch (type) {
		case 'blueprints':
			return 'BLUEPRINT'
		case 'scripts':
			return 'SCRIPT'
		case 'themes':
			return 'THEME'
		default:
			return 'BLUEPRINT'
	}
}
