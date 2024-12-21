import { getAccessToken } from '@/services/auth-token.service'
import { IProfileResponse, userService } from '@/services/user.service'
import { useQuery } from '@tanstack/react-query'

interface IUseProfile {
	data: IProfileResponse | undefined
	isLoading: boolean
	isSuccess: boolean
	isFetching: boolean
	isLoggedIn: boolean
}

export function useProfile(): IUseProfile {
	const hasToken = Boolean(getAccessToken())

	const { data, isLoading, isSuccess, isFetching } = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.getProfile(),
	})

	return {
		data,
		isLoading,
		isSuccess,
		isFetching,
		isLoggedIn: hasToken && Boolean(data), // isLoggedIn зависит от наличия данных
	}
}
