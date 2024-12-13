import { IRole } from './role.types'
import { IUser } from './user.types'

export interface IAuthForm {
	code: string
}

export interface IAuthResponse {
	accessToken: string
	user: IUser
}
export interface ITokenInside {
	id: number
	email?: string
	name: string
	role: IRole
}

export type TypeUserForm = Omit<IUser, 'id'> & { password?: string }
