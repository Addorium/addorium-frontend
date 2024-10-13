'use client'
import clsx from 'clsx'

// BasicSkeleton.tsx
const BasicSkeleton = ({
	width = '100%',
	height = '20px',
	className,
}: {
	width?: string
	height?: string
	className?: string
}) => (
	<div
		style={{
			width,
			height,
		}}
		className={clsx('animate-pulse bg-gray-2', className)}
	/>
)

export default BasicSkeleton
