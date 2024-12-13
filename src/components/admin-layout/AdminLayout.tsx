// AdminLayout.tsx
'use client'

import type { PropsWithChildren } from 'react'
import { Sidebar } from '../ui/sidebar/Sidebar'
import { ADMIN_CATEGORIES } from './sidebar/admin-sidebar.data'

export default function AdminLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<div className='flex gap-4 mt-3'>
			<div className='bg-background-2 min-w-[322px] h-fit rounded-2xl px-4 py-5 flex flex-col gap-4'>
				<Sidebar categories={ADMIN_CATEGORIES} title='Admin' />
			</div>
			<main className='w-full'>{children}</main>
		</div>
	)
}
