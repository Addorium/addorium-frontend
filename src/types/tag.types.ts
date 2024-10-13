import { ProjectType } from './project.types'

export interface ITag {
	id: number
	name: string
	icon: string
	projectType: ProjectType
	createdAt: string
	updatedAt: string
	deletedAt: string
}
export interface ITagCreateProps {
	name: string
	icon: string
	projectType: ProjectType
	file: File
}
export interface ITagUpdateProps {
	id: number
	name?: string
	icon?: string
	projectType?: ProjectType
}
export interface IGetTagsProps {
	page?: number
	orderBy?: string
	projectType?: ProjectType
	orderDirection?: 'asc' | 'desc'
	search?: string
}
