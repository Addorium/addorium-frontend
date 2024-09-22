import { axiosClassic } from '@/api/interceptors'
import { IAuthForm, IAuthResponse } from '@/types/auth.types'
import { removeFromStorage, saveTokenStorage } from './auth-token.service'

export const authService = {
	async discordAuth(data: IAuthForm) {
		try {
			const response = await axiosClassic.post<IAuthResponse>(
				'/auth/discord',
				data
			)

			if (response.data.accessToken) {
				saveTokenStorage(response.data.accessToken)
			}

			return response
		} catch (error) {
			console.error('Login error:', error)
			throw new Error('Failed to log in')
		}
	},

	async getNewTokens() {
		try {
			const response =
				await axiosClassic.post<IAuthResponse>('/auth/access-token')

			if (response.data.accessToken) {
				saveTokenStorage(response.data.accessToken)
			}

			return response
		} catch (error) {
			// Логируем или обрабатываем ошибку
			console.error('Error getting new tokens:', error)
			throw new Error('Failed to refresh tokens')
		}
	},

	async logout() {
		try {
			const response = await axiosClassic.post<boolean>('/auth/logout')

			if (response.data) {
				removeFromStorage()
			}

			return response
		} catch (error) {
			// Логируем или обрабатываем ошибку
			console.error('Logout error:', error)
			throw new Error('Failed to log out')
		}
	},
}
