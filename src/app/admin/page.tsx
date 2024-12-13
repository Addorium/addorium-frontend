import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Admin Page',
	...NO_INDEX_PAGE,
}

export default async function AdminPage() {
	return (
		<div>
			<h1>Admin Page</h1>
		</div>
	)
}
