import { ProjectType } from './project.types'

export interface ICategory {
	id: number
	name: string
	icon: string
	projectType: ProjectType
	createdAt: string
	updatedAt: string
	deletedAt: string
}
export interface ICategoryCreateProps {
	name: string
	icon: string
	projectType: ProjectType
	file: File
}
export interface ICategoryUpdateProps {
	id: number
	name?: string
	projectType?: ProjectType

	icon?: string
}

export interface IGetCategoriesProps {
	page?: number
	orderBy?: string
	projectType?: ProjectType
	orderDirection?: 'asc' | 'desc'
	search?: string
}
