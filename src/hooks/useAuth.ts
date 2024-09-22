import { getAccessToken } from '@/services/auth-token.service'

interface IUseAuth {
	isAuth: boolean
}

export function useAuth(): IUseAuth {
	if (!getAccessToken()) {
		return {
			isAuth: false,
		}
	}
	return {
		isAuth: true,
	}
}
