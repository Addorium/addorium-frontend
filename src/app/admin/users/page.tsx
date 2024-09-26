import type { Metadata } from 'next'
import { Suspense } from 'react'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Users } from './Users'

export const metadata: Metadata = {
	title: 'Admin Page',
	...NO_INDEX_PAGE,
}

export default function UsersPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Users />
		</Suspense>
	)
}
