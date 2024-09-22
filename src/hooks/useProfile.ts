import { useQuery } from '@tanstack/react-query'

import { getAccessToken } from '@/services/auth-token.service'
import { IProfileResponse, userService } from '@/services/user.service'

interface IUseProfile {
	data: IProfileResponse | undefined
	isLoading: boolean
	isSuccess: boolean
	isFetching: boolean
}

export function useProfile(): IUseProfile {
	if (!getAccessToken()) {
		return {
			data: undefined,
			isLoading: false,
			isSuccess: false,
			isFetching: false,
		}
	}
	const { data, isLoading, isSuccess, isFetching } = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.getProfile(),
	})

	return { data, isLoading, isSuccess, isFetching }
}
