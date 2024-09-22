import { IUser } from './user.types'

export interface IAuthForm {
	code: string
}

export interface IAuthResponse {
	accessToken: string
	user: IUser
}

export type TypeUserForm = Omit<IUser, 'id'> & { password?: string }
