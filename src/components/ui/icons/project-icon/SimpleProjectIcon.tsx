'use client'
import Image from 'next/image'
import React from 'react'

interface ISimpleProjectIcon {
	isLoading: boolean
	name?: string
	width?: number
	rounded?: 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
	onClick?: () => void
}
const SimpleProjectIcon: React.FC<ISimpleProjectIcon> = ({
	isLoading,
	width = 10,
	rounded = '2xl',
	...res
}) => {
	const name = res.name ?? 'default.webp'
	const bucket = process.env.NEXT_PUBLIC_S3_BUKKET_URL
	const nameUrl = `${bucket}images/projects/icon/${name}`
	return (
		<>
			<div
				className={`rounded-${rounded} flex aspect-square bg-background-4
	 transition-transform duration-500 ease-in-out`}
				style={{ width: `${width}px`, height: `${width}px` }}
			>
				<Image
					className={`transition-transform rounded-${rounded} duration-500 ease-in-out object-cover`}
					width={width}
					height={width}
					src={nameUrl}
					alt={'avatar'}
					unoptimized={true}
				></Image>
			</div>
		</>
	)
}
export default SimpleProjectIcon
