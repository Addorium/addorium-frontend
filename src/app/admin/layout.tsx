import AdminLayout from '@/components/admin-layout/AdminLayout'
import DashboardLoader from '@/components/ui/loader/DashboardLoader'
import { Suspense } from 'react'

export default function MainAdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<Suspense fallback={<DashboardLoader />}>
				<AdminLayout>{children}</AdminLayout>
			</Suspense>
		</>
	)
}
