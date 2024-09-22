'use client'
import Link from 'next/link'
import { IUserMenuItem } from './menu.interface'

export function UserMenuItem({
	item,
	handleClose,
}: {
	item: IUserMenuItem
	handleClose?: () => void
}) {
	const { name, link, onClick, type = 'normal' } = item

	const baseClasses =
		'flex gap-2.5 items-center w-full py-1.5 px-4 transition-colors rounded-lg'
	const hoverClasses = {
		normal: 'hover:bg-gray-2',
		red: 'hover:bg-red/10',
		green: 'hover:bg-green/10',
	}
	const itemTypes = {
		normal: 'text-gray-6',
		red: 'text-red',
		green: 'text-green',
	}

	return (
		<div
			onClick={() => {
				if (handleClose) {
					handleClose()
				}
			}}
		>
			{link && (
				<Link href={link} className={`${baseClasses} ${hoverClasses[type]}`}>
					<item.icon className={itemTypes[type]} />
					<span className={itemTypes[type]}>{item.name}</span>
				</Link>
			)}
			{onClick && (
				<button
					type='button'
					onClick={onClick}
					className={`${baseClasses} ${hoverClasses[type]}`}
				>
					<item.icon className={itemTypes[type]} />
					<span className={itemTypes[type]}>{name}</span>
				</button>
			)}
		</div>
	)
}
