import { AxiosError } from 'axios'
import type { NextRequest } from 'next/server'

import { EnumTokens } from '@/services/auth-token.service'
import { authService } from '@/services/auth.service'

export async function getTokensFromRequest(request: NextRequest) {
	const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value
	let accessToken = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value

	if (!refreshToken) {
		request.cookies.delete(EnumTokens.ACCESS_TOKEN)
		return null
	}

	if (!accessToken) {
		console.log('нет access token пробуем получить новый')
		try {
			const data = await authService.getNewTokensByRefresh(refreshToken)
			accessToken = data.accessToken

			console.log('получили новый access token - ', accessToken)
		} catch (error) {
			console.log('ошибка при получении нового access token')
			if (error instanceof AxiosError) {
				if (error.message === 'invalid token') {
					console.log('не валидный токен')
					request.cookies.delete(EnumTokens.ACCESS_TOKEN)
					return null
				}
			}
			return null
		}
	}

	return { accessToken, refreshToken }
}
