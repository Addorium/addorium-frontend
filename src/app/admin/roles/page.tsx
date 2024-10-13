import type { Metadata } from 'next'
import { Suspense } from 'react'

import BasicSkeleton from '@/components/ui/loader/skeleton/BasicSkeleton'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Roles } from './Roles'

export const metadata: Metadata = {
	title: 'Admin Page',
	...NO_INDEX_PAGE,
}

export default async function RolesPage() {
	return (
		<Suspense
			fallback={<BasicSkeleton height='300px' className='rounded-2xl' />}
		>
			<Roles />
		</Suspense>
	)
}
