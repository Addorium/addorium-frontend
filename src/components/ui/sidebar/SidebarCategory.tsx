'use client'

import PermissionGuard from '@/components/permission-guard'
import { useProfile } from '@/hooks/useProfile'
import { usePathname } from 'next/navigation'
import React from 'react'
import SidebarItem from './SidebarItem'
import { ISidebarCategory } from './admin-sidebar.interface'

interface SidebarItemProps {
	categorie: ISidebarCategory
}

const SidebarCategory: React.FC<SidebarItemProps> = ({ categorie }) => {
	const { name, items } = categorie
	const { data } = useProfile()
	const pathname = usePathname()
	return (
		<div className='flex flex-col gap-2'>
			{name && <h1 className='text-gray-1 text-xl font-bold'>{name}</h1>}
			{items.map((item, index) => {
				if (item.permission) {
					return (
						<PermissionGuard
							requiredPermission={item.permission}
							userPermissions={data?.role?.permissions}
						>
							<SidebarItem
								key={index}
								active={pathname === item.link}
								item={item}
							/>
						</PermissionGuard>
					)
				} else {
					return (
						<SidebarItem
							key={index}
							active={pathname === item.link}
							item={item}
						/>
					)
				}
			})}
		</div>
	)
}

export default SidebarCategory
