import type { Metadata } from 'next'
import { Suspense } from 'react'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Roles } from './Roles'

export const metadata: Metadata = {
	title: 'Admin Page',
	...NO_INDEX_PAGE,
}

export default function RolesPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Roles />
		</Suspense>
	)
}
