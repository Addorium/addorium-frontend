import { axiosClassic } from '@/api/interceptors'
import { IAuthResponse } from '@/types/auth.types'
import * as Sentry from '@sentry/nextjs'
import { removeFromStorage, saveTokenStorage } from './auth-token.service'

export const authService = {
	async getNewTokens() {
		Sentry.addBreadcrumb({
			category: 'auth',
			message: 'Attempting to refresh token',
			level: 'info',
		})
		try {
			const response =
				await axiosClassic.post<IAuthResponse>('/auth/access-token')
			if (response.data.accessToken) {
				saveTokenStorage(response.data.accessToken)
			}
			return response
		} catch (error: any) {
			if (
				error.response?.status === 401 &&
				error.response?.data?.message === 'Refresh token not passed'
			) {
				removeFromStorage()
				return
			} else if (
				error.response?.status == 401 &&
				error.response?.data?.message === 'Invalid or revoked refresh token'
			) {
				removeFromStorage()
				return
			}
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
			console.error('Logout error:', error)
			throw new Error('Failed to log out')
		}
	},
	async getNewTokensByRefresh(refreshToken: string) {
		Sentry.addBreadcrumb({
			category: 'auth',
			message: 'Attempting to refresh token in server side',
			level: 'info',
		})
		const response = await axiosClassic.post<IAuthResponse>(
			'/auth/access-token',
			{},
			{
				headers: {
					Cookie: `refreshToken=${refreshToken}`,
				},
			}
		)
		response.headers['set-cookie']?.forEach(cookie => {
			console.log('cookie', cookie)
		})
		return response.data
	},
}
