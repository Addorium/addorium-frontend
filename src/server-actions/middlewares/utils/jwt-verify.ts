'use server'

import { ITokenInside as IToken } from '@/types/auth.types'
import { jwtVerify } from 'jose'

interface ITokenInside extends IToken {
	iat: number
	exp: number
}

export async function jwtVerifyServer(accessToken: string) {
	try {
		const { payload }: { payload: ITokenInside } = await jwtVerify(
			accessToken,
			new TextEncoder().encode(`${process.env.JWT_SECRET}`)
		)

		return payload
	} catch (error) {
		// Обработка ошибок, связанных с верификацией JWT
		if (
			error instanceof Error &&
			error.message.includes('exp claim timestamp check failed')
		) {
			// Токен истек
			console.log('Токен истек')
			return null
		}

		console.log('Ошибка при верификации токена: ', error)
		return null
	}
}
