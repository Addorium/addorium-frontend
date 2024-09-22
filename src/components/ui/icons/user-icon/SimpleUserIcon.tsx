'use client'
import Image from 'next/image'
import React from 'react'

interface ISimpleUserIcon {
	isLoading: boolean
	avatar?: string
	width?: number
	rounded?: 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
	onClick?: () => void
}
const SimpleUserIcon: React.FC<ISimpleUserIcon> = ({
	isLoading,
	width = 10,
	rounded = '2xl',
	...res
}) => {
	const avatar = res.avatar ?? 'default.webp'
	const bucket = process.env.NEXT_PUBLIC_S3_BUKKET_URL
	const avatarUrl = `${bucket}images/users/avatar/${avatar}`
	return (
		<>
			<div
				className={`rounded-${rounded} flex max-w-fit aspect-square bg-background-4
				transition-transform duration-500 ease-in-out my-1`}
			>
				<Image
					className={`transition-transform rounded-${rounded} duration-500 ease-in-out object-cover`}
					width={width}
					height={width}
					src={avatarUrl}
					alt={'avatar'}
					unoptimized={true}
				></Image>
			</div>
		</>
	)
}
export default SimpleUserIcon
