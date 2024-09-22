export interface IRole {
	id: number
	name: string
	permissions: string[]
	createdAt: string
	updatedAt: string
	deletedAt: string
}
export interface IRolesGetProps {
	page?: number
	orderBy?: string
	orderDirection?: 'asc' | 'desc'
	search?: string
	roleId?: number
}
