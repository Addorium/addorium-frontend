import { ITokenInside } from '@/types/auth.types'
import { IRole } from '@/types/role.types'

export type TUserDataState = {
	id: number
	email?: string
	name: string
	role: IRole
	isLoggedIn: boolean
}

export const transformUserToState = (
	user: ITokenInside
): TUserDataState | null => {
	return {
		id: user.id,
		email: user.email,
		role: user.role as IRole,
		name: user.name,
		isLoggedIn: true,
	}
}
