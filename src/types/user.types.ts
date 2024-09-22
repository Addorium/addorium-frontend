import { IRole } from './role.types'

export interface IUser {
	id: number
	name: string
	email: string | undefined
	discordId: string | undefined
	avatar: string | undefined
	roleId: number
	role: IRole | undefined
	createdAt: string
	updatedAt: string
	deletedAt: string
}

export interface IUsersUpdateProps {
	id: number
	name?: string
	roleId?: number
	discordId?: string
	email?: string
}

export interface IUsersGetProps {
	page?: number
	orderBy?: string
	orderDirection?: 'asc' | 'desc'
	search?: string
	roleId?: number
}
