'use client'

import { saveTokenStorage } from '@/services/auth-token.service'
import * as Sentry from '@sentry/nextjs'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function DiscordAuthPage() {
	const searchParams = useSearchParams()
	const router = useRouter()

	useEffect(() => {
		const accessToken = searchParams.get('accessToken')
		if (accessToken) saveTokenStorage(accessToken)

		Sentry.captureMessage('Discord Auth Page')

		router.replace('/')
	}, [])

	return <div>Loading...</div>
}
