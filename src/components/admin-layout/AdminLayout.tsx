// AdminLayout.tsx
'use client'

import { useProfile } from '@/hooks/useProfile'
import type { PropsWithChildren } from 'react'
import PagePermissionGuard from '../page-permission-guard'
import DashboardLoader from '../ui/loader/DashboardLoader'
import { Sidebar } from '../ui/sidebar/Sidebar'
import { ADMIN_CATEGORIES } from './sidebar/admin-sidebar.data'

export default function AdminLayout({ children }: PropsWithChildren<unknown>) {
	const { data, isLoading } = useProfile()

	return (
		<PagePermissionGuard
			isLoading={isLoading}
			userPermissions={data?.role?.permissions}
			requiredPermission='admin:dashboard.see'
			redirectUrl='/'
			loaderComponent={<DashboardLoader />}
		>
			<div className='flex gap-4 mt-3'>
				<div className='bg-background-2 min-w-[322px] h-fit rounded-2xl px-4 py-5 flex flex-col gap-4'>
					<Sidebar categories={ADMIN_CATEGORIES} title='Admin' />
				</div>
				<main className='w-full'>{children}</main>
			</div>
		</PagePermissionGuard>
	)
}
