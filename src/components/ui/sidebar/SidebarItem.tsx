'use client'

import cn from 'clsx'
import Link from 'next/link'
import React from 'react'
import { ISidebarItem } from './admin-sidebar.interface'

interface SidebarItemProps {
	active?: boolean
	item: ISidebarItem
	className?: string
}

const SidebarItem: React.FC<SidebarItemProps> = ({
	active,
	item,
	className,
}) => {
	const { Icon, name, link, disabled } = item
	let iconSize = 'w-[24px] h-[24px]'
	const baseStyles = `rounded-[16px] w-full px-4 py-2 transition-bg duration-300 ease-in-out font-semibold flex items-center justify-start  text-sm ${active ? 'bg-gray-1/15 text-gray-1' : `${disabled ? 'cursor-default text-gray-1/40' : 'cursor-pointer hover:text-gray-1 text-gray-6'}`} `

	return (
		<Link href={!disabled ? link : ''} className={cn(baseStyles, className)}>
			{Icon && <Icon className={`${iconSize} mr-1.5`} />}
			{name}
		</Link>
	)
}

export default SidebarItem
