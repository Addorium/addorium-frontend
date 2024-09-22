import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import Overview from './Overview'

export const metadata: Metadata = {
	title: 'Dashboard Page',
	...NO_INDEX_PAGE,
}

export default function DashboardPage() {
	return <Overview />
}
