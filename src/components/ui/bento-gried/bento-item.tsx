import cn from 'clsx'
import { PropsWithChildren } from 'react'

interface IBentoItem extends PropsWithChildren<unknown> {
	colspan: number
	rowspan: number
	className?: string
}

export function BentoItem({
	colspan,
	rowspan,
	children,
	className,
}: IBentoItem) {
	const itemStyles = {
		gridColumn: `span ${colspan}`,
		gridRow: `span ${rowspan}`,
		padding: '1rem',
		border: '1px solid #ddd',
		aspectRatio: colspan / rowspan,
	}
	return (
		<div style={itemStyles} className={cn('rounded h-full w-full', className)}>
			{children}
		</div>
	)
}
