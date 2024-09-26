import { Suspense } from 'react'
import UserProject from './UserProjects'

export default function UserProjectPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<UserProject />
		</Suspense>
	)
}
