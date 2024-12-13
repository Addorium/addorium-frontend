'use server'
import { EnumTokens } from '@/services/auth-token.service'
import { authService } from '@/services/auth.service'
import { ITokenInside } from '@/types/auth.types'
import * as Sentry from '@sentry/nextjs'
import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import {
	transformUserToState,
	TUserDataState,
} from '../transform-user-to-state'

export async function getServerAuth(): Promise<TUserDataState | null> {
	const JWT_SECRET = process.env.JWT_SECRET
	const refreshToken =
		cookies().get(EnumTokens.REFRESH_TOKEN)?.value ?? undefined

	if (!refreshToken) return null

	let accessToken = cookies().get(EnumTokens.ACCESS_TOKEN)?.value ?? undefined

	const verifyToken = async (token: string) => {
		try {
			const { payload }: { payload: ITokenInside } = await jwtVerify(
				token,
				new TextEncoder().encode(JWT_SECRET)
			)
			return payload ? transformUserToState(payload) : null
		} catch (error: any) {
			if (error.code === 'ERR_JWT_EXPIRED') return null
			throw error
		}
	}

	const getAccessToken = async () => {
		if (accessToken) return accessToken
		try {
			const data = await authService.getNewTokensByRefresh(refreshToken)
			return data?.accessToken ?? undefined
		} catch {
			return undefined
		}
	}

	try {
		accessToken = await getAccessToken()
		if (!accessToken) return null

		const userData = await verifyToken(accessToken)
		if (userData) return userData

		// Повторное получение accessToken и проверка, если он был просрочен
		const newToken = await authService.getNewTokensByRefresh(refreshToken)
		return newToken ? await verifyToken(newToken.accessToken) : null
	} catch (error: any) {
		Sentry.captureException(error)
		return null
	}
}
