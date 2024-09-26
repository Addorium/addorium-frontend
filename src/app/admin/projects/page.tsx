import type { Metadata } from 'next'
import { Suspense } from 'react'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Projects } from './Projects'

export const metadata: Metadata = {
	title: 'Admin Page',
	...NO_INDEX_PAGE,
}

export default function ProjectsPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Projects />
		</Suspense>
	)
}
