'use client'

import PermissionGuard from '@/components/permission-guard'
import { useProfile } from '@/hooks/useProfile'
import { ISidebarCategory } from './admin-sidebar.interface'
import SidebarCategory from './SidebarCategory'

interface Props {
	categories: ISidebarCategory[]
	title?: string
}

export function Sidebar({ categories, title }: Props) {
	const { data } = useProfile()
	return (
		<>
			<div>
				{title && (
					<div>
						<h1 className='text-gray-1 text-3xl font-bold'>{title}</h1>
					</div>
				)}
				<div className='flex flex-col gap-2'>
					{categories.map((category, index) => {
						if (category.permission) {
							return (
								<PermissionGuard
									key={index}
									requiredPermission={category.permission}
									userPermissions={data?.role?.permissions}
								>
									<SidebarCategory key={index} categorie={category} />
								</PermissionGuard>
							)
						}
						return <SidebarCategory key={index} categorie={category} />
					})}
				</div>
			</div>
		</>
	)
}
