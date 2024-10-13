import BasicSkeleton from '@/components/ui/loader/skeleton/BasicSkeleton'
import { Suspense } from 'react'
import UserProject from './UserProjects'

export default function UserProjectPage() {
	return (
		<Suspense
			fallback={<BasicSkeleton height='300px' className='rounded-2xl' />}
		>
			<UserProject />
		</Suspense>
	)
}
